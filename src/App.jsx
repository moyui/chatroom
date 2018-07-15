import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideBar from './modules/Main';
import Login from './modules/login/Login';
import Chat from './modules/chatPanel/Chat';
import style from './App.css';

export const App = () => {
    return (
        <div className={style.body}>
            <div className={style.glass}> 
            </div>
            <div className={style.display}>
                <Route path="/" component={SideBar} />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/chatroom" component={Chat} />
                </Switch>
            </div>
        </div>
    )
}

