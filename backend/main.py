from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from grpc_client import generate_wallet_grpc
from redis import redis_conn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "OK"}

@app.post("/submit")
def submit_job():
    # Example only
    return {"job_id": "abc123"}

@app.get("/status/{job_id}")
def check_status(job_id: str):
    # Check Redis for job status
    result = redis_conn.get(job_id)
    return {"job_id": job_id, "status": result or "pending"}
