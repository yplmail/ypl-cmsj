import React from 'react';
import Scroll from 'scroll/scroll';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';

class PacketRecord extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            el  : '.wallet-scroll',
            url : 'rewardList',
            createNode : this.template.bind(this),
        }

        this.originType = {
            1:'观看获赠',
            2:'分享获赠',
            3:'邀请注册获赠'
        }

        this.color = {
            1:'#cbae67',
            2:'#62a807',
            3:'#ce1035'
        }

        this.width = Math.round(common.remRatio() * 1.4) * 2;
    }

    template(item){
        let element = document.createElement('li');
        element.setAttribute('data-flex', 'main:left box:first')
        element.innerHTML = this.innerHtml(item);
        return element;
    }

    innerHtml(item){
      return  '<div><img src='+item.coverUrl+'?x-oss-process=image/resize,m_lfit,w_'+this.width+'></div>'+
              '<div data-flex="dir:top box:mean">'+
              '<div data-flex="dir:left box:last" class="header">'+
              '<h3 class="ellipsis">'+item.title+'</h3><p><span>'+item.amount+'</span>元</p></div>'+
              '<div data-flex="dir:left box:mean" class="detail">'+
              '<p>'+item.publishUserName+'</p><p>'+common.getDateDiff(item.time)+'</p>'+
              '<p style=color:'+this.color[item.originType]+'>'+this.originType[item.originType]+'</p></div></div>';
    }

    render(){
        return(
          <div className="wallet-scroll">
              <Scroll {...this.data} />
          </div>
        )
    }
}

export default PacketRecord;
