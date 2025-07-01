# AGENTS.md

## 🔹 Agent: Solana Vanity Wallet Generator (RunPod GPU Node)

This agent performs fast, GPU-accelerated vanity wallet generation for the Solana blockchain. It is triggered by a smart contract payment and orchestrated by a backend job manager. Spot instance cost efficiency is maximized using idle-time shutdown.

---

## 📦 Directory Role Overview

### `frontend/` (Next.js + Vercel)
- User UI
- Connects Phantom wallet
- Submits vanity pattern + wallet address
- Polls backend for generation status

### `backend/` (FastAPI + Redis + Render)
- Exposes `/submit` and `/status/:id`
- Polls Solana smart contract escrow
- Triggers RunPod GPU job via gRPC or webhook
- Manages job metadata via Redis

### `gpu-node/` (RunPod + PyTorch + gRPC)
- Bootstrapped using `setup.sh`
- Starts `server.py` (gRPC: `VanityRequest -> VanityResult`)
- Performs GPU brute-force for matching wallet
- Sends result back to backend
- Auto-exits after idle timeout to save spot cost

### `solana-program/` (Anchor smart contract)
- Handles escrow locking + fund validation
- Validates trigger wallet + pattern params
- Distributes SOL:
  - 50% to DEV wallet
  - 30% to Treasury
  - 20% to Investors

---

## 🧠 Agent Responsibilities (gpu-node)

1. Waits for `VanityRequest` via gRPC
2. Starts GPU brute-force generation
3. Periodically auto-saves progress to `PERSISTENCE_PATH`
4. Sends back:
   - `pubkey`
   - `mnemonic`
   - `difficulty`, `speed`, etc.
5. Exits on:
   - Completion
   - Idle timeout (`MAX_SEARCH_TIME`)

---

## 🔐 Required Environment Variables

| Key                   | Description                             |
|------------------------|-----------------------------------------|
| `CUDA_VISIBLE_DEVICES` | GPU devices (e.g. `0,1`)                |
| `GRPC_PORT`            | gRPC server port                        |
| `PERSISTENCE_PATH`     | Path for progress checkpointing         |
| `MAX_SEARCH_TIME`      | Timeout in seconds                      |
| `CHECKPOINT_INTERVAL`  | Autosave interval                       |
| `SOLANA_KEYGEN_PATH`   | Path to `solana-keygen` binary          |
| `TEMP_LOG`             | GPU temperature log output              |

---

## ⚙️ Trigger Conditions

- User submits pattern via UI
- Backend confirms escrow payment on-chain
- GPU node boots via RunPod API
- gRPC server receives pattern to search

---

## 📁 Deployment Targets

| Layer         | Host        |
|---------------|-------------|
| Frontend      | Vercel      |
| Backend       | Render      |
| GPU Worker    | RunPod      |
| Smart Contract| Solana Devnet/Mainnet |

---

## 🧪 Testing

- Unit test GPU `generator.py` with mock pattern
- Use Anchor test suite to validate `release_escrow`
- Ensure idle shutdown logs to `TEMP_LOG`

---

## ✅ Completion Signals

- Result JSON sent to Redis/backend
- Smart contract `release_escrow` called
- Job marked complete

---

> Organization: **eoninco**
> Maintainer: `@eoninco`
> Repo: [github.com/eoninco/vanity-addy-generator](https://github.com/eoninco/vanity-addy-generator)

