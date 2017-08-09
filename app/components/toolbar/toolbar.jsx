import React   from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './toolbar.css';

class Toolbar extends React.Component{
    constructor(props){
        super(props);
		this.state = {
			toobarstatus : 'none',
			qrcodestatus : 'none',
			img          : props.image || ''
        }
        if(props.image){
            this.img = require("../../images/"+props.image);
        }else{
	        this.img = require("../../images/withdraw_qrcode.png");      	
        }
	}

	componentDidMount(){
		this.getQrcodestatus();
	}

    componentWillReceiveProps(nextProps){
       if(nextProps.qrcodestatus == 'block'){
       	    this.showQrcode();
       }

       if(nextProps.toobarstatus == 'block'){
       	    this.showToolbar();
       }
    }

    getQrcodestatus(){
      if(common.getcookies('token')){
	      let server = new ServerRequest();
	      server.post({
	          url: 'subscribed',
	          success:function(response){
	              if(!response.subscribed){
	                this.showBycondition();               
	              }
	          }.bind(this)
	      })      	     	
      }else{
          this.showBycondition();  
      }
    }

    showBycondition(){
		if(/^#\/share/.test(location.hash) || /^#\/result/.test(location.hash)){
			this.showToolbar();
		}
    }

	hideQrcode(){
		this.props.playHandle && this.props.playHandle();
		this.setState({
			qrcodestatus:'none'
		})
	}

	showQrcode(){
		this.props.pauseHandle && this.props.pauseHandle();
		this.setState({
			qrcodestatus:'block'
		})		
	}

	prevent(event){
		event.stopPropagation();
	}

	hideToolbar(){
		this.setState({toobarstatus:'none'})	
	}

	showToolbar(){
		this.setState({toobarstatus:'block'})
	}	

    render(){
		return(
            <div className="toolbar-wrapper">
               <div className="toolbar-content" onClick={this.hideQrcode.bind(this)} style={{display:this.state.qrcodestatus}}>
                    <div className="content">
	                    <img onClick={this.prevent.bind(this)} src={this.img} />
	                    <img src={require("../../images/follow_close.png")} onClick={this.hideQrcode.bind(this)}/>
                    </div>
               </div>
               
               <div className="toolbar-bottom" style={{display:this.state.toobarstatus}}>
	               <div className="toolbar-inner" data-flex="dir:left main:justify box:mean">
	                  <div data-flex="main:center cross:center">
	                      <div><img src={require("../../images/strawberry_logo.png")} /></div>
		                  <div>
		                    <p>关注草莓视频</p>
		                    <p>天天抢现金红包</p>
		                  </div>
	                  </div>
	                  <div data-flex="main:center cross:center">
	                        <span onClick={this.showQrcode.bind(this)}>立即关注</span>
	                  </div>
	                  <img className="toolbar-close" src={require("../../images/follow_close.png")} onClick={this.hideToolbar.bind(this)}/>
	               </div>
               </div>
            </div>
		)
    }

}

export default Toolbar;