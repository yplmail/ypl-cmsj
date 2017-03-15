import React from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import md5 from 'md5/md5';
import './modifyPassword.css';

class ModifyPassword extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			oldPwd : '',
			newPwd : ''
		}
		this.changeOldPassword = this.changeOldPassword.bind(this);
        this.changeNewPassword = this.changeNewPassword.bind(this);
        this.vildateHandle = this.vildateHandle.bind(this);
	}

	changeOldPassword(event){
        this.setState({
            oldPwd: common.trim(event.target.value)
        });       
	}

	changeNewPassword(event){
        this.setState({
            newPwd: common.trim(event.target.value)
        });
    }

    vildateHandle(){
       if(this.state.oldPwd == ''){
          layer.open({content:'请输入您的原始登录密码',time:2});
          return false;
       } 

       if(this.state.oldPwd.length < 6 || this.state.oldPwd.length > 20){
          layer.open({content:'请输入正确的原始登录密码',time:2});
          return false;
       }

       if(this.state.newPwd == ''){
          layer.open({content:'请输入新的登录密码',time:2});
          return false;
       } 

       if(this.state.newPwd.length < 6 || this.state.newPwd.length > 20){
          layer.open({content:'请输入6到20位长度的登录密码',time:2});
          return false;
       } 

       this.modifyPassword();         
    }

    modifyPassword(){
        let server = new ServerRequest();
        server.post({
            url : 'modifyLoginPwd',
            data: {
              oldPwd: md5(this.state.oldPwd),
              newPwd: md5(this.state.newPwd)             
            },
            success:function(response){
                layer.open({content:'登录密码修改成功！',time:2, end:function(index){
                    common.setcookies('token','',-1); 
                    location.hash = '/login';
                }.bind(this)});                 
            }.bind(this)
        });
    }

	render(){
       return(
			<div className="modifyPassword-wrapper">
				<ul className="modifyPassword-content">
					<li>                      
						<label htmlFor="oldPwd"></label>
						<input id="oldPwd" type='password' name="oldPwd" placeholder="请输入原始登录密码" value={this.state.oldPwd}  
						onChange={this.changeOldPassword} maxLength="20" />
					</li>

					<li> 
						<label htmlFor="newPwd"></label>
						<input id="newPwd" type='password' name="newPwd" placeholder="请设置新的登录密码" value={this.state.newPwd}  
						onChange={this.changeNewPassword} maxLength="20" />
					</li>
					<li>
						<a onClick={this.vildateHandle}>确定</a>					
					</li>
				</ul>
			</div>
       )
	}	
}

export default ModifyPassword;
