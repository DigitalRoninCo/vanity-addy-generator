import grpc
import wallet_pb2
import wallet_pb2_grpc

def generate_wallet_grpc():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = wallet_pb2_grpc.WalletGeneratorStub(channel)
        req = wallet_pb2.VanityRequest(pattern="123")
        res = stub.GenerateWallet(req)
        return res.public_key
