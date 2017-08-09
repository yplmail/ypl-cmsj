import React from 'react';
import Scroll from 'scroll/scroll';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import './inviteRecord.css';

class InviteRecord extends React.Component{
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

        this.color = {
            1:'#ce1035',
            2:'#cbae67',
            3:'#ce1035',
            10:'#cbae67',
            11:'#ce1035'         
        }            
    }

    componentWillMount(){
        this.fetchInviteRecord();
    }

    fetchInviteRecord(){
        let server = new ServerRequest();
        server.post({
            url: 'inviteRecord',
            data:{
              user_id : common.getcookies('token').split("_")[1],
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
                this.fetchInviteRecord();                  
            }
        }
    }     

    loop(item,index){
        return  (
              <li data-flex="main:left box:first cross:center" key={index}>
                  <div data-flex="main:center cross:center">
                      <img className="headerImg" src={common.joinImageUrl(item.avatar)} />
                  </div>
                  <div className="record-content" data-flex="dir:top box:mean">
                    <div data-flex="dir:left cross:bottom box:last">
                      <h3 className="nickName">{item.nickName || '草莓看客'}</h3>
                      <p  className="rewardAmount">
                      <span>{item.rewardAmount > 0 ? item.rewardAmount:''}</span>
                      <span>{item.rewardAmount > 0 ? '元':''}</span>
                      </p>
                    </div>
                    <div data-flex="dir:left cross:center box:mean">
                        <p>{item.createDt}</p>
                        <p className="invite-result ellipsis" style={{color:this.color[item.status]}}>{item.rewardStatus}</p>
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
                  <div key="0" className="iscroll-empty" data-flex="cross:center main:center">
                      <img src={require('../../images/no_data.png')} />
                  </div>
              ); 
            }          
        }
        return(
          <div className="item inviterecord-outer" style={{height:this.props.height +'px'}}>
            <div className="inviterecord-scroll">
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

export default InviteRecord;

