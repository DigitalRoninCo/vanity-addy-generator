# backend/grpc_client.py

import grpc
import os
from config import settings  # ensure this loads GPU_NODE_HOST + PORT

import wallet_pb2
import wallet_pb2_grpc


def generate_wallet_grpc(pattern="", starts_with="", ends_with="", case_sensitive=True):
    gpu_host = settings.GPU_NODE_HOST
    gpu_port = settings.GPU_NODE_PORT

    with grpc.insecure_channel(f"{gpu_host}:{gpu_port}") as channel:
        stub = wallet_pb2_grpc.WalletGeneratorStub(channel)
        request = wallet_pb2.VanityRequest(
            pattern=pattern,
            starts_with=starts_with,
            ends_with=ends_with,
            case_sensitive=case_sensitive,
        )
        response = stub.GenerateWallet(request)

    return {
        "public_key": response.public_key,
        "secret_key": response.secret_key,
        "match": response.match,
    }
