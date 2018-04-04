import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  hashHistory
} from 'react-router-dom';
import './common/variables.less';

import App from './App';


ReactDOM.render(
  <Router history={hashHistory}><App/></Router>,
  document.getElementById('root')
);