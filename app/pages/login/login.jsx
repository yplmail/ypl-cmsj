import './login.css';
import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5/md5'
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobile : '',
            pwd    : '',
            passwordType:'password',
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
        if(this.state.pwd == ''){
          layer.open({content:'请输入您的登录密码',time:2});
          return false;
        }
        if(this.state.pwd.length < 6 || this.state.pwd.length > 20){
          layer.open({content:'请输入6到20位长度的登录密码',time:2});
          return false;
        }
        this.loginHandle();
    }

    loginHandle(){
        let server = new ServerRequest();
        server.post({
            url : 'login',
            data: {
              mobile : this.state.mobile,
              pwd    : md5(this.state.pwd),              
            },
            success:function(response){
                common.setcookies('token',response.token,7);
                let params = this.props.params;
                if(params.videoId && params.playId){
                    location.hash="/detail/"+params.videoId+'/'+params.playId;
                }else{
                    if(common.isWechat()){
                        location = './redirect.html';
                    }else{
                        location.hash = '/';
                    }
                }
            }.bind(this)
        });
    }

    render(){
          var linkPath = '/register';
          var params = this.props.params;
          if(params.videoId && params.playId){
              linkPath = linkPath + '/' + params.videoId + '/' + params.playId;
          }
          return (
              <div className="login-wrapper">
                  <div className="login-content">
                      <ul>
                      <li>
                      <label htmlFor="mobile"></label>
                      <input id="mobile" type="tel" placeholder="请输入您的手机号" value={this.state.mobile}  onChange={this.mobileChange} maxLength="11" />
                      </li>

                      <li>
                      <label htmlFor="password"></label>
                      <input type='password' style={{height:'0',position:'absolute',top:'-10000px',visibility:'hidden'}}/>
                      <input id="password" type={this.state.passwordType} placeholder="请设置您的密码" value={this.state.pwd}  onChange={this.passwordChange} maxLength="20" />
                      <span onClick={this.changePasswordType}></span>
                      </li>

                      <li>
                      <Link to="forgetPassword">忘记密码？</Link>
                      </li>

                      <li>
                      <a onClick={this.validate}>登陆</a>
                      </li>

                      <li>
                      <Link to={linkPath}>没有账号、立即注册</Link>
                      </li>
                      </ul>

                      <div className="third-login" style={{display:this.state.display}}>
                        <h2>
                          <span>第三方账号登陆</span>
                        </h2>
                        <a href="./redirect.html"></a>
                      </div>
                  </div>
              </div>
        )
    }
}

export default Login;

