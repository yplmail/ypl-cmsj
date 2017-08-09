import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './setting.css';
class Setting extends React.Component{
	constructor(props){
		super(props);
    this.state = {
        isBindWechat : false,
        wachat       : '',
        isBindMobile : false,
        mobile       : ''
    }
    this.confirm = this.confirm.bind(this);
    this.logout = this.logout.bind(this);
	}

  componentDidMount(){   
      this.getHomeData();          
  }

  getHomeData(){
      let server = new ServerRequest();
      server.post({
          url: 'home',
          maskLayer:true,
          success:function(response){           
              this.setState({
                  isBindWechat : response.isWechatBinded == 'true' ? true : false,
                  wachat       : response.isWechatBinded == 'true' ? '已绑定' : '去绑定',
                  isBindMobile : response.mobile ? true : false,
                  mobile       : response.mobile ? response.mobile : '去绑定'
              })
          }.bind(this)
      })
  }


  wachatLink(){
      if(!this.state.isBindWechat){
          location.href = './redirect.html?scope=snsapi_userinfo&isBind=1#/mine';        
      }
  }

  mobileLink(){
      if(!this.state.isBindMobile){
          location.hash = '/mobileAuth';
      }    
  }  

  confirm(){
      layer.open({
          content: '请问您确定要退出当前账号吗？',
          style:'background-color:#fff; color:#323232;width:70%', //自定风格
          btn: ['确定', '取消'],
          yes: function(index){
              layer.close(index);
              this.logout();
          }.bind(this)
      });
  }

  logout(){
      let server = new ServerRequest();
      server.post({
          url: 'logout',
          maskLayer:true,
          success:function(response){
              common.setcookies('refreshTokenTime','',-1);
              common.setcookies('token','',-1);
              common.setcookies('authorize_code','',-1);
              location = '#/login';
          }.bind(this),
          error:function(msg,response,xhr){
              common.setcookies('refreshTokenTime','',-1);
              common.setcookies('token','',-1);
              common.setcookies('authorize_code','',-1);
              location = '#/login';            
          }
      })
  }

	render(){
       return(
           <div className="setting-wrapper">
              <ul>
                  <li>
	                  <a onClick={this.wachatLink.bind(this)} style={{color:this.state.isBindWechat ? '#999' : '#333'}}>
                        <span>微信绑定</span>
    	                  <span>{this.state.wachat}</span>
                    </a>
                  </li>

                  <li>
                    <a onClick={this.mobileLink.bind(this)} style={{color:this.state.isBindMobile ? '#999' : '#333'}}>
                        <span>手机绑定</span>
                        <span>{this.state.mobile}</span>
                    </a>
                  </li>

                  <li>
	                  <Link to="/modifyPassword">修改密码</Link>
                  </li>
              </ul>
              <div className="setting-btn" onClick={this.confirm}>退出当前账号</div>
           </div>
       )
	}
}

export default Setting;
