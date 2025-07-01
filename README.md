# Solana Vanity Address Generator

## Project Overview

This repository contains a small demonstration of GPU‑accelerated vanity address generation on the Solana blockchain. A backend service coordinates a GPU worker and smart contract escrow so that users can request custom prefixes for their public keys. The project also illustrates a simple compliance API and basic database migrations.

## Repository Structure

- `frontend/` – Next.js interface for users
- `backend/` – FastAPI service orchestrating requests
- `gpu-node/` – RunPod worker that performs the brute‑force search
- `solana-program/` – Anchor smart contract handling escrow logic
- `scripts/` – utility helpers and wipe compliance examples

## Prerequisites

- **Node.js** and `npm`
- **Rust** and the `cargo` build tool
- **PostgreSQL** for Diesel migrations
- **Redis** for temporary data
- **Python 3** for helper scripts
- An **NVIDIA GPU** with the CUDA toolkit

## Installation

1. Clone this repository and change into the directory.
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Build the on-chain programs:
   ```bash
   cd solana-vanity-dominator/app/programs/src
   cargo build
   ```
4. Ensure PostgreSQL and Redis are running locally.

## Running the Components

### GPU Worker

Launch the GPU worker using the provided script:

```bash
bash solana-vanity-dominator/runpod-start.sh
```

### Backend API

The backend is a small FastAPI service. Start it with your preferred process manager after installing any required packages.

### Frontend

The user interface lives in the `frontend` folder. Start the development server with:

```bash
npm run dev
```

### Database Migrations

Apply the Diesel migrations via the provided binary:

```bash
cd solana-vanity-dominator/app/programs/src
cargo run --bin run_migrations
```

## Environment Variables

Create a `.env` file at the repository root. The minimum settings are:

```bash
DATABASE_URL=postgres://USER@localhost/vanitydb
SOLANA_RPC=https://api.mainnet-beta.solana.com
```

### GPU Node Variables

Set these variables before launching the GPU worker:

| Variable | Purpose |
|----------|---------|
| `CUDA_VISIBLE_DEVICES` | GPU device IDs to use (e.g. `0,1`) |
| `GRPC_PORT` | gRPC server port |
| `PERSISTENCE_PATH` | Directory for checkpoint files |
| `MAX_SEARCH_TIME` | Timeout in seconds |
| `CHECKPOINT_INTERVAL` | Autosave interval |
| `SOLANA_KEYGEN_PATH` | Path to `solana-keygen` |
| `TEMP_LOG` | GPU temperature log |
