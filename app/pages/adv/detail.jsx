import React   from 'react';
import {Link} from 'react-router';
import Player  from './player';
import Record  from './Record';
import Video   from './Video';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import Score   from './Score';
import Scroll from 'scroll/iscroll';
import './detail.css';

class Detail extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	scoreAnimation : '',
        	scroll         : ''
        }
        this.scoreHandle = this.scoreHandle.bind(this);
	}

	componentDidMount(){
		this.initScroll();
	}

	initScroll(){
        this.scroll = new Scroll('.scroll-wrapper', {
            probeType: 3,
            click:true
        })
        this.setState({scroll : this.scroll});
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
		// this.setState({
		// 	scoreAnimation:'animation'
		// });
	}

	render(){
		return(
			<div className="detail-wrapper">
	           <Player {...this.props.params} handle={this.scoreHandle} />
			   <div className="scroll-wrapper">
			       <div>
		               <Record {...this.props.params} scroll={this.state.scroll}/>
		               <Video  {...this.props.params} scroll={this.state.scroll}/>
	               </div>
			   </div>
			   <Score animation={this.state.scoreAnimation} videoId={this.props.params.videoId}/>
			   <Link className="back-button" to='/' style={{display:this.props.params.shareId ? 'block':'none'}}></Link>
			</div>
		);
	}
}

export default Detail;
