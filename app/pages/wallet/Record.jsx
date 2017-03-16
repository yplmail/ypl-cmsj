import React from 'react';
import Scroll from 'scroll/scrollLite';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import '../adv/list.css';


class Record extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            el  : '.adv-list-wrapper',
            url : 'advList',
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
        element.setAttribute('id', item.publishId);
        element.style.backgroundImage = item.coverUrl ?'url('+item.coverUrl+')' : '';
        element.innerHTML = this.innerHtml(item);
        element.onclick = function(){
           location.hash = '/detail/'+item.publishId;
        }.bind(this)
        return element;
    }

    innerHtml(item){
        return  '<div><h2 class="ellipsis">'+item.title+'</h2></div>'+
                '<div data-flex="dir:left">'+
                '<p class="adv-invest">'+item.totalAmount+'元</p>'+
                '<p class="adv-packetcount">已领'+item.usedCount+'个</p>'+
                '<p class="adv-score">'+item.score+'分</p>'+
                '<p class="adv-time"><span>'+item.duration+'</span></p>'+
                '</div>';       
    }

    render(){
       return(       		
			<div className="adv-list-wrapper" style={{height:window.innerHeight+'px'}}>
				<Scroll {...this.data} />                     
			</div>
       )
    }
}

export default Record;