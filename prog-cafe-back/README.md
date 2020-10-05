# prog-cafe-backend

## DB
- redis
- endpoint:


followDB
```
ソート済セット型
key
   following:{userId}
score
  {timestamp}
member
  {userid}
```
userDB
```
Hash型
key
  user:{userId}
Hash
  name  {name}
  rank  {rank}
  skills  {skill}
  login_time  {timestamp}
  icon_image  {git hub icon link}
  online      {tue/false}
```
roomDB
```
Hash型
key
  room:{roomId}
Hash
  desk0  user_id
  desk1  user_id
  desk2  user_id
  desk3  user_id
  desk4  user_id
  desk5  user_id
  desk6  user_id
  desk7  user_id
```
sessionDB
```
Hash型
key
  user:session:{userId}
string
  sessionId

userroomDB

String型
key
  user:room:{userId}
string
  rooomId
```
