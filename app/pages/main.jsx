import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import Nav      from './nav.jsx';
import List     from './adv/list.jsx';
import Login    from './login/login.jsx';
import Hot      from './hot/hot.jsx';
import Mine     from './mine/mine.jsx';
import Detail   from  './adv/detail.jsx';
import Register from './register/register.jsx';
import Wallet   from './wallet/wallet.jsx';
import Record   from './wallet/record.jsx';
import Transfer   from './wallet/transfer.jsx';
import Feedback   from './feedback/feedback.jsx';
import Setting   from './setting/setting.jsx';
import ModifyPassword   from './modifyPassword/modifyPassword.jsx';
import MobileAuth   from './mobileAuth/mobileAuth.jsx';
import WechatAuth   from './wechatAuth/wechatAuth.jsx';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Nav}>
			<IndexRoute component={List} />
			<Route path="register/:page(/:id)"  component={Register} />
			<Route path="login"  component={Login} />
			<Route path="hot"    component={Hot} />
			<Route path="mine"   component={Mine} />
			<Route path="detail/:play/:id(/:shareId)(/:packet)" component={Detail} />
			<Route path="register" component={Register} />
			<Route path="wallet" component={Wallet} />
			<Route path="record" component={Record} />
			<Route path="feedback" component={Feedback} />
			<Route path="setting" component={Setting} />
			<Route path="modifyPassword" component={ModifyPassword} />
			<Route path="mobileAuth" component={MobileAuth} />
			<Route path="wechatAuth" component={WechatAuth} />
			<Route path="transfer" component={Transfer} />
		</Route>
	</Router>,
	document.querySelector('.container-wrapper')
);
