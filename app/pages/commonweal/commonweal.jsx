import React from 'react';
import {Link} from 'react-router';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './commonweal.css';

class CommonWeal extends React.Component{
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageSize  = 10;
        this.pageCount = 0;
        this.firstrender = true;
        this.coverWidth = Math.round(common.remRatio() * 7.5);
        this.scrollHeight  = Math.max(window.innerHeight,window.innerWidth) - 50;
        this.state = {
            items      :[],
            loadingTips:false
        }

        this.scrolloptions = {
            scrollbars: true,
            bounce    : true,
            click     : true            
        }
    }

    componentWillMount(){
        this.fetchCommonWealData();
    }

    fetchCommonWealData(){
        let server = new ServerRequest();
        server.post({
            url:'advList',
            data:{
                pageIndex:this.pageIndex,
                pageSize :this.pageSize,
                type     :4             
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
        let h = this.refs.commonwealscroll.offsetHeight - this.scrollHeight;
        if(scroll.y < 0 && Math.abs(scroll.y) >= parseInt(h)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchCommonWealData();                  
            }else{
                this.setState({loadingTips:false});
            }
        }
    }

    navigator(id){
        this.isLoading = false;
        location.href  = "./multipage/detail.html?videoId=" + id + '&version=1.0.0';
    }   

    row(item,index){
        let count = item.totalCount - item.usedCount;
        let countText = '剩余'+count+'个';
        if(count == 0){
            countText = '已领完';
        }       
        return (
            <li key={index} style={{'backgroundImage':'url('+common.joinImageUrl(item.coverUrl)+'?x-oss-process=image/resize,m_lfit,w_'+this.coverWidth+')'}}>
                <a data-flex="dir:bottom" onClick={this.navigator.bind(this,item.publishId)}>
                    <div className="commonweal-tools" data-flex="dir:left">                   
                        <div className="commonweal-title ellipsis">
                            {item.title}
                        </div>
                        
                        <div>
                            <img src={require('../../images/adv_play_count.png')} />
                            <span>{item.playTimes}次</span>
                        </div> 
                    </div>    
                </a>                     
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
                    <div className="iscroll-empty" data-flex="cross:center main:center" key="0">
                        <img src={require('../../images/no_data.png')} />
                    </div>
                );
            }
        }        

        return (
           <div className="commonweal-wrapper">
                <div className="commonweal-outer" style={{height:this.scrollHeight + 'px'}}>
                    <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={this.scrolloptions}>
                    <ul ref="commonwealscroll">
                        {scroll}
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
                    </ul>   
                    </ReactIScroll>
                </div>
           </div>
        )
    }
}

export default CommonWeal;
