import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './setting.css';
class Setting extends React.Component{
	constructor(props){
		super(props);
    this.state = {
        isBindWechat : false
    }
    this.confirm = this.confirm.bind(this);
    this.logout = this.logout.bind(this);
	}

  componentDidMount(){
      let server = new ServerRequest();
      server.post({
          url: 'home',
          maskLayer:true,
          success:function(response){
             if(response.isWechatBinded == 'true'){
                this.setState({
                  isBindWechat : true,
                  wachat       : '已绑定'
                })
             }else{
                this.setState({
                  isBindWechat: false,
                  wachat      : '去绑定'
                })
             }
          }.bind(this)
      })    
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
            location.hash = '/login';
          }.bind(this)
      })   
  }

  linkHandle(){
      if(!this.state.isBindWechat){
          location.href = './redirect.html?scope=snsapi_userinfo';      
      }
  }

	render(){
       return(
           <div className="setting-wrapper">
              <ul>
                  <li>
	                  <a onClick={this.linkHandle} style={{color:this.state.isBindWechat ? '#333' : '#999'}}>
                        <span>微信绑定</span>
    	                  <span>{this.state.wachat}</span>
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