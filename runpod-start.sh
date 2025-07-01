#!/bin/bash
nvidia-smi -pm 1 || true
nvidia-smi -ac 5001,1410 || true
python app/controller/monitor.py &
./app/src/cuda/vanity --gpus 2
