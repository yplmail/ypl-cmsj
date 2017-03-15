import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './setting.css';
class Setting extends React.Component{
	constructor(props){
		super(props);
    this.state = {
        isBindWechat:''
    }
    this.confirm = this.confirm.bind(this);
    this.logout = this.logout.bind(this);
	}

  componentDidMount(){
      let server = new ServerRequest();
      server.post({
          url: 'home',
          success:function(response){
             if(response.isWechatBinded == 'true'){
                this.setState({wachat:'已绑定'})
             }else{
                this.setState({wachat:'去绑定'})
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
          success:function(response){
            common.setcookies('token','',-1); 
            location.hash = '/login';
          }.bind(this)
      })   
  }

	render(){
       return(
           <div className="setting-wrapper">
              <ul>
                  <li>
	                  <Link to="/wechatAuth">
                        <span>微信绑定</span>
    	                  <span>{this.state.wachat}</span>
                    </Link>
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