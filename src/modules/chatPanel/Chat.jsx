import React from 'react';

import store from '../../Store'; 
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import actions from './actions.js';
import { socket }  from './socket.js';

socket.onmessage = (event) => {
    console.log(event.data);
    const returnValue = JSON.parse(encodeURIComponent(event.data));
    const message = {
        'messageId': returnValue.messageid,
        'userName': returnValue.username,
        'content': returnValue.content,
        'time': time
    }

    store.dispatch(actions.setMessage(message));
}

const Chat = () => {
    return (
        <div>
            <MessageList />
            <ChatInput />
        </div>
    )
}
