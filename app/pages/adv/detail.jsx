import React   from 'react';
import Player  from './player';
import Packet  from './Packet';
import Record  from './Record';
import Video   from './Video';
import Score   from './Score';
import Share   from 'share/share';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './detail.css';
import 'player/player.css';

class Detail extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	packetType      : 0,
        	packetAnimation :'',
        	video           :{},
        	playRecordId    :'',
        	scoreAnimation  :'',
        	share :{
        	    display :'none',
				title   : '',  // 分享标题
				desc    : '',  // 分享描述
				link    : '',  // 分享链接
				imgUrl  : '', // 分享图标
				type    : '', // 分享类型,music、video或link，不填默认为link
				dataUrl : ''
        	}
        }
        this.playHandle = this.playHandle.bind(this);
        this.scoreHandle = this.scoreHandle.bind(this);
        this.shareHandle = this.shareHandle.bind(this);
	}

	componentDidMount(){
        this.refreshToken();
	}

    /**
     * 刷新token操作
     */
	refreshToken(){
        let server = new ServerRequest();
        server.post({
        	url:'refreshToken',
        	success:function(response){
                common.setcookies('token',response.token,7);
        	}
        });
	}

    /**
     *  弹出红包操作
    */
	playHandle(data,id){
	   if(id || this.props.params.playId){
	       this.setState({
	        	packetAnimation : 'animation',
	        	video           : data,
	        	playRecordId    : this.props.params.playId || id,
	        	scoreAnimation  : ''
	       });
	   }
	}

    /**
     *  分享操作
    */
	shareHandle(video){
		this.setState({
			packetType      : 0,
			packetAnimation : '',
			scoreAnimation  : '',
			share           : {
				display : 'block',
				title   : '草莓视频',
				desc    : video.title,
				link    : 'http://'+location.hostname+'/#/detail/'+video.publishId,
				imgUrl  : video.coverUrl,
				type    : 'video',
				dataUrl : video.playUrl
			}
		});
	}

    /**
     * 评分操作
    */
	scoreHandle(){
		this.setState({
			packetType      : 0,
			packetAnimation : '',
			scoreAnimation  :'animation'
		})
	}

	render(){
		return(
			<div className="detail-wrapper" style={{height:window.innerHeight+'px'}}>
			   <div className="scroll-wrapper">
	               <Player {...this.props.params} handle={this.playHandle} share={this.shareHandle} />
	               <Record {...this.props.params}/>
	               <Video  {...this.props.params}/>
			   </div>
			   <Packet {...this.state} handle={this.scoreHandle}/>
			   <Score animation={this.state.scoreAnimation} videoId={this.props.params.videoId}/>
			   <Share {...this.state.share} />
			</div>
		);
	}
}

export default Detail;
