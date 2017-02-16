import React from 'react';
import {Link} from 'react-router';
import './mobileAuth.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
           <div className="mobileAuth-wrapper">
               <div className="mobileAuth-content">
                 <ul>
                     <li>
                        <label htmlFor="mobile"></label>
                        <input id="mobile" type="text" placeholder="请输入您的手机号"/>
                     </li>

                     <li>
                        <input id="code" type="tel" placeholder="请输入验证码"/>
                        <label htmlFor="code">获取验证密码</label>
                     </li>

                     <li>
                         <a>确定认证</a>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default Login;

