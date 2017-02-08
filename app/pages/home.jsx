import React from 'react';
import {Link} from 'react-router';
import notice from '../mock/notice';
require('./App.css');
var imgSrc = require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../images/investment_banner_01.jpg');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Silder />
        <Middle />
        <Notice />
      </div>
    );
  }
}

class Silder extends React.Component{
  constructor(props) {
    super(props);
    this.state = {src:imgSrc};
  }  
  render(){
    return(
      <div className="silder">
        <img src={this.state.src} />
      </div>
    )
  }
}

class Middle extends React.Component{
  render(){
    return(
      <div className="middle clearfix">
        <div>精彩活動</div>
        <div>理財資訊</div>
      </div>
    )
  }
}

class Notice extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data:notice};
  }

  render(){
    return (
      <div className="notice">
        <div className="noticeTitle clearfix">
          <div>通知</div>
          <div><Link to="/noticeList">更多>></Link></div>
        </div>
        <ul>
           {
             this.state.data.map((row,index) =>{
               return(
                 <div key={index} className={row.isRead ? 'noticeInfo info_gray' : 'noticeInfo info_red'}>
                   <p>{row.content}</p>
                   <p>{row.time}</p>
                 </div>
               )
             })
           }
        </ul>
      </div>
    )
  }
}
