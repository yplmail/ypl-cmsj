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
              <div><img src="../../images/user_header_icon.png" /></div>
              <div><span>不仅仅是看客</span></div>
              <div>获赠总金额&nbsp;￥<span>637.35</span></div>
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

export default Mine;