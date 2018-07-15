import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import store from '../../Store'; 
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import messageActions from './actions.js';
import userActions from '../login/actions';
import { socket }  from '../../socket.js';
import setting from '../../setting';
import style from './Chat.css';

socket.onmessage = (event) => {
    console.log(event.data);
    const returnValue = JSON.parse(event.data);
    const message = {
        'messageId': returnValue.messageid,
        'userName': returnValue.username,
        'content': returnValue.content,
        'time': returnValue.time
    }

    store.dispatch(messageActions.setMessage(message));
}


class Chat extends Component {
    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token) {

            axios.post(setting.serverApi + '/apipy/user/login', JSON.stringify({
                'email': '',
                'password': '',
                'token': token
            })).then((res) => {
                console.log(res.data);
                const returnValue = res.data;
    
                switch (returnValue.status) {
                    case 401: 
                    case 404: this.props.history.push('/login');break;
                    case 200: 
                        store.dispatch(userActions.setUser({
                            userName: returnValue.payload.username,
                            email: returnValue.payload.email
                        }));break;
                        
                    default: this.props.history.push('/login') ;break;
                }
            })
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className={style.main}>
                <MessageList />
                <ChatInput />
            </div>
        )
    }
}

export default withRouter(Chat);
