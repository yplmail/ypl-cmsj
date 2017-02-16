import React from 'react';
import {Link} from 'react-router';
import './setting.css';
class Setting extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="setting-wrapper">
              <ul>
                  <li>
	                  <Link to="/mobileAuth">
                    手机绑定
	                  <span>18682243486</span>
                    </Link>
                  </li>

                  <li>
	                  <Link to="/wechatAuth">
                    微信绑定
	                  <span>去绑定</span>
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