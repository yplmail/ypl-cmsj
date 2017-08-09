import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import './withdraw.css';

class Withdraw extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			account : {}
		}
	}

    componentWillMount(){
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

    withdraw(event){
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
    			content:'提现金额大于账户余额',
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
				this.dealwidth(value);
			}.bind(this)
		});
    }

    dealwidth(amt){
		let server = new ServerRequest();
		let msg = '提交成功';
		if(amt >= 10){
			msg = '提现10以上<br/>24小时之内到账哦！'
		}
		server.post({
			url: 'withdraw',
			data:{
				amount:amt
			},
			success:function(response){
	    		layer.open({
	    			content:msg,
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
           <div className="withdraw-wrapper" style={{height:window.innerHeight+"px"}}>
	           <div className="conent">
		           <div className="account-amount">
			           <span>账户零钱：</span>
			           <span>￥{this.state.account.accountBalance}</span>
		           </div>
		           <div className="withdraw-amount" onClick={this.withdraw.bind(this)}>
		           		<input id="zero" type="radio" name="withdrawAmt" value="1"/>
						<label htmlFor="zero">1元</label>

						<input id="one" type="radio" name="withdrawAmt" value="5"/>
						<label htmlFor="one">5元</label>

						<input id="two" type="radio" name="withdrawAmt" value="10"/>
						<label htmlFor="two">10元</label>

						<input id="three" type="radio" name="withdrawAmt" value="30"/>
						<label htmlFor="three">30元</label>

						<input id="four" type="radio" name="withdrawAmt"  value="50"/>
						<label htmlFor="four">50元</label>

						<input id="five" type="radio" name="withdrawAmt" value="100"/>
						<label htmlFor="five">100元</label>
		           </div>
	           </div>

	           <div className="withdraw-tips">提现（1元以上第2个工作日到账）</div>
           </div>
       )
	}
}

export default Withdraw;
