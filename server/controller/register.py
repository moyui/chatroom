#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import uuid
import json

from controller.prpcrypt import pc
from tornado.escape import json_decode, json_encode
from model import user
from controller.email import EmailHandler 

session = user.DBSession()

class RegisterHandler(tornado.web.RequestHandler):
    def post(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        try:
            data = json_decode(self.request.body)
        except Exception:
            self.set_status(500)
            result = {
                'success': False,
                'message': '解析错误',
                'status': 500 
            }
            self.write(json_encode(result))

        self.username = data['username']
        self.password = pc.encrypt(data['password'])
        self.email = data['email']
        self.userid = self.createUserId()
        self.insertUser()

    #创建userid
    def createUserId(self):
        #确保只有32位
        return str(uuid.uuid5(uuid.NAMESPACE_DNS, self.username))[:32]

    #插入数据
    def insertUser(self):
        session = user.DBSession()
        try:
            #尝试先发送邮件
            EmailHandler.sendEmail(self, self.userid, self.email)
            
            new_user = user.User(userid=self.userid, username=self.username, password=self.password, email=self.email, auth=False)
            session.add(new_user)
            session.commit()
            self.set_status(201)
            result = {
                'success': True,
                'message': '成功创建账户,并已发送确认邮件',
                'status': 201,
                'token': pc.encrypt(self.userid)
            }
            self.write(json.dumps(result))
        except Exception:
            self.set_status(403)
            result = {
                'success': False,
                'message': '创建账户失败，用户名与邮箱不能重复',
                'status': 403
            }
            self.write(json.dumps(result))
        finally:
            session.close()