#!/bin/bash
# Deploy the on-chain program using Anchor
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROGRAM_DIR="$ROOT_DIR/app/programs"

if ! command -v anchor >/dev/null; then
  echo "anchor CLI not found. Please install Anchor before deploying." >&2
  exit 1
fi

cd "$PROGRAM_DIR"
anchor deploy
