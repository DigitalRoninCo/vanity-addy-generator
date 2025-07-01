#!/bin/bash
set -e
nvidia-smi -pm 1
nvidia-smi -ac 5001,1410
python controller/monitor.py &
./src/cuda/vanity --gpus 2

