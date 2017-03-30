import React   from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Packet extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            packetAnimation :'',
            video           :{},
            playRecordId    :'',
            amount          :'',
            beyondUserRate  :'',
            remindTips      :''
        }
        this.openHandle = this.openHandle.bind(this);
        this.closePacket = this.closePacket.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({...props});
    }

    /**
     * 触发打开红包事件
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    openHandle(event){
        if(common.getcookies('token')){
            this.closePacket();
            let timer = setTimeout(function(){
                clearTimeout(timer);
                location.hash = '/result/'+this.state.video.publishId + '/123';   // +this.state.playRecordId || 123;
            }.bind(this),0)
        }else{
            let videoId  = this.state.video.publishId;
            let recordId = this.state.playRecordId;
            location.hash = '/login/'+videoId+'/'+recordId;
        }
    }

    /**
     * 关闭红包
     * @return {[type]} [description]
     */
    closePacket(){
        this.setState({'packetAnimation' : ''})
    }

    render(){
      var detail = this.state.video;
      let url = detail.publishAvatar ? 'url('+detail.publishAvatar+')' : ''
      return(
          <div className="packet-wrapper" style={{display:this.state.packetAnimation ? 'block':'none'}}>
              <div className= {"packet-content " + this.state.packetAnimation} >
                  <p className="packet-close" onClick={this.closePacket}></p>
                  <p className="packet-header" style={{backgroundImage:url}}></p>
                  <p className="packet-title">{detail.publishNickName}</p>
                  <p className="packet-desprition">{detail.rewardsSlogan}</p>
                  <p className="packet-wish">{detail.rewardsWish}</p>
                  <p className="packet-open" onClick={this.openHandle}></p>
              </div>
          </div>
      )
    }
}

export default Packet;
