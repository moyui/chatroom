#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import uuid

from tornado.escape import json_decode, json_encode
from tornado import gen
from model import user

session = user.DBSession()

class RegisterHandler(tornado.web.RequestHandler):
    def post(self):
        try:
            data = json_decode(self.request.body)
        except Exception:
            result = {
                'success': False,
                'message': '解析错误',
                'status': 500 
            }
            self.write(json_encode(result))

        self.username = data['username']
        self.password = data['password']
        self.email = data['email']
        self.id = self.createUserId()

        self.insertUser()

    #创建userid
    def createUserId(self):
        self.userid = str(uuid.uuid3(uuid.NAMESPACE_DNS, self.username))

    #插入数据
    def insertUser(self):
        session = user.DBSession()
        try:
            new_user = user.User(userid=self.userid, username=self.username, password=self.password, email=self.email, auth=False)
            session.add(new_user)
            session.commit()
            result = {
                'success': True,
                'message': '成功创建账户',
                'status': 201
            }
            self.write(json_encode(result))
        except Exception:
            result = {
                'success': False,
                'message': '创建账户失败，可能用户名重复',
                'status': 403
            }
            self.write(json_encode(result))
        finally:
            session.close()