from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from redis import enqueue_job, get_job_status
from .grpc_client import generate_wallet_grpc
import grpc


app = FastAPI()

# Allow cross-origin requests like the standalone backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
async def generate(
    pattern: str,
    starts_with: str = "",
    ends_with: str = "",
    case_sensitive: bool = True,
):
    """Generate a wallet address via gRPC and handle errors."""
    try:
        result = generate_wallet_grpc(pattern, starts_with, ends_with, case_sensitive)
        return result
    except grpc.RpcError:
        raise HTTPException(status_code=500, detail="wallet generation failed")
    except Exception:
        raise HTTPException(status_code=500, detail="wallet generation failed")

wallet = generate_wallet_grpc(starts_with="SoL")
print(wallet)
