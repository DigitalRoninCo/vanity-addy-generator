from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from grpc_client import generate_wallet_grpc
from .submit import router as submit_router
from .status import router as status_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(submit_router)
app.include_router(status_router)

@app.get("/")
def root():
    return {"status": "OK"}
