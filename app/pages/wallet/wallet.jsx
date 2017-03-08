import React from 'react';
import {Link} from 'react-router';
import Scroll from 'scroll/scroll';
import './wallet.css';

class Header extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
           <div className="wallet-header" data-flex="main:left box:mean">
               <div data-flex="main:center cross:center">
                   <div>
	                   <p>437.35</p>
	                   <p>我的零钱</p>
                   </div>
               </div>
               <div data-flex="main:center cross:center">
                   <div>
	                   <p></p>
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
		return(
			<li data-flex="main:left box:justify">
			<div>111</div>
			<div data-flex="dir:top box:mean">
			<h3>回家的路，阳光灿烂回家的路</h3>
			<p data-flex="box:mean cross:bottom">
			<span>11</span>
			<span>22</span>
			</p>
			</div>
			<div>
			<p>1111111111111</p>                                  
			<p>1111111111111</p>                                  
			</div>
			</li>	             
		)
	}
}

class Wallet extends React.Component{
	constructor(props){
		super(props);
        this.data = {
            el  : '."wallet-scroll',
            url : 'rewardList',
            row : List
        }
	}

	render(){
       return(
           <div className="wallet-wrapper">
				<Header />
				<div className="wallet-list">
				<h2>获赠记录</h2>
				<ul className="wallet-scroll">
					<Scroll {...this.data}/>
				</ul>
				</div>              
           </div>
       )
	}	
}

export default Wallet;