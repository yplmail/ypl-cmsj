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
            video           :{},
            playRecordId    :'',
            amount          :'',
            beyondUserRate  :'',
            remindTips      :''
        }
        // this.wish = {
        //     '1':'一步之遥',           
        //     '2':'再接再厉',
        //     '3':'近在咫尺',
        //     '4':'触手可得',
        //     '5':'勇往直前',
        //     '6':'锲而不舍',
        //     '7':'矢志不渝',
        //     '8':'孜孜不倦', 
        //     '9':'事在人为',
        //     '10':'滴水穿石'
        // }
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
            event.target.className="packet-open rotateAnimation";
            let timer = setTimeout(function(){
                clearTimeout(timer);
                location.hash = '/result/'+this.state.video.publishId + '/123';   // +this.state.playRecordId || 123;
            }.bind(this),320)
            //this.openPacket();
        }else{
            let videoId  = this.state.video.publishId;
            let recordId = this.state.playRecordId;
            location.hash = '/login/'+videoId+'/'+recordId;
        }
    }

    /**
     * 打开红包
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
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
                    this.packetResult(result);
                }.bind(this),320)
            }.bind(this)
        });
    }

    /**
     * 打开红包结果
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    packetResult(result){


        // document.querySelector('.packet-open').className='packet-open';
        // if(result.amount == '0'){
        //     this.setState({
        //         packetType : 2,
        //         remindTips : this.wish[Math.floor(Math.random()*10)] || '滴水穿石'
        //     });
        // }else{
        //     this.setState({
        //         packetType : 1,
        //         amount : result.amount,
        //         beyondUserRate : result.beyondUserRate
        //     });
        // }        
    }

    /**
     * 关闭红包
     * @return {[type]} [description]
     */
    closePacket(){
        this.props.handle();
    }

    render(){
      var detail = this.state.video;
      let url = detail.publishAvatar ? 'url('+detail.publishAvatar+')' : ''
      return(
          <div className="packet-wrapper" style={{display:this.state.packetAnimation ? 'block':'block'}}>
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
