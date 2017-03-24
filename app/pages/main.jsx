import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import Nav      from './nav.jsx';
import List     from './adv/list.jsx';
import Login    from './login/login.jsx';
import Hot      from './hot/hot.jsx';
import Mine     from './mine/mine.jsx';
import Detail   from  './adv/detail.jsx';
import VideoDetail   from  './adv/videoDetail.jsx';
import Register from './register/register.jsx';
import Wallet   from './wallet/wallet.jsx';
import Transfer   from './wallet/transfer.jsx';
import Feedback   from './feedback/feedback.jsx';
import Setting   from './setting/setting.jsx';
import ModifyPassword   from './modifyPassword/modifyPassword.jsx';
import ForgetPassword   from './modifyPassword/forgetPassword.jsx';
import WechatAuth   from './wechatAuth/wechatAuth.jsx';
import Invite   from './invite/invite.jsx';
import About   from './about/about.jsx';

function change(pre, next) {  
	if(next.routes[1].title){
		document.title = next.routes[1].title;		
	}
	const iframe = document.createElement('iframe');
	iframe.src = '../favicon.ico';
	const listener = () => {
	    setTimeout(() => {
	        iframe.removeEventListener('load', listener);
	        document.body.removeChild(iframe);
	    }, 320);
	};
	iframe.addEventListener('load', listener);
	document.body.appendChild(iframe);
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Nav} onChange={change} >
			<IndexRoute component={List} title="首页"/>
			<Route path="register(/:videoId)(/:playId)"  component={Register} title="注册"/>
			<Route path="login(/:videoId)(/:playId)"  component={Login} title="登录"/>
			<Route path="forgetPassword"  component={ForgetPassword} title="重置密码"/>
			<Route path="hot" component={Hot} title="热门"/>
			<Route path="mine" component={Mine} title="草莓"/>
			<Route path="detail/:videoId(/:playId)" component={Detail} />
			<Route path="share/:videoId(/:shareId)" component={Detail} />
			<Route path="video/:videoId(/:playId)" component={VideoDetail} />
			<Route path="register(/:videoId)(/:playId)" component={Register} title="注册"/>
			<Route path="inviteRegister(/:shareId)" component={Register} title="邀请注册"/>
			<Route path="wallet(/:tab)" component={Wallet} title="草莓钱包"/>
			<Route path="feedback" component={Feedback} title="意见反馈"/>
			<Route path="setting" component={Setting} title="设置"/>
			<Route path="modifyPassword" component={ModifyPassword} title="修改密码"/>
			<Route path="wechatAuth" component={WechatAuth} title="微信认证"/>
			<Route path="transfer" component={Transfer} title="转出金额"/>
			<Route path="invite" component={Invite} title="邀请朋友"/>
			<Route path="about" component={About} title="关于产品"/>
		</Route>
	</Router>,
	document.querySelector('.container-wrapper')
);
