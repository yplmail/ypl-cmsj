import React from 'react';
import Scroll from 'scroll/scrollList';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './list.css';

class List extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            el  : '.adv-list-wrapper',
            url : 'advList',
            createNode : this.template.bind(this),
        };
        this.width = Math.round(common.remRatio() * 7.5);
    }

    template(item,font){
        let element = document.createElement('li');
        element.setAttribute('id', item.publishId);
        element.style.backgroundImage = item.coverUrl ?'url('+item.coverUrl+'?x-oss-process=image/resize,m_lfit,w_'+this.width+')' : '';
        element.innerHTML = this.innerHtml(item);
        element.onclick = function(){
           location.hash = '/detail/'+item.publishId;
        }.bind(this)
        return element;
    }

    innerHtml(item){
        return  '<div><h2 class="ellipsis">'+item.title+'</h2></div>'+
                '<div data-flex="dir:left">'+
                '<p class="adv-invest">'+item.totalAmount+'</p>'+
                '<p class="adv-packetcount">已领'+item.usedCount+'个</p>'+
                '<p class="adv-time"><span>'+item.duration+'</span></p>'+
                '</div>';
    }

    render(){
        return (
            <div className="adv-list-wrapper" style={{height:window.innerHeight + 'px'}}>
                <Scroll {...this.data} />
            </div>
        )
    }
}

export default List;

