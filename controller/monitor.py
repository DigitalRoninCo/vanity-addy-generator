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
