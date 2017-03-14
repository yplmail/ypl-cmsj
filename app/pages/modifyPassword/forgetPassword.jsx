import './forgetPassword.css';
import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5/md5.js'
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import ClosePassword from '../../images/close_password_icon.png';
import OpenPassword from '../../images/open_password_icon.png';

class ForgetPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobile : '',
            smsCode: '',
            pwd    : '',
            passwordType:'password',
            background  : 'url('+ClosePassword+')',
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
               type  : 2,
               mobile: this.state.mobile
            },
            success:function(response){
                this.refs.smsCode.style.opacity = 0.3;
                this.time = 60;
                this.timer = setInterval(function(){
                    this.setState({'codeTips':(--this.time) + "S后重新获取"});
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
        let url  = 'url('+ClosePassword+')';
        if(this.state.passwordType == 'password'){
            type = 'text';
            url  = 'url('+OpenPassword+')';
        }
        this.setState({
            passwordType: type,
            background  : url
        });     
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
        server.post({
            url : 'resetLoginPwd',
            data: {
              mobile:this.state.mobile,
              smsCode:this.state.smsCode,
              newPwd:md5(this.state.pwd)
            },
            success:function(response){
              let params = this.props.params;
              if(params.videoId && params.playId){
                  location.hash="/detail/"+params.videoId+'/'+params.playId;
              }else{
                  location.hash="/";
              }
            }.bind(this)
        });
    }

    render(){
        return (
           <div className="forgetPassword-wrapper">
               <div className="forgetPassword-content">
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
                        <input type='password' style={{height:'0',position:'absolute',top:'-10000px',visibility:'hidden'}}/>
                        <input id="password" type={this.state.passwordType} placeholder="请设置您的密码" name="pwd" onChange={this.passwordChange} maxLength="20"/>
                        <span onClick={this.changePasswordType} style={{backgroundImage:this.state.background}}></span>
                     </li>

                     <li>
                         <a ref="forgetPasswordButton" onClick={this.validate}>确定</a>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default ForgetPassword;

