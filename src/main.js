import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App.jsx';
import store from './Store'; 

ReactDOM.render(
    <Provider store={store}>
        <Router> 
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);

