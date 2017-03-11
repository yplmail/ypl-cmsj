import React from 'react';
import {Link} from 'react-router';
import Scroll from 'scroll/scroll';
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
		this.pageIndex = 1;
		this.pageSize  = 10;
		this.totalCount = 0;
        this.downStatus = 1;
        this.upStatus   = 1;
        this.pullDownTips = {
            1: '下拉刷新',
            2: '松手刷新',
            3: '正在刷新',
            4: '刷新成功'
        };

        this.pullUpTips = {
            1: '上拉加载',
            2: '松手加载',
            3: '正在加载',
            4: '加载成功'
        };

        this.onScrollStart = this.onScrollStart.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
	}

	componentDidMount(){
        this.initScroll();
        this.fetchItem();
	}

    initScroll(){
        this.scroll = new BScroll('.wallet-scroll', {
            probeType: 3,
            click:true
        })
        this.scroll.on('scroll', this.onScrollStart);
        this.scroll.on('scrollEnd', this.onScrollEnd);
    }

	fetchItem(){
		let server = new ServerRequest();
		server.post({
			url: 'advList',
			data:{
               pageIndex : this.pageIndex,
               pageSize  : this.pageSize
			},
			success:function(response){
                if(this.pageIndex == 1){
                    this.downStatus = 4;
                    this.refs.pullDownTips.innerText = this.pullUpTips[4];
                    setTimeout(function(){
                        this.refs.pullDown.style.display='none';
                    }.bind(this), 500)
                }else{
                    this.upStatus = 4;
                    this.refs.pullUpTips.innerText = this.pullUpTips[4];
                    setTimeout(function(){
                        this.refs.pullUp.style.display='none';
                    }.bind(this), 500)
                }
                this.totalCount = response.totalCount;
                this.template(response.datas);
			}.bind(this)
		})
	}

	template(items){
       if(this.totalCount == 0){
           this.refs.scroll.innerHTML = '<div>暂无数据</div>'
       }else{
           this.child(items);
       }
	}

	child(items){
        var box = this.refs.scroll;
        if(this.pageIndex == 1){
           box.innerHTML = '';
            items.map(function(item,index){
                let el = document.createElement('li');
                el.setAttribute('data-flex', 'main:left box:justify')
                el.innerHTML = '<div>111</div>'+
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
                box.appendChild(el)
            })
        }else{
            items.map(function(item,index){
                let el = document.createElement('li');
                el.setAttribute('data-flex', 'main:left box:justify')
                el.innerHTML = '<div>111</div>'+
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
                box.appendChild(el)
            })
        }

        this.scroll.refresh();

	}

    onScrollStart(){
        //下拉
        if(this.scroll.y >= 0){
            this.refs.pullDown.style.display='block';
            if(this.downStatus == 1 || this.downStatus ==4){
                this.downStatus = 1;
                this.refs.pullDownTips.innerText = this.pullDownTips[1];
            }
            if (this.scroll.y >= 40 && this.downStatus == 1) {
                this.downStatus = 2;
                this.refs.pullDownTips.innerText = this.pullDownTips[2];
            }
            return false;
        }

        //上拉
       if(this.scroll.y <= this.scroll.maxScrollY){
            this.refs.pullUp.style.display='block';
            if(this.upStatus == 1 || this.upStatus == 4) {
                this.upStatus = 1;
                this.refs.pullUpTips.innerText = this.pullUpTips[1];
            }

            if(this.scroll.y <= (this.scroll.maxScrollY-40)){
                if(this.upStatus == 1){
                    this.upStatus = 2;
                    this.refs.pullUpTips.innerText = this.pullUpTips[2];
                }
            }
       }
    }

    onScrollEnd(){
        if(this.scroll.y >= 0){
            if (this.downStatus == 2) {
                this.downStatus = 3;
                this.refs.pullDownTips.innerText = this.pullDownTips[3];
                this.pageIndex = 1;
                this.fetchItem();
            }
            return false;
        }


       if(this.scroll.y <= this.scroll.maxScrollY){
           if(this.upStatus = 2){
               this.upStatus = 3;
               this.refs.pullUpTips.innerText = this.pullUpTips[3];
               ++this.pageIndex;
               this.fetchItem();
           }

       }
    }

	render(){
       return(
           <div className="wallet-wrapper">
				<Header/>
				<div className="wallet-list">
					<h2>获赠记录</h2>
                    <div className="wallet-scroll">
                            <div>
                                <div className="scroll-loading" ref="pullDown" >
                                <div className="loading-box">
                                <div className="loading-rond">
                                <div className="rond"></div>
                                </div>
                                <div className="loading-center">
                                <p ref="pullDownTips"></p>
                                </div>
                                </div>
                                </div>
                                <ul ref='scroll'>


                                </ul>
                                <div className="scroll-loading" ref="pullUp" >
                                <div className="loading-box">
                                <div className="loading-rond">
                                <div className="rond"></div>
                                </div>
                                <div className="loading-center">
                                <p ref="pullUpTips"></p>
                                </div>
                                </div>
                                </div>
                            </div>
                    </div>
				</div>
           </div>
       )
	}
}

export default Wallet;
