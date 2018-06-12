#-*-coding:utf-8-*-
import tornado.ioloop
import tornado.web
import re

from controller import register
from controller import confirm
from controller import chatroom

routes = [
    (r"/apipy/user/registration", register.RegisterHandler),
    (r"/apipy/user/(?P<userid>.*)/confirmation", confirm.ConfirmHandler),
    (r"/apipy/chatroom", chatroom.ChatSocketHandler)
]