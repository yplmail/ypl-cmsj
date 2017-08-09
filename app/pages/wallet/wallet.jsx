import React from 'react';
import {IndexLink,Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import ReactSwipe from 'swipes/ReactSwipes';
import PacketRecord  from './packetRecord';
import InviteRecord  from './inviteRecord';
import WithdrawRecord  from './withdrawRecord';
import Toolbar from 'toolbar/toolbar';
import './wallet.css';

class Wallet extends React.Component{
    constructor(props){
        super(props);
        this.isFPN = false;
        this.state = {
            account : {},
            qrcodestatus:'none',
            options:{
                currentPoint: 0,
                maxPoint    : 2,
                distance    : common.remRatio() * 7.5,
                swTouchend: (ev) => {
                    this.setState({options:{currentPoint:ev.newPoint}});
                }     
            }             
        }        
        this.coverwidth = Math.round(common.remRatio() * 7.5) * 3; 
        this.scrollHeight  = Math.max(window.innerHeight,window.innerWidth) - 2.96*common.remRatio();
    }

    componentWillMount(){
        this.fetchUserInfo();
        this.fetchFPNInfo();
    }

    fetchUserInfo(){
        let server = new ServerRequest();
        server.post({
            url: 'home',
            maskLayer:true,
            success:function(response){
                this.setState({account : response});
            }.bind(this)
        })      
    }

    fetchFPNInfo(){
        let server = new ServerRequest();
        server.post({
            url: 'subscribed',
            success:function(response){
               this.isFPN = response.subscribed;
            }.bind(this)
        })         
    }

    withdraw(){
        if(this.state.account.isWechatBinded == "false"){
            layer.open({
                content: '为保证您的账户安全，请绑定微信',
                style:'background-color:#fff; color:#323232;width:70%', //自定风格
                btn: ['确定', '取消'],
                yes: function(index){
                    layer.close(index);
                    location.href = './redirect.html?scope=snsapi_userinfo&isBind=1#/mine';                                              
                }.bind(this)
            });
            return false;
        }

        if(!this.isFPN){
            this.setState({qrcodestatus:'block'});;   
            return false;
        }

        if(!this.state.account.mobile){
            layer.open({
                content: '为保证您的账户安全，请绑定手机号码',
                style:'background-color:#fff; color:#323232;width:70%', //自定风格
                btn: ['确定', '取消'],
                yes: function(index){
                    layer.close(index);
                    location.hash = '#/mobileAuth';
                }.bind(this)
            });          
            return false;
        }
        location.hash = '/withdraw';      
    }

    changeTab(val,event){
       this.setState({options:{currentPoint:val}});
    }

    render(){
       return(
           <div className="wallet-wrapper">
                <div className="wallet-header" data-flex="main:left box:mean">
                    <div data-flex="main:center cross:center">
                        <div className="accountBalance">
                            <p>{this.state.account.accountBalance}</p>
                            <p>我的零钱</p>
                        </div>
                    </div>
                    <div data-flex="main:center cross:center">
                        <div className="withdraw" onClick={this.withdraw.bind(this)}>
                            <p></p>
                            <p>提现</p>
                        </div>
                    </div>
                </div>

                <div className="wallet-content">
                    <div className="tab-nav">
                        <div><a className={this.state.options.currentPoint==0?'active':''} onClick={this.changeTab.bind(this,0)}>获赠记录</a></div>
                        <div><a className={this.state.options.currentPoint==1?'active':''} onClick={this.changeTab.bind(this,1)}>邀请记录</a></div>
                        <div><a className={this.state.options.currentPoint==2?'active':''} onClick={this.changeTab.bind(this,2)}>提现记录</a></div>
                    </div>


                    <div className="wallet-swipe">
                        <div className="swipe-outer">
                            <div style={{width:this.coverwidth}}>
                                <ReactSwipe className="swipe-items" options={this.state.options}>
                                    <PacketRecord   height={this.scrollHeight} />
                                    <InviteRecord   height={this.scrollHeight} />
                                    <WithdrawRecord height={this.scrollHeight} />
                                </ReactSwipe>    
                            </div>
                        </div>
                    </div>                    

                <Toolbar qrcodestatus={this.state.qrcodestatus}/>
                </div>
           </div>
       )
    }
}

export default Wallet;
