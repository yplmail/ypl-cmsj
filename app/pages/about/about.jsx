import React from 'react';
import {Link} from 'react-router';
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
              <h1>草莓视频</h1>
              <p>V 0.1</p>
              <ul>
	              <li data-flex="dir:left cross:center box:mean">
	              	<div>微信公众号</div>
	              	<div>草莓视频</div>
	              </li>
	              <li data-flex="dir:left cross:center box:mean">
	              	<div>客服邮箱</div>
	              	<div>service@springrass.com</div>
	              </li>
	              <li data-flex="dir:left cross:center box:mean">
					<a href="./multipage/agreement.html">
						<div>软件许可及服务协议</div>
						<div></div>
					</a>
	              </li>
	              <li data-flex="dir:left cross:center box:mean">
	                <a href="./multipage/companyprofile.html">
		              	<div>公司介绍</div>
		              	<div></div>
	              	</a>
	              </li>
              </ul>
           </div>
		)
	}
}

export default  About;
