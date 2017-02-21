import React from 'react';
import {Link} from 'react-router';
import Scroll from './scroll';

class ScrollList extends React.Component{
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){     
        Scroll('.adv-list-wrapper',{
        	url:'/mock/list.json',
        	startCall:function(){

        	},
        	loadCall:function(){

        	},
        	endCall:function(){

        	}
        })

    }

    render(){
        return (
           <ul>
              
           </ul>
        )
    }
}

export default ScrollList;

