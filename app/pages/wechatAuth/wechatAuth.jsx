import React from 'react';
import {Link} from 'react-router';
import './wechatAuth.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    authHandle(){
    	let url = location.href.split('?')[0];
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx69d84247bc78b780&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=chuncao#wechat_redirect";
    }

    render(){
        return (
           <div className="wechatAuth-wrapper">
	           <div className="content">	
		           <div className="logo-outer">
			           <img src="../../images/springGrass_logo.png" />
			           <p>春草传播</p>
		           </div>

		           <div className="wechat-detail">
			           <h2>登陆后该应用将获得以下权限</h2>
			           <p>获得你的公开信息（昵称、头像等）</p>
		           </div>

		           <a className="auth-button" onClick={this.authHandle}>确定认证</a>
	           </div>
           </div>
        )
    }
}

export default Login;
