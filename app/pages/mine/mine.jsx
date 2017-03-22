import React from 'react';
import {Link} from 'react-router';
import common from 'common/common';
import Scroll from 'scroll/iscroll';
import ServerRequest from 'server/serverRequest';
import './mine.css';

class Header extends React.Component{
   constructor(props){
      super(props);
      this.state={
         nickname: '不仅仅是看客',
         amount  : '0.00',
         url     : ''
      }
   }

   componentDidMount(){
      if(common.getcookies('token')){
         this.getData();
      }
   }

   getData(){
      let server = new ServerRequest();
      server.post({
          url:'home',
          maskLayer:true,
          success:function(response){
             this.setState({
                nickname: response.nickname    ||  '不仅仅是看客',
                amount  : response.totalIncome || '0.00',
                url     : response.faceUrl ? 'url('+response.faceUrl+')' : ''           
             });
          }.bind(this)
      })
   }

   render(){
      return (
          <div className="mine-header-wrapper">
              <div className="personal-header">
                  <p className="headerImg" style={{backgroundImage:this.state.url}}></p>
                  <p className="headerTip">{this.state.nickname}</p>
              </div>
              <div className="personal-money">
                  <span>获赠总额&nbsp;￥</span>
                  <span>{this.state.amount}</span>
              </div>
          </div>
      )
   }
}

class List extends React.Component{
   constructor(props){
      super(props)
   }
   render(){
      return (
          <div className="mine-list-wrapper">
              <ul>
                  <li><Link to="/wallet">草莓钱包</Link></li>
                  <li><Link to="/invite">邀请朋友</Link></li>
                  <li><Link to="/feedback">意见反馈</Link></li>
                  <li><Link to="/about">关于产品</Link></li>
                  <li><Link to="/setting">设置</Link></li>
              </ul>
          </div>
      )
   }
}

class Mask extends React.Component{
   constructor(props){
      super(props);
      this.state = {       
         display : 'none'
      }
   }

   componentDidMount(){
      if(!common.getcookies('token')){
          this.setState({
              display:'block'
          })
      }
   }

   render(){
      return (
          <div className="mine-mask-wrapper" style={{display:this.state.display}}>
              <div className="cercle"></div>
              <Link className="cercle-login" to="/login">登录</Link>
          </div>
      )
   }
}

class Mine extends React.Component{
   constructor(props){
      super(props);
   }

  componentDidMount(){
      var query = this.props.location.query;
      if(query.code && query.state){
          let server = new ServerRequest();
          server.post({
              url : 'bindWechat',
              data:{
                  code:query.code,
                  state:query.state
              }
          });       
      }
      this.initScroll();       
  }

  initScroll(){
    this.scroll = new Scroll('.mine-wrapper', {
        probeType: 3,
        click:true
    })

    setTimeout(function(){
      this.scroll.refresh();
    }.bind(this),320)
  }

  render(){
      return (
        <div className="mine-wrapper" style={{height:(window.innerHeight-49) + 'px'}}>
          <div>
              <Header />
              <List />
          </div>
          <Mask/>
        </div>
      )
   }
}

export default Mine;