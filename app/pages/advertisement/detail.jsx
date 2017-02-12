import './detail.css';
import React from 'react';
import {Link} from 'react-router';


class Detail extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
      return(
          <div className="adv-detial-wrapper">
             <Player />
          </div>
      )
   }
}

class Player extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
          <div className="adv-player">
             <video controls src="http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4"/>
             <DetailBar />
             <Record />
             <Correlation/>
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
            <div>2500.00</div>
            <div>红包已领236个</div>
            <div>8452</div>
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
              <li data-flex="dir:left main:center cross:center box:mean">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你</div>
                <div>18682243486</div>
                <div>获赠<span></span></div>
              </li>
              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你</div>
                <div>18682243486</div>
                <div>获赠<span></span></div>
              </li>

              <li data-flex="dir:left main:center cross:center">
                <div><img src="../../images/user_header_icon.png" /></div>
                <div>老师能烦死你</div>
                <div>18682243486</div>
                <div>获赠<span></span></div>
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
       return (<div className="correlation-wrapper">
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

export default Detail;
