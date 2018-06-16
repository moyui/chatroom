import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Input from '@/components/Input';
import actions from './actions'; 

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
        axios.post('/apipy/user/registration', JSON.stringify({
            'username': this.username.getValue(),
            'password': this.password.getValue(),
            'emali': this.email.getValue()
        })).then((res) => {
            const returnValue = JSON.parse(encodeURIComponent(res));

            switch (returnValue.status) {
                case '500': 
                case '403': this.showHint(returnValue.message);break;
                case '201': this.showHint(returnValue.message);
                    this.switchRender('login');
                    window.localStorage.setItem('token', returnValue.token);
                    break;
                default: this.showHint('发生未知错误!');break;
            }
        })
    }

    handleLogin(token = '') {
        axios.post('/apipy/user/login', JSON.stringify({
            'email': this.email.getValue(),
            'password': this.password.getValue(),
            'token': token
        })).then((res) => {
            const returnValue = JSON.parse(encodeURIComponent(res));

            switch (returnValue.status) {
                case '401': 
                case '404': this.showHint(returnValue);break;
                case '200': this.showHint(returnValue);
                    this.props.setUser({
                        userName: returnValue.username,
                        email: returnValue.email
                    });
                    window.localStorage.setItem('token', returnValue.token);
                    //登录
                    
                    //跳转路由
                    this.props.history.push('/chatroom');
                    break;
                default: this.showHint('发生未知错误，请重试!');break;
            }
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
            this.handleLogin(token);
        } else {
            this.switchRender('login');
        }
    }

    renderRegister() {
        return (
            <fieldset>
                <legend>注册</legend>
                <label>用户名：
                    <Input type="text" ref={i => this.username = i} />
                </label>
                <label>密码：
                    <Input type="password" ref={i => this.password = i} />
                </label>
                <label>电子邮箱：
                    <Input type="text" ref={i => this.email = i} />
                </label>
                <p>{this.state.hint}</p>
                <button onClick={this.handleRegister}>注册</button>
            </fieldset>
        )
    }

    renderLogin() {
        return (
            <fieldset>
                <legend>登录</legend>
                <label>电子邮箱：
                    <Input type="text" ref={i => this.email = i} />
                </label>
                <label>密码：
                    <Input type="password" ref={i => this.password = i} />
                </label>
                <p>{this.state.hint}</p>
                <button onClick={this.handleLogin}>登录</button>
                <button onClick={e => this.switchRender('register')}>注册入口在这里~</button>
            </fieldset>
        )
    }

    render() {
        const type = this.state.type;
        const renderChoice = type === 'register' ? this.handleRegister : this.renderLogin;

        return (
            <div>
                <div>
                    {renderChoice()}
                </div>
                <ul>
                    <li onClick={e => this.switchRender('register')}>注册</li>
                    <li onClick={e => this.switchRender('Login')}>登录</li>
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


