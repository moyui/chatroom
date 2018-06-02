#-*-coding:utf-8-*-
import tornado.ioloop
import tornado.web
import tornado.websocket
import json

from router import router

@router.route(r'/register')
class RegisterHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        user = data['user']
        password = data['password']
        email = data['email']
        print(user, password, email)