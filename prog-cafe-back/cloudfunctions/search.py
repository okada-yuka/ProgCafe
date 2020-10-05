from flask import Flask, request,jsonify
import redis
import json
app = Flask(__name__) 
url="redis://h:pf5f69b526f43fa7569fb9feb8eab7d22c5e3d2c202193348e18dece7e40e75ed@ec2-3-216-122-189.compute-1.amazonaws.com:16589"
r = redis.from_url(url)

#localhostで動作確認
@app.route("/")
def index():
    return "Hello Flask!"







@app.route("/search", methods=["GET"])  #追加
def search():
    #requestパラメータの取得
    query=request.args.get('q') 
    u_id=request.args.get('userId') 

    #DBから一致id取得
    idlist= r.keys('user:'+query+'*')[:30]
    #infoを取得しながらjson整形
    ret_str='{'
    n=len(idlist)
    for id_ in idlist:
        info_dic=r.hgetall(id_)
        #check follow
        decodec_id=id_[5:].decode()
        following_list = r.zrange('following:'+u_id,0,-1)
        following_list = [f.decode() for f in following_list]
        n=n-1
        if(not(str(decodec_id) == str(u_id))):
            ret_str+='\"'+id_[5:].decode()+'\"'+':{'
            ret_str+='\"name\":\"'
            ret_str+=str(info_dic[b'name'].decode())
            ret_str+='\",'
            ret_str+='\"rank\":\"'
            ret_str+=str(info_dic[b'rank'].decode())
            ret_str+='\",'
            ret_str+='\"skills\":[\"'
            ret_str+=str(info_dic[b'skills'].decode().replace(",","\",\""))
            ret_str+='\"],'
            ret_str+='\"login_time\":\"'
            ret_str+=str(info_dic[b'login_time'].decode())
            ret_str+='\",'
            ret_str+='\"online\":'
            ret_str+=str(info_dic[b'online'].decode())
            ret_str+=','
            ret_str+='\"following\":'
            print()
            print(decodec_id)
            print(following_list)
            print()
            if(decodec_id in following_list):
                ret_str+='true'
            else:
                ret_str+='false'
            ret_str+='}'

            if(n is not 0):
                ret_str+=','
    ret_str+='}'
    print(ret_str)
    return  json.dumps(json.loads(ret_str),ensure_ascii=False)

if __name__ == "__main__":
    # webサーバー立ち上げ
    app.run()




