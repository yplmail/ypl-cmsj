import React from 'react';
import {Link} from 'react-router';
import Scroll from 'scroll/scroll';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import './works.css';

class Works extends React.Component{
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.pageSize  = 10;
        this.pageCount = 0;
        this.isLoading = false;
        this.coverWidth = Math.round(common.remRatio() * 7.5);
        this.scrollHeight  = Math.max(window.innerHeight,window.innerWidth) - 3.5*common.remRatio();
        this.state = {
            userInfo   :[],
            items      :[],
            totalCount : 0,
            btndisplay :'none',
            loadingTips:false,
            display : 'none'
        }

        this.scrolloptions = {
            bounce    : true,
            click     : true,           
        }
        
        this.firstrender = true;         
    }

    componentWillMount(){
        this.fetchAuthorData();
        if(this.props.params.authorId){
            this.fetchOtherWorksData();
        }else{
            this.fetchSelfWorksData();
        }
    }

    fetchAuthorData(){
      let server = new ServerRequest();
      let tk = common.getcookies('token')
      server.post({
          url:'ownerInfo',
          data:{
              userId:this.props.params.authorId || tk.split("_")[1]
          },
          success:function(response){
             this.setState({userInfo:response});
          }.bind(this)
      })
    }

    fetchSelfWorksData(){
        let server = new ServerRequest();
        server.post({
          url:'myUploadList',
          data:{
              videoType:1,
              pageIndex:this.pageIndex,
              pageSize :this.pageSize,
          },
          success:function(response){
              this.isLoading = false;
              this.firstrender = false;
              this.pageCount = response.pageCount;
              this.setState({
                totalCount: response.totalCount,
                btndisplay: response.totalCount == 0 ? 'block' : 'none',
                loadingTips: this.pageIndex < this.pageCount ? true : false,
                items:this.state.items.concat(response.datas)
              });                                
          }.bind(this)
        })      
    }

    fetchOtherWorksData(){
        let server = new ServerRequest();
        server.post({
          url:'ownerVideoList',
          data:{
              userId   :this.props.params.authorId,
              pageIndex:this.pageIndex,
              pageSize :this.pageSize,
          },
          success:function(response){
              this.isLoading = false;
              this.firstrender = false;
              this.pageCount = response.pageCount;
              this.setState({
                totalCount: response.totalCount,
                btndisplay: response.totalCount == 0 ? 'block' : 'none',
                loadingTips: this.pageIndex < this.pageCount ? true : false,
                items      : this.state.items.concat(response.datas)
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
                if(this.props.params.authorId){
                    this.fetchOtherWorksData();
                }else{
                    this.fetchSelfWorksData();
                }             
            }
        }
    }

    playstr(item){
      if(item.playCount > 0){
          return (
            <p>
                <img src={require("../../images/worksplay_count.png")} /><span style={{marginLeft:'4px'}}>{item.playCount}</span>
            </p>
          )
      }else{
          return null
      }
    }

    row(item,index){
          let cover = common.joinImageUrl(item.coverUrl) + "?x-oss-process=image/resize,m_lfit,w_" + this.coverWidth;
          let link = '';
          if(this.props.params.authorId){
              if(item.status == 2){
                 link = "../multipage/detail.html?videoId=" + item.publishId;
              }
          }else{
                 link = "../multipage/detail.html?videoId=" + item.publishId;
          }
          return(
              <li key={index}>
              <a href={link} className="video-cover" data-flex="dir:left cross:bottom" style={{'backgroundImage':'url('+cover+')'}}>
              <div className="left">
              <h1 className="ellipsis" style={{width:'5.7rem'}}>{item.title}</h1>
              {this.playstr(item)}
              </div>
              <div className="right">{common.getDateDiff(item.createDt)}</div>          
              </a>
              <div className="video-bars">
              {this.toolbars(item)}
              </div>           
              </li>
          )
    }

    toolbars(item){
      if(item.status == 2){
          return(
              <div data-flex="dir:left box:mean cross:center main:center" style={{height:'100%'}}>
                  <div>
                      <img  onClick={this.download.bind(this,'下载草莓视界APP点赞？')} src={require("../../images/works_praise.png")} />
                      <span onClick={this.download.bind(this,'下载草莓视界APP点赞？')} >{item.praiseCount}</span>
                  </div>
                  <div>
                      <img  onClick={this.share.bind(this,'block')} src={require("../../images/works_share.png")} />
                      <span onClick={this.share.bind(this,'block')} >{item.shareCount}</span>
                  </div>
                  <div>
                      <img  onClick={this.download.bind(this,'下载草莓视界APP发表评论？')} src={require("../../images/works_comment.png")} />
                      <span onClick={this.download.bind(this,'下载草莓视界APP发表评论？')}>{item.commentCount}</span>
                  </div>
              </div>
          )
      }else if(item.status == 1 || item.status == 6){
          return(
            <div className="check">审核中...</div>
          )
      }else if(item.status == 3 ){
          return (
            <div className="check">审核不通过</div>
          )       
      }else if(item.status == 4){
          return (
            <div className="check">已删除</div>
          ) 
      }else if(item.status == 7){
          return (
            <div className="check">上传申请中</div>
          ) 
      }
    }

    empty(){
          return(
            <div className="no-wroks">
                <img src={require("../../images/works_empty.png")} />
            </div>
          )
    }

    share(val){
        this.setState({share:{display:val}})
    }

    download(tips){
        let index = layer.open({
          content: tips,
          style:'background-color:#fff; color:#323232;width:70%', //自定风格
          btn: ['确定', '取消'],
          yes: function(index){
             layer.close(index)
             location.href="./multipage/download.html";
          }.bind(this)
        });
    }

    refresh(scroll){
        this.scroll = scroll;
    }

    componentDidUpdate(){
      let timer = setTimeout(function(){
        clearTimeout();
        this.scroll && this.scroll.refresh();         
      }.bind(this),300);
    }

    render(){
        let scroll = [];
        if(this.state.items.length > 0){
            this.state.items.map(function(item,index){
                scroll.push(this.row(item,index));
            }.bind(this))             
        }else{
            if(!this.firstrender){
                scroll.push(this.empty())              
            }
        }
        return (
          <div className="works-wrapper">
              <div className="works-header" data-flex="cross:center main:center">
                  <div className="author-header">
                     <p><img src={common.joinImageUrl(this.state.userInfo.ownerAvatar)} /></p>
                     <h3>{this.state.userInfo.ownerNickname || '草莓看客'}</h3>
                     <p>视频<span className="videocount" >{this.state.totalCount}</span></p>
                  </div>
              </div>
              <div className="works-content" style={{'height':this.scrollHeight + 'px'}}>
                    <ReactIScroll iScroll={iScroll} 
                    onScrollEnd={this.onScrollEnd.bind(this)} 
                    options={this.scrolloptions}
                    onRefresh={this.refresh.bind(this)}
                    >
                    <ul ref="workscroll">
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
              <a className="pushlish-btn" 
                 onClick={this.download.bind(this,'下载草莓视界APP发布作品？')}
                 style={{display:this.state.btndisplay}}>
                 立即发布
              </a>
          </div>
        )
    }     
}

export default Works;