import React   from 'react';
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

    refreshToken(){
        let server = new ServerRequest();
        server.post({
            url:'refreshToken',
            success:function(response){
                common.setcookies('token',response.token,7);
            }
        });
    }

    render(){
        return(
            <div className="detail-wrapper" style={{height:window.innerHeight+'px'}}>
               <div className="scroll-wrapper">
                   <Player {...this.props.params} handle={this.playHandle} share={this.shareHandle} />
                   <Record {...this.props.params}/>
                   <Video  {...this.props.params}/>
               </div>
            </div>
        );
    }
}

export default Detail;
