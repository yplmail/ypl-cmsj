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
import MobileAuth   from './mobileAuth/mobileAuth.jsx';
import WechatAuth   from './wechatAuth/wechatAuth.jsx';
import Invite   from './invite/invite.jsx';
import About   from './about/about.jsx';

function change(pre, next) {  
	if(next.routes[1].title){
		document.title = next.routes[1].title;		
	}else{
		document.title = '草莓视界';			
	}
	const iframe = document.createElement('iframe');
	iframe.src = '../favicon.ico';
	const listener = () => {
	    setTimeout(() => {
	        iframe.removeEventListener('load', listener);
	        setTimeout(() => {
	            document.body.removeChild(iframe);
	        }, 0);
	    }, 0);
	};
	iframe.addEventListener('load', listener);
	document.body.appendChild(iframe);
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Nav} onChange={change} title="草莓视界">
			<IndexRoute component={List} />
			<Route path="register(/:videoId)(/:videoId)"  component={Register} />
			<Route path="login(/:videoId)(/:playId)"  component={Login} />
			<Route path="forgetPassword"  component={ForgetPassword} />
			<Route path="hot"    component={Hot}/>
			<Route path="mine"   component={Mine} title="我的"/>
			<Route path="detail/:videoId(/:playId)" component={Detail} />
			<Route path="video/:videoId(/:playId)" component={VideoDetail} />
			<Route path="share/:videoId(/:shareId)" component={Detail} />
			<Route path="register(/:videoId)(/:playId)" component={Register} />
			<Route path="inviteRegister(/:shareId)" component={Register} />
			<Route path="wallet" component={Wallet} />
			<Route path="feedback" component={Feedback} />
			<Route path="setting" component={Setting} />
			<Route path="modifyPassword" component={ModifyPassword} />
			<Route path="mobileAuth" component={MobileAuth} />
			<Route path="wechatAuth" component={WechatAuth} />
			<Route path="transfer" component={Transfer} />
			<Route path="invite" component={Invite} />
			<Route path="about" component={About} />
		</Route>
	</Router>,
	document.querySelector('.container-wrapper')
);
