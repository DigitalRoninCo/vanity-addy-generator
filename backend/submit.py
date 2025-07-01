from fastapi import APIRouter
from pydantic import BaseModel
import uuid
from .redis_client import get_redis

router = APIRouter()

class SubmitRequest(BaseModel):
    pattern: str
    tier: str
    address: str

@router.post('/vanity/submit')
def submit(req: SubmitRequest):
    job_id = str(uuid.uuid4())
    r = get_redis()
    r.hset(job_id, mapping={'status': 'queued'})
    return {'job_id': job_id}
