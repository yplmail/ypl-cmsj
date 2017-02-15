import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import advNav    from './nav.jsx';
import advList   from './advertisement/list.jsx';
import advLogin from './login/login.jsx';
import advHot    from './hot/hot.jsx';
import advMine   from './mine/mine.jsx';
import advDetail from './advertisement/detail.jsx';
import advRegister from './register/register.jsx';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={advNav}>
			<IndexRoute component={advList} />
			<Route path="login"  component={advLogin} />
			<Route path="hot"    component={advHot} />
			<Route path="mine"   component={advMine} />
			<Route path="detail" component={advDetail} />
			<Route path="register" component={advRegister} />
		</Route>
	</Router>,
	document.querySelector('.container')
);
