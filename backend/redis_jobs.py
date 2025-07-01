import os
import json
import uuid
from typing import Optional, Tuple, Dict
import redis

# Singleton Redis connection
_redis: Optional[redis.Redis] = None


def get_redis() -> redis.Redis:
    """Return a Redis client, initializing it if necessary."""
    global _redis
    if _redis is None:
        url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
        _redis = redis.Redis.from_url(url, decode_responses=True)
    return _redis


# Constants for keys
JOB_QUEUE = "job_queue"
WORKER_SET = "workers"


def register_worker(worker_id: str) -> None:
    """Register a worker so it can be monitored."""
    r = get_redis()
    r.sadd(WORKER_SET, worker_id)


def submit_job(data: Dict[str, str]) -> str:
    """Create a job, enqueue it and return its id."""
    job_id = str(uuid.uuid4())
    r = get_redis()
    key = f"job:{job_id}"
    job_data = {"status": "queued", **data}
    r.hset(key, mapping=job_data)
    r.rpush(JOB_QUEUE, job_id)
    return job_id


def get_job(job_id: str) -> Optional[Dict[str, str]]:
    """Fetch the stored job metadata."""
    r = get_redis()
    key = f"job:{job_id}"
    if not r.exists(key):
        return None
    return r.hgetall(key)


def fetch_next_job(timeout: int = 0) -> Optional[Tuple[str, Dict[str, str]]]:
    """Pop the next job from the queue, marking it in progress."""
    r = get_redis()
    result = r.blpop(JOB_QUEUE, timeout=timeout)
    if not result:
        return None
    _, job_id = result
    key = f"job:{job_id}"
    job_data = r.hgetall(key)
    r.hset(key, "status", "in_progress")
    return job_id, job_data


def store_result(job_id: str, result: Dict[str, str]) -> None:
    """Store the result for a job and mark it complete."""
    r = get_redis()
    key = f"job:{job_id}"
    r.hset(key, mapping={"status": "complete", "result": json.dumps(result)})


def get_status(job_id: str) -> Optional[str]:
    """Return the status string for a job."""
    r = get_redis()
    key = f"job:{job_id}"
    if not r.exists(key):
        return None
    return r.hget(key, "status")
