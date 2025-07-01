from fastapi import APIRouter, HTTPException
from .redis_client import get_redis

router = APIRouter()

@router.get('/vanity/status/{job_id}')
def status(job_id: str):
    r = get_redis()
    if not r.exists(job_id):
        raise HTTPException(status_code=404, detail='Job not found')
    return {k.decode(): v.decode() for k, v in r.hgetall(job_id).items()}
