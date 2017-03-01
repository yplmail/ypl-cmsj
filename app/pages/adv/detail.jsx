import './detail.css';
import React from 'react';
import {Link} from 'react-router';
import 'player/player.js';
import 'player/player.css';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import BScroll from 'better-scroll';

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            videoDetail: {},
            packetList : [],
            videoList  : [],
            packetType : 0,
            packetAnimation:'',
            scoreAnimation : ''
        };
        this.playId = '';
        this.isFirstPlay = true;
        this.openPacketHandle  = this.openPacketHandle.bind(this);
        this.closePacketHandle = this.closePacketHandle.bind(this);
        this.scoreHandle = this.scoreHandle.bind(this);
    }

    componentWillMount(){
        this.getVideoDetail();
        this.getPacketList();
        this.getCorrelationVideo();
    }

    getVideoDetail(){
        let server = new ServerRequest();
        server.post({
            url:'advDetail',
            data:{
              publishId: this.props.params.videoId,
              token    : common.getcookies('token'),
              openId   : ''
            },
            success:function(response){
              this.setState({videoDetail:response});
              this.initPlayer();
            }.bind(this)
        })
    }

    getPacketList(){
        let server = new ServerRequest();
        server.get({
            mock:true,
            url :'newestUsedRewards',
            data:{
              publishId: this.props.params.videoId,
            },
            success:function(response){
              if(response.datas.length > 3){
                  var arr = response.datas;
                  for(var i = 0 ; i < 2 ; i++){
                      console.log(response.datas.length);
                      response.datas.map(function(item,index){
                          arr.push(item);
                      })
                  }
                  arr = arr.slice(0);
                  this.setState({packetList:arr});
                  document.querySelector('#slideWrapper').className="slide";
              }else{
                  this.setState({packetList:response.datas});
              }
            }.bind(this)
        })
    }

    getCorrelationVideo(){
        let server = new ServerRequest();
        server.post({
            url :'correlationVideo',
            data:{
              publishId: this.props.params.videoId,
              token    : common.getcookies('token'),
              openId   : ''
            },
            success:function(response){
              this.setState({videoList:response.datas})
            }.bind(this)
        })
    }

    componentDidMount(){
         setTimeout(function(){
           let params = this.props.params;
           if(params.videoId && params.playId){
              this.setState({packetAnimation:'animation'})
           }
          var scroll = new BScroll('.detail-wrapper', {
              probeType: 3,
              click:true
          })        
         }.bind(this),320)
    }

    startPlay(){
        let server = new ServerRequest();
        server.post({
          url:'advStartPlay',
          data:{
              publishId: this.props.params.videoId,
              fromUrl  : document.referrer,
              shareUserId : this.props.params.shareId || '',
              clientType : 1,
              token    : common.getcookies('token')
          },
          success:function(response){
             this.playId = response.videoPlayRecordId;
             this.isFirstPlay = false;
          }.bind(this)
        })
    }

    endPlay(){
        let server = new ServerRequest();
        server.post({
          url:'advEndPlay',
          data:{
              videoPlayRecordId : this.playId,
              token : common.getcookies('token')
          },
          success:function(response){
             this.setState({packetAnimation:'animation'})
          }.bind(this)
        })
    }

    getPacketAmount(){
       let server = new ServerRequest();
       server.post({
           url : 'receive',
           data:{
             publishId : this.props.params.videoId,
             videoPlayRecordId : this.props.params.playId || this.playId,
             token : common.getcookies('token')
           },
           success:function(result){
              let data = this.state.videoDetail;
              let packetType = 1;
              if(result.amount == '0'){
                 result.remindTips = '一步之遥';
                 packetType = 3;
              }
              Object.assign(data,result);
              this.setState({
                videoDetail:data,
                packetType :packetType
              });
           }.bind(this)
       });
    }


    interval(){
       let count = parseInt(this.player.getDuration() / 100 * 1000);
       let timer = window.setInterval(function(){
           var ratio = parseFloat(this.player.getCurrentTime() / this.player.getDuration());
           if(ratio > 0.98){
              clearInterval(timer);
              document.querySelector('.video-player').style.display = 'none';
              document.querySelector('.video-cover').style.display = 'block';
              this.endPlay();
           }
       }.bind(this),count)
    }

    shareHandler(){
        alert(11);
    }

    openPacketHandle(){
      if(common.getcookies('token')){
          this.getPacketAmount();
      }else{
          location.hash = '/login/'+this.props.params.videoId+'/'+ this.playId;
      }
    }

    closePacketHandle(){
      this.setState({packetAnimation :''});
      this.setState({'scoreAnimation':'scoreAnimation'})
    }

    scoreHandle(val){
      if(val == 0){
          layer.open({content:'么么哒，请参与下评分',timeout:2});
      }else{
          this.setState({'scoreAnimation':''})
          let server = new ServerRequest();
          server.post({
              url : 'score',
              data:{
                  publishId : this.props.params.videoId,
                  score : val,
                  token : common.getcookies('token')
              }
          });
      }
    }

    initPlayer(){
        this.player = new prismplayer({
            id: "springGrassPlayer",
            source: this.state.videoDetail.playUrl,
            width : "100%",
            height: "220px",
            cover : this.state.videoDetail.coverUrl,
            preload : true,
            playsinline:true,
            autoplay:false
        });

        this.player.on('play',function(){
            if(this.isFirstPlay){
               this.startPlay()
               this.interval();
            }
        }.bind(this))

        this.player.on('ended',function(){
              document.querySelector('.video-player').style.display = 'none';
              document.querySelector('.video-cover').style.display  = 'block';
        }.bind(this))

        var videoPause = document.getElementsByClassName('video-pause')[0];
        videoPause.addEventListener("click", function () {
              document.querySelector('.video-player').style.display = 'block';
              document.querySelector('.video-cover').style.display  = 'none';
              this.player.replay();              
        }.bind(this), false);

        

        // document.getElementsByClassName('prism-big-play-btn')[0].click();

        // document.addEventListener("WeixinJSBridgeReady", function () {

        // }, false);
    }

    render(){
        return(
            <div className="detail-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
                <div className="detail-scroll">
                    <VideoPlayer video={this.state.videoDetail} /> 
                    <VideoDetail detail={this.state.videoDetail} handler={this.shareHandler}/>
                    <PacketRecord list={this.state.packetList}/>
                    <CorrelationVideo videoList={this.state.videoList}/>
                </div>
                <Packet packetType={this.state.packetType} animation={this.state.packetAnimation}
                    handler={this.openPacketHandle} close={this.closePacketHandle} detail={this.state.videoDetail}/>
                <Score animation={this.state.scoreAnimation} handle={this.scoreHandle}/>
            </div>
        )
    }

    componentWillUnmount(){
        //this.player = null;
    }
}

