import React from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'swipes/ReactSwipes';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './index.css';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.pageIndex = 1;
		this.pageSize  = 10;
		this.pageCount = 0;
		this.scrollHeight  = Math.max(window.innerHeight,window.innerWidth) - 50;
		this.coverWidth = Math.round(common.remRatio() * 7.5);
		this.isLoading = false;
		this.firstrender = true;
		this.state = {
			items  :[],
			banners:[],
			dot    : 0,
			loadingTips:false,
			options:{
				distance    : this.coverWidth,    // 每次移动的距离，卡片的真实宽度
				currentPoint: 0,// 初始位置，默认从0即第一个元素开始
				maxPoint    : 1,
				swTouchend: (ev) => {
					this.setState({
		               	options:{
							currentPoint: ev.newPoint            		
			            }
					})
				}					
			}
		}
		this.scrolloptions = {
		    bounce    : true,
		    click     : true			
		}	
	}

	componentWillMount(){
		this.fetchBannerData();
		this.fetchDiscoveryData();
	}

	fetchBannerData(){
		let server = new ServerRequest();
		server.post({
			url:'banner',
			success:function(response){
               this.setState({
	               	banners:response.datas || [],
	               	options:{
	               		currentPoint:0,
						maxPoint    :  response.datas ? response.datas.length - 1 : 0             		
		            }
               })
			}.bind(this)
		});		
	}

	fetchDiscoveryData(){
		let server = new ServerRequest();
		server.post({
			url:'advList',
			data:{
				pageIndex:this.pageIndex,
				pageSize :this.pageSize,
				type     :1				
			},
			success:function(response){
				 this.isLoading    = false;
				 this.firstrender  = false;
				 this.pageCount  = response.pageCount;
                 this.setState({
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items:this.state.items.concat(response.datas)
                 });
			}.bind(this)
		});
	}

	onScrollEnd(scroll){
		if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
			if(this.isLoading) return false;
			if(this.pageIndex < this.pageCount){
				++this.pageIndex;
				this.isLoading = true;
				this.fetchDiscoveryData();                	
			}
		}
	}

	navigator(id){
	    this.isLoading = false;
	    location.href  = "./multipage/detail.html?videoId=" + id + '&version=1.0.0';
	}	

	row(item,index){
        let count = item.totalCount - item.usedCount;
        let countText = '剩余'+count+'个';
        if(count == 0){
            countText = '已领完';
        }
        let totalAmount = (item.totalAmount || '0') * 1;    		
        return (
			<li key={index} style={{'backgroundImage':'url('+common.joinImageUrl(item.coverUrl)+'?x-oss-process=image/resize,m_lfit,w_'+this.coverWidth+')'}}>
			<a data-flex="dir:bottom" onClick={this.navigator.bind(this,item.publishId)}>
			<div className="discovery-tools" data-flex="dir:left">		
			<div>
			<img src={require('../../images/adv_play_count.png')} />
			<span>{item.playTimes}次</span>
			</div>

			<div style={{visibility:totalAmount > 0 ? 'visible' : 'hidden'}}>
			<img src={require('../../images/list_packet_icon.png')} />
			<span>{countText}</span>
			</div>

			<div style={{visibility:totalAmount > 0 ? 'visible' : 'hidden'}}>
			<img src={require('../../images/adv_packetamt_icon.png')} />
			<span>{item.maxMoney}元</span>
			</div>

			<div>
			<span className="playtime">{item.duration}</span>
			</div> 
			</div>
			<div className="discovery-title ellipsis">{item.title}</div>
			</a>	                 
			</li>   	  	
        )
    }

	silder(item,index){
		return (<a key={index} href={item.bannerUrl} className="slide"><img src={common.joinImageUrl(item.coverUrl)} /></a>)
	}

	dot(index){
		return (<span key={index} className={this.state.options.currentPoint == index ? 'active':''}></span>)
	}

	refresh(scroll){
        this.scroll = scroll;
	}

	componentDidUpdate(){
		let timer = setTimeout(function(){
			clearTimeout();
			this.scroll && this.scroll.refresh();       	
		}.bind(this),300);
	}

	render() {
		let scroll = [];
		let slide  = [];
		let dots   = [];
        if(this.state.items.length > 0){
			this.state.items.map(function(item,index){
				scroll.push(this.row(item,index));
			}.bind(this))        	
        }else{
            if(!this.firstrender){
            	scroll.push(
            		<div className="iscroll-empty" data-flex="cross:center main:center">
            		<img src={require('../../images/no_data.png')} />
            		</div>
            	);
            }
        }

		this.state.banners.map(function(item,index){
			slide.push(this.silder(item,index));
			dots.push(this.dot(index));
		}.bind(this))	

		return (
			<div className="discovery-wrapper">
				<div className="discovery-outer" style={{height:this.scrollHeight + 'px'}}>
					<ReactIScroll iScroll={iScroll} 
					onScrollEnd={this.onScrollEnd.bind(this)} 
					options={this.scrolloptions}
					onRefresh={this.refresh.bind(this)}>
						<ul ref="discoveryscroll">
							<div className="discovery-swipe" style={{height:slide.length > 0 ? '4rem':'0px'}}>
							    <div style={{'width':this.state.banners.length*this.coverWidth + 'px','height':'100%'}}>
							        <ReactSwipe className="discovery-slide" options={this.state.options}>
				                        {slide}
							        </ReactSwipe>
								    <div className="swipe-dot" data-flex="dir:left main:center cross:center">
										{dots}
								    </div>
							    </div>
							</div>  
	                        {scroll}
			                <div className="scroll-loading" style={{display:this.state.loadingTips ? 'block':'none'}}>
			                    <div className="loading-box">
			                        <div className="loading-rond">
			                            <div className="rond"></div>
			                        </div>
			                        <div className="loading-circle">
			                            <p>正在加载</p>
			                        </div>
			                    </div>
			                </div>
						</ul> 	
					</ReactIScroll>
				</div>
			</div>
		)
	}
}


export default Index;

