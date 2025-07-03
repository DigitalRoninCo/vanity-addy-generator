#!/bin/bash
set -e

if command -v nvidia-smi >/dev/null 2>&1; then
  nvidia-smi -pm 1 || true
  nvidia-smi -ac 5001,1410 || true
else
  echo "nvidia-smi not found; running in CPU mode" >&2
fi

python controller/monitor.py &
exec ./src/cuda/vanity --gpus 2

