import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import App from './app.jsx';
import Home from './home.jsx';
import Planner from './planner.jsx';
import Customer from './customer.jsx';
import Mine from './mine.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path='planner'  component={Planner} />
      <Route path='customer' component={Customer} />
      <Route path='mine'     component={Mine} />
    </Route>
  </Router>,
  document.querySelector('.container')
);
