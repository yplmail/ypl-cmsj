import React from 'react';
import {Link} from 'react-router';
import Scroll from 'scroll/iscroll';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import './wallet.css';

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			account : {}
		}
		this.transferHandle = this.transferHandle.bind(this);
	}

	componentDidMount(){
		let server = new ServerRequest();
		server.post({
			url: 'home',
			success:function(response){
				this.setState({
                    account : response
				});
			}.bind(this)
		})
	}

	transferHandle(){
       if(!this.state.account.mobile){
            layer.open({
            	content:'请绑定手机号',
            	time : 2
            })
       }

       if(!this.state.account.isWechatBinded === "true"){
            layer.open({
            	content:'请绑定微信号',
            	time : 2
            })
       }

       location.hash = '/transfer'
	}

	render(){
		return(
           <div className="wallet-header" data-flex="main:left box:mean">
               <div data-flex="main:center cross:center">
                   <div>
	                   <p>{this.state.account.accountBalance}</p>
	                   <p>我的零钱</p>
                   </div>
               </div>
               <div data-flex="main:center cross:center">
                   <div onClick={this.transferHandle}>
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
            el  : '.wallet-scroll',
            url : 'rewardList',
            callback : this.template.bind(this)
        }
    }

    template(item){
        let element = document.createElement('li');
        element.setAttribute('data-flex', 'main:left box:justify')
        element.innerHTML = this.innerHtml(item);
        return element;
    }

    innerHtml(item){
        return '<div>111</div>'+
        '<div data-flex="dir:top box:mean">'+
        '<h3>回家的路，阳光灿烂回家的路</h3>'+
        '<p data-flex="box:mean cross:bottom">'+
        '<span>11</span>'+
        '<span>22</span>'+
        '</p>'+
        '</div>'+
        '<div>'+
        '<p>1111111111111</p>'+
        '<p>1111111111111</p>'+
        '</div>';      
    }

    render(){
       return(
           <div className="wallet-wrapper">
                <Header/>
                <div className="wallet-list">
                    <h2>获赠记录</h2>
                    <div className="wallet-scroll">
                        <Scroll {...this.data} />
                    </div>
                </div>
           </div>
       )
    }
}

export default Wallet;
