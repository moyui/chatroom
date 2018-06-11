import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { TopBar } from './modules/Main';

export const App = () => {
    return (
        <div>
            <Route path="/" compoent={TopBar} />
            <Switch>
                <Route path="/register" component={} />
                <Route path="/login" component={} />
                <Route path="/chatroom" compoent={} />
            </Switch>
        </div>
    )
}
