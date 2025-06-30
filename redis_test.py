import redis

r = redis.Redis(
    host='localhost',
    port=6379,
    db=0
)

print(r.ping())  # Should print "True" if working
python3 redis_test.py

