import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';
import Load from './load';
import BScroll from 'better-scroll';
import '../common/common.css';
import common from 'common/common';

class Nav extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			display : 'block'
		}
	}

    componentWillMount(){
        this.nav(this.props);
    }

	componentWillReceiveProps(props){
        this.nav(props);
	}

	nav(props){
	    let path = props.location.pathname;
        if(path == "/" || path == "/hot" || path == "/mine"){
        	this.setState({'display':'block'});
        }else{
        	this.setState({'display':'none'});
        }
	}

	getElement(){
	    let path = this.props.location.pathname;	
        if((path == "/hot" || path == "/mine") && !common.isAndroid()){
        	return <div style={{height:'60px'}}></div>;
        }else{
            return null;
        }
	}

	render(){
		return(
		   <div className="container" style={{height:Math.max(window.innerHeight,window.innerWidth) + 'px'}}>
			{this.props.children}
			{this.getElement()}
			<div className="nav-wrapper" style={{display:this.state.display}}>
				<ul data-flex="dir:left box:mean">
					<li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
					<li><Link to="/hot"   activeClassName="active">热门</Link></li>
					<li><Link to="/mine"  activeClassName="active">草莓</Link></li>
				</ul>
			</div>
		</div>
		)
	}
}

export default Nav;
