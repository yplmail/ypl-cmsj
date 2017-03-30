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
import Result   from './adv/result.jsx';

function change(pre, next) {
	if(next.routes[1].title){
		document.title = next.routes[1].title;		
	}
	const iframe = document.createElement('iframe');
	iframe.src = '../favicon.ico';
	iframe.style.display='none';
	const listener = () => {
	    let timer = setTimeout(() => {
	    	clearTimeout(timer);
	        iframe.removeEventListener('load', listener);
	        document.body.removeChild(iframe);
	    }, 320);
	};
	iframe.addEventListener('load', listener,false);
	document.body.appendChild(iframe);
}

function enter(router, replace){
   location.search = "v=2";
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Nav}>
			<IndexRoute component={List} title="草莓视界"/>
			<Route path="register(/:videoId)(/:playId)"  component={Register}/>
			<Route path="login(/:videoId)(/:playId)"  component={Login}/>
			<Route path="forgetPassword"  component={ForgetPassword}/>
			<Route path="hot" component={Hot}/>
			<Route path="mine" component={Mine}/>
			<Route path="detail/:videoId(/:playId)" component={Detail} />
			<Route path="share/:videoId(/:shareId)" component={Detail} />
			<Route path="video/:videoId(/:playId)" component={VideoDetail} />
			<Route path="register(/:videoId)(/:playId)" component={Register}/>
			<Route path="inviteRegister(/:shareId)" component={Register}/>
			<Route path="wallet(/:tab)" component={Wallet}/>
			<Route path="feedback" component={Feedback}/>
			<Route path="setting" component={Setting}/>
			<Route path="modifyPassword" component={ModifyPassword}/>
			<Route path="wechatAuth" component={WechatAuth}/>
			<Route path="transfer" component={Transfer}/>
			<Route path="invite" component={Invite}/>
			<Route path="about" component={About}/>
			<Route path="result/:videoId/:playId" component={Result}/>
		</Route>
	</Router>,
	document.querySelector('.container-wrapper')
);
