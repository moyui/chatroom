#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import uuid

from controller.prpcrypt import pc
from model import user
from tornado.escape import json_decode, json_encode
from tornado import gen
from sqlalchemy import and_

class LoginHandler(tornado.web.RequestHandler):
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

        self.password = data['password'] or None
        self.email = data['email'] or None
        self.token = data['token'] or None

        #采用两种方式登录
        session = user.DBSession()
        try:
            if (self.token):
                self.token = pc.decrypt(self.token)                                                                             
                userInfo = session.query(user.User).filter(user.User.userid == self.token).one()
            else:
                self.password = pc.encrypt(self.password)
                userInfo = session.query(user.User).filter(and_(user.User.email==self.email, user.User.password==self.password)).one()

            if (userInfo):
                print(userInfo.auth)
                if (userInfo.auth == False):
                    self.set_status(401)
                    result = {
                        'success': False,
                        'message': '账号未认证,请先前往邮箱进行认证',
                        'status': 401
                    }
                else:
                    self.set_status(200)
                    result = {
                        'success': True,
                        'message': '登陆成功',
                        'payload': {
                            'username': userInfo.username,
                            'email': userInfo.email
                        },
                        'token': pc.encrypt(userInfo.userid),
                        'status': 200
                    }
                self.write(json_encode(result))
        except Exception:
            self.set_status(404)
            result = {
                'success': False,
                'message': '账号不存在或密码错误',
                'status': 404
            }
            self.write(json_encode(result))
        finally:
            session.close()
