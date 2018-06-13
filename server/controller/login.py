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

session = user.DBSession()

class LoginHandler(tornado.web.RequestHandler):
    def post(self, email, password, token):
        #采用两种方式登录
        if (token):
            token = pc.decrypt(token)
            userInfo = session.query(user.User).filter(user.User.userid == token).one()
        else:
            password = pc.encrypt(password)
            userInfo = session.query(user.User).filter(and_(user.User.email == email, user.User.password==password)).one()
        if (userInfo):
            if (userInfo.auth == False):
                result = {
                    'success': False,
                    'message': '账号未认证,请先前往邮箱进行认证',
                    'status': 401
                }
            else:
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
        else:
            result = {
                'success': False,
                'message': '账号不存在或密码错误',
                'status': 404
            }
            self.write(json_encode(result))
