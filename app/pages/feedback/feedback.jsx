import React from 'react';
import common from 'common/common';
import ServerRequest from 'server/serverRequest';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import './feedback.css'

class Feedback extends React.Component{
	constructor(props){
		super(props)
		this.pageIndex = 1;
		this.pageSize  = 10;
		this.pageCount = 0;
		this.isLoading = false;
		this.state = {
			content:'我的成长离不开您宝贵的意见',
			items   : [],
			loadingTips:false,
		}
		this.scrolloptions = {
		    scrollbars: true,
		    bounce    : true,
		    click     : true			
		}
	}

	componentWillMount(){
		this.fetchData();				
	}

	fetchData(){
       let server = new ServerRequest();
       server.post({
       	  url : 'conversation',
       	  data:{
       	  	 pageIndex:this.pageIndex,
       	  	 pageSize :this.pageSize
       	  },
       	  success:function(response){
              this.isLoading = false;
              this.pageCount = response.pageCount;              
              this.setState({
              	items      : this.state.items.concat(response.datas),
              	loadingTips: this.pageIndex < this.pageCount ? true : false
              });
       	  }.bind(this)
       });		
	}

	changeHandle(event){
		this.setState({
			content : event.target.value
		});
	}

	focusHandle(event){
		if(event.target.value == '我的成长离不开您宝贵的意见'){
			this.setState({
				content : ''
			});
		}
	}

	blurHandle(event){
		if(common.trim(event.target.value) == ''){
			this.setState({
				content : '我的成长离不开您宝贵的意见'
			});
		}
	}

	submitHandle(){
		if(common.trim(this.state.content) == '' || this.state.content == '我的成长离不开您宝贵的意见'){
			layer.open({content:'请输入您的反馈意见',time:2});
			return false;
		}

		if(common.trim(this.state.content).length < 10){
			layer.open({content:'请至少输入10位长度的反馈意见',time:2});
			return false;
		}

        this.submit();
	}

	submit(){
       let server = new ServerRequest();
       server.post({
       	  url : 'feedback',
       	  maskLayer:true,
       	  data:{
       	  	 content : common.encode(this.state.content)
       	  },
       	  success:function(response){
              location.reload();
       	  }.bind(this)
       });
	}

	loop(item,index){		
		return (
			<li className="row" data-flex="dir:top" style={{overflow:'visible'}} key={index}>
				<h1 className="row-header">{item.content}</h1>
				{this.getImage(item)}
				<span className="row-time" data-flex="dir:left">{item.createDt}</span>
				<img className="user-header" src={common.joinImageUrl(item.avatar)} />
			</li>
		)                  
	}

	getImage(item){
	   if(item.imgUrl){
	   	   return(
				<img className="row-img" src={common.joinImageUrl(item.imgUrl)} />
	   	   )
	   }
	}

	onScrollEnd(scroll){
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchData();                  
            }
        }

	}	

	render(){
		let scroll = [];
		this.state.items.map(function(item,index){
			scroll.push(this.loop(item,index));
		}.bind(this))    
       return(
           <div className="feedback-wrapper">
                <h1>请输入您宝贵的意见</h1>
                <div className="feedback-content">
	                <div className="feedback-area">
		                <textarea
		                onChange={this.changeHandle.bind(this)}
		                onFocus={this.focusHandle.bind(this)}
		                onBlur ={this.blurHandle.bind(this)}
		                value={this.state.content}
		                maxLength="256">
		                </textarea>
	                </div>

	                <div className="feedback-comment">
		                <div className="comment-scroll">
							<ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={this.scrolloptions}>
								<ul ref="commentscroll" className="row-outer">
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
                </div>
	            <div className="feedback-btn" onClick={this.submitHandle.bind(this)}>提交</div>
           </div>
       )
	}
}

export default Feedback;
