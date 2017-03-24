import React from 'react';
import {Link} from 'react-router';
import Share   from 'share/share';
import common from 'common/common';
import './invite.css';

class Invite extends React.Component{
	constructor(props){
		super(props);
		let tk = common.getcookies('token');
		let shareId = tk ? tk.split("_")[1] : '';
		this.state = {
        	share:{
				display : 'none',
				title   : '草莓视界',
				desc    : '草莓视界带你一起去发现创意的美',
				link    : 'http://'+location.hostname+'/#/inviteRegister/'+shareId,
				imgUrl  : 'http://'+location.hostname+'/images/strawberry_logo.png'
        	}
		}
		this.shareHandle = this.shareHandle.bind(this);
	}

	shareHandle(event){
        this.setState({
        	share:{
				display : 'block'
        	}
        });
	}

	render(){
		return(
           <div className="invite-wrapper" style={{height:window.innerHeight+"px"}}>
				<div className="invite-content" >
					<h1>一起去发现创意的美</h1>
					<h2><span>分享到微信</span></h2>
					<i onClick={this.shareHandle}></i>
				</div>
				<Share {...this.state.share}/>
           </div>
		)
	}
}

export default  Invite;
