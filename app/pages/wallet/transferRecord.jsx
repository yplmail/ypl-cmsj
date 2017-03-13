import React from 'react';
import Scroll from 'scroll/iscroll';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';

class TransferRecord extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            el  : '.transfer-scroll',
            url : 'withdrawList',
            callback : this.template.bind(this)
        }
        this.originType = {
            1:'观看获赠',
            2:'分享获赠',
            3:'邀请注册获赠'
        }
    }

    template(item){
        let element = document.createElement('li');
        element.setAttribute('data-flex', 'dir:left box:last')
        element.innerHTML = this.innerHtml(item);
        return element;
    }

    innerHtml(item){
    	return  '<div data-flex="dir:top box:mean"><h3>微信提现</h3><p>2013/05/06</p></div>'+
    	        '<div data-flex="main:right cross:center"><span>25.36</span>元</div>';    
    }

    render(){
       return(       		
			<div className="transfer-scroll">
				<Scroll {...this.data} />
			</div>
       )
    }
}

export default TransferRecord;