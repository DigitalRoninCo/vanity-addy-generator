# Vanity Addy Generator

This repository contains a containerized environment for experimenting with GPU based vanity address generation. The generator itself is a placeholder but the project demonstrates how to run supporting scripts inside a container or in a GPU enabled host.

## Project Purpose

`vanity-addy-generator` was designed as a starting point for building a service that can search for custom cryptocurrency addresses. It includes minimal TypeScript and Rust code as placeholders along with a Dockerfile and helper scripts.

## Prerequisites

- **Docker** for building and running the container
- A machine with NVIDIA GPUs (if running `runpod-start.sh`)
- Optional: **Node.js** v18 if you plan to run the Node environment outside of Docker

## Setup

1. Clone the repository.
2. Build the Docker image:
   ```bash
   docker build -t vanity-addy-generator .
   ```
3. Run the container (add `--gpus all` if you want GPU access):
   ```bash
   docker run --rm vanity-addy-generator
   ```

The Dockerfile installs Node dependencies and launches the `npm start` command when the container starts.

## Available Scripts

- **`runpod-start.sh`** – Sets GPU persistence mode and frequency, starts a Python monitor, and then launches the CUDA vanity solver with two GPUs. The script is useful for running on GPU-hosting providers.
- **`scripts/deploy.sh`** – Placeholder for deployment logic. Currently empty.
- **`scripts/monitor-cost.sh`** – Placeholder for cost monitoring scripts.

## Running the Vanity Address Generator

The current code base does not include a finished generator. The `runpod-start.sh` script shows how it could be invoked once the binary `/app/src/cuda/vanity` is available. Modify that script to point to your actual generator binary.

## License

This project is provided as-is with no warranty. Feel free to modify it to suit your needs.
