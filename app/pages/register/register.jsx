import React from 'react';
import {Link} from 'react-router';
import './register.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
           <div className="register-wrapper">
               <div className="register-content">
                 <ul>
                     <li>
                        <label for="mobile"></label>
                        <input id="mobile" type="text" placeholder="请输入您的手机号"/>
                     </li>

                     <li>
                        <input id="code" type="tel" placeholder="请输入验证码"/>
                        <label for="code">获取验证密码</label>
                     </li>
                     <li>
                        <input id="password" type="text" placeholder="请设置您的密码"/>
                        <label for="password"></label>
                     </li>

                     <li>
                         <a>立即注册</a>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default Login;

