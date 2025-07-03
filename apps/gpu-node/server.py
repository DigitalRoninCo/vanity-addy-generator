import grpc
from concurrent import futures

import wallet_pb2
import wallet_pb2_grpc
from generator import generate_vanity_wallet  #

class WalletGeneratorServicer(wallet_pb2_grpc.WalletGeneratorServicer):
    def GenerateWallet(self, request, context):
        pubkey, secret_key, match = generate_vanity_wallet(
            pattern=request.pattern,
            starts_with=request.starts_with,
            ends_with=request.ends_with,
            case_sensitive=request.case_sensitive
        )
        return wallet_pb2.VanityResponse(
            public_key=pubkey,
            secret_key=secret_key,
            match=match
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=2))
    wallet_pb2_grpc.add_WalletGeneratorServicer_to_server(WalletGeneratorServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("✅ gRPC server running on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
