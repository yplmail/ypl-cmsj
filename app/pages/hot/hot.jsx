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
		this.iosFlag = true;
	}

	componentWillMount(){
		this.initData();
	}  

	componentDidMount(){	
		this.wrapper = document.querySelector('.container')
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
        let moveMaxTop = t.offsetHeight+ t.offsetTop - 20;
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
            	location.hash = '/detail?advId=123&player=true'
            }else{
            	//location.hash = '/detail?advId=123&player=false'
            	//
            	location="../../player.html"
            }
		}else{
	        //还原位置
	        if((directionX => 0 && directionX < 50) || (directionX <= 0 && directionX > -50)){
                this.backAnimation(t);
	        }
	        //向右滑动
	        if(directionX >= 50){
			    this.silderAnimation(t,150)
	        }
            //向左滑动
	        if(directionX <= -50){
                this.silderAnimation(t,-150)
	        }
		}
	}

	moveAnimation(t,x,y){
		t.style.transition= '';
        t.style.webkitTransition= '';	
        t.style.transform = 'translate3d('+x+'px, '+y+'px, 0)';
        t.style.webkitTransform = '-webkit-translate3d('+x+'px, '+y+'px, 0)';

        if(t.nextSibling){
	        t.nextSibling.style.transition= 'transform 0.6s linear';
	        t.nextSibling.style.webkitTransition= '-webkit-transform 0.6s linear';

	        t.nextSibling.style.transform = 'translateY(0) scale3d(0.95,0.95,0.95)';
	        t.nextSibling.style.webkitTransition = '-webkit-translateY(0) scale3d(0.95,0.95,0.95)';      	
        }		
	}

	backAnimation(t){
        t.style.transition= 'transform 0.2s linear';
        t.style.webkitTransition= '-webkit-transform 0.2s linear';		
		t.style.transform = '';
		t.style.webkitTransform = '';
		if(t.nextSibling){
			t.nextSibling.style.transform = '';
			t.nextSibling.style.webkitTransition = '';					
		}
	}

	silderAnimation(t,direction){
        t.style.transition= 'transform 0.2s linear';
        t.style.webkitTransition= '-webkit-transform 0.2s linear';

        t.style.transform = 'translateX('+direction+'%) scale3d(1,1,1)';
        t.style.webkitTransform = '-webkit-translateX('+direction+'%) scale3d(1,1,1)';

        if(t.nextSibling){
			t.nextSibling.style.transform = 'translateY(0) scale3d(1,1,1)';
			t.nextSibling.style.webkitTransition = '-webkit-translateY(0) scale3d(1,1,1)';
	        setTimeout(function(){
		        var parentNode = t.parentNode;   
		        parentNode.removeChild(t);
	        }.bind(this),320)  	        	
        }else{
			t.style.transform = '';
			t.style.webkitTransition = '';		
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