class VideoPlayer extends React.Component{
    constructor(props){
        super(props)
    }
    clickHandle(){

    }
    render(){
        return (
            <div className="video-wrapper">
                <div className="video-cover" style={{backgroundImage:'url('+this.props.video.coverUrl+')'}}>
                  <span className="video-pause" onClick={this.clickHandle}></span>
                </div>
                <div className="video-player prism-player" id="springGrassPlayer"></div>
            </div>
        )
    }
}

class VideoDetail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
          <div className="adv-detial-bar" data-flex="dir:left cross:center">
            <div>{this.props.detail.totalAmount}</div>
            <div>红包已领{this.props.detail.usedCount}个</div>
            <div onClick={this.props.handler}>{this.props.detail.shareCount}</div>
          </div>
        )
    }
}

class PacketRecord extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let list = this.props.list;
        return (
          <div className="adv-packet-record" style={{display:(list.length > 0) ? 'block' : 'none'}}>
            <ul id="slideWrapper">
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left main:center cross:center" key={index + item.packageAmount}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname}</div>
                            <div>{item.mobile}</div>
                            <div>获赠<span>{item.packageAmount}</span>元</div>
                        </li>
                      )
                  })
               }
            </ul>
            <ul>
               {
                  list.map((item,index)=>{
                      return (
                        <li data-flex="dir:left main:center cross:center" key={index + item.packageAmount}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname}</div>
                            <div>{item.mobile}</div>
                            <div>获赠&nbsp;<span>&nbsp;{item.packageAmount}&nbsp;</span>&nbsp;元</div>
                        </li>
                      )
                  })
               }
            </ul>
          </div>
        )
    }
}

