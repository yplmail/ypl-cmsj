import './detail.css';
import React from 'react';
import {Link} from 'react-router';
import '../../reset/animate.min.css'

class Detail extends React.Component{
   constructor(props){
      super(props);
   }
   componentDidMount(){
      layer.open({
        content: '通过style设置你想要的样式',
        style: 'background-color:rgba(0, 0, 0, .5); color:#fff;',
        time: 60
      });
   }
   render(){
      return(
          <div className="adv-detial-wrapper">
             <Player />
             <DetailBar />
             <Record />
             <Correlation/>             
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
          <div className="score-mask-wrapper">
              <div className="score-content slideInUp animated">
                <h2>评分有惊喜！</h2>
                <p className="start">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <strong>4分</strong>
                </p>
                <p className="score-description">你们的脑洞我服了！</p>
              </div>
          </div>
      )
    }
}

export default Detail;
