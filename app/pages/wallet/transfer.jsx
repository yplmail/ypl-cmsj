import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import './transfer.css';

class Wallet extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			account : {}
		}
		this.transfer = this.transfer.bind(this);
	}

    componentDidMount(){
		let server = new ServerRequest();
		server.post({
			url: 'home',
			maskLayer:true,
			success:function(response){
				this.setState({
                    account : response
				});
			}.bind(this)
		}) 
    }

    transfer(event){
    	let nodeName = event.target.nodeName.toUpperCase();
        if(nodeName != 'INPUT'){return false;}
    	let value  = event.target.getAttribute('value') * 1;
    	let amount = this.state.account.accountBalance * 1;
    	if(amount == 0){
    		layer.open({
    			content:'账户余额不足',
    			time : 2
    		}) 
    		return false;   		
    	}
    	if(value > amount){
    		layer.open({
    			content:'提现金额不能大于账户余额',
    			time : 2
    		})
    		return false;
    	}

		layer.open({
			content: '<p>确定转出金额？</p><p>￥'+value+'</p>',
			style:'background-color:#fff; color:#323232;width:70%', //自定风格
			btn: ['确定', '取消'],
			yes: function(index){
				layer.close(index);
				this.withdraw(value);
			}.bind(this)
		});     	
    }

    withdraw(amt){
		let server = new ServerRequest();
		server.post({
			url: 'withdraw',
			data:{
				amount:amt
			},
			success:function(response){
	    		layer.open({
	    			content:'转出成功',
	    			time : 2,
	    			end : function(){
                        location.hash = "/wallet/2";
	    			}.bind(this)
	    		})
			}.bind(this)
		}) 
    }

	render(){
       return(
           <div className="transfer-wrapper">
	           <div className="conent">
		           <div className="account-amount">
			           <span>账户零钱：</span>
			           <span>￥{this.state.account.accountBalance}</span>
		           </div>
		           <div className="transfer-amount" onClick={this.transfer}>
		           		<input id="zero" type="radio" name="transferAmt" value="1"/>
						<label htmlFor="zero">1元</label>

						<input id="one" type="radio" name="transferAmt" value="10"/>
						<label htmlFor="one">10元</label>

						<input id="two" type="radio" name="transferAmt" value="30"/>
						<label htmlFor="two">30元</label>

						<input id="three" type="radio" name="transferAmt"  value="50"/>
						<label htmlFor="three">50元</label>

						<input id="four" type="radio" name="transferAmt" value="100"/>
						<label htmlFor="four">100元</label>

						<input id="six" type="radio" name="transferAmt" value="200"/>
						<label htmlFor="six">200元</label>

						<input id="seven" type="radio" name="transferAmt" value="500"/>
						<label htmlFor="seven">500元</label>
		           </div>
	           </div>
           </div>
       )
	}	
}

export default Wallet;