import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
import App from './App';


ReactDOM.render(
  <Router history={hashHistory}><App /></Router>,
  document.getElementById('root')
);
