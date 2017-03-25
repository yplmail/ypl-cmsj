import React from 'react';
import {Link} from 'react-router';
import Share   from 'share/share';
import common from 'common/common';
import './about.css';

class About extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
           <div className="about-wrapper">
              <div className="product-logo"></div>
              <h1>草莓视界</h1>
              <p>V 0.1</p>
              <ul>
	              <li data-flex="dir:left cross:center box:mean">
	              	<div>微信公众号</div>
	              	<div>草莓视界</div>
	              </li>
	              <li data-flex="dir:left cross:center box:mean">
	              	<div>客服邮箱</div>
	              	<div>sevice@springrass.com</div>
	              </li>
              </ul>
           </div>
		)
	}
}

export default  About;
