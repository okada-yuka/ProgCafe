import slackweb
import redis
import time
import warnings
warnings.simplefilter('ignore')
user_num=30
#dbに接続
url="redis://h:pf5f69b526f43fa7569fb9feb8eab7d22c5e3d2c202193348e18dece7e40e75ed@ec2-3-216-122-189.compute-1.amazonaws.com:16589"
r = redis.from_url(url)

#slack用
slack = slackweb.Slack(url="https://hooks.slack.com/services/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")
slack.notify(text="DB Initialization Begin")

#キー全削除
r.flushdb()
print('Data Base Initialized.')


class User:
    def __init__(self,name,rank,skills,login_time,icon_image,online):                  # コンストラクタ
        self.name =name
        self.rank =rank
        self.skills =skills
        self.login_time =login_time
        self.icon_image =icon_image
        self.online =online
idlist=['suga','kato','aso','kajiyama','koizumi','okonogi','kono','sakamoto','nishimura','hirai','hashimoto','inoue','ikami','yoshihide','katsunobu','taro','hiroshi','shinjiro','hachiro','jiro','tetsushi','yasutoshi','takuya','seiko','nobuharu','saburo','shiro','goro','rokuro','shichiro']
namelist=['suga jun','kato jin','aso ki','kajiyama taro','koizumi taro','okonogi jiro','kono jiro','sakamoto  nobuo','nishimura nobuo','hirai nobuo','hashimoto ken','inoue ken','ikami ken','ito yoshihide','ito katsunobu','ito taro','ito hiroshi','ando shinjiro','ando hachiro','hayashi jiro','hayashi tetsushi','murakami yasutoshi','murakami takuya','saito seiko','saito nobuharu','date saburo','oda shiro','kamata goro','domoto rokuro','inoue shichiro']

ranklist=['カリホルニウム','オスミウム','ロジウム','ダイヤモンド','プラチナ','ゴールド','シルバー','ブロンズ','鉄','くず鉄','石','砂利','砂','ロジウム','ダイヤモンド','プラチナ','ゴールド','シルバー','ブロンズ','鉄','くず鉄','石','砂利','砂','ブロンズ','鉄','くず鉄','石','砂利','砂']
skillslist=['c++,python,php','bash,go,php','c,python,php','java,python,php','brainfuck,python,js','TS,python,JS','MySQL,python,go','c++,python,redis','c++,python,php','C#,python,php','c,c++,c#','basic,rust,php','c++,python,php','c++,python,php','Shell,python,php','binary,Shell,php','c++,python,php','c++,python,php','c++,python,php','c++,Vue,php','Vue,python,php','c++,React,php','css,gatsby,React','c++,html,php','c++,python,R','c++,R,php','c++,python,php','c++,python,go','c++,go,php','rust,python,php']
onlinelist=['true','false','true','true','true','true','false','true','true','true','true','false','true','true','true','true','false','true','true','true','true','false','true','true','true','true','false','true','true','true']

print('Registering User data...')
users=[]
for i in range(user_num):
    users.append(
        User(
            namelist[i],ranklist[i],skillslist[i],int(time.time())+i,"https://loremflickr.com/460/460/animal",onlinelist[i]
        )
    )

users=[]
for i in range(user_num):
    users.append(
        User(
            namelist[i],ranklist[i],skillslist[i],int(time.time())+i,"https://loremflickr.com/460/460/animal",onlinelist[i]
        )
    )

i=0
for user in users:
    if(i%6==0 or i==user_num-1):
        print(i+1,"/",user_num)
    r.hmset("user:"+idlist[i],{"name":namelist[i],"rank":user.rank,"skills":user.skills,"login_time":user.login_time,"icon_image":user.icon_image,"online":user.online})
    i=i+1
print('Registering following data...')

#自分より下のリストだけ先の人をフォローする
follow_num=[20,14,18,3,1,3,4,5,6,2,6,7,8,4,5,2,1,2,8,1,2,3,1,3,3,1,1,1,0,0]
for i in range(user_num):
    if(i%6==0 or i==user_num-1):
        print(i+1,"/",user_num)
    for n in range(follow_num[i]):
        r.zadd("following:"+idlist[i],{idlist[i+n+1]:int(time.time())+n})


slack.notify(text="Redis DB Initialized🦊🔥")
print('Complete!')
