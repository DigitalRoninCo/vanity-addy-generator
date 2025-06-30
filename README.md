# Vanity Address Generator

This repository contains a minimal implementation of a Solana vanity wallet generator.  A GPU worker searches for matching public keys while a simple API records wipe compliance information and database migrations.  The directories mirror a larger deployment where a backend job manager and smart contract coordinate GPU nodes.

## Prerequisites

- **Node.js** and `npm` for running API utilities.
- **Rust** and `cargo` for building the on-chain programs and running database migrations.
- **PostgreSQL** for the Diesel migrations.
- **Redis** for caching tests.
- **Python 3** for auxiliary scripts.
- An **NVIDIA GPU** with the CUDA toolkit for the `vanity` binary.

## Installation

1. Clone the repository and change into the directory.
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Install Rust dependencies and compile the programs:
   ```bash
   cd solana-vanity-dominator/app/programs/src
   cargo build
   ```
4. Ensure PostgreSQL and Redis are running and accessible from your environment.

## Running the Components

### GPU Vanity Generator

The GPU generator is started using the `runpod-start.sh` script:

```bash
bash solana-vanity-dominator/runpod-start.sh
```

This script configures GPU settings, starts a monitor and then launches the CUDA-based vanity generator binary.

### Compliance API

Under `solana-vanity-dominator/app/api` resides a small Next.js API example for wiping user data. Run the development server using:

```bash
npm run dev
```

### Database Migrations

The Diesel migrations for the Rust program can be applied with:

```bash
cd solana-vanity-dominator/app/programs/src
cargo run --bin run_migrations
```

## Environment Variables

Configuration is done through a `.env` file in the repository root. At minimum, set the connection string for PostgreSQL:

```bash
DATABASE_URL=postgres://USER@localhost/vanitydb
```

Some scripts expect a Solana RPC endpoint, provided via `SOLANA_RPC`:

```bash
export SOLANA_RPC=https://api.mainnet-beta.solana.com
```

Make sure to export or define any additional environment variables required by your local setup before running the components.

### GPU Node Variables

The GPU vanity generator uses the following variables. They can be placed in the `.env` file or exported before starting the worker:

| Variable | Purpose |
|----------|---------|
| `CUDA_VISIBLE_DEVICES` | GPU device IDs to use (e.g. `0,1`) |
| `GRPC_PORT` | Port where the worker exposes its gRPC service |
| `PERSISTENCE_PATH` | Directory for checkpoint files |
| `MAX_SEARCH_TIME` | Max search duration in seconds |
| `CHECKPOINT_INTERVAL` | Autosave interval for checkpoints |
| `SOLANA_KEYGEN_PATH` | Path to `solana-keygen` binary |
| `TEMP_LOG` | File for GPU temperature logs |

