# vanity-addy-generator

This repository contains scripts for launching a GPU-based vanity address generator.
The `runpod-start.sh` script initializes GPU settings, starts a monitoring process,
and runs the generator located in `src/cuda/vanity`.

This repository contains a simplified prototype used to experiment with generating vanity cryptocurrency addresses while storing compliance information on the Solana blockchain.  The project is split across a small Rust program and several Node.js utilities and is intended to be run inside a Docker container.

## Project goals

- Demonstrate how a wipe proof can be written to a Solana account using an Anchor based program.
- Provide Node.js scripts that drive the wipe process and generate basic compliance artifacts.
- Package everything in a container so GPU powered address generation can be executed via `runpod-start.sh`.

## Repository layout

- `app/programs/src` – Anchor/Rust program that exposes the `store_wipe_proof` instruction.
- `app/lib` – Node utility modules. `wipe-utils.ts` contains the `initiateWipe` stub used by the API handler.
- `app/api/compliance` – Example Next.js style API route for wiping a user (`DELETE /api/compliance/wipe`).
- `compliance/proofs` – Node scripts for fetching a transaction and creating a PDF proof.
- `scripts` – Helper scripts including `build-docker.sh` used to build the Docker image.
- `runpod-start.sh` – Entry point executed inside the container. It configures the GPU and launches the vanity address generator binary.
- `Dockerfile` – Builds a Node based image and runs `runpod-start.sh` by default.

## Prerequisites

- **Node.js** 18 or newer and `npm` for running the tests and API scripts.
- **Rust** toolchain (stable) for building the on-chain program located in `app/programs/src`.
- **Docker** for packaging and running the GPU based generator.
- **Python** 3.11 or newer for the FastAPI backend. Install dependencies from `backend/requirements.txt`.

## Building and running

1. Install Node dependencies (mainly used for the test suite):

   ```bash
   npm install
   ```

   Run the tests using:

   ```bash
   npm test
   ```


   Copy `.env.example` to `.env` and set `NEXT_PUBLIC_PRODUCTION_URL` to the URL
   of your backend (defaults to `http://localhost:8000`).

   Set `NEXT_PUBLIC_BACKEND_URL` to the base URL of the FastAPI server when
   running the frontend locally. By default the value is empty which causes the
   application to request the API at the same origin. If the WebSocket endpoint
   is hosted separately, provide `NEXT_PUBLIC_WS_URL` with the base URL for
   connecting via WebSocket.


2. Install Python dependencies for the backend:

   ```bash
   pip install -r backend/requirements.txt
   ```

3. Launch the FastAPI backend. The server expects a running Redis instance and
   uses the `REDIS_URL` environment variable to locate it. The database utilities
   also rely on `DATABASE_URL` and authentication requires `JWT_SECRET`:

   ```bash
   REDIS_URL=redis://localhost:6379/0 \
   DATABASE_URL=postgres://user:password@localhost/dbname \
   JWT_SECRET=your-secret-value \
   uvicorn backend.main:app
   ```

4. Build the Solana program:

   ```bash
   cargo build --manifest-path app/programs/src/Cargo.toml
   ```

   The resulting program binary can then be deployed using your usual Anchor or Solana tooling.

5. Build the Docker image. The provided script tags the image as `vanity-addy:latest` by default:

   ```bash
   ./scripts/build-docker.sh
   ```

   Alternatively you may run `docker build -t vanity-addy:latest .` manually.

6. Run the image (requires GPU access):

   ```bash
   docker run --gpus all vanity-addy:latest
   ```

When the container starts it executes `runpod-start.sh` which configures the NVIDIA driver, launches a monitoring script located at `/app/controller/monitor.py` and finally starts the GPU based `vanity` binary located at `/app/src/cuda/vanity`.

## Database configuration

Diesel helpers such as `run_migrations` expect a PostgreSQL connection string.
Set the `DATABASE_URL` environment variable. You can also provide a `.env`
file that includes your database connection and JWT secret values.

## Wipe API authentication

The wipe endpoint (`DELETE /api/compliance/wipe`) expects a JWT in the
`Authorization` header. Tokens are verified using the `JWT_SECRET`
environment variable, so it must be set for authentication to work.

Add both variables to your `.env` file when running locally:

```
DATABASE_URL=postgres://user:password@localhost/dbname
JWT_SECRET=your-secret-value
```

## Helper scripts

The `scripts` directory contains additional helper utilities:

- `deploy.sh` – deploys the Solana program using the Anchor CLI.
- `monitor-cost.sh` – runs the GPU monitoring tool located in `controller/monitor.py`.

Run them with:

```bash
./scripts/deploy.sh        # deploy the program
./scripts/monitor-cost.sh  # start GPU usage logging
```

## How it fits together

- The **Rust program** in `app/programs/src` defines the on-chain instruction `store_wipe_proof`.  It serializes a `WipeProof` struct to the beginning of a Solana account so that a record of the wipe can be stored permanently.
- The **Node scripts** act as a very light API layer and testing harness.  The API route at `app/api/compliance/wipe.ts` calls `initiateWipe`, which would in a full implementation invoke the Solana program above to record the wipe.  The scripts under `compliance/proofs` demonstrate fetching a transaction and rendering a proof document.
- The **Docker setup** packages these pieces together and provides an environment capable of running GPU code.  Building the image copies the repository contents and marks `runpod-start.sh` as the container entry point.  This entry point configures the GPU and executes the external CUDA based vanity address generator alongside the Node utilities.


This repository serves as a minimal demonstration of how Rust on-chain programs, Node.js helpers and a Docker based GPU workflow can be combined for compliance oriented address generation tasks.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

