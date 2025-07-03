from fastapi import APIRouter
from pydantic import BaseModel
from .redis_jobs import submit_job

router = APIRouter()

class SubmitRequest(BaseModel):
    pattern: str
    tier: str
    address: str

@router.post('/vanity/submit')
def submit(req: SubmitRequest):
    job_id = submit_job({
        'pattern': req.pattern,
        'tier': req.tier,
        'address': req.address,
    })
    return {'job_id': job_id}
