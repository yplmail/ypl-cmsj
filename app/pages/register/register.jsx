import './register.css';
import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5/md5'
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import ClosePassword from '../../images/close_password_icon.png';
import OpenPassword from '../../images/open_password_icon.png';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobile : '',
            smsCode: '',
            pwd    : '',
            passwordType:'password',
            background  : 'url('+ClosePassword+')',
            codeTips:'获取验证码'
        }
        this.time = 0;
        this.mobileChange = this.mobileChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.changePasswordType = this.changePasswordType.bind(this);
    }

    componentWillMount(){
        if(this.props.params.shareId){
             common.changeTitle('邀请注册');
        }
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

    handleBlur(event){
        if(!/^1\d{10}$/.test(this.state.mobile)){
          return false;
        }
        let val = event.target.value;
        let server = new ServerRequest();
        server.post({
            url : 'checkMobile',
            data: {
              mobile : val,
            },
            success:function(response){
                if(response.isRegister === "true"){
                    layer.open({content:'您已是香甜诱人的草莓',time:2,end:function(){
                        location.hash = '/login'
                    }});
                }
            }.bind(this)
        });
    }

    handleCode(event){
        if(this.state.mobile == ''){
          layer.open({content:'请输入您的手机号码',time:2});
          return false;
        }
        if(!/^1\d{10}$/.test(this.state.mobile)){
          layer.open({content:'请输入正确的手机号码',time:2});
          return false;
        }
        if(this.time > 0) return false;
        let server = new ServerRequest();
        server.post({
            url : 'sendSmsCode',
            maskLayer:true,
            data:{
               type  : 1,
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
        if(!/\d{4}/.test(this.state.smsCode)){
          layer.open({content:'请输入正确的短信验证码',time:2});
          return false;
        }

        if(this.state.pwd == ''){
          layer.open({content:'请设置您的登录密码',time:2});
          return false;
        }

        if(!/^[0-9a-zA-Z]{6,20}$/.test(this.state.pwd)){
          layer.open({content:'请设置6-20位数字或英文的密码',time:2});
          return false;
        }

        this.registerHandler();
    }

    registerHandler(){
        let server = new ServerRequest();
        let data = {
          mobile : this.state.mobile,
          smsCode: this.state.smsCode,
          pwd    : md5(this.state.pwd),
        }
        if(this.props.params.shareId) {
          data['recommendCode'] = this.props.params.shareId;
        }
        server.post({
            url : 'register',
            maskLayer:true,
            data: data,
            success:function(response){
              common.setcookies('refreshTokenTime',Date.now(),6);
              common.setcookies('token',response.token,7);
              let params = this.props.params;
              if(common.isWechat() && /springrass.com$/.test(location.hostname)){
                  if(params.videoId && params.playId){
                      location = './redirect.html?videoId='+params.videoId+'&playId='+params.playId;
                  }else{
                      location = './redirect.html';
                  }
              }else{
                  location.hash = '/';
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
                        onChange={this.mobileChange} onBlur={this.handleBlur} maxLength="11"/>
                     </li>

                     <li>
                        <input id="code" type="tel" placeholder="请输入验证码" name="smsCode" onChange={this.codeChange} maxLength="4"/>
                        <label ref="smsCode" onClick={this.handleCode}>{this.state.codeTips}</label>
                     </li>

                     <li>
                        <input type='password' style={{height:'0',position:'absolute',top:'-10000px',visibility:'hidden'}}/>
                        <input id="password" type={this.state.passwordType} placeholder="请设置您的密码(6-20位数字或英文)" name="pwd" onChange={this.passwordChange} maxLength="20"/>
                        <span onClick={this.changePasswordType} style={{backgroundImage:this.state.background}}></span>
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

