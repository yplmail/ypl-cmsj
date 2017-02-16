import React from 'react';
import {Link} from 'react-router';
import './transfer.css';

class Wallet extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="transfer-wrapper">
	           <div className="conent">
		           <div className="account-amount">
			           <span>账户零钱：</span>
			           <span>￥637.35</span>
		           </div>
		           <div className="transfer-amount">
						<input id="one" type="radio" name="transferAmt" />
						<label htmlFor="one">10元</label>

						<input id="two" type="radio" name="transferAmt" />
						<label htmlFor="two">30元</label>

						<input id="three" type="radio" name="transferAmt" />
						<label htmlFor="three">50元</label>

						<input id="four" type="radio" name="transferAmt" />
						<label htmlFor="four">100元</label>

						<input id="six" type="radio" name="transferAmt" />
						<label htmlFor="six">200元</label>

						<input id="seven" type="radio" name="transferAmt" />
						<label htmlFor="seven">500元</label>
		           </div>
	           </div>
           </div>
       )
	}	
}

export default Wallet;