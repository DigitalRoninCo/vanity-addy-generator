# backend/redis.py
import redis
import os
import ssl
import json

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
REDIS_USE_TLS = os.getenv("REDIS_USE_TLS", "false").lower() == "true"
REDIS_CA_CERT = os.getenv("REDIS_CA_CERT")
REDIS_DB = int(os.getenv("REDIS_DB", 0))

ssl_opts = None
if REDIS_USE_TLS:
    ssl_opts = {
        "ssl": True,
        "ssl_ca_certs": REDIS_CA_CERT
    }

r = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    db=REDIS_DB,
    decode_responses=True,
    **(ssl_opts if ssl_opts else {})
)

def submit_job(job_id: str, pattern: str, ttl_seconds: int = 600):
    r.setex(f"job:{job_id}", ttl_seconds, json.dumps({"pattern": pattern}))
    r.set(f"status:{job_id}", "in_progress")

def get_job(job_id: str) -> dict:
    raw = r.get(f"job:{job_id}")
    return json.loads(raw) if raw else None

def store_result(job_id: str, address: str):
    r.set(f"result:{job_id}", address)
    r.set(f"status:{job_id}", "done")

def get_result(job_id: str) -> str:
    return r.get(f"result:{job_id}")

def get_status(job_id: str) -> str:
    return r.get(f"status:{job_id}")

def register_worker(worker_url: str):
    r.sadd("workers", worker_url)
    r.set(f"worker:{worker_url}", "alive", ex=60)

def get_workers() -> list:
    return list(r.smembers("workers"))

def expire_job(job_id: str):
    r.delete(f"job:{job_id}", f"result:{job_id}", f"status:{job_id}")
