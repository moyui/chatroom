import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { TopBar } from './modules/Main';
import Login from './modules/login/Login';
import Chat from './modules/chatPanel/Chat';

export const App = () => {
    return (
        <div>
            <Route path="/" compoent={TopBar} />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/chatroom" compoent={Chat} />
            </Switch>
        </div>
    )
}
