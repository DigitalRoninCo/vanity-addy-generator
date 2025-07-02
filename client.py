import grpc
import time
import wallet_pb2
import wallet_pb2_grpc

def connect_with_retry(address, retries=5, delay=1):
    for attempt in range(retries):
        try:
            channel = grpc.insecure_channel(address)
            grpc.channel_ready_future(channel).result(timeout=2)
            return channel
        except Exception:
            print(f"Retrying connection ({attempt+1}/{retries})...")
            time.sleep(delay)
    raise ConnectionError("❌ Could not connect to gRPC server.")

def run():
    channel = connect_with_retry("localhost:50051")
    stub = wallet_pb2_grpc.WalletGeneratorStub(channel)

    request = wallet_pb2.VanityRequest(
        pattern="",
        starts_with="eon",
        ends_with="co",
        case_sensitive=True
    )
    response = stub.GenerateWallet(request)
    print("✅ Public Key:", response.public_key)
    print("🔐 Secret Key:", response.secret_key)

if __name__ == "__main__":
    run()
