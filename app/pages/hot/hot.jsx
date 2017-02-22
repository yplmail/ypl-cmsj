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
		this.startTime    = Date.now();
		//点击初始X轴位置，也是向左滑动的最大距离
        this.startPageX = event.touches[0].pageX;
        //点击初始Y轴位置，也是向顶滑动的最大距离
        this.startPageY = event.touches[0].pageY;

	}

	touchMove(event){
		let t = event.currentTarget;
		let containerHeight = window.innerHeight;
		let containerWidth  = window.innerWidth;
        //向bottom滑动的最大距离
        let moveMaxBottom = containerHeight - this.startPageY;
        //向right滑动的最大距离
        let moveMaxRight  = containerHeight - this.startPageX;
		let x = event.targetTouches[0].pageX - this.startPageX;
		let y = event.targetTouches[0].pageY - this.startPageY;
        //向右滑动
        if(x >= moveMaxRight){
        	x = moveMaxRight
        }
        //像左滑动
        if(x <= -this.startPageX){
        	x = -this.startPageX
        }
        //向上滑动
        if(y <= -this.startPageX){
        	y = -this.startPageX
        }

        if(y >= moveMaxBottom){
        	y = moveMaxright
        }
        t.style.webkitTransform = 'translate3d('+x+'px, '+y+'px, 0)';
	}

	touchEnd(event){
		let endTime    = Date.now();
        let endpageX = event.changedTouches[0].pageX;
        let endpageY = event.changedTouches[0].pageY;    
        let directionX = endpageX - this.startPageX;
        let directionY = endpageY - this.startPageY;
        let moveTime   = endTime - this.startTime;
		if(!directionX && !directionY){
            if(event.target.className == "video-play"){
            	location.hash = '/detail?advId=123'
            }
		}else{
	        //向右滑动
	        if(directionX >= 50){
	        	var currentTarget = event.currentTarget;
		        currentTarget.className='slideOutRight animated';
		        currentTarget.nextSibling.id='ani-scale';
		        var parentNode = event.currentTarget.parentNode;   
		        setTimeout(function(){
		        	parentNode.removeChild(currentTarget);
		        }.bind(this),320)  
	        }

	        // //向左滑动
	        // if(directionX <= -50 &&  moveTime < 1500){

	        // }
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		console.log(this.state.items.length + " --->" + nextState.items.length)

        return true;
    }

    componentDidUpdate() {
       
      return true;
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