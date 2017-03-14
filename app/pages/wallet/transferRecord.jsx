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

        this.status = {
            10:'资金冻结',
            20:'提现中',
            21:'提现成功',
            22:'提现失败'
        }

        this.payType = {
            1:'微信红包',
            2:'微信零钱'
        }
    }

    template(item){
        let element = document.createElement('li');
        element.setAttribute('data-flex', 'dir:left box:last')
        element.innerHTML = this.innerHtml(item);
        return element;
    }

    innerHtml(item){
    	return  '<div data-flex="dir:top box:mean"><h3>'+this.payType[item.payType]+'</h3><p>'+item.transTime.replace(/-/g,'/')+'</p></div>'+
        '<div data-flex="dir:top box:mean main:right"><p>'+item.amount+'元</p><p>'+this.status[item.status]+'</p></div>';    
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