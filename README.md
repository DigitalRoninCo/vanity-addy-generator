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

## Building and running

1. Install Node dependencies (mainly used for the test suite):

   ```bash
   npm install
   ```

   Run the tests using:

   ```bash
   npm test
   ```

2. Build the Solana program:

   ```bash
   cargo build --manifest-path app/programs/src/Cargo.toml
   ```

   The resulting program binary can then be deployed using your usual Anchor or Solana tooling.

3. Build the Docker image. The provided script tags the image as `vanity-addy:latest` by default:

   ```bash
   ./scripts/build-docker.sh
   ```

   Alternatively you may run `docker build -t vanity-addy:latest .` manually.

4. Run the image (requires GPU access):

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

## How it fits together

- The **Rust program** in `app/programs/src` defines the on-chain instruction `store_wipe_proof`.  It serializes a `WipeProof` struct to the beginning of a Solana account so that a record of the wipe can be stored permanently.
- The **Node scripts** act as a very light API layer and testing harness.  The API route at `app/api/compliance/wipe.ts` calls `initiateWipe`, which would in a full implementation invoke the Solana program above to record the wipe.  The scripts under `compliance/proofs` demonstrate fetching a transaction and rendering a proof document.
- The **Docker setup** packages these pieces together and provides an environment capable of running GPU code.  Building the image copies the repository contents and marks `runpod-start.sh` as the container entry point.  This entry point configures the GPU and executes the external CUDA based vanity address generator alongside the Node utilities.


This repository serves as a minimal demonstration of how Rust on-chain programs, Node.js helpers and a Docker based GPU workflow can be combined for compliance oriented address generation tasks.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

