import React from 'react';
import {IndexLink,Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import PacketRecord from './packetRecord';
import TransferRecord from './transferRecord';

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
        this.state = {       
            child  : this.props.params.tab == 2 ? TransferRecord : PacketRecord,
        }
        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount(){
        let packet = this.refs.packetRecord;
        let transfer = this.refs.transferRecord;      
        if(this.props.params.tab == 2){
            transfer.className='active';
        }else{
            packet.className ='active';
        }
    }

    changeTab(event){
       let val = event.target.getAttribute('value');
       let packet = this.refs.packetRecord;
       let transfer = this.refs.transferRecord;
       let obj = PacketRecord
       if(val == "1"){
           packet.className='active'
           transfer.className='';
       }else{
           obj = TransferRecord
           packet.className='';
           transfer.className='active'

       }
       this.setState({child:obj});
    }

    render(){
       return(
           <div className="wallet-wrapper">
                <Header />
                <div className="wallet-list">
                    <div className="list-header" data-flex="dir:left box:mean cross:center">
                        <div><a ref="packetRecord" onClick={this.changeTab} value="1">获赠记录</a></div>
                        <div><a ref="transferRecord" onClick={this.changeTab} value="2">提现记录</a></div>
                    </div>
                    <this.state.child />
                </div>
           </div>
       )
    }
}

export default Wallet;
