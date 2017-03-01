import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';
import Load from './load';
import BScroll from 'better-scroll';
import '../common/common.css';

class Nav extends React.Component{
	constructor(props){
		super(props)
	}
    componentWillMount(){
        var wrapper = document.querySelector(".container-wrapper");
        wrapper.style.height = window.innerHeight + 'px';
        wrapper.style.width = window.innerWidth + 'px';
    }

	componentDidMount(){
		this.wrapper = document.querySelector('.container')
		this._preventDefault = function (e){ e.preventDefault(); }
		this.wrapper.addEventListener('touchmove', this._preventDefault);
	}
    initBScroll(){
        setTimeout(function(){
            window.iscroll = null;
            var wrapper = document.querySelector('.container').childNodes[0];
            wrapper.style.height = (window.innerHeight-48) + 'px';
            window.iscroll = new BScroll(wrapper, {
                probeType: 3,
                click:true
            })
        },320)
    }
	render(){
       return(
       	   <div className="container">
       	       {this.props.children}
	           <div className="nav-wrapper">
	              <div className="nav">
		              <ul data-flex="dir:left box:mean">
		                 <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
		                 <li><Link to="/hot"   activeClassName="active">热门</Link></li>
		                 <li><Link to="/mine"  activeClassName="active">我的</Link></li>
		              </ul>
	              </div>
	           </div>
           </div>
       )
	}
}

export default Nav;
