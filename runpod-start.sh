#!/bin/bash
nvidia-smi -pm 1
nvidia-smi -ac 5001,1410
python /app/controller/monitor.py &
/app/src/cuda/vanity --gpus 2
