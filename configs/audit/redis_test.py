# redis_test.py
from redis import Redis
import time

def test_redis_connection():
    max_retries = 3
    for attempt in range(max_retries):
        try:
            r = redis.Redis(
                host='localhost',
                port=6379,
                db=0,
                socket_connect_timeout=3  # 3 second timeout
            )
            if r.ping():
                print("✅ Redis connection successful!")
                return True
        except redis.ConnectionError as e:
            print(f"⚠️ Attempt {attempt + 1}/{max_retries} failed: {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(1)  # Wait before retrying
    print("❌ Could not connect to Redis after multiple attempts")
    print("\nTroubleshooting steps:")
    print("1. Make sure Redis server is installed (brew install redis)")
    print("2. Start the server (brew services start redis)")
    print("3. Verify it's running (redis-cli ping)")
    return False

if __name__ == "__main__":
    test_redis_connection()