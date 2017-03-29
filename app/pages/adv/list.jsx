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

    componentDidMount(){
        if(!common.getcookies('refreshTokenTime') && common.getcookies('token')){
            this.refreshToken();
        }

        var query = this.props.location.query;

        if(query.code && query.state){
            let server = new ServerRequest();
            server.post({
                url : 'bindWechat',
                data:{
                    code :query.code,
                    state:query.state
                }
            });
        }
    }

    refreshToken(){
        let server = new ServerRequest();
        server.post({
            url:'refreshToken',
            success:function(response){
                common.setcookies('refreshTokenTime',Date.now(),6);
                common.setcookies('token',response.token,7);
            }
        });
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
            <div className="adv-list-wrapper" style={{height:(window.innerHeight-49) + 'px'}}>
                <Scroll {...this.data} />
                <div style={{height:'49px'}}></div>
            </div>
        )
    }

    componentWillUnmount(){
        window.scrollTo(0,0)
    }
}

export default List;

