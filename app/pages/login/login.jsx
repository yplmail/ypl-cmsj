import './login.css';
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
            pwd    : ''
        }
        this.mobileChange = this.mobileChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginHandle = this.loginHandle.bind(this);
    }

    componentDidMount(){

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

    loginHandle(){
        let params = this.state;
        params.pwd = md5(params.pwd);
        let server = new ServerRequest();
        server.post({
            url : 'login',
            data:params,
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
                        <input id="mobile" type="text" placeholder="请输入您的手机号" value={this.state.mobile}  onChange={this.mobileChange}/>
                     </li>

                     <li>
                        <label htmlFor="password"></label>
                        <input id="password" type="password" placeholder="请设置您的密码" value={this.state.pwd}  onChange={this.passwordChange}/>
                        <span></span>
                     </li>

                    <li>
                        <a>忘记密码？</a>
                     </li>

                    <li>
                        <a ref="loginButton" onClick={this.loginHandle}>登陆</a>
                     </li>

                    <li>
                        <Link to={linkPath}>没有账号、立即注册</Link>
                     </li>
                 </ul>
               </div>
           </div>
        )
    }
}

export default Login;

