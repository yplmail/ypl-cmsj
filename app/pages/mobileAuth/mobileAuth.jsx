import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import './mobileAuth.css';

class MobileAuth extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state = {
            mobile    : '',
            smsCode   : '',
            codeTips:'获取验证密码'      
        }
        this.mobileChange = this.mobileChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
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

    handleCode(event){
        if(!/^1\d{10}$/.test(this.state.mobile)) return false;
        if(this.time > 0) return false;
        let server = new ServerRequest();
        server.post({
            url : 'sendSmsCode',
            data:{
               type  : 3,
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
        this.auth();
    }

    auth(){
        let server = new ServerRequest();
        server.post({
            url : 'bindMobile',
            data: {
                mobile : this.state.mobile,
                smsCode: this.state.smsCode           
            },
            success:function(response){
                layer.open({content:'认证成功！',time:2, end:function(index){
                    this.context.router.goBack();
                }.bind(this)});
            }.bind(this)
        });        
    }

    render(){
        return (
           <div className="mobileAuth-wrapper">
               <div className="mobileAuth-content">
                 <ul>
                     <li>
                        <label htmlFor="mobile"></label>
                        <input id="mobile" type="tel" placeholder="请输入您的手机号" value={this.state.mobile}  onChange={this.mobileChange} maxLength="11" />
                     </li>

                     <li>
                        <input id="code" type="tel" placeholder="请输入验证码" name="smsCode" onChange={this.codeChange} maxLength="4"/>
                        <label ref="smsCode" htmlFor="code" onClick={this.handleCode}>{this.state.codeTips}</label>
                     </li>

                     <li>
                         <a onClick={this.validate}>确定认证</a>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

MobileAuth.contextTypes = {
     router: React.PropTypes.object
}

export default MobileAuth;

