import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import platform from 'platform';

import { App } from './App.jsx';
import store from './Store'; 
import socket from './socket';
import { platform } from 'os';
import action from './state/action';

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
        cosnt [err, res] = await fetch('loginByToken', {
            token,
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, { toast: false });
        if (err) {
            guest();
        } else {
            actions.setUser(res);
        }
    } else {
        guest();
    }
});

socket.on('disconnect', () => {
    action.disconnect();
});



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

