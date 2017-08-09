import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import {Link,hashHistory} from 'react-router';
import {Share , Wechat}  from 'share/share';
import Toolbar from 'toolbar/toolbar';
import './winning.css';

class Winning extends React.Component{
    constructor(props){
        super(props);
        this.pageIndex = 1;
        this.pageSize  = 10;
        this.pageCount = 0;
        this.state = {
            count  : 0,
            result : {
                beyondUserRate:0,
                publisher : {}
            },
            items :[],
            display:'none'
        }
        this.query = this.props.params;
        this.isLoaded = false;
    }

    backHandle(){
       hashHistory.goBack();
    }

    shareHandle(val){
        this.setState({display:val});
    }

    shareSuccess(){
        this.setState({display:'none'});
        let server = new ServerRequest();
        server.post({
            url:'shareSuccess',
            data:{
                publishId: this.query.videoId
            }
        });
    }

    toWallet(){
        location.replace(location.protocol + '//' + location.host + '/#/wallet')
    }

    componentWillMount(){
        this.openPacket();
        this.getVideo();
        this.fetchWinningData();          
    }

    componentDidMount(){
        this.body = document.querySelector('body');
        window.addEventListener('scroll',this.scrollEvent.bind(this),false);
    }

    fetchWinningData(){
        let server = new ServerRequest();
        server.post({
            url:'packetRecord',
            data:{
                pageIndex :this.pageIndex,
                pageSize  :this.pageSize,
                publishId :this.query.videoId
            },
            success:function(response){
                this.isLoading    = false;
                this.firstrender  = false;
                this.pageCount  = response.pageCount;
                this.setState({
                    count      : response.totalCount,
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items      : this.state.items.concat(response.datas)
                });
            }.bind(this)
        });  
    }

    /**
     * 打开红包
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    openPacket(event){
        let server = new ServerRequest();
        server.post({
            url     : 'receive',
            maskLayer : true,
            data    : {
                publishId : this.query.videoId,
                videoPlayRecordId : this.query.playId
            },
            success:function(result){
                this.isLoaded = true;
                this.setState({'result' : result})
            }.bind(this)
        });
    }

    getVideo(){
        let server = new ServerRequest();
        server.post({
            url:'shareContent',
            data:{
                type: 2
            },
            success:function(data){
                let tk = common.getcookies('token');
                let shareId = tk ? tk.split("_")[1] : '';
                var url = 'https://'+location.hostname+'/multipage/share.html?videoId='+this.query.videoId+'&playId='+this.query.playId+"&shareId="+shareId;                
                Wechat.fetchWechatInfo({
                    title   : data.shareTitle,
                    desc    : data.shareDesc || '一起发现创意美',
                    link    : url,
                    imgUrl  : data.shareImgurl,
                    success : this.shareSuccess.bind(this)
                })                
            }.bind(this)
        })
    }

    scrollEvent(){
        event.preventDefault();
        var scrollpos = this.body.offsetHeight + this.body.scrollTop;
        var maxHeight = this.body.scrollHeight;
        if(scrollpos >= maxHeight - 10){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchWinningData();                  
            }
        }
    }  

    row(item,index){
        let coverUrl = item.avatar ?'url('+common.joinImageUrl(item.avatar)+')' : '';  
        return  (
            <li data-flex="dir:left box:justify" key={index}>
                <div className="record-header" data-flex="main:center cross:center">
                <i style={{backgroundImage:coverUrl}}></i></div>
                <div className="record-content" >
                <p>{item.nickname || '草莓看客'}</p>
                <p>{item.date.substr(5)}</p>
                </div>
                <div className="record-amount">
                <span>{item.amount}元</span>
                </div>
            </li>
        )
    }

    result(){
        if(this.state.result.amount == 0){
            return (
                <div>
                <div className="no-winning">{this.state.result.tip}</div>
                <div className="packet-back">
                <span onClick={this.backHandle.bind(this)}>去逛逛，再试试手气！</span>
                </div>                      
                <div className="packet-share">
                <span onClick={this.shareHandle.bind(this,'block')}>让小伙伴也来拼手气！</span>
                </div>                
                </div>
            )
        }else{
            return (
                <div>
                <div className="packet-wish">{this.state.result.thanksWords}</div>
                <div className="packet-amount">{this.state.result.amount}</div>
                <div className="packet-tip" onClick={this.toWallet.bind(this)}>已存入我的钱包</div>
                <div className="packet-back">
                <span onClick={this.toWallet.bind(this)}>去我的零钱查看</span>
                </div>                      
                <div className="packet-share">
                <span onClick={this.shareHandle.bind(this,'block')}>这手气没谁了，分享下！</span>
                </div>                       
                </div>
            )
        }
    }

    render(){
        let avatar   = this.state.result.publisher.avatar;
        let coverUrl = avatar ?'url('+common.joinImageUrl(avatar)+')' : '';  
        let nickname = this.state.result.publisher.name || '草莓看客';
        let scroll = [];
        if(this.state.items.length > 0){
            this.state.items.map(function(item,index){
                scroll.push(this.row(item,index));
            }.bind(this))           
        }else{
            if(!this.firstrender){
                scroll.push(
                    <div key="0" className="iscroll-empty" data-flex="cross:center main:center">
                        <img src={require('../../images/no_data.png')} />
                    </div>
                );
            }
        }
        return (
              <div className="result-wrapper">
                <div className="result-content">
                <div className="header">
                <i className="header-img" style={{backgroundImage:coverUrl}}></i>
                </div>
                <div className="content">
                <div className="packet-title">{nickname}</div>
                {this.isLoaded && this.result()}
                </div>
                </div>
                <div className="result-line"></div>
                <h1>已抢{this.state.count}个红包</h1>
                <div className="result-record">
                    <ul>{scroll}</ul>
                </div>
                <div className="scroll-loading" style={{display:this.state.loadingTips ? 'block':'none'}}>
                <div className="loading-box">
                <div className="loading-rond">
                <div className="rond"></div>
                </div>
                <div className="loading-circle">
                <p>正在加载</p>
                </div>
                </div>
                </div>             
                <Share display={this.state.display} handle={this.shareHandle.bind(this,'none')}/>
                <Toolbar />
              </div>
    	);
    }

}

export default Winning;
