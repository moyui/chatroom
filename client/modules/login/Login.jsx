import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '@/compoents/Input';

class Login extends Component {
    constructor(props) {
        super(props);

    }

    handleRegister() {
        axios.post('/apipy/user/registration', JSON.stringify({
            'username': this.username.getValue(),
            'password': this.password.getValue(),
            'emali': this.email.getValue()
        })).then((res) => {
            const returnValue = JSON.parse(encodeURIComponent(res));

            switch (returnValue.status) {
                ''
            }
        })
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
                <button>登录</button>
                <button>注册入口在这里~</button>
            </fieldset>
        )
    }

    render() {
        const renderChoice = 1;

        return (
            <div>
                {renderChoice}
            </div>
        );

    }
}