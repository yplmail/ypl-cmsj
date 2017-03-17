import React from 'react';
import Scroll from 'scroll/scroll';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './list.css';

class List extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            el  : '.adv-list-wrapper',
            url : 'advList',
            callback : this.template.bind(this)
        }
    }
    
    componentDidMount(){
        var query = this.props.location.query;
        if(query.code && query.state){
            let server = new ServerRequest();
            server.post({
                url : 'bindWechat',
                data:{
                    code:query.code,
                    state:query.state
                }
            });       
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
        return (
            <div className="adv-list-wrapper" style={{height:(window.innerHeight-49) + 'px'}}>
                <Scroll {...this.data} />
            </div>
        )
    }
}

class ListItem extends React.Component{
    constructor(props){
        super(props);
    }

    handler(event){
       location.hash = '/detail/' + event.currentTarget.getAttribute('id')
    }

    render(){
        let coverUrl = this.props.item.coverUrl ?'url('+this.props.item.coverUrl+')' : '';
        return(
            <li id={this.props.item.publishId} style={{backgroundImage : coverUrl}} onClick={this.handler} >
                <div><h2 className="ellipsis">{this.props.item.title}</h2></div>
                <div data-flex="dir:left">
                    <p className="adv-invest">{this.props.item.totalAmount}元</p>
                    <p className="adv-packetcount">已领{this.props.item.usedCount}个</p>
                    <p className="adv-score">{this.props.item.score}分</p>
                    <p className="adv-time"><span>{this.props.item.duration}</span></p>
                </div>
            </li>
        )
    }
}

export default List;

