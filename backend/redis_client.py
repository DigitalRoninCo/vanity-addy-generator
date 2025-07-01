import os
import redis

_redis = None

def get_redis() -> redis.Redis:
    global _redis
    if _redis is None:
        url = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
        _redis = redis.Redis.from_url(url)
    return _redis
