import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import './setting.css';
class Setting extends React.Component{
	constructor(props){
		super(props);
    this.state = {
        isBindMobile:'',
        isBindWechat:''
    }
	}

  componentDidMount(){
      let server = new ServerRequest();
      server.post({
          url: 'home',
          success:function(response){
             let mobile = '去绑定';
             let wachat = '去绑定';
             let bindMobile = false;
             let bindWechat = false;
             if(response.mobile){
                bindMobile = true;
                mobile = response.mobile.substr(0,3) + '*****' + response.mobile.substr(8,3);
             }
             if(response.isWechatBinded == 'true'){
                bindWechat = true;
                wachat = '已绑定';
             }
             this.setState({
                mobile      : mobile,
                wachat      : wachat,
                isBindMobile:bindMobile,
                isBindWechat:bindWechat               
             })
          }.bind(this)
      })    
  }

	render(){
       return(
           <div className="setting-wrapper">
              <ul>
                  <li>
	                  <Link to="/mobileAuth">
                        <span>手机绑定</span>
    	                  <span>{this.state.mobile}</span>
                    </Link>
                  </li>

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
              <div className="setting-btn">退出当前账号</div>               
           </div>
       )
	}	
}

export default Setting;