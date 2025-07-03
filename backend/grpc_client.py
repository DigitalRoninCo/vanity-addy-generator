import grpc
import os
import sys

# Add path to the generated gRPC modules located under apps/gpu-node
grpc_module_path = os.path.join(os.path.dirname(__file__), "..", "apps", "gpu-node")
if grpc_module_path not in sys.path:
    sys.path.append(grpc_module_path)

import wallet_pb2
import wallet_pb2_grpc

def generate_wallet_grpc():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = wallet_pb2_grpc.WalletGeneratorStub(channel)
        req = wallet_pb2.VanityRequest(pattern="123")
        res = stub.GenerateWallet(req)
        return res.public_key
