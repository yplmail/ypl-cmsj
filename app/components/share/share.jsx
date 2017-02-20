import React from 'react';
import {Link} from 'react-router';
import ServerRequest from 'server/serverRequest';
import share from './share.js';

class Share extends React.Component{
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
    	var server = new ServerRequest(); 
    	server.get({
    		url:'/mock/list.json',
    		success:function(result){
               share(result);
    		}
    	})   	
    }

    render(){
        return (
           <div className="share-wrapper">
	           <div className="guide"></div>
           </div>
        )
    }
}

export default Share;