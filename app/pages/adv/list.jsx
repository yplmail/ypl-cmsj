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
            row : ListItem
        }
    }
    
    componentDidMount(){
        var query = this.props.location.query;
        if(query.code && query.state){
            let server = new ServerRequest();
            server.post({
                url : 'wechatLogin',
                data:{
                    code:query.code,
                    state:query.state
                },
                success:function(response){
                    common.setcookies('token',response.token,7);                    
                }
            });       
        }
    }
    
    render(){
        return (
            <div className="adv-list-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
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
        return(
            <li id={this.props.item.publishId} style={{backgroundImage : "url(" +this.props.item.coverUrl + ")"}} onClick={this.handler} >
                <div>
                    <h2 className="ellipsis">{this.props.item.title}</h2>
                </div>

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

