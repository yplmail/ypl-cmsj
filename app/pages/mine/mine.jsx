import React from 'react';
import {Link} from 'react-router';
import common from 'common/common';
import ServerRequest from 'server/serverRequest';
import Toolbar from 'toolbar/toolbar';
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
      let search = common.getsearch();
      if(common.getcookies('token')){
          this.getData();
      }    
  
      if(search.code && search.state){
          let code = common.getcookies('authorize_code');
          if(code != search.code){
              if(search.isBind == 1){
                  common.setcookies('authorize_code', search.code, 7);
                  this.checkIsBind(search.code);                                
              }
          }
      }
   }

   getData(){
      let server = new ServerRequest();
      server.post({
          url:'home',
          maskLayer:true,
          async    :false,
          success:function(response){
             this.setState({
                nickname: response.nickname    || '草莓看客',
                amount  : response.totalIncome || '0.00',
                url     : response.faceUrl ? 'url('+common.joinImageUrl(response.faceUrl)+')' : ''
             });
             if(response.walletChanged == "true"){
                this.props.handle && this.props.handle()
             }
          }.bind(this)
      })
   }

  checkIsBind(code){
      let server = new ServerRequest();
      server.post({
          url : 'checkCanBind',
          data: {
            type      : 1,
            checkData : code,
          },
          success:function(response){
              if(response.msg){
                  layer.open({
                      content: response.msg,
                      style:'background-color:#fff; color:#323232;width:70%', //自定风格
                      btn: ['确定', '取消'],
                      yes: function(index){
                          layer.close(index);
                          this.bindWechat(response.tempAccessToken);                                          
                      }.bind(this),
                      no:function(){}
                  });
              }else{
                  this.bindWechat(response.tempAccessToken);         
              }
          }.bind(this)
      });        
  }  
 
  bindWechat(accessToken){
      let server = new ServerRequest();
      server.post({
          url : 'V2BindWechat',
          data:{
              tempAccessToken:accessToken
          },
          success:function(response){
              layer.open({content:'微信绑定成功',time:2});              
          }
      });       
  } 

   render(){
      return (
          <div className="mine-header-wrapper">
              <div className="personal-header">
                  <p className="headerImg" style={{backgroundImage:this.state.url}}></p>
              </div>
              <div className="personal-money">
                  <p className="headerTip">{this.state.nickname}</p>
                  <p>
                      <span>获赠总额&nbsp;￥</span>
                      <span>{this.state.amount}</span>                   
                  </p>
              </div>
          </div>
      )
   }
}

class List extends React.Component{
   constructor(props){
      super(props)
      this.state={
         display : 'none',
         status  : 'none',
         qrcodestatus:'none'
      }
   }

   componentWillReceiveProps(nextProps){
       this.setState({status:nextProps.status});
   }

   showQrcode(){
     this.setState({ qrcodestatus:'block'});
   }

   render(){
      return (
          <div className="mine-list-wrapper">
              <ul>
                  <li><Link to="/wallet">我的钱包</Link><i style={{display:this.state.status}}></i></li>
                  <li><Link to="/invite">邀请朋友</Link></li>
                  <li><a onClick={this.showQrcode.bind(this)}>关注公众号<span>草莓视频</span></a></li>
                  <li><Link to="/feedback">意见反馈</Link></li>
                  <li><Link to="/about">关于产品</Link></li>
                  <li><a href="./multipage/download.html?v=1.2">下载APP</a></li>
                  <li style={{display:'none'}}><Link to="/works">我的作品</Link></li>
                  <li><Link to="/setting">设置</Link></li>
              </ul>
              <Toolbar qrcodestatus={this.state.qrcodestatus} />
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
      this.state = {
          status:'none'
      }
   }

   walletchange(){
      this.setState({
          status:'block'
      });
   }

  /**
   * Math.max(window.innerHeight+65,window.innerWidth+65)
   * 解决横屏再竖屏之后，fixed导航栏被hot-wrapper移动时抹去问题（所谓的'橡皮擦问题'）
   * @return {[type]} [description]
   */
  render(){
      return (
        <div className="mine-wrapper" style={{height:Math.max(window.innerHeight+65,window.innerWidth+65)+ 'px'}}>
          <div style={{'marginBottom':'65px'}}>
              <Header handle={this.walletchange.bind(this)}/>
              <List status={this.state.status}/>
          </div>
          <Mask/>
        </div>
      )
  }

  componentWillUnmount(){
      window.scrollTo(0,0)
  }
}

export default Mine;
