import React, { Component } from 'react';

import Textarea from '@/components/Textarea';
import IconButton from './IconButton';
import { socket } from '../../socket';

class ChatInput extends Component {
    constructor(props) {
        super(props);

        this.sendTextMessage = this.sendTextMessage.bind(this);
    }

    sendMessage(token, content) {
        socket.onopen = (event) => {
            socket.send(JSON.stringify({
                'userid': token,
                'content': content
            }));
        }
    }

    sendTextMessage() {
        const textMessage = this.textarea.getValue().trim();
        const token = window.localStorage.getItem('token');
        if (textMessage.length === 0 && token) {
            return;
        }
        this.sendMessage(token, textMessage);
    }
    
    render() {
        return (
            <div>
                <Textarea ref={i => this.textarea = i} />
                <IconButton width={32} height={32} iconSize={18} icon="send" onClick={this.sendTextMessage} />
            </div>
        )
    }
}

export default ChatInput;
