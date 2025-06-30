#!/bin/bash
set -e  # Exit on error

echo "=== [1/5] Updating System & Installing CUDA Toolkit ==="
sudo apt update && sudo apt install -y nvidia-cuda-toolkit

echo "=== [2/5] Installing Python Dependencies ==="
pip install -U pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install grpcio grpcio-tools python-dotenv

echo "=== [3/5] Setting up Swap Memory (32GB) ==="
sudo fallocate -l 32G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

echo "=== [4/5] Setting up Solana CLI ==="
sh -c "$(curl -sSfL https://release.solana.com/v1.17.3/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
which solana || echo "Solana CLI not found in PATH!"

echo "=== [5/5] Starting GPU Temperature Monitor (background) ==="
nohup watch -n 1 nvidia-smi -q -d temperature > /workspace/gpu_temp.log &
