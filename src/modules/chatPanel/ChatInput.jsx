import React, { Component } from 'react';
import { connect } from 'react-redux';

import Textarea from '../../components/Textarea';
import IconButton from '../../components/IconButton';
import { socket } from '../../socket';
import style from './Chat.css';

class ChatInput extends Component {
    constructor(props) {
        super(props);

        this.sendTextMessage = this.sendTextMessage.bind(this);
    }

    sendMessage(token, content, userName) {
        this.textarea.clear();
        socket.send(JSON.stringify({
            'token': token,
            'userName': userName, 
            'content': content
        }));
    }
    

    sendTextMessage() {
        const textMessage = this.textarea.getValue().trim();
        const token = window.localStorage.getItem('token');
        if (textMessage.length === 0 && !token) {
            return;
        }
        this.sendMessage(token, textMessage, this.props.userName);
    }
    
    render() {
        return (
            <div class={style.chatInput}>
                <Textarea ref={i => this.textarea = i} />
                <IconButton width={60} height={32} iconSize={18} icon="send" children="发送" onClick={this.sendTextMessage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;

    return {
        userName: user.userName
    }
}

export default connect(mapStateToProps, null)(ChatInput);
