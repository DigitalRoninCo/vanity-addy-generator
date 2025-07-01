# Vanity Address Generator

This project provides a proof‑of‑concept GPU vanity address generator. It also includes minimal API code and compliance helpers.

## Prerequisites

- Node.js 18+
- Docker (optional)

## Running with Docker

Build the image and start the container:

```bash
docker build -t vanity-gen .
docker run --rm vanity-gen
```

## Scripts

- `runpod-start.sh` – launches GPU monitoring and the vanity generator
- `scripts/deploy.sh` – placeholder for deployment logic
- `scripts/monitor-cost.sh` – placeholder for cost monitoring

## Testing

Run tests using Node’s built‑in runner:

```bash
npm test
```
