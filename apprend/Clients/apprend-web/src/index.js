import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Redux from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {allReducers} from './redux-config/mainReducer';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import ReactNotification from 'react-notifications-component';

const logger = (store) => (next) => (action) => {
    // console.log(store);
    // console.log('ACTION:', action.type, action);
    let result = next(action);
    console.log('STATE AFTER ACTION:', action.type, store.getState());
    return result;
};

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || Redux.compose

const middleware = [thunk];
// const middleware = [thunk]
const store = Redux.createStore(
    allReducers,
    Redux.compose(
        Redux.applyMiddleware(...middleware),
        composeEnhancers
    )
);

const mainComponent = <Provider store={store}>
    <BrowserRouter>
        <ReactNotification/>
        <App/>
    </BrowserRouter>
</Provider>;

ReactDOM.render(mainComponent, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
