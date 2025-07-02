from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import grpc
import wallet_pb2
import wallet_pb2_grpc
from backend.redis import get_status

app = FastAPI()

class SubmitRequest(BaseModel):
    pattern: str = ""
    starts_with: str = ""
    ends_with: str = ""
    case_sensitive: bool = True

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
def submit_job(req: SubmitRequest):
    try:
        with grpc.insecure_channel("localhost:50051") as channel:
            stub = wallet_pb2_grpc.WalletGeneratorStub(channel)
            request = wallet_pb2.VanityRequest(
                pattern=req.pattern,
                starts_with=req.starts_with,
                ends_with=req.ends_with,
                case_sensitive=req.case_sensitive
            )
            response = stub.GenerateWallet(request)
            return {
                "public_key": response.public_key,
                "secret_key": response.secret_key,
                "match": response.match
            }
    except grpc.RpcError as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/status/{job_id}")
def check_status(job_id: str):
    # Check Redis for job status
    result = get_status(job_id)
    return {"job_id": job_id, "status": result or "pending"}
