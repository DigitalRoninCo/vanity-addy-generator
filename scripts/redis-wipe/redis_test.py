import redis 
r = redis.Redis(
    host='localhost',
    port=6379,
    db=0
)
print("Redis connection successful!" if r.ping() else "Connection failed")
