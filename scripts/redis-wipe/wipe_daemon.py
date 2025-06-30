import redis
from cryptography.hazmat.primitives import hashes

def crypto_shred(key: str):
    r = redis.Redis()
    # 1. Overwrite with hash
    r.set(key, hashes.Hash(hashes.SHA256()))
    # 2. Delete
    r.delete(key)
    # 3. Log
    log_wipe(key, method="crypto")
    