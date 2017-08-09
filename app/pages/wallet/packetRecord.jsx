import React from 'react';
import Scroll from 'scroll/scroll';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import './packetRecord.css';

class PacketRecord extends React.Component{
    constructor(props){
        super(props);
        this.pageIndex = 1;
        this.pageSize  = 10;
        this.pageCount = 0;
        this.firstrender = true;
        this.state = {
             items:[],
             loadingTips:false
        }
        this.scrolloptions = {
            scrollbars: true,
            bounce    : true,
            click     : true      
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

        this.coverwidth = Math.round(common.remRatio() * 1.44) * 2;                
    }

    componentWillMount(){
        this.fetchPacketRecord();
    }

    fetchPacketRecord(){
        let server = new ServerRequest();
        server.post({
            url: 'rewardList',
            data:{
              pageIndex:this.pageIndex,
              pageSize :this.pageSize
            },
            success:function(response){
                this.isLoading = false;
                this.pageCount = response.pageCount;
                this.firstrender = false;
                this.setState({
                  loadingTips: this.pageIndex < this.pageCount ? true : false,
                  items:this.state.items.concat(response.datas)
                });
            }.bind(this)
        }) 
    }

    onScrollEnd(scroll){
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchPacketRecord();                  
            }
        }
    }     

    loop(item,index){
        return  (
              <li key={index} data-flex="dir:left cross:center box:first">
                  <div>
                      <img className="video-img"src={common.joinImageUrl(item.coverUrl)+'?x-oss-process=image/resize,m_fill,w_'+this.coverwidth} />
                  </div>
                  
                  <div className="record-content" data-flex="dir:top box:mean">
                  <div className="record-header" data-flex="dir:left cross:center">
                      <img className="header-img" src={common.joinImageUrl(item.avatar)} />
                      <h3>{item.watchUserName || '草莓看客'}</h3>
                  </div>

                  <div className="record-title" data-flex="dir:left box:first cross:bottom">
                  <h3 className="ellipsis">{item.title}</h3>
                  <p><span>{item.amount}</span><span>元</span></p>
                  </div>   

                  <div className="record-detail" data-flex="dir:left box:mean cross:bottom">
                  <p>{item.publishUserName || '草莓看客'}</p>
                  <p>{common.getDateDiff(item.time)}</p>
                  <p style={{'color':this.color[item.originType]}}>{this.originType[item.originType]}</p>
                  </div>
                  </div> 
              </li> 
        )    
    }  

    render(){
        let scroll = [];
        if(this.state.items.length > 0){
            this.state.items.forEach(function(item,index){
               scroll.push(this.loop(item,index));
            }.bind(this))   
        }else{
            if(!this.firstrender){
              scroll.push(
                  <div className="iscroll-empty" data-flex="cross:center main:center">
                      <img src={require('../../images/no_data.png')} />
                  </div>
              ); 
            }          
        }
        return(
          <div className="item packetrecord-outer" style={{height:this.props.height +'px'}}>
            <div className="packetrecord-scroll">
                <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={this.scrolloptions}>
                    <ul>
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
        );
    }
}

export default PacketRecord;
