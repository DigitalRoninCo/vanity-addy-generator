#!/usr/bin/env python3
import subprocess

def main():
    print("Monitoring GPU...")
    subprocess.run(["nvidia-smi"])

if __name__ == "__main__":
    main()
