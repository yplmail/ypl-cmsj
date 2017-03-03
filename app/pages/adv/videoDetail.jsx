import React   from 'react';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import Player  from './player';
import Packet  from './Packet';
import Record  from './Record';
import Video   from './Video';
import Score   from './Score';
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
        	scoreAnimation  :''
        }
        this.playHandle = this.playHandle.bind(this);
        this.scoreHandle = this.scoreHandle.bind(this);
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
	        	playRecordId    : id || this.props.params.playId
	       });
	   }
	}

	scoreHandle(){
		this.setState({
			packetType      : 0,
			packetAnimation : '',
			scoreAnimation:'animation'
		})
	}

	render(){
		return(
			<div className="detail-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
			   <div className="scroll-wrapper">
	               <Player {...this.props.params} handle={this.playHandle} />
	               <Record parameter={this.props.params}/>
	               <Video {...this.props.params}/>
			   </div>
			   <Packet {...this.state} handle={this.scoreHandle}/>
			   <Score animation={this.state.scoreAnimation} videoId={this.props.params.videoId}/>
			</div>
		);
	}
}

export default Detail;
