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
          arr   : [] ,
          scoreAnimation : 'score-mask-wrapper'
        };
        this.success  = this.success.bind(this);
    }

    componentWillMount(){
        this.initData();
    }  

    componentDidMount(){
         this.initPlayer();
    }

    initData(){
        let server = new ServerRequest();
        server.get({
            url:'/mock/list.json',
            success:this.success
        })   
    }

    initPlayer(){
        var self = this;
        this.player = new prismplayer({
            id: "springGrassPlayer",
            source: "http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4",
            width : "100%",
            height: "220px",
            cover:'../../images/adv_bg_02.jpg',
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
        //document.getElementsByClassName('prism-big-play-btn')[0].click();
        this.player.on('ended',function(){
            self.setState({
              scoreAnimation:'score-mask-wrapper scoreAnimation'
            })
        })
    }

    success(response){
        this.setState({arr:response.data})
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
            <DetailBar handler={this.shareHandler}/>
            <Record />
            <Correlation/>   
            <Score scoreAnimation={this.state.scoreAnimation}/>       
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
            <div>250000.00</div>
            <div>红包已领2322226个</div>
            <div onClick={this.props.handler}>8452</div>
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
              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你1</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你2</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你3</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你4</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你5</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你6</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你7</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>


              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你8</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你9</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你10</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>
              
              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你1</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你2</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你3</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你4</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你5</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你6</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你7</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你8</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你9</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你10</div>
                <div>18682243486</div>
                <div>获赠78.5元<span></span></div>
              </li>
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
          <div className={this.props.scoreAnimation} >
              <div className="score-content">
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

export default Detail;
