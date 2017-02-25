import './detail.css';
import React from 'react';
import {Link} from 'react-router';
import 'player/player.js';
import 'player/player.css';
import ServerRequest from 'server/serverRequest';

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          detail : {},
          packetList:[],
          display: '',
          scoreAnimation : ''
        };
        this.success  = this.success.bind(this);
    }

    componentWillMount(){
        this.initData();
        this.getPacketList();
    }  

    componentDidMount(){
         this.initPlayer();
    }

    initData(){
        let server = new ServerRequest();
        server.post({
            url:'advDetail',
            data:{
              publishId: this.props.params.id,
              token    : '',
              openId   : ''
            },
            success:this.success
        })   
    }

    getPacketList(){
        let self = this;
        let server = new ServerRequest();
        server.post({
            url :'usedRewards',
            data:{
              publishId: this.props.params.id,
            },
            success:function(response){
              self.setState({packetList:response.datas})
            }
        })        
    }

    initPlayer(){
        var self = this;
        this.player = new prismplayer({
            id: "springGrassPlayer",
            source: "http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4",
            width : "100%",
            height: "220px",
            cover : this.state.detail.coverUrl,
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

        document.getElementsByClassName('prism-big-play-btn')[0].click(); 

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

    success(response){    
        this.setState({detail:response})
        //this.initPlayer();
    }

    shareHandler(){
        alert(11);
    }

    componentWillUnmount(){
        this.player = null;
    }

    render(){
        return(
            <div className="adv-detial-wrapper">
            <div className="adv-player prism-player" id="springGrassPlayer">
               
            </div>
            <DetailBar detail={this.state.detail} handler={this.shareHandler}/>
            <Record />
            <Correlation/>   
            <Score scoreAnimation={this.state.scoreAnimation} display={this.state.display}/>    
            </div>
        )
    }
}

class DetailBar extends React.Component{
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

class Record extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
          <div className="adv-packet-record">
            <ul>

            </ul>
          </div>
        )
    }
}

class Correlation extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
       return (<div className="adv-correlation">
          <h2>相关视频</h2>
          <ul>
             <li data-flex="box:last">
               <div data-flex="dir:top box:last">
                   <h3>我们要越狱，可怎么跟说好的不一样了</h3>
                   <div className="video-property" data-flex="cross:center box:mean">
                       <p>魔鬼广告人</p>
                       <p>21万次播放</p>
                   </div>
               </div>
               <div><img src="../../images/adv_temp_icon.png" /></div>
             </li>

             <li data-flex="box:last">
               <div data-flex="dir:top box:last">
                   <h3>我们要越狱，可怎么跟说好的不一样了</h3>
                   <div className="video-property" data-flex="cross:center box:mean">
                       <p>魔鬼广告人</p>
                       <p>21万次播放</p>
                   </div>
               </div>
               <div><img src="../../images/adv_temp_icon.png" /></div>
             </li>

             <li data-flex="box:last">
               <div data-flex="dir:top box:last">
                   <h3>我们要越狱</h3>
                   <div className="video-property" data-flex="cross:center box:mean">
                       <p>魔鬼广告人</p>
                       <p>21万次播放</p>
                   </div>
               </div>
               <div><img src="../../images/adv_temp_icon.png" /></div>
             </li>
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
          <div className='packet-wrapper'>
            <div className="packet-content">
                <p className="packet-header"></p>
                <p className="packet-title">兰博基尼</p>
                <p className="packet-desprition">企业广告标题或标语</p>
                <p className="packet-wish">恭喜发财，大吉大利！</p>
                <p className="packet-button"></p>
            </div>
          </div>
      )
    }
}

export default Detail;
