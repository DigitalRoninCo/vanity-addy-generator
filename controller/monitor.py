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
