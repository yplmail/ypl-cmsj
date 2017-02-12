import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import advList from './advertisement/list.jsx';
import advDetail from './advertisement/detail.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={advList} />
      <Route path="/detail" component={advDetail} />
  </Router>,
  document.querySelector('.container')
);
