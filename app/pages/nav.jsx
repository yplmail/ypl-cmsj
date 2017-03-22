import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';
import Load from './load';
import BScroll from 'better-scroll';
import '../common/common.css';

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

	componentDidMount(){
		// this.wrapper = document.querySelector('.container')
		// this._preventDefault = function (e){ e.preventDefault(); }
		// this.wrapper.addEventListener('touchmove', this._preventDefault);
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

	render(){
       return(
       	   <div className="container">
				{this.props.children}
				<div className="nav-wrapper" style={{display:this.state.display}}>
					<div className="nav">
						<ul data-flex="dir:left box:mean">
							<li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
							<li><Link to="/hot"   activeClassName="active">热门</Link></li>
							<li><Link to="/mine"  activeClassName="active">草莓</Link></li>
						</ul>
					</div>
				</div>
           </div>
       )
	}
}

export default Nav;
