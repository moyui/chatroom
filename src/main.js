import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import platform from 'platform';

import { App } from './App.jsx';
import action from './state/action';
import store from './Store'; 
import socket from './socket';
import { platform } from 'os';
import convertRobot10Message from '../utils/convertRobot10Message';
import notification from '../utils/notification';
import sound from '../utils/sound';
import voice from '../utils/voice';
import action from './state/action';

if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) 
    window.Notification.requestPermission();

let windowStatus = 'focus';
//获得键盘焦点时会触发focus事件
window.onfocus = () => windowStatus = 'focus';
window.onblur = () => windowStatus = 'blur';


async function guest() {
    const [err, res] = await fetch('guest', {
        os: platform.os.family,
        browser: platform.name,
        environment: platform.description,
    });
    if (!err) action.setGuest(res);
}


socket.on('connect', async() => {
    const token = window.localStorage.getItem('token');
    if (token) {
        const [err, res] = await fetch('loginByToken', {
            token,
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, { toast: false });
        if (err) {
            guest();
        } else {
            action.setUser(res);
        }
    } else {
        guest();
    }
});

socket.on('disconnect', () => {
    action.disconnect();
});

let pervFrom = '';
socket.on('message', (message) => {
    //解析消息
    convertRobot10Message(message);
    const state = store.getState();
    //判断这条消息是不是自己的
    const isSelfMessage = message.from._id === state.getIn(['user', '_id']);
    //找到要发送的联系人
    const linkman = state.getIn(['user', 'linkmans']).find(item => item.get('_id') === message.to);
    let title = '';
    if (linkman) {
        action.addLinkmanMessage(message.to, message);
        if (linkman.get('type') === 'group') {
            title = `${message.from.username} 在 ${linkman.get('name')} 对大家说:`;
        } else {
            title = `${message.from.username} 对你说:`;
        }
    //联系人不存在并且是自己发的消息、不创建新的联系人
    } else {
        if (isSelfMessage) {
            return;
        }
        //那这边应该是对面发送的消息
        const newLinkman = {
            _id: getFriendId(
                //得到对方id(自己id？)
                state.getIn(['user', '_id']),
                //自己id(对方id？)
                message.from._id,
            ),
            type: 'temporary',
            createTime: Date.now(),
            //头像
            avatar: message.from.avatar,
            name: message.from.username,
            messages: [],
            //没有读?
            unread: 1,
        };
        action.addLinkman(newLinkman);
        title = `${message.from.username} 对你说:`;
    }
    fetch('getLinkmanHistoryMessages', { linkmanId: newLinkman._id })
        .then(([err, res]) => {
            //成功添加
            if (!err) action.addLinkManMessage(newLinkman._id, res);
        });

    if (isSelfMessage) {
        return;
    }

    //焦点转移
    if (windowStatus === 'blur' && state.getIn(['ui', 'notificationSwitch'])) {
        notification(
            title,
            message.from.avatar,
            message.type === 'text' ? message.content : `[${message.type}]`,
            Math.random(),
        );
    }

    if (state.getIn(['ui', 'soundSwitch'])) {
        const soundType = state.getIn(['ui', 'sound']);
        sound(soundType);
    }

    if (message.type === 'text' && state.getIn(['ui', 'voiceSwitch'])) {
        const text = message.content
        //只保留例如https://www.baidu.com/abcd -> https://#baidu.com#
        .replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, '')
        .replace(/#/g, '');
    
        if (text.length > 100) {
            return;
        }

        const from = linkman && linkman.get('type') === 'group' ?
            `${message.from.username}在${linkman.get('name')}说`
            :
            `${message.from.username}对你说`;
        if (text) {
            voice.push(from !== prevFrom ? from + text : text, message.from.username);
        }
        prevFrom = from;
    }
})

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

