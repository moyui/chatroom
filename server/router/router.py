#-*-coding:utf-8-*-
import tornado.ioloop
import tornado.web
import re

from controller import register
from controller import confirm
from controller import chatroom

routes = [
    (r"/api/user/registration", register.RegisterHandler),
    (r"/api/user/(?P<userid>.*)/confirmation", confirm.ConfirmHandler),
    (r"/api/chatroom", chatroom.ChatSocketHandler)
]