import './login.css';
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
            pwd    : '',
            passwordType:'password',
            background  : 'url('+ClosePassword+')',
            display:'none'
        }
        this.mobileChange = this.mobileChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginHandle = this.loginHandle.bind(this);
        this.validate = this.validate.bind(this);
        this.changePasswordType = this.changePasswordType.bind(this);
    }

    componentDidMount(){
        if(common.isWechat()){
            this.setState({
                display: 'block'
            });
        }
    }

    mobileChange(event){
        this.setState({
            mobile: event.target.value
        });
    }

    passwordChange(event){
        this.setState({
            pwd: event.target.value
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
        if(this.state.pwd == ''){
          layer.open({content:'请输入您的登录密码',time:2});
          return false;
        }
        if(this.state.pwd.length < 6 || this.state.pwd.length > 20){
          layer.open({content:'请输入6-20位字符的密码',time:2});
          return false;
        }
        this.loginHandle();
    }

    loginHandle(){
        let server = new ServerRequest();
        server.post({
            url : 'login',
            maskLayer:true,
            data: {
              mobile : this.state.mobile,
              pwd    : md5(this.state.pwd),
            },
            success:function(response){
                common.setcookies('refreshTokenTime',Date.now(),2);
                common.setcookies('token',response.token,7);
                if(common.isWechat() && /springrass.com$/.test(location.hostname)){
                    let params = this.props.params;
                    if(params.videoId && params.playId){
                        var search = common.getsearch();
                        if(search.source == 'video'){
                            location = location.protocol + '//' + location.host + '/multipage/video.html?videoId='+params.videoId+'&playId='+params.playId;
                        }
                        if(search.source == 'detail'){
                            location = location.protocol + '//' + location.host + '/multipage/detail.html?videoId='+params.videoId+'&playId='+params.playId;
                        }
                    }else{
                        location = location.protocol + '//' + location.host+'/#/';             
                    }
                }else{
                    location = location.protocol + '//' + location.host+'/#/';  
                }
            }.bind(this)
        });
    }

    wxLoginHandle(){
        /**
         *   关于微信授权登录绑定有三种情况 ：
         *   1、平常从服务号里进入 ：静默登录
         *   2、点击登录页微信登录 ：授权登录
         *   3、微信绑定           ：授权绑定
         **/
        //location = location.protocol + '//' + location.hostname + '/?scope=snsapi_userinfo';      
        let params = this.props.params;
        if(params.videoId && params.playId){
            var search = common.getsearch();
            if(search.source == 'video'){
                location = location.protocol + '//' + location.host + '/multipage/video.html?scope=snsapi_userinfo&videoId='+params.videoId+'&playId='+params.playId;
            }
            if(search.source == 'detail'){
                location = location.protocol + '//' + location.host + '/multipage/detail.html?scope=snsapi_userinfo&videoId='+params.videoId+'&playId='+params.playId;              
            }
        }else{
            location = location.protocol + '//' + location.hostname + '/?scope=snsapi_userinfo';               
        }     
    }

    render(){
          var linkPath = '/register';
          var forgetPasswordLink = '/forgetPassword';
          var params = this.props.params;
          if(params.videoId && params.playId){
              linkPath = linkPath + '/' + params.videoId + '/' + params.playId;
              forgetPasswordLink = forgetPasswordLink + '/' + params.videoId + '/' + params.playId;
          }
          return (
              <div className="login-wrapper">
                  <div className="login-content">
                      <div className="login-logo">
                          <span className="logo"></span>
                          <h1 className="title">草莓视频</h1>
                      </div>
                      <ul>
                          <li>
                            <label htmlFor="mobile"></label>
                            <input id="mobile" type="tel" placeholder="请输入您的手机号" value={this.state.mobile}  onChange={this.mobileChange} maxLength="11" />
                          </li>

                          <li>
                          <label htmlFor="password"></label>
                          <input type='password' style={{height:'0',position:'absolute',top:'-10000px',visibility:'hidden'}}/>
                          <input id="password" type={this.state.passwordType} placeholder="请输入您的密码" value={this.state.pwd}  onChange={this.passwordChange} maxLength="20" />
                          <span onClick={this.changePasswordType} style={{backgroundImage:this.state.background}}></span>
                          </li>

                          <li>
                          <Link to={forgetPasswordLink}>忘记密码?</Link>
                          </li>

                          <li>
                          <a onClick={this.validate}>登录</a>
                          </li>

                          <li>
                          <Link to={linkPath}>没有账号、立即注册</Link>
                          </li>
                      </ul>
                  </div>

                  <div className="wechat-login">
                      <h2><span>微信登录</span></h2>
                      <p><a onClick={this.wxLoginHandle.bind(this)}></a></p>                      
                  </div>
              </div>
        )
    }
}

export default Login;

