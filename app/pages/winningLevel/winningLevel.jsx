import React from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './winningLevel.css';

class WinningLevel extends React.Component{
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageCount = 0;
        this.isLoading = false;
        this.state = {
            loadingTips:false,
            winer:{},
            items:[]
        } 
        this.scrolloptions = {
            bounce    : true,
            click     : true            
        }               
    }

    componentWillMount(){
        this.fetchWinningLevelData();               
    }

    componentDidMount(){
        this.body = document.querySelector('body');
        window.addEventListener('scroll',this.scrollEvent.bind(this),false);
    }

    fetchWinningLevelData(){
        let server = new ServerRequest();
        server.post({
            url:'rankings',
            data:{
                pageIndex :this.pageIndex,
                pageSize  :this.pageSize,
                publishId :this.props.params.videoId
            },
            success:function(response){
                this.isLoading    = false;
                this.firstrender  = false;
                this.pageCount  = response.pageCount;
                this.setState({
                    winer : this.pageIndex == 1 ? response.datas[0] : this.state.winer,
                    loadingTips: this.pageIndex < this.pageCount ? true : false,
                    items:this.state.items.concat(response.datas)
                });
            }.bind(this)
        });  
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
                this.fetchWinningLevelData();                  
            }
        }

    }

    row(item,index){
        return(
            <li key={index} className="winninglevel-record-inner">
                <div className="record-header">
                    <img className="record-header-img" src={common.joinImageUrl(item.avatar)} />   
                </div>
                <div className="record-content">
                    <span>{item.nickname||'草莓看客'}</span>
                    <span className="time">{item.date}</span>
                </div>
                <div className="record-amount">
                    <span>{item.amount+'元'}</span>
                </div> 
            </li>
        )
    }

    render(){
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
            <div className="winninglevel-wrapper">
                <div className="winninglevel-content">
                    <div className="winninglevel-header">
                        <img className="header-image" src={common.joinImageUrl(this.state.winer.avatar)} />                
                        <img className="header-image-bg" src={require("../../images/gold_max_crown.png")}></img>
                    </div>
                    <div className="winninglevel-inner">
                        <div className="winninglevel-title">{this.state.winer.nickname || '草莓看客' }</div>
                        <div className="winninglevel-amount">{this.state.winer.amount}</div>
                        <div className="winninglevel-tips">没有超高的颜值，怎么能成为幸运之星！</div>
                    </div>
                </div>

                <div className="winninglevel-line-wrapper">
                    <img className="winninglevel-line" src={require("../../images/winning_line.png")} />        
                </div>

                <div className="winninglevel-record-wrapper">
                  <ul>
                      {scroll}
                  </ul>
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
            </div>
        )
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scrollEvent.bind(this),false);
    }
}

export default WinningLevel;
