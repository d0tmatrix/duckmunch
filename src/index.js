import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';

let location = 'app';
if (window.location) {
  location = window.location.pathname
}

ReactDOM.render(location === '/dashboard' ? <Dashboard /> : <App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
