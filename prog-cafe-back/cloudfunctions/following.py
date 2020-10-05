from flask import jsonify
import redis
import json
import time
url = "redis://h:pf5f69b526f43fa7569fb9feb8eab7d22c5e3d2c202193348e18dece7e40e75ed@ec2-3-216-122-189.compute-1.amazonaws.com:16589"
r = redis.from_url(url)
def follow(request):
    id = json.loads((request.data.decode()))["id"]
    to = json.loads((request.data.decode()))["to"]
    type = json.loads((request.data.decode()))["type"]
    timestamp = time.time()

    # typeがfollowの場合，following DBのidを追加する
    if type == 'follow':
        r.zadd("following:"+str(id), {to:int(timestamp)})
        
    # typeがunfollowの場合，follow DBのidを削除する
    else:
        r.zrem("following:"+str(id), to)
        
    return json.dumps(json.loads('{\"200\":\"succeeded\"}'),ensure_ascii=False)
