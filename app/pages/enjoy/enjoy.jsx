import React from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'swipes/ReactSwipes';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './enjoy.css';

let scrollHeight = Math.max(window.innerHeight,window.innerWidth) - 50 - 0.8 * common.remRatio();
let coverWidth   = Math.round(common.remRatio() * 7.5);
let scrolloptions = {
    bounce    : true,
    click     : true            
}

const rows = (item,index,obj) => {
    let count = item.totalCount - item.usedCount;
    let countText = '剩余'+count+'个';
    if(count == 0){
        countText = '已领完';
    }   
    let cover = common.joinImageUrl(item.coverUrl)+'?x-oss-process=image/resize,m_lfit,w_'+Math.round(common.remRatio() * 7);
    let totalAmount = (item.totalAmount || '0') * 1;    
    return (
        <li key={index} data-flex="dir:top">
        <a onClick={forward.bind(this,item.publishId,obj)} style={{'backgroundImage':'url('+cover+')'}}>
        <span className="playtime">{item.duration}</span>
        </a>
        <div className="enjoyvideo-detail" data-flex="dir:top box:mean">  
        <h1  data-flex="cross:bottom"><span className="enjoy-title ellipsis">{item.title}</span></h1>         
        <div className="enjoy-tools" data-flex="dir:left cross:center box:mean">     
        <div>
        <img src={require('../../images/adv_play_count.png')} />
        <span>{item.playTimes}次</span>
        </div>

        <div style={{visibility:totalAmount > 0 ? 'visible' : 'hidden'}}>
        <img src={require('../../images/list_packet_icon.png')} />
        <span>{countText}</span>
        </div>

        <div style={{visibility:totalAmount > 0 ? 'visible' : 'hidden'}}>
        <img src={require('../../images/adv_packetamt_icon.png')} />
        <span>{item.maxMoney}元</span>
        </div>
        </div>
        </div>
        </li>           
    ) 
}

const forward = (id,obj) => {
    obj.isLoading = false;
    location.href  = "./multipage/detail.html?videoId=" + id + '&version=1.0.0';
}

const loadingtips = (tips) => {
    return(
        <div className="scroll-loading" style={{display:tips ? 'block':'none'}}>
        <div className="loading-box">
        <div className="loading-rond">
        <div className="rond"></div>
        </div>
        <div className="loading-circle">
        <p>正在加载</p>
        </div>
        </div>
        </div>
    )
} 

const empty = () => {
    return (
        <div key="0" className="iscroll-empty" data-flex="cross:center main:center">
            <img src={require('../../images/no_data.png')} />
        </div>
    ); 
}


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageCount = 0;  
        this.pageSize  = 10;
        this.isLoading = false;
        this.firstrender = true;
        this.state = {
            items :[],
            loadingTips:false  
        };
    }

    componentWillMount(){
        this.fetchEnjoyData();
    }

    fetchEnjoyData(){
        let server = new ServerRequest();
        server.post({
            url:'advList',
            data:{
                pageIndex:this.pageIndex,
                pageSize :this.pageSize,
                type     :3          
            },
            success:function(response){
                 this.isLoading  = false;
                 this.firstrender = false;
                 this.pageCount  = response.pageCount;
                 this.setState({
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items:this.state.items.concat(response.datas)
                 });
            }.bind(this)
        });
    }    

    onScrollEnd(scroll){
        // let h = this.refs.enjoyscroll.offsetHeight - scrollHeight;
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchEnjoyData();                  
            }
        }
    }

    render(){
        let arr = [];
        if(this.state.items.length > 0){
            this.state.items.forEach(function(item,index){
               arr.push(rows(item,index,this));
            }.bind(this))               
        }else{
            if(!this.firstrender){
                arr.push(empty());
            }
        }

        return(
            <div className="item" style={{height:scrollHeight + 'px'}}>
                <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={scrolloptions}>
                <ul ref="enjoyscroll">
                    {arr}
                    {loadingtips(this.state.loadingTips)}
                </ul>   
                </ReactIScroll>
            </div>            
        )
    }    
} 

class Item2 extends React.Component {
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageCount = 0;  
        this.pageSize  = 10;
        this.isLoading = false;
        this.firstrender = true;
        this.state = {
            items :[],
            loadingTips:false         
        };
    }

    componentWillMount(){
        this.fetchEnjoyData();
    }

    fetchEnjoyData(){
        let server = new ServerRequest();
        server.post({
            url:'advList',
            data:{
                pageIndex:this.pageIndex,
                pageSize :this.pageSize,
                type     :2          
            },
            success:function(response){
                 this.isLoading  = false;
                 this.firstrender = false;
                 this.pageCount  = response.pageCount;
                 this.setState({
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items:this.state.items.concat(response.datas)
                 });
            }.bind(this)
        });
    }    

    onScrollEnd(scroll){
        // let h = this.refs.enjoyscroll.offsetHeight - scrollHeight;
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchEnjoyData();                  
            }
        }
    }

    render(){
        let arr = [];
        if(this.state.items.length > 0){
            this.state.items.forEach(function(item,index){
               arr.push(rows(item,index,this));
            }.bind(this))               
        }else{
            if(!this.firstrender){
                arr.push(empty());
            }
        }        
        return(
            <div className="item" style={{height:scrollHeight + 'px'}}>
                <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={scrolloptions}>
                <ul ref="enjoyscroll">
                    {arr}
                    {loadingtips(this.state.loadingTips)}
                </ul>   
                </ReactIScroll>
            </div>            
        )
    }    
} 

