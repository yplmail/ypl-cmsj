import React   from 'react';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import './share.css';

class PacketShare extends React.Component{
	constructor(props){
        super(props);
        this.state = {
        	item:{
        		avatar     : '',
        		usedAmount : 0,
        		totalAmount: 0,
        		maxMoney   : 0,
        		playTimes  : 0,
        		duration   : ''
        	}
        }
        this.isLoaded = false;
	}

	componentDidMount(){
        this.getShareData();
	}

	getShareData(){
        let server = new ServerRequest();
        server.post({
        	url:'sharePacket',
        	maskLayer : true,
        	data:{
               publishPlayRecordsId:this.props.params.playId
        	},
        	success:function(result){
               this.isLoaded = true;
               this.setState({item:result});
        	}.bind(this)
        });
	}

	goVideoDetail(){
    let params = this.props.params;  
    let url = location.protocol + '//' + location.host + '/multipage/video.html?videoId='+params.videoId+'&playId='+params.playId;
    if(params.shareId){
      url = url + '&shareId='+params.shareId;
    }
    location = url;
	}

  packetTips(amount){ 
      if(amount == 0){
        return <div>
                   <p>看视频 拼手气 领红包</p>
                   <p>你也来试试吧！</p>
               </div>
      }else{
        return <div>
                   <p>看了个创意短片、还中了个红包！</p>
                   <p className="packet-amount">￥<span>{amount}</span></p>
               </div>
      }
  }

  render(){
        let item = this.state.item;
        let coverUrl = item.coverUrl ?'url('+common.joinImageUrl(item.coverUrl)+')' : '';  
        let avatar   = common.joinImageUrl(item.avatar);
        let packetAmount = parseFloat(this.state.item.amount || 0);
        let totalAmount = parseFloat(this.state.item.totalAmount || 0);
        let styles = totalAmount ? '' : 'hidden';
        return(
            <div className="packetshare-wrapper">
                <div className="packetshare-header">
                    <img src={avatar} />
                    <h3>{item.nickName || '草莓看客'}</h3>
                    {this.isLoaded && this.packetTips(packetAmount)}
                </div>
                <div className="packetshare-content" style={{backgroundImage:coverUrl}} onClick={this.goVideoDetail.bind(this)}>
                    <div className="sharevideo-title">
                        <h2 className="ellipsis">{item.title}</h2>
                    </div>
                    <div className="sharevideo-bar" data-flex="dir:left">
                        <p className="adv-invest"    style={{visibility:styles}}>剩余{item.usedCount || 0}个</p>
                        <p className="adv-packetAmt" style={{visibility:styles}}>{item.maxMoney || 0}元</p>
                        <p className="adv-playCount" style={{visibility:styles}}>{item.playTimes || 0}次</p>
                        <p className="adv-time"><span>{item.duration}</span></p>                     
                    </div>
                </div>

                <div className="packetshare-qrcode">   
                    <img src={require("../../images/QRCode.png")} />
                </div>               
            </div>
        );
	}
}

export default PacketShare;
