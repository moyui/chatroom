#-*-coding:utf-8-*-
import tornado.ioloop
import tornado.web
import re

from controller import register
from controller import confirm
# from controller import chatroom

routes = [
    (r"/user/registration", register.RegisterHandler),
    (r"/user/(?P<userid>.*)/confirmation", confirm.ConfirmHandler),
    # (r"/chatroom", chatroom)
]