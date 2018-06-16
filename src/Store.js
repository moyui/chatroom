import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import userReducer from './modules/login/reducer.js';
import messageReducer from './modules/chatPanel/reducer.js';

const win = window;

const reducers = combineReducers({
    user: userReducer,
    messages: messageReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
)

export default createStore(reducers, {}, storeEnhancers);

