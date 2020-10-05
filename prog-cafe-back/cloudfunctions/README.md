# APIの開発(cloudfuctions)
# Turtorial
## 作るもの
具体的には以下の機能。構成図は[muralを参照](https://app.mural.co/t/cterm0588/m/cterm0588/1599715783618/e3731d3a23322a44e6d018096215194582425247)
- get user info
- search (田中開発)
- follow / unfollow


## 環境構築
- venvの導入(デフォルトのpythonのライブラリに影響しないように)
```bash
cd ~/Desktop
python -m venv venv 
source ./venv/bin/activcate
#deactivate　でvenv環境を抜ける

#venvの元でのpipはactivateの時のみ使用可能
(venv)[user@macOS]$ pip install redis
(venv)[user@macOS]$ python3
>>>import redis

#とか
(venv)[user@macOS]$ python3 hogehoge.py
```


## redisのお話
### redisとは
- NoSQLなDB
- keyーvalue型
- オンメモリなDB(バックアップ取らないと揮発)
アクセス方法はいっぱいあるが、とりあえずpythonの動作だけ確認。
pythonのサンプルコード
```Python
import redis

#dbに接続
 url="redis://h:pf5f69b526f43fa7569fb9feb8eab7d22c5e3d2c202193348e18dece7e40e75ed@ec2-3-216-122-189.compute-1.amazonaws.com:16589"
 r = redis.from_url(url)

#string型のvalueをset
r.set('hoge','fuga')

#keyからvalueを取得
print(r.get('hoge'))
"""
b'fuga'
"""



#keyに{userid}を含めたい場合、hoge:{userId}というkeyを保存
userid='wakuwaku'
r.set('hoge'+':'+userid,'21')

userid='iraira'
r.set('hoge'+':'+userid,'18')

#条件位一致するキー(ex.ユーザ一覧)はこうやって書くことも可能
#*は正規表現のワイルドカード。hoge:からはじまるキーを取得。
for key in r.keys('hoge:*'):#一致したキーをリストに
    print(r.get(key))#キーからvalueを取得
"""
b'18'
b'21'
"""



#*はどこでも使える
print(r.keys('hoge:*ku'))
"""
[b'hoge:wakuwaku']
"""
#全キー取得
print(r.keys('*'))
"""
[b'hoge:wakuwaku',b'hoge:iraira']
"""
#指定したキーの削除
r.delete('hoge:wakuwaku')

#キー全削除
r.flushdb()
print(r.keys('*'))
"""
[]
"""
```
- string型(上記例)
  
  key value

- ソート済セット型
  
  key int value
  ```Python
  #追加
  r.zadd("key0",{"wakuwaku":100})
  #削除
  r.delete("key0")
  #intを昇順に10件取得(10を-1にすると全て)
  r.zrange('b',0,10)
  #intを降順に全て取得
  r.zrange('b',0,-1,desc=True)

  #intを降順に全て取得。出力にint（正式名称はscoreらしい）も表示
  r.zrange('b',0,-1,desc=True,withscores=True)

  #他はredis python sorted setとかで調べると出てくる
  ```


- Hash型

  key field value ,field value ,field value ,... 
  ```Python
  #追加
  r.hmset("key1",  {"name":"koki","gender":"male","use":"c++"})
  #削除
  r.delete("key1")

  #取得
  r.hgetall("key1")
  """
  {b'1': b'The C Programming Language', b'2': b'The UNIX Programming Environment', b'name': b'koki', b'gender': b'male', b'use': b'c++'}
  """

  #他はredis python hashとかで調べると出てくる
  ```


## flaskのお話
デコレータと関数でエンドポイントの動作を記述
```Python
from flask import Flask, request,jsonify

app = Flask(__name__) 

#localhostで動作確認
@app.route("/")
def index():
    return "Hello Flask!"


@app.route("/response", methods=["GET"])  #追加
def response():
    #requestパラメータの取得
    message=request.args.get('message') 

    #json形式で返答
    return  jsonify(
        hoge="hoo",
        message=message,
        id=123
    )

if __name__ == "__main__":
    # webサーバー立ち上げ
    app.run()

```



# deploy
## Cloudfunctionsのお話
### cloudfunctionとは？
- httpリクエストなどで関数を実行してくれる。(＝サーバーの構成などを深く考えなくて良い。)
- python3.7なら、flask.requestを使用。
- 無料枠：関数呼び出し回数　2000,000回/月 まで

1. console.cloud.google.com　でprogcafeプロジェクトを選択し、左上メニューバーからCloudFunctionsに移動
1. 関数を作成→`function name`を指定
1. TriggerはHTTP
1. allow unahtorized invocateを選択、save、next
1. `Python3.7`を選択して`Entry_point`に実行関数名前を指定
1. `requiremnts.txt`に必要なモジュール(`flask,redis`)を記入、コードないでimport
1. cloudfunctionsでは初期は以下のような関数が定義されており
    ```Python
    def hello_world(request):
        """Responds to any HTTP request.
        Args:
            request (flask.Request): HTTP request object.
        Returns:
            The response text or any set of values that can     be turned into a
            Response object using
            `make_response <http://flask.pocoo.org/docs/1.0/    api/#flask.Flask.make_response>`.
        """
        request_json = request.get_json()
        if request.args and 'message' in request.args:
            return request.args.get('message')
        elif request_json and 'message' in request_json:
            return request_json['message']
        else:
            return f'Hello World!'
    ```
    この関数を以下のように書き換える。
    ```Python
    from flask import jsonify
    def response(request):
        #requestパラメータの取得
        message=request.args.get('message') 

        #json形式で返答
        return  jsonify(
            hoge="hoo",
            message=message,
            id=123
        )
    ```
1. deployボタンを押す
1. `{URL}?message=koki`にアクセスすると`{"hoge":"hoo","id":123,"message":"koki"}`と表示

# 開発
**注意：idはpython組み込み関数として登録されてるから使えない。**
- `search (田中開発)`を参考に`get user info`と`follow / unfollow`を開発願います。
- リクエストっメソッドは`GET`ではなく`POST`となります。
- 異常系のエラー

    情報が足りない場合は足りないことを返答したら、フロントにありがたがられるかな。
- 動作確認コマンド
    - `initialization.py`を実行すると、30人程度のユーザがいる状態にDBが初期化されます。データの詳細はdbアクセスもしくはコードを確認してください。
    - search:
        ```
        curl {url} -X POST -H "Content-Type: application/json" -d '{"id":"gojiteji", "start":"0","end":"20"}'
        ```

    - get user info
        ```
        curl {url} -X POST -H "Content-Type: application/json" -d '{"id":"gojiteji", "show_folllow":"true"}'
        ```
    - follow:
        ```
        curl {url} -X POST -H "Content-Type: application/json" -d '{"id":"gojiteji", "show_folllow":"true"}'
        ```


    正常に処理された場合、レスポンスとして`aaa`が得られるはず。。
