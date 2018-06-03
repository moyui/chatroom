#-*-coding:utf-8-*-
import tornado.ioloop
import tornado.web

from controller import register

routes = [
    (r"/register", register.RegisterHandler)
]