class CorrelationVideo extends React.Component{
    constructor(props){
        super(props)
    }

    loopVideoList(){
      return this.props.videoList.map((item,index)=>{
           return(
              <li data-flex="box:last" key={index}>
                  <div data-flex="dir:top box:last">
                      <h3>{item.title}</h3>
                      <div className="video-property" data-flex="cross:center box:mean">
                        <p>{item.publishUserName}</p>
                        <p>{item.palyCount}次播放</p>
                      </div>
                  </div>
                  <div>
                      <img src={item.coverUrl} />
                  </div>
              </li>
           )
      })
    }

    render(){
       var list = this.props.videoList;
       if( list.length > 0 ){
            var content = this.loopVideoList();
       }else{
            var content = <div></div>;
       }
       return (<div className="adv-correlation">
          <h2>相关视频</h2>
          <ul>
            {content}
          </ul>
       </div>
       )
    }
}

class Score extends React.Component{
    constructor(props){
        super(props)
        this.score = 0 ;
        this.change = this.change.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }

    change(event){
        this.score = event.target.value;
    }

    clickHandle(){
        this.props.handle(this.score);
    }

    render(){
      return(
          <div className='score-wrapper' style={{display:this.props.animation ? 'block':'none'}}>
              <div className={'score-content ' + this.props.animation}>
                <h2>评分有惊喜！</h2>
                <p className="starability-slot clearfix">
                    <input type="radio" id="rate5-2" name="rating" value="5" onChange={this.change}/>
                    <label htmlFor="rate5-2" title="Amazing">5 stars</label>

                    <input type="radio" id="rate4-2" name="rating" value="4"  onChange={this.change} />
                    <label htmlFor="rate4-2" title="Very good">4 stars</label>

                    <input type="radio" id="rate3-2" name="rating" value="3"  onChange={this.change} />
                    <label htmlFor="rate3-2" title="Average">3 stars</label>

                    <input type="radio" id="rate2-2" name="rating" value="2"  onChange={this.change} />
                    <label htmlFor="rate2-2" title="Not good">2 stars</label>

                    <input type="radio" id="rate1-2" name="rating" value="1"  onChange={this.change} />
                    <label htmlFor="rate1-2" title="Terrible">1 star</label>
                </p>
                <p className="score-description">你们的脑洞我服了！</p>
                <p className="score-button" onClick={this.clickHandle}>确定</p>
              </div>
          </div>
      )
    }
}

class Packet extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
      var detail = this.props.detail;
      var content = null;
      if(this.props.packetType == 0){
         var content =<div className= {"packet-content " + this.props.animation} >
                <p className="packet-close" onClick={this.props.close}></p>
                <p className="packet-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-wish">{detail.rewardsWish}</p>
                <p className="packet-button" onClick={this.props.handler}></p>
            </div>;
      }else if(this.props.packetType == 1){
         var content =<div className= {"packet-result"} >
                <p className="packet-close" onClick={this.props.close}></p>
                <p className="result-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-money"><span>{detail.amount}</span></p>
                <p className="packet-ranking">恭喜超过&nbsp;<span>{detail.beyondUserRate+'%'}</span>&nbsp;的草莓哦！</p>;
                <p className="packet-more">真爽，还想看更多</p>
            </div>;
      }else{
         var content =<div className= {"packet-result"} >
                <p className="packet-close" onClick={this.props.close}></p>
                <p className="result-header"></p>
                <p className="packet-title">{detail.publishNickName}</p>
                <p className="packet-desprition">{detail.rewardsSlogan}</p>
                <p className="packet-remindTip">{detail.remindTips}</p>;
                <p className="packet-more">真爽，还想看更多</p>
            </div>;
      }
      return(
          <div className="packet-wrapper" style={{display:this.props.animation ? 'block':'none'}}>
            {content}
          </div>
      )
    }
}

export default Detail;
