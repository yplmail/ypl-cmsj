import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';

class Nav extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="nav-wrapper">
              <ul data-flex="dir:left box:mean">
                 <li><IndexLink to="/">首页</IndexLink></li>
                 <li><Link to="/hot">热门</Link></li>
                 <li><Link to="/mine">我的</Link></li>
              </ul>
           </div>
       )
	}	
}

export default Nav;