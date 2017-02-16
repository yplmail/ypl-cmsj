import React from 'react';
import {Link} from 'react-router';
import './wechatAuth.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
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

		           <a className="auth-button">确定认证</a>
	           </div>
           </div>
        )
    }
}

export default Login;
