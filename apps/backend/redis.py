import redis
import uuid
import json
import ssl
import os

from config import REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_TLS_CA

def get_redis_client():
    context = ssl.create_default_context(cafile=os.getenv("REDIS_TLS_CA", "redis_ca.pem"))
    context.check_hostname = False
    context.verify_mode = ssl.CERT_REQUIRED

    return redis.Redis(
        host=os.getenv("REDIS_HOST"),
        port=int(os.getenv("REDIS_PORT", 6379)),
        password=os.getenv("REDIS_PASSWORD"),
        ssl=True,
        ssl_cert_reqs='required',
        ssl_ca_certs=os.getenv("REDIS_TLS_CA"),
        ssl_context=context
    )

def enqueue_job(job: dict) -> str:
    r = get_redis_client()
    job_id = str(uuid.uuid4())
    r.set(f"job:{job_id}", json.dumps({"status": "queued", **job}), ex=3600)
    return job_id

def get_job_status(job_id: str) -> dict:
    r = get_redis_client()
    raw = r.get(f"job:{job_id}")
    if raw:
        return json.loads(raw)
    return {"status": "not_found"}
