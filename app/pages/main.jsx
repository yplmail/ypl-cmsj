import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import advList from './advertisement/list.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={advList}/>
  </Router>,
  document.querySelector('.container')
);
