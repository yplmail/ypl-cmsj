import React from 'react';
import {Link} from 'react-router';
import './hot.css';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';

class Hot extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			items:[]
		};
		this.pageIndex = 1;
		this.pageCount = 0;
		this.isRefresh = false;
		this.touchStart = this.touchStart.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchEnd = this.touchEnd.bind(this);
		this.removeNode = this.removeNode.bind(this);
	    this.height = Math.round(common.remRatio() * 6.82);
	    this.orientationchange = this.orientationchange.bind(this);
	}

	componentDidMount(){
		this.initData();
		this.wrapper = document.querySelector('.hot-inner')
		this._preventDefault = function (e){ e.preventDefault(); }
		this.wrapper.addEventListener('touchmove', this._preventDefault,false);	
		// window.addEventListener('orientationchange',this.orientationchange,false);
	}

	orientationchange(){
		if(window.orientation == 0){
			alert(window.scrollY)
			this.wrapper.addEventListener('touchmove', this._preventDefault,false);			
		}else{
			this.wrapper.removeEventListener('touchmove', this._preventDefault,false);	
		}
	}

	initData(){
		let server = new ServerRequest();
		server.post({
			url:'hotVideos',
			data:{
				pageSize  : 10,
				pageIndex : this.pageIndex
			},
			success:function(response){
				this.isRefresh = true;
				this.pageCount = response.pageCount;
				this.setState({items:this.state.items.concat(response.datas)});
			}.bind(this)
		})
	}

	touchStart(event){
		//点击初始X轴位置，也是向左滑动的最大距离
        this.startPageX = event.touches[0].pageX;
        //点击初始Y轴位置，也是向顶滑动的最大距离
        this.startPageY = event.touches[0].pageY;
	}

	touchMove(event){
		let t = event.currentTarget;
		var zIndex = document.defaultView.getComputedStyle(t,null)['zIndex'] * 1;
		if(zIndex < 3) return false;
        //向上滑动最大距离
        let moveMaxTop = t.offsetHeight + t.offsetTop - 20;
        //向下滑动最大距离
        var footerHeight = document.querySelector('.nav-wrapper').offsetHeight
        let moveMaxBottom = window.innerHeight - t.offsetTop - footerHeight - 20;
        //向左滑动的最大距离
        let moveMaxLeft = t.offsetWidth
        //向右滑动的最大距离
        let moveMaxRight = t.offsetWidth
        //滑动的x,y值
		let x = event.targetTouches[0].pageX - this.startPageX;
		let y = event.targetTouches[0].pageY - this.startPageY;
        //向上滑动
        if(y <= -moveMaxTop){
        	y = -moveMaxTop
        }
        //向下移动的最大距离
        if(y >= moveMaxBottom){
        	y = moveMaxBottom
        }
        //向左移动的最大距离
        if(x <= -moveMaxLeft){
        	x = -moveMaxLeft
        }
        //向右移动最大的距离
        if(x >= moveMaxLeft){
        	x = moveMaxLeft
        }

        this.moveAnimation(t,x,y);

		if(event.touches[0].clientY < 0){
			if(x >= 50 || x <= -50){
				this.silderAnimation(t);
			}else{
				this.backAnimation(t);
			}
		}
	}

	touchEnd(event){
		let t = event.currentTarget;
		var zIndex = document.defaultView.getComputedStyle(t,null)['zIndex'] * 1;
		if(zIndex < 3) return false;
        //滑动的方向
        let directionX = event.changedTouches[0].pageX - this.startPageX;

        let directionY = event.changedTouches[0].pageY - this.startPageY;

		if(!directionX && !directionY){
            if(event.target.className == "video-play"){
            	//location.hash = '/detail'
            }else{
            	//location.hash = '/detail'
            }
		}else{
	        //还原位置
	        if((directionX => 0 && directionX < 50) || (directionX <= 0 && directionX > -50)){
                this.backAnimation(t);
	        }
	        //向右滑动
	        if(directionX >= 50){
			    this.silderAnimation(t,150,directionY)
	        }
            //向左滑动
	        if(directionX <= -50){
                this.silderAnimation(t,-150,directionY)
	        }
		}
	}

	moveAnimation(t,x,y){
		t.style.transition= '';
        t.style.webkitTransition= '';
        t.style.transform = 'translate3d('+x+'px, '+y+'px, 0)';
        t.style.webkitTransform = '-webkit-translate3d('+x+'px, '+y+'px, 0)';

        if(t.nextSibling){
	        t.nextSibling.style.transition= 'transform 0.4s linear';
	        t.nextSibling.style.webkitTransition= '-webkit-transform 0.4s linear';

	        t.nextSibling.style.transform = 'translateY(0) scale3d(1,1,1)';
	        t.nextSibling.style.webkitTransition = '-webkit-translateY(0) scale3d(1,1,1)';
        }
	}

	backAnimation(t){
        t.style.transition= 'transform 0.2s linear';
        t.style.webkitTransition= '-webkit-transform 0.2s linear';
		t.style.transform = 'translateY(0) scale3d(1,1,1)';
		t.style.webkitTransform = 'translateY(0) scale3d(1,1,1)';

		if(t.nextSibling){
	        t.nextSibling.style.transition= 'transform 0.2s linear';
	        t.nextSibling.style.webkitTransition= '-webkit-transform 0.2s linear';

	        t.nextSibling.style.transform = 'translateY(25px) scale3d(0.95,0.95,0.95)';
	        t.nextSibling.style.webkitTransition = '-webkit-translateY(25px) scale3d(0.95,0.95,0.95)';
		}
	}

	silderAnimation(t,direction,y){
        t.style.transition= 'transform 0.2s linear';
        t.style.webkitTransition= '-webkit-transform 0.2s linear';

        t.style.transform = 'translate('+direction+'%,'+y+'px) scale3d(1,1,1)';
        t.style.webkitTransform = '-webkit-translateX('+direction+'%,'+y+'px) scale3d(1,1,1)';

        if(t.nextSibling){
            t.nextSibling.style.transition= 'transform 0.2s linear';
	        t.nextSibling.style.webkitTransition= '-webkit-transform 0.2s linear';
	        t.nextSibling.style.transform = 'translateY(0) scale3d(1,1,1)';
	        t.nextSibling.style.webkitTransition = '-webkit-translateY(0) scale3d(1,1,1)';
	        this.removeNode(t);
        }else{
	        t.style.transition= 'transform 0.2s linear';
	        t.style.webkitTransition= '-webkit-transform 0.2s linear';
			t.style.transform = 'translateY(0) scale3d(1,1,1)';
			t.style.webkitTransform = 'translateY(0) scale3d(1,1,1)';
        }
	}

	removeNode(t){
		setTimeout(function(){
			var parentNode = t.parentNode;
			parentNode.removeChild(t);
			if(parentNode.childNodes.length <= 3){
				++this.pageIndex;
				if(this.pageIndex <= this.pageCount){
					this.initData();
				}
			}
		}.bind(this),320)
	}

	linkHandle(videoId){
		location.hash = '/detail/'+ videoId;
	}

	loop(){
		if(this.state.items.length > 0){
			return this.state.items.map((item, index) => {
				let coverUrl = item.coverUrl ? 'url('+item.coverUrl+'?x-oss-process=image/resize,m_fill,h_'+this.height+',limit_0)' : '';
				return (
						<li onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}
						key={item.publishId} >
								<div data-flex="main:center cross:center" style={{backgroundImage:coverUrl}}
								onClick={this.linkHandle.bind(this,item.publishId)}>
										<span className="video-play"></span>
								</div>
								<div data-flex="dir:left">
										<p className="adv-invest">{item.totalAmount}</p>
										<p className="adv-packetcount">已领{item.usedCount}个</p>
										<p className="adv-time"><span>{item.duration}</span></p>
								</div>
								<h2 className="adv-title ellipsis">{item.title}</h2>
						</li>
				)
			})
		}else if(this.isRefresh){
			return (<div className="no-data">暂无相关数据</div>)
		}
	}

	render(){
       return(
           <div className="hot-wrapper">
                <ul className="hot-inner">{this.loop()}</ul>
           </div>
       )
	}

	componentWillUnmount(){
        window.scrollTo(0,0)
	}
}

export default Hot;
