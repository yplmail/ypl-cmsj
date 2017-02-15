import React from 'react';
import './feedback.css'
class Feedback extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="feedback-wrapper">
                <div className="feedback-content">
	                <div className="nav-tab">
		                <span className="active">功能问题</span>
		                <span>内容问题</span>
		                <span>其他反馈</span>
	                </div>

	                <div className="feedback-area">
		                <textarea>我的成长离不开您宝贵的意见</textarea>
	                </div>	

	                <div className="feedback-btn">
                        提交
	                </div>                
                </div>	
           </div>
       )
	}	
}

export default Feedback;