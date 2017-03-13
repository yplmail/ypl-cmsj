import React   from 'react';
import Player  from './player';
import Record  from './Record';
import Video   from './Video';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import Score   from './Score';

import './detail.css';

class Detail extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	scoreAnimation : ''
        }
        this.scoreHandle = this.scoreHandle.bind(this);
	}

	refreshToken(){
        let server = new ServerRequest();
        server.post({
        	url:'refreshToken',
        	success:function(response){
                common.setcookies('token',response.token,7);
        	}
        });
	}

	scoreHandle(){
		this.setState({
			scoreAnimation:'animation'
		});
	}

	render(){
		return(
			<div className="detail-wrapper" style={{height:window.innerHeight+'px'}}>
			   <div className="scroll-wrapper">
	               <Player {...this.props.params} handle={this.scoreHandle} />
	               <Record {...this.props.params}/>
	               <Video  {...this.props.params}/>
			   </div>
			   <Score animation={this.state.scoreAnimation} videoId={this.props.params.videoId}/>
			</div>
		);
	}
}

export default Detail;
