CREATE TABLE user
(
	userid varchar(40) NOT NULL UNIQUE COMMENT '用户识别号' primary key,
    username varchar(40) NOT NULL UNIQUE COMMENT '用户名',
    password varchar(40) NOT NULL COMMENT '密码',
    email varchar(40) NOT NULL UNIQUE COMMENT '电子邮件',
    auth boolean COMMENT '认证'
)