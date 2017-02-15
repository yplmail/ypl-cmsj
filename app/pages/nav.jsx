import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';

class Nav extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
       	   <div>
       	       {this.props.children}
	           <div className="nav-wrapper">
	              <ul data-flex="dir:left box:mean">
	                 <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
	                 <li><Link to="/hot"   activeClassName="active">热门</Link></li>
	                 <li><Link to="/mine"  activeClassName="active">我的</Link></li>
	              </ul>
	           </div>
           </div>
       )
	}	
}

export default Nav;