import './login.css';
import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5/md5.js'
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';

class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.button = this.refs.loginButton;
    }

    loginHandler(){

    }

    render(){
        return (
           <div className="login-wrapper">
               <div className="login-content">
                 <ul>
                     <li>
                        <label htmlFor="mobile"></label>
                        <input id="mobile" type="text" placeholder="请输入您的手机号"/>
                     </li>

                     <li>
                        <label htmlFor="password"></label>
                        <input id="password" type="password" placeholder="请设置您的密码"/>
                        <span></span>
                     </li>

                    <li>
                        <a>忘记密码？</a>
                     </li>

                    <li>
                        <a ref="loginButton" onClick={this.loginHandler}>登陆</a>
                     </li>

                    <li>
                        <Link path="register/0">没有账号、立即注册</Link>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default Login;

