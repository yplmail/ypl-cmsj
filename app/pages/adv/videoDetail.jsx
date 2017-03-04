import React   from 'react';
import Player  from './player';
import Packet  from './Packet';
import Record  from './Record';
import Video   from './Video';
import Score   from './Score';
import BScroll from 'better-scroll';
import Share   from 'share/share';
import './detail.css';
import 'player/player.css';

class Detail extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	packetType      : 0,
        	packetAnimation :'',
        	packetDetail    :{},
        	playRecordId    :'',
        	scoreAnimation  :'',
        	display         :'none'
        }
        this.playHandle = this.playHandle.bind(this);
        this.scoreHandle = this.scoreHandle.bind(this);
        this.shareHandle = this.shareHandle.bind(this);
	}

	componentDidMount(){
		setTimeout(function(){
	        new BScroll('.detail-wrapper', {
				probeType: 3,
				click:true
			})
		},500)
	}

	playHandle(data,id){
	   if(id || this.props.params.playId){
	       this.setState({
	        	packetAnimation : 'animation',
	        	packetDetail    : data,
	        	playRecordId    : id || this.props.params.playId,
	        	scoreAnimation  : '',
			    display         :'none'	        	
	       });
	   }
	}

	shareHandle(){
		this.setState({
			packetType      : 0,
			packetAnimation : '',
			scoreAnimation  : '',
			display         :'block'
		});
	}

	scoreHandle(){
		this.setState({
			packetType      : 0,
			packetAnimation : '',
			display         :'none',				
			scoreAnimation:'animation'
		})
	}

	render(){
		return(
			<div className="detail-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
			   <div className="scroll-wrapper">
	               <Player {...this.props.params} handle={this.playHandle} share={this.shareHandle}/>
	               <Record {...this.props.params}/>
	               <Video  {...this.props.params}/>
			   </div>
			   <Packet {...this.state} handle={this.scoreHandle}/>
			   <Score animation={this.state.scoreAnimation} videoId={this.props.params.videoId}/>
			   <Share display={this.state.display}/>
			</div>
		);
	}
}

export default Detail;
