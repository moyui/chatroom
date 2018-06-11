# -*- coding:utf-8 -*- 

from Crypto.Cipher import AES
from binascii import hexlify, unhexlify
from setting import SALTING
import codecs

class prpcrypt():
    def __init__(self, key):
        self.key = key
        self.mode = AES.MODE_CBC

    def encrypt(self, text):
        cryptor = AES.new(self.key, self.mode, b'0000000000000000')
        length = 16
        #补足为16的倍数,利用空格补足
        count = len(text)
        if (count < length):
            add = (length - count)
            text = text + ('\0'*add)
        elif (count > length):
            add = (length - (count % length))
            text = text + ('\0'*add)
        binarycode = cryptor.encrypt(text)
        #转换为ascii的字符串格式
        return codecs.decode(hexlify(binarycode))
    
    def decrypt(self, text):
        cryptor = AES.new(self.key, self.mode, b'0000000000000000')
        plain_text = cryptor.decrypt(unhexlify(text))
        #转换回正常字符
        return codecs.decode(plain_text).rstrip('\0')
    
pc = prpcrypt(SALTING)#加盐