from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json
import grpc
import wallet_pb2
import wallet_pb2_grpc


from grpc_client import generate_wallet_grpc
from redis import redis_conn
from backend.metrics import costs

from .redis_jobs import get_job, get_redis

from backend.redis import get_status


from .grpc_client import generate_wallet_grpc
from . import redis as redis_conn


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

app.include_router(costs.router)

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

    data = get_job(job_id)
    if data is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return data


@app.websocket("/ws/status/{job_id}")
async def ws_status(websocket: WebSocket, job_id: str):
    await websocket.accept()
    r = get_redis()
    pubsub = r.pubsub()
    channel = f"progress:{job_id}"
    pubsub.subscribe(channel)
    job = get_job(job_id)
    if job:
        await websocket.send_text(json.dumps({"status": job.get("status"), "progress": float(job.get("progress", 0))}))
    try:
        while True:
            message = pubsub.get_message(ignore_subscribe_messages=True, timeout=1)
            if message and message.get("type") == "message":
                await websocket.send_text(message["data"])
            await asyncio.sleep(0.1)
    except WebSocketDisconnect:
        pass
    finally:
        pubsub.close()

    # Check Redis for job status
    result = get_status(job_id)
    return {"job_id": job_id, "status": result or "pending"}
>>>
