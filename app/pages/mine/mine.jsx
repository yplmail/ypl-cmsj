import React from 'react';
import {Link} from 'react-router';
import './mine.css';
class Mine extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      return (
         <div className="mine-wrapper">
             <Header />
             <List />
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
              <div>
                  <i className="header-img"></i>
              </div>
              <div>
                  <span>不仅仅是看客</span>
              </div>
              <div className="springgrass-wallet" data-flex="box:mean main:center cross:center">
                  <div>
                      <p>￥637.25</p>
                      <p>获赠总额</p>
                  </div>
                  <div>
                      <p>￥637.25</p>
                      <p>我的零钱</p>
                  </div>
                  <div>
                      <p>1.22</p>
                      <p>转入微信</p>
                  </div>                  
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
                  <li>红包记录</li>
                  <li>意见反馈</li>
                  <li>关于产品</li>
                  <li>联系我们</li>
              </ul>
          </div>
      )
   }
}

export default Mine;