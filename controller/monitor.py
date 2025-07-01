 codex/update-runpod-start.sh-paths-and-scripts
import time
import shutil
import subprocess


def monitor():
    while True:
        if shutil.which("nvidia-smi"):
            try:
                out = subprocess.check_output(["nvidia-smi"]).decode()
                print(out)
            except Exception as e:
                print(f"monitor error: {e}")
        else:
            print("monitor: nvidia-smi not found")
        time.sleep(60)


if __name__ == "__main__":
    monitor()
=======
import subprocess
import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')

INTERVAL = 30  # seconds

def log_gpu_stats():
    try:
        out = subprocess.check_output([
            "nvidia-smi",
            "--query-gpu=utilization.gpu,temperature.gpu,memory.used,memory.total",
            "--format=csv,noheader,nounits",
        ])
        logging.info("GPU Stats: %s", out.decode().strip())
    except Exception as exc:
        logging.error("Failed to read GPU stats: %s", exc)


def main():
    logging.info("Starting GPU monitor")
    while True:
        log_gpu_stats()
        time.sleep(INTERVAL)


if __name__ == "__main__":
    main()
 
