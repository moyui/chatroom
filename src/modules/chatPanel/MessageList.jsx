import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Message } from './Message';

class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    renderMessage(message) {
        const props = {
            key: message.messageId,
            userName: message.userName === myName ? '我' : message.userName,
            time: message.time,
            content: message.content
        }
        return (
            <Message {...props} />
        );
    }

    render() {
        messages = this.props.messages;
        return (
            <div>
                {
                    messages.map(message => {
                        this.renderMessage(message);
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { messages } = state;
    return {
        messages: messages
    }
}

export default connect(mapStateToProps, null)(MessageList);

