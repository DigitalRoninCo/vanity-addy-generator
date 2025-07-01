#!/bin/bash
set -e
TAG=${1:-vanity-addy:latest}
# Build the Docker image from the repository root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"
docker build -t "$TAG" .

