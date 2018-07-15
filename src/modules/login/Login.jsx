import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import setting from '../../setting';
import Input from '../../components/Input';
import actions from './actions'; 
import style from './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hint: '',
            type: 'login'
        }

        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.switchRender = this.switchRender.bind(this);
    }

    componentDidMount() {
        this.preLogin();
    }

    handleRegister() {
        axios.post(setting.serverApi + '/apipy/user/registration', JSON.stringify({
            'username': this.username.getValue(),
            'password': this.password.getValue(),
            'email': this.email.getValue()
        })).then((res) => {
            const returnValue = res.data;

            switch (returnValue.status) {
                case 500: 
                case 403: alert('发现未知错误，请重试看看呢！');break;
                case 201: 
                    alert('注册成功，要切换去登录喽！');
                    this.switchRender('login');
                    window.localStorage.setItem('token', returnValue.token);
                    break;
                default: alert('未知错误，请重试看看呢！');break;
            }
        },(rej) => {
            alert('发现未知错误，请重试看看呢！');
        })
    }

    handleLogin(self, token = '') {
        axios.post(setting.serverApi + '/apipy/user/login', JSON.stringify({
            'email': this.email.getValue(),
            'password': this.password.getValue(),
            'token': token
        })).then((res) => {
            console.log(res.data);
            const returnValue = res.data;

            switch (returnValue.status) {
                case 401: 
                case 404:
                    alert(returnValue.message);break;
                case 200: 
                    this.props.setUser({
                        userName: returnValue.payload.username,
                        email: returnValue.payload.email
                    });
                    window.localStorage.setItem('token', returnValue.token);
                    //登录
                    
                    //跳转路由
                    this.props.history.push('/chatroom');
                    break;
                default: window.alert('发生未知错误，请重试!');break;
            }
        }, (rej) => {
            alert('发现错误，可能是无账号或密码错误呢！要不去邮箱认证一下？');
        })
    }

    showHint(message) {
        this.setState({
            hint: message
        })
    }

    switchRender(type) {
        this.setState({
            type: type
        })
    }

    /**
     * 启动页面时直接登录
     */
    preLogin() {
        const token = window.localStorage.getItem('token') || null;
        if (token) {
            this.handleLogin(null, token);
        } else {
            this.switchRender('login');
        }
    }

    renderRegister() {
        return (
            <div className={style.login}>
                <h3 className={style.h3}>注册</h3>
                <label className={style.input}>用户名：
                    <Input 
                        type="text" 
                        placeholder="请输入用户名"
                        button="清除"
                        ref={i => this.username = i} 
                    />
                </label>
                <label className={style.input}>密码：
                    <Input 
                        type="password" 
                        placeholder="请输入密码"
                        button="清除"
                        ref={i => this.password = i} />
                </label>
                <label className={style.input}>电子邮箱：
                    <Input 
                        type="text"
                        placeholder="请输入电子邮箱"
                        button="清除" 
                        ref={i => this.email = i} />
                </label>
                <div className={style.loginButton}>
                    <button onClick={this.handleRegister}>注册</button>
                </div>
            </div>
        )
    }

    renderLogin() {
        return (
            <div className={style.login}>
                <h3 className={style.h3}>登录</h3>
                <label className={style.input}>电子邮箱：
                    <Input 
                        type="text" 
                        placeholder="请输入用户名"
                        button="清除"
                        ref={i => this.email = i} 
                    />
                </label>
                <label className={style.input}>密码：
                    <Input 
                        type="password" 
                        placeholder="请输入密码"
                        button="清除"
                        ref={i => this.password = i} />
                </label>
                <div className={style.loginButton}>
                    <button onClick={this.handleLogin}>登录</button>
                    <h5 onClick={e => this.switchRender('register')}>注册入口在这里~</h5>
                </div>
            </div>
        )
    }

    render() {
        const type = this.state.type;
        const renderChoice = type === 'register' ? this.renderRegister : this.renderLogin;

        return (
            <div className={style.main}>
                {renderChoice.bind(this)()}
                <ul className={style.switchButton}>
                    <li onClick={e => this.switchRender('register')}>注册页面</li>
                    <li onClick={e => this.switchRender('login')}>登录页面</li>
                </ul>
            </div>
        );

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch(actions.setUser(user));
        } 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));


