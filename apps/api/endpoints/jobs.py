from fastapi import APIRouter
from ..dependencies import RedisClient

router = APIRouter()
redis = RedisClient()

@router.post("/submit")
async def submit_job(pattern: str):
    job_id = redis.enqueue({
        "pattern": pattern,
        "status": "queued"
    })
    return {"job_id": job_id}