import React from 'react';
import {Link} from 'react-router';
import './modifyPassword.css';

class ModifyPassword extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="modifyPassword-wrapper">
	           <div className="modifyPassword-content">
                  <input type="password" placeholder="请输入原始密码"/>
                  <input type="password" placeholder="请输入6-16个字符新密码"/>
                  <a>确定</a>
	           </div>
           </div>
       )
	}	
}

export default ModifyPassword;
