import React from 'react';
import {Link} from 'react-router';
import Scroll from 'scroll/iscroll';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
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

class Wallet extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            el  : '.wallet-scroll',
            url : 'rewardList',
            callback : this.template.bind(this)
        }
        this.originType = {
            1:'观看获赠',
            2:'分享获赠',
            3:'邀请注册获赠'
        }
    }

    template(item){
        let element = document.createElement('li');
        element.setAttribute('data-flex', 'main:left box:first')
        element.innerHTML = this.innerHtml(item);
        return element;
    }

    innerHtml(item){
      return  '<div><img src='+item.coverUrl+'></div>' +
              '<div data-flex="dir:top box:mean">'+
              '<div data-flex="dir:left box:last" class="header">'+
              '<h3 class="ellipsis">'+item.title+'</h3><p><span>'+item.amount+'</span>元</p></div>'+
              '<div data-flex="dir:left box:mean" class="detail">'+
              '<p>'+item.publishUserName+'</p><p>'+common.getDateDiff(new Date(item.time).getTime())+'</p>'+
              '<p>'+this.originType[item.originType]+'</p></div></div>';      
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
