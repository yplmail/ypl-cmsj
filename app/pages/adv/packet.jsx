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
            packetDetail    :{},
            playRecordId    :''
        }
        this.openHandle = this.openHandle.bind(this);      
        this.closePacket = this.closePacket.bind(this);      
    }
  
    openHandle(){
        if(common.getcookies('token')){
            this.openPacket();
        }else{
            let videoId  = this.state.packetDetail.publishId; 
            let recordId = this.state.playRecordId;
            location.hash = '/login/'+videoId+'/'+recordId;
        }
    }

    openPacket(){
        let server = new ServerRequest();
        server.post({
            url : 'receive',
            data:{
                publishId : this.state.packetDetail.publishId,
                videoPlayRecordId : this.state.playRecordId,
                token : common.getcookies('token')
            },
            success:function(result){
                if(result.amount == '0'){    
                    this.setState({
                      packetType : 2,
                      remindTips : '一步之遥'
                    }) 
                }else{
                    this.state = {
                      packetType : 1,
                      amount     : '',
                      beyondUserRate:''
                    }                   
                }
            }.bind(this)
        });      
    }

    closePacket(){
        this.setState({
            packetType      : 0,
            packetAnimation : ''      
        });               
    }

    componentWillReceiveProps(data){
        this.setState({
            packetType      : data.parameter.packetType,
            packetAnimation : data.parameter.packetAnimation,
            packetDetail    : data.parameter.packetDetail,
            playRecordId    : data.parameter.playRecordId          
        });
    }


    render(){
      var parameter = this.state;
      var detail = parameter.packetDetail;
      var content = null;
      if(parameter.packetType == 0){
         var content =<div className= {"packet-content " + parameter.packetAnimation} >
                <p className="packet-close" onClick={this.closePacket}></p>
                <p className="packet-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-wish">{detail.rewardsWish}</p>
                <p className="packet-button" onClick={this.openHandle}></p>
            </div>;
      }else if(parameter.packetType == 1){
         var content =<div className= {"packet-result"} >
                <p className="packet-close" onClick={this.closePacket}></p>
                <p className="result-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-money"><span>{parameter.amount}</span></p>
                <p className="packet-ranking">恭喜超过&nbsp;<span>{parameter.beyondUserRate+'%'}</span>&nbsp;的草莓哦！</p>;
                <p className="packet-more"><Link to="/">真爽，还想看更多</Link></p>
            </div>;
      }else{
         var content =<div className= {"packet-result"} >
                <p className="packet-close" onClick={this.closePacket}></p>
                <p className="result-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-remindTip">{parameter.remindTips}</p>;
                <p className="packet-more"><Link to="/">真爽，还想看更多</Link></p>
            </div>;
      }
      return(
          <div className="packet-wrapper" style={{display:parameter.packetAnimation ? 'block':'none'}}>
            {content}
          </div>
      )
    }
}

export default Packet;