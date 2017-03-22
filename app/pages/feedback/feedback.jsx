import React from 'react';
import common from 'common/common';
import ServerRequest from 'server/serverRequest';
import './feedback.css'

class Feedback extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			content:'我的成长离不开您宝贵的意见'
		}
		this.changeHandle =  this.changeHandle.bind(this);
		this.blurHandle =  this.blurHandle.bind(this);
		this.focusHandle =  this.focusHandle.bind(this);
		this.submitHandle =  this.submitHandle.bind(this);
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

		if(common.trim(this.state.content).length < 20){
			layer.open({content:'请至少输入20位长度的反馈意见',time:2});
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
              layer.open({content:'意见反馈成功',time:2,end:function(){
              	  location.hash = '/mine';
              }})
       	  }.bind(this)
       });
	}

	render(){
       return(
           <div className="feedback-wrapper" style={{height:window.innerHeight+"px"}}>
                <div className="feedback-content">
	                <div className="nav-tab">请填写您反馈的意见：</div>

	                <div className="feedback-area">
		                <textarea
		                onChange={this.changeHandle}
		                onFocus={this.focusHandle}
		                onBlur ={this.blurHandle}
		                value={this.state.content}
		                maxLength="256">
		                </textarea>
	                </div>

	                <div className="feedback-btn" onClick={this.submitHandle}>
                        提交
	                </div>
                </div>
           </div>
       )
	}
}

export default Feedback;
