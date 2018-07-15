CREATE TABLE message
(
	messageid bigint auto_increment NOT NULL UNIQUE COMMENT '聊天记录识别号' primary key,
    userid varchar(40) NOT NULL COMMENT '用户识别号',
    content longtext COMMENT '聊天内容',
    time datetime COMMENT '时间',
    FOREIGN KEY (userid) REFERENCES user(userid)
)