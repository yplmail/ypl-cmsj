import React   from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Packet extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            packetType      : 0,
            packetAnimation :'',
            video    :{},
            playRecordId    :''
        }
        this.openHandle = this.openHandle.bind(this);
        this.closePacket = this.closePacket.bind(this);
    }

    openHandle(event){
        if(common.getcookies('token')){
            event.target.className="packet-open rotateAnimation";
            this.openPacket();
        }else{
            let videoId  = this.state.video.publishId;
            let recordId = this.state.playRecordId;
            location.hash = '/login/'+videoId+'/'+recordId;
        }
    }

    openPacket(event){
        let server = new ServerRequest();
        server.post({
            url : 'receive',
            data:{
                publishId : this.state.video.publishId,
                videoPlayRecordId : this.state.playRecordId
            },
            success:function(result){
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    document.querySelector('.packet-open').className='packet-open';
                    if(result.amount == '0'){
                        this.setState({
                          packetType : 2,
                          remindTips : '一步之遥'
                        });
                    }else{
                        this.setState({
                          packetType : 1,
                          amount : result.amount,
                          beyondUserRate : result.beyondUserRate
                        });
                    }
                }.bind(this),320)
            }.bind(this)
        });
    }

    closePacket(){
        this.props.handle();
    }

    componentWillReceiveProps(props){
        this.setState({
            packetType      : props.packetType,
            packetAnimation : props.packetAnimation,
            video    : props.video,
            playRecordId    : props.playRecordId
        });
    }


    render(){
      var detail = this.state.video;
      var content = null;
      if(this.state.packetType == 0){
         var content =<div className= {"packet-content " + this.state.packetAnimation} >
                <p className="packet-close" onClick={this.closePacket}></p>
                <p className="packet-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-wish">{detail.rewardsWish}</p>
                <p className="packet-button"><span className="packet-open" onClick={this.openHandle}></span></p>
            </div>;
      }else if(this.state.packetType == 1){
         var content =<div className= {"packet-result"} >
                <p className="packet-close" onClick={this.closePacket}></p>
                <p className="result-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-money"><span>{this.state.amount}</span></p>
                <p className="packet-ranking">恭喜超过&nbsp;<span>{this.state.beyondUserRate+'%'}</span>&nbsp;的草莓哦！</p>;
                <p className="packet-more"><Link to="/">更多</Link></p>
            </div>;
      }else{
         var content =<div className= {"packet-result"} >
                <p className="packet-close" onClick={this.closePacket}></p>
                <p className="result-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-remindTip">{this.state.remindTips}</p>;
                <p className="packet-more"><Link to="/">更多</Link></p>
            </div>;
      }
      return(
          <div className="packet-wrapper" style={{display:this.state.packetAnimation ? 'block':'none'}}>
            {content}
          </div>
      )
    }
}

export default Packet;
