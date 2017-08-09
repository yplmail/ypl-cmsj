import React from 'react';
import {Link,hashHistory} from 'react-router';
import common from 'common/common';
import './mobileAuth.css';
import ClosePassword from '../../images/auth_eyeclose.png';
import OpenPassword from '../../images/auth_eyeopen.png';
import ServerRequest from 'server/serverRequest';
import ENVIRONMENT from 'config/config';
import md5 from 'md5/md5';

class MobileAuth extends React.Component{
  	constructor(props){
  		super(props);
  		this.state = {
  			passwordType : 'password',
  			eyeType      : 'url('+ClosePassword+')',
        mobile       : '',
        smsCode      : '',
        pwd          : '',
  			codeToken    : '',
  			imageCode    : '',
  			imageUrl     : '',
  			codeTips     : '获取验证码',
        tempAccessToken: ''			 
  		}

  	}

    componentDidMount(){
        this.getImageToken();
    }

    getImageToken(){
        let server = new ServerRequest();
        server.get({
           url:'getImageToken',
           success:function(result){
              this.setState({
                  imageCode : '',
                  codeToken : result.codeToken,
                  imageUrl: ENVIRONMENT[process.env.NODE_ENV] + 'config/getCode?codeToken='+result.codeToken
              });
           }.bind(this)
        })
    }

	changePasswordType(){
        if(this.state.passwordType === 'password'){
	        this.setState({
	        	passwordType : 'text',
	        	eyeType      : 'url('+OpenPassword+')'
	        });
        }else{
	        this.setState({
	        	passwordType:'password',
	        	eyeType      : 'url('+ClosePassword+')'
	        });        	
        }
	}

    imageCodeChange(event){
        this.setState({
            imageCode: event.target.value
        });
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
            pwd : event.target.value
        });
    }

    handleBlur(event){
        if(!/^1\d{10}$/.test(this.state.mobile)){
          return false;
        }
        let server = new ServerRequest();
        server.post({
            url : 'checkCanBind',
            data: {
              type      : 2,
              checkData : this.state.mobile,
            },
            success:function(response){
                if(response.msg){
                    layer.open({
                        content: response.msg,
                        style:'background-color:#fff; color:#323232;width:70%', //自定风格
                        btn: ['确定', '取消'],
                        yes: function(index){
                            layer.close(index);
                            this.setState({tempAccessToken : response.tempAccessToken});                                         
                        }.bind(this),
                        no:function(){
                            this.setState({mobile:''});
                        }.bind(this)
                    });
                }else{
                	  this.setState({tempAccessToken : response.tempAccessToken});                 
                }
            }.bind(this),
            error : function(msg ,response ,xhr){
                if (response.code == 900003) {
                    common.setcookies('refreshTokenTime', '', -1);
                    common.setcookies('token', '', -1);
                    location.hash = '/login';
                } else if (response.code == 900007) {
                    //微信绑定接口
                } else {
                    layer.open({content:msg || '网络有点小情绪',time:2, end:function(){
                        this.setState({mobile:''});                  
                    }.bind(this)});
                }
            }.bind(this)
        });
    }

	sendSmsCode(){
        if(this.state.mobile == ''){
	          layer.open({content:'请输入您的手机号码',time:2});
	          return false;
        }
        if(!/^1\d{10}$/.test(this.state.mobile)){
	          layer.open({content:'请输入正确的手机号码',time:2});
	          return false;
        }	

        if(!this.state.imageCode){
	          layer.open({content:'请输入图片验证码',time:2});
	          return false;
        }

        if(this.state.imageCode.length < 4){
	          layer.open({content:'请输入正确的图片验证码',time:2});
	          return false;
        }	

		if(this.time > 0) return false;

		let server = new ServerRequest();

		server.post({
			url : 'sendSmsCode',
			maskLayer:true,
			data:{
				type  : 3,
				mobile: this.state.mobile,
				codeToken   : this.state.codeToken,
        imgCode     : this.state.imageCode
		  },
			success:function(response){
          this.refs.smsCode.style.opacity = 0.3;
          this.time = 60;
          this.timer = setInterval(function(){
              this.setState({'codeTips':(--this.time) + "S后重新获取"});
              if(this.time == 0){
                  this.refs.smsCode.style.opacity = 1;
                  this.setState({
                      'codeTips':"重新获取",
                      'imageCode' : ''
                  });
                  this.getImageToken();						
                  clearInterval(this.timer);
              }
          }.bind(this),1000);
			}.bind(this),
			error:function(msg, response, xhr){
          if (response.code == 900003) {
              common.setcookies('refreshTokenTime', '', -1);
              common.setcookies('token', '', -1);
              location.hash = '/login';
          } else if (response.code == 900007) {
              //微信绑定接口
          } else if(response.code == 800004){
              layer.open({content:msg,time:2,end:function(){
                  this.getImageToken();                      
              }.bind(this)});              
          }else {
              layer.open({content:msg || '网络有点小情绪',time:2});
          }
			}.bind(this)
		});        
	}

	vaildate(){
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

      this.submit();
	}

	submit(tempToken){
        let server = new ServerRequest();
        server.post({
            url : 'V2BindMobile',
            maskLayer:true,
            data: {
  		          mobile : this.state.mobile,
  		          smsCode: this.state.smsCode,
  		          pwd    : md5(this.state.pwd),    
  		          tempAccessToken : this.state.tempAccessToken       	
            },
            success:function(response){
                layer.open({content:'手机号绑定成功！',time:2,end:function(){
            				hashHistory.goBack();                                   
                }.bind(this)});                
            }.bind(this)
        });
	}

	render(){
		return(
           <div className="mobileauth-wrapper">
				<div className="auth-tips">为保证您的账户安全，请绑定手机号码</div>
				<ul  className="auth-content">
					<li>
					   <input type="tel" maxLength='11' placeholder="请输入您的手机号" value={this.state.mobile}
                        onChange={this.mobileChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
					</li>

					<li>
						<img src={this.state.imageUrl} />
						<input type="text" placeholder="请输入图片验证码" maxLength="4" value={this.state.imageCode} onChange={this.imageCodeChange.bind(this)}/>
						<span onClick={this.getImageToken.bind(this)}>换一张</span>
					</li>	

					<li>
						<input type="tel" maxLength='4' placeholder="请输入验证码" value={this.state.smsCode} onChange={this.codeChange.bind(this)}/>
						<span className="auth-code" ref='smsCode' onClick={this.sendSmsCode.bind(this)}>{this.state.codeTips}</span>
					</li>
					<li>
            <input type='password' style={{height:'0',position:'absolute',top:'-10000px',visibility:'hidden'}}/>
            <input id="password" type={this.state.passwordType} placeholder="请设置登录密码(6-20位数字或英文)" name="pwd" value={this.state.pwd} 
            onChange={this.passwordChange.bind(this)} maxLength="20"/>
						<span className="password-eye" onClick={this.changePasswordType.bind(this)} style={{backgroundImage:this.state.eyeType}}></span>
					</li>
				</ul>
				<div className="auth-button">
					<a className="button-inner" onClick={this.vaildate.bind(this)}>完成</a>				
				</div>
        </div>
		)
	}
}

export default  MobileAuth;
