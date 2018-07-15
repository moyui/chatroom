import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../components/Button';
import style from './Main.css';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.exitLogin = this.exitLogin.bind(this);
    }

    exitLogin() {
        window.localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        const { userName } = this.props;

        return (
            <header className={style.header}>
                <h2 className={style.h2}>moyui的聊天室</h2>
                <span className={style.detail}>用户名：{ userName }</span>
                <Button onClick={this.exitLogin} type="exit">退出登录</Button>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state

    return {
        userName: user.userName
    }
};

export default withRouter(connect(mapStateToProps, null)(SideBar));
