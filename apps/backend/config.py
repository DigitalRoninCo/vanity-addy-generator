from dotenv import load_dotenv
import os
from datetime import datetime
load_dotenv()

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
REDIS_TLS_CA = os.getenv("REDIS_TLS_CA")
REDIS_TLS_CERT = os.getenv("REDIS_TLS_CERT")
REDIS_TLS_KEY = os.getenv("REDIS_TLS_KEY")
GPU_NODE_HOST = os.getenv("GPU_NODE_HOST", "localhost")
GPU_NODE_PORT = int(os.getenv("GPU_NODE_PORT", 50051))
