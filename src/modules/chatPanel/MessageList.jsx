import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Message } from './Message';
import style from './Chat.css';

class MessageList extends Component {

    renderMessage(message) {
        const props = {
            key: message.messageId,
            userName: message.userName === this.props.myName ? '我' : message.userName,
            time: message.time,
            content: message.content
        }
        return (
            <Message {...props} />
        );
    }

    render() {
        const messages = this.props.messages;
        return (
            <div className={style.messageList}>
                {
                    messages.map(message => {
                        return this.renderMessage(message);
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { messages, user } = state;
    return {
        messages: messages,
        myName: user.userName
    }
}

export default connect(mapStateToProps, null)(MessageList);

