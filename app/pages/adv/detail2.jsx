import './detail.css';
import React from 'react';
import {Link} from 'react-router';
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
        server.post({
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
         this.currentVideoId = this.props.params.videoId;
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

    componentWillReceiveProps(newProps){
         if(this.props.params.videoId != newProps.params.videoId){
            this.isFirstPlay = true;
            this.player = null;
            this.getVideoDetail();
            this.getPacketList();
            this.getCorrelationVideo(); 
            return true;         
         }
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

    }
}









export default Detail;
