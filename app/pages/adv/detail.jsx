import './detail.css';
import React from 'react';
import {Link} from 'react-router';
import 'player/player.js';
import 'player/player.css';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            videoDetail: {},
            packetList : [],
            videoList  : [],
            packetAnimation:'',
            scoreAnimation : ''
        };
        this.playId = '';
        this.isFirstPlay = true;
        this.openPacketHandle  = this.openPacketHandle.bind(this);
        this.closePacketHandle = this.closePacketHandle.bind(this);
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
              this.setState({packetList:response.datas});
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
         this.initPlayer();
         setTimeout(function(){
           let params = this.props.params;
           if(params.videoId && params.playId){
              this.setState({packetAnimation:'animation'})
           }
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
           success:function(response){
              debugger;
           }
       });
    }


    interval(){
       let count = parseInt(this.player.getDuration() / 100 * 1000);
       let timer = window.setInterval(function(){
           var ratio = parseFloat(this.player.getCurrentTime() / this.player.getDuration());
           if(ratio > 0.94){
              clearInterval(timer);
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
      this.setState({packetAnimation:''})
    }

    initPlayer(){
        var self = this;
        this.player = new prismplayer({
            id: "springGrassPlayer",
            source: "http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4",
            width : "100%",
            height: "220px",
            cover : this.state.videoDetail.coverUrl,
            preload : true,
            playsinline:true,
            autoplay:false,
            skinLayout:[{
                "name":"bigPlayButton",
                "align":"cc"
            },{
                "name":"controlBar",
                "align":"blabs",
                "x":0,
                "y":0,
                "children":[{
                "name":"progress",
                "align":"tlabs"
                },{
                "name":"playButton",
                "align":"blabs",
                "x":10,
                "y":8
                },{
                "name":"timeDisplay",
                "align":"blabs",
                "x":135,
                "y":10
                },{
                "name":"volume",
                "align":"brabs",
                "x":80,
                "y":8
                },{
                "name":"fullScreenButton",
                "align":"brabs",
                "x":10,
                "y":8
                }]
            }]
        });

        this.player.on('play',function(){
            if(this.isFirstPlay){
               this.startPlay()
               this.interval();
            }
        }.bind(this))

        //document.getElementsByClassName('prism-big-play-btn')[0].click();

        // if(this.props.params.play == "1"){
        //   this.player.play();
        // }

        // document.addEventListener("WeixinJSBridgeReady", function () {

        // }, false);


        // this.player.on('ended',function(){
        //     self.setState({
        //       display:'block',
        //       scoreAnimation:'scoreAnimation'
        //     })
        // })
    }
    componentWillUnmount(){
        this.player = null;
    }

    render(){
        return(
            <div className="detail-wrapper">
              <VideoPlayer />
              <VideoDetail detail={this.state.videoDetail} handler={this.shareHandler}/>
              <PacketRecord list={this.state.packetList}/>
              <CorrelationVideo videoList={this.state.videoList}/>
              <Packet animation={this.state.packetAnimation} handler={this.openPacketHandle} close={this.closePacketHandle}/>
            </div>
        )
    }
}

class VideoPlayer extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="adv-player prism-player" id="springGrassPlayer"></div>
        )
    }
}

class VideoDetail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
          <div className="adv-detial-bar" data-flex="dir:left main:center cross:center">
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
            <ul>
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
                        <li data-flex="dir:left main:center cross:center" key={index}>
                            <div><img src="../../images/user_header_icon.png" /></div>
                            <div>{item.nickname}</div>
                            <div>{item.mobile}</div>
                            <div>获赠<span>{item.packageAmount}</span>元</div>
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
                        <p>魔鬼广告人</p>
                        <p>{item.palyCount}次播放</p>
                      </div>
                  </div>
                  <div><img src="../../images/adv_temp_icon.png" /></div>
              </li>
           )
      })
    }

    render(){
       var list = this.props.videoList;
       if( list.length > 0 ){
            var content = this.loopVideoList();
       }else{
            var content = ('<div></div>');
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
    }
    render(){
      return(
          <div className='score-wrapper' style={{display:this.props.display}}>
              <div className={'score-content ' + this.props.scoreAnimation}>
                <h2>评分有惊喜！</h2>
                <p className="starability-slot clearfix">
                    <input type="radio" id="rate5-2" name="rating" value="5" />
                    <label htmlFor="rate5-2" title="Amazing">5 stars</label>

                    <input type="radio" id="rate4-2" name="rating" value="4" />
                    <label htmlFor="rate4-2" title="Very good">4 stars</label>

                    <input type="radio" id="rate3-2" name="rating" value="3" />
                    <label htmlFor="rate3-2" title="Average">3 stars</label>

                    <input type="radio" id="rate2-2" name="rating" value="2" />
                    <label htmlFor="rate2-2" title="Not good">2 stars</label>

                    <input type="radio" id="rate1-2" name="rating" value="1" />
                    <label htmlFor="rate1-2" title="Terrible">1 star</label>
                </p>
                <p className="score-description">你们的脑洞我服了！</p>
                <p className="score-button">确定</p>
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
      return(
          <div className="packet-wrapper" style={{display:this.props.animation ? 'block':'none'}}>
            <div className= {"packet-content " + this.props.animation} >
                <p className="packet-close" onClick={this.props.close}></p>
                <p className="packet-header"></p>
                <p className="packet-title">兰博基尼</p>
                <p className="packet-desprition">企业广告标题或标语</p>
                <p className="packet-wish">恭喜发财，大吉大利！</p>
                <p className="packet-button" onClick={this.props.handler}></p>
            </div>
          </div>
      )
    }
}

export default Detail;
