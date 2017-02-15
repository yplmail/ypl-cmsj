import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import advNav      from './nav.jsx';
import advList     from './adv/list.jsx';
import advLogin    from './login/login.jsx';
import advHot      from './hot/hot.jsx';
import advMine     from './mine/mine.jsx';
import advDetail   from  './adv/detail.jsx';
import advRegister from './register/register.jsx';
import advWallet   from './wallet/wallet.jsx';
import advRecord   from './wallet/record.jsx';
import advFeedback   from './feedback/feedback.jsx';
import advSetting   from './setting/setting.jsx';
import advModifyPassword   from './modifyPassword/modifyPassword.jsx';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={advNav}>
			<IndexRoute component={advList} />
			<Route path="login"  component={advLogin} />
			<Route path="hot"    component={advHot} />
			<Route path="mine"   component={advMine} />
			<Route path="detail" component={advDetail} />
			<Route path="register" component={advRegister} />
			<Route path="wallet" component={advWallet} />
			<Route path="record" component={advRecord} />
			<Route path="feedback" component={advFeedback} />
			<Route path="setting" component={advSetting} />
			<Route path="modifyPassword" component={advModifyPassword} />
		</Route>
	</Router>,
	document.querySelector('.container')
);
