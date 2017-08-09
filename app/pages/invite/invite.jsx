import React from 'react';
import {Link} from 'react-router';
import {Share , Wechat}  from 'share/share';
import common from 'common/common';
import ServerRequest from 'server/serverRequest';
import './invite.css';

class Invite extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			display:'none',
        	item   :{}
		}		
	}

	componentWillMount(){
		let server = new ServerRequest();
		server.post({
			url:'invite',
			success:function(response){
                this.setState({item:response});
			}.bind(this)
		})
	}

	componentDidMount(){
		let href = 'https://'+location.hostname+'/multipage/invite.html';
		if(common.getcookies('token')){
			href = href + '?shareId=' + common.getcookies('token').split("_")[1];
		}
        Wechat.fetchWechatInfo({
			title   : '草莓视频',
			desc    : '草莓视频带你一起发现创意美',
			link    : href,
			imgUrl  : 'https://'+location.hostname+'/images/strawberry_logo.png'
		})
	}

	shareHandle(d){
        this.setState({display : d});
	}

	render(){
		return(
           <div className="invite-wrapper">
				<div className="person-header">
					<img src={common.joinImageUrl(this.state.item.avatar)} />
					<h1>{this.state.item.nickName||'草莓看客' }</h1>
					<p>邀请您一起发现创意美</p>
				</div>

				<div className="invite-qrcode">
                    <img src={this.state.item.qrCode} alt="加载失败"/>
				</div>

				<div className="invite-share">
					<h2><span>分享到微信</span></h2>
					<p><img src={require('../../images/invite_wx_logo.png')} onClick={this.shareHandle.bind(this,'block')} /></p>
				</div>

				<Share display={this.state.display} handle={this.shareHandle.bind(this,'none')}/>
				
			</div>
		)
	}
}

export default  Invite;
