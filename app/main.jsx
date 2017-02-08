import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Planner from './pages/planner.jsx';
import Customer from './pages/customer.jsx';
import Mine from './pages/mine.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path='planner' component={Planner} />
      <Route path='customer' component={Customer} />
      <Route path='mine' component={Mine} />
    </Route>
  </Router>,
  document.body.appendChild(document.createElement('div'))
);
