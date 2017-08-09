import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect,browserHistory} from 'react-router';
import common from 'common/common';
import ServerRequest from 'server/serverRequest';
import Nav      from './nav.jsx';
import Index    from './index/index.jsx';
import Login    from './login/login.jsx';
import Mine     from './mine/mine.jsx';
import Register from './register/register.jsx';
import Wallet   from './wallet/wallet.jsx';
import Withdraw   from './wallet/withdraw.jsx';
import Feedback   from './feedback/feedback.jsx';
import Setting    from './setting/setting.jsx';
import ModifyPassword   from './modifyPassword/modifyPassword.jsx';
import ForgetPassword   from './modifyPassword/forgetPassword.jsx';
import MobileAuth       from './auth/mobileAuth.jsx';
import Invite           from './invite/invite.jsx';
import InvitePacket     from './invite/invitePacket.jsx';
import About            from './about/about.jsx';
import Winning          from './packet/winning.jsx';
import Share          from './packet/share.jsx';
import WinningLevel   from './winningLevel/winningLevel.jsx';
import Enjoy   from './enjoy/enjoy.jsx';
import Commonweal   from './commonweal/commonweal.jsx';
import Works   from './works/works.jsx';

let search    = common.getsearch();
let iswechat  = common.isWechat();
let token     = common.getcookies('token');
let isRefresh = common.getcookies('refreshTokenTime');
let isspringrass    = /springrass.com$/.test(location.hostname);

const authorize = (nextState, replace) => {
    if(iswechat && isspringrass){
         if(token){
            if(!common.getcookies('refreshTokenTime')){
            	refreshToken();
            }
         }else{
         	if(search.code && search.isBind != 1){
                wechatLogin(nextState.location.pathname);
         	}else{
				location = location.protocol + '//' + location.hostname + '/' + 'redirect.html' + location.search + location.hash.split('?')[0];         	        		
         	}
         }  
    }
}

const refreshToken = () => {
    let server = new ServerRequest();
    server.post({
        url:'refreshToken',
        async: false,
        maskLayer:true,
        success:function(response){
            common.setcookies('refreshTokenTime',Date.now(),2);
            common.setcookies('token',response.token,7);
        },
        error:function(msg,response,xhr){
            if (response.code == 900003) {
                common.setcookies('refreshTokenTime', '', -1);
                common.setcookies('token', '', -1);
                location = location.protocol + '//' + location.hostname + '/' + 'redirect.html' + location.search + location.hash.split('?')[0];
            }
        }
    });
}

const wechatLogin = (pathname) =>{
    let server = new ServerRequest();
    server.post({
        url  : 'V2WechatLogin',
        async: pathname=='/mine' ? false : true,
        maskLayer:true,
        data:{
            code :search.code,
            state:search.state,
            recommendCode:search.shareId
        },
        success:function(response){
            common.setcookies('refreshTokenTime',Date.now(),2);
            common.setcookies('token',response.token,7);
            common.setcookies('authorize_code', code, 7);                	
        }
    }); 	
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Nav}>
			<IndexRoute component={Index} onEnter={authorize}/>
			<Route path="mine" component={Mine}  onEnter={authorize}/>
			<Route path="register(/:videoId)(/:playId)"  component={Register}/>
			<Route path="inviteRegister(/:shareId)" component={Register}/>
			<Route path="login(/:videoId)(/:playId)"  component={Login}/>
			<Route path="forgetPassword(/:videoId)(/:playId)"  component={ForgetPassword}/>
			<Route path="wallet(/:tab)" component={Wallet}/>
			<Route path="feedback" component={Feedback}/>
			<Route path="setting" component={Setting}/>
			<Route path="modifyPassword" component={ModifyPassword}/>
			<Route path="mobileAuth" component={MobileAuth}/>
			<Route path="withdraw" component={Withdraw}/>
			<Route path="invite" component={Invite}/>
			<Route path="invitePacket/:videoId" component={InvitePacket}/>
			<Route path="about" component={About}/>
			<Route path="packetShare/:videoId/:playId/:shareId" component={Share}/>
			<Route path="result/:videoId/:playId" component={Winning}/>
			<Route path="winningLevel/:videoId" component={WinningLevel}/>
			<Route path="enjoy" component={Enjoy}/>
            <Route path="commonweal" component={Commonweal}/>
			<Route path="works(/:authorId)" component={Works}/>
		</Route>
	</Router>,
	document.querySelector('.container-wrapper')
);
