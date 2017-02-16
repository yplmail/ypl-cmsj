import React from 'react';
import {Link} from 'react-router';
import './wallet.css';

class Wallet extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="wallet-wrapper">
	           <div className="wallet-header" data-flex="main:center cross:center">
                   <div>
	                   <p>637.35</p>
	                   <p>我的零钱</p>
	               </div>
	           </div>

	           <div className="wallet-list">
                   <ul>
	                   <li data-flex="box:mean main:center">
							<div><Link className="packet-record" to="/record">获赠记录</Link></div>
							<div><Link className="transfer-wechet" to="/transfer">转让微信</Link></div>
	                   </li>
	                   <li data-flex="box:mean">
                          <div></div>
                          <div></div>                   
	                   </li>
                   </ul>
	           </div>
           </div>
       )
	}	
}

export default Wallet;