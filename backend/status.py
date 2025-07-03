from fastapi import APIRouter, HTTPException
from .redis_jobs import get_job

router = APIRouter()

@router.get('/vanity/status/{job_id}')
def status(job_id: str):
    data = get_job(job_id)
    if data is None:
        raise HTTPException(status_code=404, detail='Job not found')
    return data
