#!/bin/bash
# Start the GPU monitoring helper
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

python3 "$ROOT_DIR/controller/monitor.py"
