import './register.css';
import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5/md5.js'
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobile : '',
            smsCode: '',
            pwd    : ''
        }
        this.mobileChange = this.mobileChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.validate = this.validate.bind(this);
    }

    mobileChange(event){
        this.setState({
            mobile: event.target.value
        });
    }

    codeChange(event){
        this.setState({
            smsCode: event.target.value
        });
    }

    passwordChange(event){
        this.setState({
            pwd: event.target.value
        });
    }

    handleCode(){
        let server = new ServerRequest();
        server.post({
            url : 'sendSmsCode',
            data:{
               type  : 1,
               mobile: this.state.mobile
            }
        });
    }

    validate(){
        this.registerHandler();
    }

    registerHandler(){
        let server = new ServerRequest();
        let data = this.state;
        data.pwd = md5(data.pwd);
        server.post({
            url : 'register',
            data: data,
            success:function(response){
              common.setcookies('token',response.token,7);
              location.hash="/detail/0/"+this.props.params.id+'/1';
            }.bind(this)
        });
    }

    render(){
        return (
           <div className="register-wrapper">
               <div className="register-content">
                 <ul>
                     <li>
                        <label htmlFor="mobile"></label>
                        <input id="mobile" type="text" placeholder="请输入您的手机号" name="mobile" value={this.state.mobile} 
                        onChange={this.mobileChange} maxLength="11"/>
                     </li>

                     <li>
                        <input id="code" type="tel" placeholder="请输入验证码" name="smsCode" onChange={this.codeChange} maxLength="4"/>
                        <label htmlFor="code" onClick={this.handleCode}>获取验证密码</label>
                     </li>
                     <li>
                        <input id="password" type="password" placeholder="请设置您的密码" name="pwd" onChange={this.passwordChange} maxLength="20"/>
                        <label htmlFor="password"></label>
                     </li>

                     <li>
                         <a ref="registerButton" onClick={this.validate}>立即注册</a>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default Login;

