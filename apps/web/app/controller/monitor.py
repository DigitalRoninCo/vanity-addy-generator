import time
import os


def main():
    print("Monitor started")
    while True:
        # Simple GPU monitoring using nvidia-smi if available
        os.system('nvidia-smi --query-gpu=utilization.gpu,temperature.gpu --format=csv,noheader')
        time.sleep(5)


if __name__ == "__main__":
    main()
