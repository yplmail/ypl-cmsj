import './list.css';
import 'layer/loading.css';
import React from 'react';
import {Link,History} from 'react-router';
import ServerRequest from 'server/serverRequest';
import BScroll from 'better-scroll';
import common from '../../common/common';

class List extends React.Component{
    constructor(props){
        super(props);

        this.state = { items: [] };

        this.pageIndex = 1;

        this.pullDownStatus = 3;

        this.pullUpStatus = 0;

        this.isRefresh = true;

        this.onScroll = this.onScroll.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.timeout = this.timeout.bind(this);

        this.success  = this.success.bind(this);

        this.pullDownTips = {
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功'
        };

        this.pullUpTips = {
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功',
            4: '没有更多...'
        };
    }

    componentDidMount(){
        this.getScrollData();
    }

    setPullDownTips(status){
        this.pullDownStatus = status;
        this.refs.pullDownTips.innerText = this.pullDownTips[status];
    }

    setPullUpTips(status){
        this.pullUpStatus = status;
        this.refs.pullUpTips.innerText = this.pullUpTips[status];
    }

    getScrollData(isRefresh){
        let server = new ServerRequest();
        if(isRefresh){
          this.pageIndex = 1;
        }
        server.post({
            url:'advList',
            success:this.success
        })
    }

    success(response){
      if(this.isRefresh){
          if (this.pullDownStatus == 3) {
              this.setPullDownTips(4);
              this.setState({items: response.datas});
              if(this.scroll){
                this.scroll.scrollTo(0, -this.loadHeight, 500);
              }else{
                this.initScroll();
              }
          }
      }else{
          if (this.pullUpStatus == 2) {
              this.setPullUpTips(3);
              this.setState({items: this.state.items.concat(response.datas)});
          }
      }
    }

    initScroll(){
        setTimeout(this.timeout,50)
    }

    timeout(){
        this.scroll = new BScroll('.adv-list-wrapper', {
            probeType: 3,
            click:true
        })
        this.loadHeight = this.refs.pullDown.offsetHeight;
        this.scroll.scrollTo(0, -this.loadHeight, 500);
        this.scroll.on('scroll', this.onScroll);
        this.scroll.on('scrollEnd', this.onScrollEnd);
    }

    onScroll(){
        //下拉刷新最新数据
        if (this.scroll.y > -1 * this.loadHeight) {
            this.onPullDown();
        }else{
            this.setPullDownTips(0);
        }
        //上拉加载老数据
        if(this.scroll.y < this.scroll.maxScrollY){
            this.onPullUp();
        }
    }

    onPullDown() {
        if(this.pullDownStatus != 3){
            if(this.scroll.y < 0){
                this.setPullDownTips(1);
            }else{
                this.setPullDownTips(2);
            }
        }
    }

    onPullUp() {
        if(this.pullUpStatus != 2){
            if (this.scroll.y <= this.scroll.maxScrollY) {
                this.setPullUpTips(1);
            } else {
                this.setPullUpTips(0);
            }
        }
    }

    onScrollEnd(){
       let pullDown = this.refs.pullDown;
        // 下拉滑动结束后，停在刷新区域
        if (this.scroll.y > -1 * this.loadHeight) {
            if (this.pullDownStatus <= 1) {
                // 没有发起刷新,那么弹回去
                this.scroll.scrollTo(0, -1 * this.loadHeight, 500);
            } else if (this.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setPullDownTips(3);
                this.isRefresh = true;
                this.getScrollData();
            }
        }

        // 上拉滑动结束后，停在加载区域
        if (this.scroll.y <= this.scroll.maxScrollY) {
            if (this.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setPullUpTips(2);
                this.isRefresh = false;
                ++this.pageIndex;
                if(this.pageIndex <= this.pageCount){
                    this.getScrollData();
                }else{
                    this.setPullUpTips(4);
                    var self = this;
                    setTimeout(function(){
                       self.scroll.scrollTo(0, self.scroll.y + self.loadHeight, 500);
                    },500)
                }
            }
        }
    }

    componentDidUpdate() {
      this.scroll && this.scroll.refresh();
      if(!this.isRefresh) this.setPullUpTips(0);
      this.refs.pullDown.style.display='block';
      this.refs.pullUp.style.display='block';
      return true;
    }

    render(){
        return (
            <div className="adv-list-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
                <ul className="adv-list-scroll">
                    <div ref="pullDown" className="scroll-loading">
                        <div className="loading-box">
                            <div className="loading-rond">
                                <div className="rond"></div>
                            </div>
                            <div className="loading-center">
                                <p ref="pullDownTips">{this.pullDownTips[this.pullDownStatus]}</p>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.items.map((item, index) => {
                            return <ListItem item={item} key={index}/>
                        })
                    }
                    <div ref="pullUp" className="scroll-loading">
                        <div className="loading-box">
                            <div className="loading-rond">
                                <div className="rond"></div>
                            </div>
                            <div className="loading-center">
                                <p ref="pullUpTips">{this.pullUpTips[this.pullUpStatus]}</p>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        )
    }
}


class ListItem extends React.Component{
    constructor(props){
        super(props);
    }

    handler(event){
       let id = event.currentTarget.getAttribute('id')
       if(event.target.className == 'video-play'){
           location.hash = '/detail/' + id;
       }else{
           location.hash = '/detail/' + id;
       }
    }

    render(){
        return(
            <li id={this.props.item.publishId} style={{backgroundImage : "url(" +this.props.item.coverUrl + ")"}} onClick={this.handler} >
                <div>
                    <h2>{this.props.item.title}</h2>
                </div>

                <div data-flex="main:center cross:center">
                    <span className="video-play"></span>
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