class Item3 extends React.Component {
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageCount = 0;  
        this.pageSize  = 10;
        this.isLoading = false;
        this.firstrender = true;
        this.state = {
            items :[],
            loadingTips:false           
        };
    }

    componentWillMount(){
        this.fetchEnjoyData();
    }

    fetchEnjoyData(){
        let server = new ServerRequest();
        server.post({
            url:'advList',
            data:{
                pageIndex:this.pageIndex,
                pageSize :this.pageSize,
                type     :6          
            },
            success:function(response){
                 this.isLoading  = false;
                 this.firstrender = false;
                 this.pageCount  = response.pageCount;
                 this.setState({
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items:this.state.items.concat(response.datas)
                 });
            }.bind(this)
        });
    }    

    onScrollEnd(scroll){
        // let h = this.refs.enjoyscroll.offsetHeight - scrollHeight;
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchEnjoyData();                  
            }
        }
    }

    render(){
        let arr = [];
        if(this.state.items.length > 0){
            this.state.items.forEach(function(item,index){
               arr.push(rows(item,index,this));
            }.bind(this))               
        }else{
            if(!this.firstrender){
                arr.push(empty());
            }
        }         
        return(
            <div className="item" style={{height:scrollHeight + 'px'}}>
                <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={scrolloptions}>
                <ul ref="enjoyscroll">
                    {arr}
                    {loadingtips(this.state.loadingTips)}
                </ul>   
                </ReactIScroll>
            </div>            
        )
    }    
} 

class Item4 extends React.Component {
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageCount = 0;  
        this.pageSize  = 10;
        this.isLoading = false;
        this.firstrender = true;
        this.latiandlongi = '';
        this.state = {
            fetch :false,
            items :[],
            loadingTips:false           
        };
    }

    componentWillMount(){
        var server = new ServerRequest();
        server.post({
            url :'wechatShare',
            data:{
                url : location.href.replace(/#.+$/, '')
            },
            success:function(result){
                wx.config({
                    // debug    : true, 
                    appId    : result.wxConfig.appId,
                    timestamp: result.wxConfig.timeStamp,
                    nonceStr : result.wxConfig.nonceStr,
                    signature: result.wxConfig.signature,
                    jsApiList: ['getLocation']
                }); 

                wx.error(function(res){
                    layer.open({
                        content: '微信初始化信息验证失败',
                        time   : 2
                    });
                }.bind(this));  
            }.bind(this)
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.fetch && !this.state.fetch){
            this.setState({fetch:true});
            this.fetchLocation();
        }
    }

    fetchLocation(){
        wx.getLocation({
            type: 'wgs84', 
            success: function (res){
                this.latiandlongi = res.latitude + ',' + res.longitude;
                this.fetchEnjoyData();
            }.bind(this),  
            cancel: function (res) {
                this.fetchEnjoyData(true);
                layer.open({content: '拒绝获取地理位置，无法获取附近相关视频',time:2});                        
            }.bind(this)          
        });                      
    }

    fetchEnjoyData(mask){
        let server = new ServerRequest();
        server.post({
            url:'advList',
            maskLayer: mask || false,
            data:{
                location :this.latiandlongi,
                pageIndex:this.pageIndex,
                pageSize :this.pageSize,
                type     :5          
            },
            success:function(response){
                 this.isLoading  = false;
                 this.firstrender = false;
                 this.pageCount  = response.pageCount;
                 this.setState({
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items:this.state.items.concat(response.datas)
                 });
            }.bind(this)
        });
    }    

    onScrollEnd(scroll){
        // let h = this.refs.enjoyscroll.offsetHeight - scrollHeight;
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchEnjoyData();                  
            }
        }
    }

    render(){
        let arr = [];
        if(this.state.items.length > 0){
            this.state.items.forEach(function(item,index){
               arr.push(rows(item,index,this));
            }.bind(this))               
        }else{
            if(!this.firstrender){
                arr.push(empty());
            }
        }           
        return(
            <div className="item" style={{height:scrollHeight + 'px'}}>
                <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={scrolloptions}>
                <ul ref="enjoyscroll">
                    {arr}
                    {loadingtips(this.state.loadingTips)}
                </ul>   
                </ReactIScroll>
            </div>            
        )
    }    
} 

class Enjoy extends React.Component {
    constructor(props) {
        super(props);
        this.navcolor = common.isAndroid() ? '#373b3e' : '#1c1c20';
        this.state = {
            fetch  : false,
            options:{
                currentPoint: 0,
                maxPoint    : 3,
                distance    : coverWidth,
                swTouchend: (event) => {
                    this.setState({
                        fetch  : event.newPoint == 3 ? true : false,
                        options:{currentPoint:event.newPoint}
                    });
                }     
            }           
        };       
    }

    changeNav(value,event){   
        this.setState({
            fetch  : value == 3 ? true : false,
            options:{currentPoint:value}
        });       
    }

    render() { 
        return (
            <div className="enjoy-wrapper">
                <div className="enjoy-nav" style={{backgroundColor:this.navcolor}}>
                   <div className="nav-outer">
                       <div onClick={this.changeNav.bind(this,0)}><span className={this.state.options.currentPoint==0?'active':''}>壕放</span></div>
                       <div onClick={this.changeNav.bind(this,1)}><span className={this.state.options.currentPoint==1?'active':''}>好热</span></div>
                       <div onClick={this.changeNav.bind(this,2)}><span className={this.state.options.currentPoint==2?'active':''}>好赞</span></div>
                       <div onClick={this.changeNav.bind(this,3)}><span className={this.state.options.currentPoint==3?'active':''}>附近</span></div>
                   </div>
                </div>

                <div className="enjoy-swipe">
                    <div className="swipe-outer">
                        <div style={{width:4*coverWidth}}>
                            <ReactSwipe className="swipe-items" options={this.state.options}>
                                <Item  />
                                <Item2 />
                                <Item3 />
                                <Item4 fetch={this.state.fetch} />
                            </ReactSwipe>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Enjoy;


