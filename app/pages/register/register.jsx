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
            pwd    : '',
            passwordType:'password',
            codeTips:'获取验证密码'
        }
        this.time = 0;
        this.mobileChange = this.mobileChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.validate = this.validate.bind(this);
        this.changePasswordType = this.changePasswordType.bind(this);
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

    handleCode(event){
        if(this.time > 0) return;
        let server = new ServerRequest();
        server.post({
            url : 'sendSmsCode',
            data:{
               type  : 1,
               mobile: this.state.mobile
            },
            success:function(response){
                this.refs.smsCode.style.opacity = 0.3;
                this.time = 60;
                this.timer = setInterval(function(){
                    this.setState({'codeTips':"重新获取("+(--this.time)+"s)"});
                    if(this.time == 0){
                        this.refs.smsCode.style.opacity = 1;
                        this.setState({'codeTips':"重新获取"});
                        clearInterval(this.timer);
                    }
                }.bind(this),1000);  
            }.bind(this)
        });      
    }

    changePasswordType(){
        let type = 'password';
        if(this.state.passwordType == 'password'){
            type = 'text';
        }
        this.setState({passwordType: type});        
    }

    validate(){
        if(this.state.mobile == ''){
          layer.open({content:'请输入您的手机号码',time:2});
          return false;
        }
        if(!/^1\d{10}$/.test(this.state.mobile)){
          layer.open({content:'请输入正确的手机号码',time:2});
          return false;
        }

        if(this.state.smsCode == ''){
          layer.open({content:'请输入短信验证码',time:2});
          return false;
        }
        if(this.state.smsCode.length != 4){
          layer.open({content:'请输入正确的短信验证码',time:2});
          return false;
        } 

        if(this.state.pwd == ''){
          layer.open({content:'请设置您的登录密码',time:2});
          return false;
        }
        if(this.state.pwd.length < 6 || this.state.pwd.length > 20){
          layer.open({content:'请输入6到20位长度的登录密码',time:2});
          return false;
        }   
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
              let params = this.props.params;
              if(params.videoId && params.playId){
                  location.hash="/detail/"+params.videoId+'/'+params.playId;
              }else{
                  location.hash="/list";
              }
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
                        <input id="mobile" type="tel" placeholder="请输入您的手机号" name="mobile" value={this.state.mobile}
                        onChange={this.mobileChange} maxLength="11"/>
                     </li>

                     <li>
                        <input id="code" type="tel" placeholder="请输入验证码" name="smsCode" onChange={this.codeChange} maxLength="4"/>
                        <label ref="smsCode" htmlFor="code" onClick={this.handleCode}>{this.state.codeTips}</label>
                     </li>
                     <li>
                        <input id="password" type={this.state.passwordType} placeholder="请设置您的密码" name="pwd" onChange={this.passwordChange} maxLength="20"/>
                        <label htmlFor="password" onClick={this.changePasswordType}></label>
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

