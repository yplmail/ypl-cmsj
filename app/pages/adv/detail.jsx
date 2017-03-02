import React   from 'react';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import Player  from './player';
import Packet  from './Packet';
import Record  from './Record';
import Video   from './Video';
import './detail.css';
import 'player/player.css';

class Detail extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	packetType      : 0,
        	packetAnimation :'',
        	packetDetail    :{},
        	playRecordId    :''
        }
        this.playHandle = this.playHandle.bind(this);
	}

	componentWillMount(){
         
	}

	componentDidMount(){
		setTimeout(function(){
	        new BScroll('.detail-wrapper', {
				probeType: 3,
				click:true
			})  			
		},320)
	}

	componentWillReceiveProps(prop){
         //debugger;
	}

	componentWillUnmount(){

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

	render(){
		return(
			<div className="detail-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
			   <div className="scroll-wrapper">
	               <Player {...this.props.params} handle={this.playHandle} />
	               <Record parameter={this.props.params}/>
	               <Video {...this.props.params}/>
			   </div>
			   <Packet parameter={this.state} />
			</div>
		);
	}
}

export default Detail;