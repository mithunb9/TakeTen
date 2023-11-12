import redis
from dotenv import load_dotenv
import os

load_dotenv()
r = None

r = redis.Redis(
host=os.getenv('REDIS_HOST'),
port=os.getenv('REDIS_PORT'),
password=os.getenv('REDIS_PASSWORD'))

def set_db(key, value):
  try:
    r.set(key, value)
    return True
  except:
    return False

def get_db(key):
  return r.get(key)