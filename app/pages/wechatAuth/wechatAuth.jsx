import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import './wechatAuth.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var query = this.props.location.query;
        if(query.code && query.state){
            let server = new ServerRequest();
            server.post({
                url : 'bindWechat',
                data:{
                    code:query.code,
                    state:query.state
                },
                success:function(response){
                    layer.open({content:'认证成功！',time:2, end:function(index){
                        location.hash = '/';
                    }.bind(this)});              
                },
                error:function(msg){
                    layer.open({content:msg,time:2,end:function(index){
                        location.hash = '/mine';
                    }.bind(this)});
                }
            });       
        }
    }    

    authHandle(){      
        location.href = './redirect.html?scope=snsapi_userinfo';
    }

    render(){
        return (
           <div className="wechatAuth-wrapper">
	           <div className="content">	
		           <div className="logo-outer">
                       <p className="springrass_logo"></p>
			           <p className="springrass_name">草莓视界</p>
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
