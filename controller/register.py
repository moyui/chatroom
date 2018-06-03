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

        if (self.searchUsername()):
            result = {
                'success': False,
                'message': '用户名重复或者错误',
                'status': 403
            }
            self.write(json_encode(result))
        else:
            self.id = self.createUserId()
            self.insertUser()

    #判断是否重名
    def searchUsername(self):
        session = user.DBSession()
        User = user.User
        userTuple = session.query(User).filter(User.username == self.username).all()
        if (userTuple.id):
            return True
        else: 
            return False

    #创建userid
    def createUserId(self):
        self.id = uuid.uuid3(uuid.NAMESPACE_DNS, self.username)

    def insertUser(self):
        session = user.DBSession()
        try:
            new_user = user.User(id=self.id, username=self.username, password=self.password, email=self.email)
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
                'message': '创建账户失败',
                'status': 403
            }
            self.write(json_encode(result))
        finally:
            session.close()