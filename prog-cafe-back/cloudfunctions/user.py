from flask import Flask, request,jsonify
import redis
import json


app = Flask(__name__) 
#dbに接続
url="redis://h:pf5f69b526f43fa7569fb9feb8eab7d22c5e3d2c202193348e18dece7e40e75ed@ec2-3-216-122-189.compute-1.amazonaws.com:16589"
r = redis.from_url(url)
bs='\"' # " 


@app.route("/")
def index():
    return "Hello Flask!"


@app.route("/user", methods=["POST"])  
def user():
	userid=json.loads((request.data.decode()))["id"]
	to=json.loads((request.data.decode()))["to"]
	show_follow=json.loads((request.data.decode()))["show_follow"]

	
	user=r.hgetall("user:"+to)
	myfollowing_list = r.zrange('following:'+to,0,-1)
	myfollowing_list = [f.decode() for f in myfollowing_list]
	
	following_list = r.zrange('following:'+to,0,-1)
	following_list = [f.decode() for f in following_list]
	jsonstr='{'
	for i in user:
		if(i.decode()=="skills"):
			jsonstr+=bs+i.decode()+bs+':'
			jsonstr+='[\"'+r.hget("user:"+to,i.decode()).decode().replace(",","\",\"")+'\"]'
			jsonstr+=","
		elif(i.decode()=="online"):
			jsonstr+=bs+i.decode()+bs+':'
			jsonstr+=r.hget("user:"+to,i.decode()).decode()
			jsonstr+=","
		else:
			jsonstr+=bs+i.decode()+bs+':'
			jsonstr+=bs+r.hget("user:"+to,i.decode()).decode()+bs
			jsonstr+=","			
		
	jsonstr+=bs+"following"+bs+":"
	if(userid in myfollowing_list):
		jsonstr+="true"
	else:
		jsonstr+="false"
	
	if(show_follow==True):
		following_list=str(following_list).replace("'",'"')
		print(following_list)
		jsonstr+=","
		jsonstr+=bs+"following_list"+bs+":"
		jsonstr+=following_list
	jsonstr+="}"
	
	return  json.dumps(json.loads(jsonstr),ensure_ascii=False)


if __name__ == "__main__":
    # webサーバー立ち上げ
    app.run()