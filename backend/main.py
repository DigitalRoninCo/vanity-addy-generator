from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .submit import router as submit_router
from .status import router as status_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(submit_router, prefix='/api')
app.include_router(status_router, prefix='/api')
