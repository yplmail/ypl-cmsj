import React from 'react';
import {Link} from 'react-router';
import './hot.css';
import ServerRequest from 'server/serverRequest';

class Hot extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			items:[]
		};
        this.success  = this.success.bind(this);
		this.touchStart = this.touchStart.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchEnd = this.touchEnd.bind(this);
	}

	componentWillMount(){
		this.initData();
	}  

	componentDidMount(){	
		this.wrapper = document.querySelector('.container-wrapper')
		this._preventDefault = function (e){ e.preventDefault(); }
		this.wrapper.addEventListener('touchmove', this._preventDefault);
	}

	initData(){
		let server = new ServerRequest();
		server.get({
			url:'/mock/list.json',
			success:this.success
		})   
	}

	success(response){
		this.setState({items:response.data})
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
        if(x >= moveMaxLeft){
        	x = moveMaxLeft
        }

        t.style.webkitTransform = 'translate3d('+x+'px, '+y+'px, 0)';
	}

	touchEnd(event){
		let t = event.currentTarget;
		var zIndex = document.defaultView.getComputedStyle(t,null)['zIndex'] * 1;
		if(zIndex < 3) return false;
        //滑动的距离
        let directionX = event.changedTouches[0].pageX - this.startPageX;
        let directionY = event.changedTouches[0].pageY - this.startPageY;
        
		if(!directionX && !directionY){
            if(event.target.className == "video-play"){
            	location.hash = '/detail?advId=123'
            }
		}else{
	        //向右滑动
	        console.log( directionX +"---->"+ directionY)
	        if(directionX => 0 && directionX < 50){
               t.style.webkitTransform = '';
	        }

	        if(directionX <= 0 && directionX > -50){
               t.style.webkitTransform = '';
	        }

	        if(directionX >= 50){
	        	var currentTarget = event.currentTarget;
		        currentTarget.style.webkitTransition= 'transform 0.2s linear';
		        currentTarget.style.webkitTransform = 'translate3d(100%, 0, 0)';
		        currentTarget.nextSibling.id='ani-scale';
		        var parentNode = event.currentTarget.parentNode;   
		        setTimeout(function(){
		        	parentNode.removeChild(currentTarget);
		        }.bind(this),320)  
	        }

	        if(directionX <= -50){
	        	var currentTarget = event.currentTarget;
		        currentTarget.style.webkitTransition= 'transform 0.2s linear';
		        currentTarget.style.webkitTransform = 'translate3d(-100%, 0, 0)';
		        currentTarget.nextSibling.id='ani-scale';
		        var parentNode = event.currentTarget.parentNode;   
		        setTimeout(function(){
		        	parentNode.removeChild(currentTarget);
		        }.bind(this),320)  	        	
	        }
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(this.state.items.length + " --->" + nextState.items.length)
        return true;
    }

    componentDidUpdate() {
      return true;
    }

    componentWillUnmount(){
         this.wrapper.removeEventListener('touchmove', this._preventDefault);
    }

	render(){
       return(
           <div className="hot-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
                 <ul>
                    {
                        this.state.items.map((item, index) => {
							return (<li onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} 
								key={index}>
								<div data-flex="main:center cross:center">
									<span className="video-play"></span>
									</div>
									<div data-flex="dir:left">
									<p className="adv-invest">{item.invest}</p>
									<p className="adv-packetcount">红包已领23622个</p>
									<p className="adv-score">3.6分</p>
									<p className="adv-time"><span>3:26</span></p>
								</div>
							</li>)	
						})
                    }
                 </ul>
           </div>
       )
	}	
}

export default Hot;