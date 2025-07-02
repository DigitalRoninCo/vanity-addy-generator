from fastapi import FastAPI
from pydantic import BaseModel
from redis import enqueue_job, get_job_status
from .grpc_client import generate_wallet_grpc


app = FastAPI()

class SubmitJob(BaseModel):
    pattern: str
    tier: str
    wallet: str

@app.post("/submit")
async def submit(job: SubmitJob):
    job_id = enqueue_job(job.dict())
    return {"status": "queued", "job_id": job_id}

@app.get("/status/{job_id}")
async def status(job_id: str):
    status = get_job_status(job_id)
    return {"job_id": job_id, "status": status}

@app.post("/generate")
async def generate(pattern: str, starts_with: str = "", ends_with: str = "", case_sensitive: bool = True):
    result = generate_wallet_grpc(pattern, starts_with, ends_with, case_sensitive)
    return result   

wallet = generate_wallet_grpc(starts_with="SoL")
print(wallet)
