import React from 'react';
import {Link} from 'react-router';
import './login.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
           <div className="login-wrapper">
               <div className="login-content">
                 <ul>
                     <li>
                        <label></label>
                        <input id="mobile" type="text" placeholder="请输入您的手机号"/>
                     </li>

                     <li>
                        <label></label>
                        <input id="password" type="text" placeholder="请设置您的密码"/>
                        <span></span>
                     </li>

                    <li>
                        <a>忘记密码？</a>
                     </li>

                    <li>
                        <a>登陆</a>
                     </li>

                    <li>
                        <a>没有账号、立即注册</a>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default Login;

