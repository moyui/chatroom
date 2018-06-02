#-*-coding:utf-8-*-

import tornado.ioloop
import tornado.web

class Route(object):
    def __init__(self):
        self.urls = list()
    
    def __call__(self, url):
        def register(cls):
            self.urls.append((url, cls))
            return cls
        return register

route = Route()