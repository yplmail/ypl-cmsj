import React from 'react';
import {Link} from 'react-router';
import {Share , Wechat}  from 'share/share';
import common from 'common/common';
import './invitePacket.css';

class InvitePacket extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			display : 'none'
		}
	}

	shareHandle(val){
        this.setState({display : val});
	}

	componentDidMount(){
		let href = 'https://'+location.hostname+'/multipage/video.html?videoId='+this.props.params.videoId;
		if(common.getcookies('token')){
			href = href + '&shareId=' + common.getcookies('token').split("_")[1];
		}
        Wechat.fetchWechatInfo({
			title   : '草莓视频',
			desc    : '草莓视频带你一起发现创意美',
			link    : href,
			imgUrl  : 'https://'+location.hostname+'/images/strawberry_logo.png'
		})
	}	

	render(){
		return(
           <div className="invitePacket-wrapper">
				<div className="invitePacket-content">
                     <a onClick={this.shareHandle.bind(this,'block')}>邀请微信好友</a>
                     <a onClick={this.shareHandle.bind(this,'block')}>分享到朋友圈</a>
				</div>
				<Share display={this.state.display} handle={this.shareHandle.bind(this,'none')}/>
           </div>
		)
	}
}

export default  InvitePacket;
