import React from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import './mine.css';

class Mine extends React.Component{
   constructor(props){
      super(props);
   }

   componentDidMount(){

   }

   render(){
      return (
         <div className="mine-wrapper">
             <Header />
             <List />
             <Mask/>
         </div>
      )
   }
}

class Header extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      return (
          <div className="mine-header-wrapper">
              <div className="personal-header">
                  <p className="headerImg"></p>
                  <p className="headerTip">不仅仅是看客</p>
              </div>
              <div className="personal-money">
                  <span>获赠总额&nbsp;￥</span>
                  <span>637.35</span>
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
                  <li><Link to="/wallet">我的钱包</Link></li>
                  <li><Link to="/feedback">意见反馈</Link></li>
                  <li><Link>关于产品</Link></li>
                  <li><Link>联系我们</Link></li>
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
         display : 'block'
      }
   }

   componentDidMount(){
      if(common.getcookies()){
          this.setState({
              display:'block'
          })
             //<Link to="/register">登陆</Link>
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

export default Mine;