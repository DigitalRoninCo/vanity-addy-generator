# Vanity Address Generator

This repository contains GPU-based tools for generating vanity addresses.

## Building the Docker Image

Use the provided script to build the Docker image. The script takes an optional tag name (defaults to `vanity-addy:latest`).

```bash
./scripts/build-docker.sh [custom-tag]
```

The resulting image runs `runpod-start.sh` on container startup.

