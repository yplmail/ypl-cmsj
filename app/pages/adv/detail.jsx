import React   from 'react';
import {Link} from 'react-router';
import Player  from './player';
import Record  from './Record';
import Video   from './Video';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import './detail.css';

class Detail extends React.Component{
	constructor(props){
        super(props);
	}

    componentDidMount(){
        var query = this.props.location.query;
        if(query.code && query.state){
            let server = new ServerRequest();
            server.post({
                url : 'bindWechat',
                data:{
                    code :query.code,
                    state:query.state
                }
            });
        }
    }

	render(){
		return(
			<div className="detail-wrapper">
	           <Player {...this.props.params}/>
			   <div className="scroll-wrapper">
			       <div>
		               <Record {...this.props.params} />
		               <Video  {...this.props.params} />
	               </div>
			   </div>
			   <Link className="back-button" to='/' style={{display:this.props.params.shareId ? 'block':'none'}}></Link>
			</div>
		);
	}
}

export default Detail;
