import React from 'react';
import {Link} from 'react-router';
import './list.css';
import ServerRequest from 'server/serverRequest';
import Scroll from 'scroll/scroll';
import BScroll from 'better-scroll'
import {ScrollUp,ScrollDown} from 'layer/loading';
import 'layer/loading.css';
class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0
        };

        this.pullDownTips = {
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新...',
            4: '刷新成功'
        };

        this.pullUpTips = {
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载...',
            3: '加载成功'
        };

        this.pageIndex = 1;

        this.isRefresh = true;

        this.itemsChanged = false;

        this.onScroll = this.onScroll.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.timeout = this.timeout.bind(this);
    }

    componentDidMount(){
        this.getScrollData(true);
    }

    getScrollData(){
        var self = this;
        let server = new ServerRequest();
        if(this.isRefresh){
          this.pageIndex = 1;
        }
        server.get({
            url:'/mock/list.json',
            success:function(response){
               if(self.isRefresh){
                  if (self.state.pullDownStatus == 3) {
                      self.setState({
                          pullDownStatus: 4,
                          items: response.data
                      });
                      self.initScroll();
                  }
               }else{
                  if (self.state.pullUpStatus == 2) {
                    self.setState({
                        pullUpStatus: 3,
                        items: self.state.items.concat(response.data)
                    });
                  }
               }
               ++self.pageIndex;
            }
        })
    }

    initScroll(){
        setTimeout(this.timeout,320)
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

    onScroll(pos){
        //下拉刷新最新数据
        if (pos.y > -1 * this.loadHeight) {
            this.onPullDown();
        }else{
            this.setState({pullDownStatus: 0});
        }
  
        //上拉加载老数据
        if(pos.y <= this.scroll.maxScrollY){
            this.onPullUp();
        }
    }

    onPullDown() {
      //这个判断保证在onScrollEnd之前状态被改，一面影响流程照常执行，
      if (this.state.pullDownStatus != 3) {
          if(this.scroll.y < 0){
              this.setState({pullDownStatus: 1});
          }else{
              this.setState({pullDownStatus: 2});
          }
      }
    }

    onPullUp() {
      //这个判断保证在onScrollEnd之前状态被改，一面影响流程照常执行，
      if (this.state.pullUpStatus != 2) {
        if (this.scroll.y <= this.scroll.maxScrollY) {
            this.setState({pullUpStatus: 1});
        } else {
            this.setState({pullUpStatus: 0});
        }
      }
    }

    onScrollEnd(){
        // 下拉刷新滑动结束后，停在刷新区域
        if (this.scroll.y > -1 * this.loadHeight) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.scroll.scrollTo(0, -1 * this.loadHeight, 500);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                this.isRefresh = true;
                this.getScrollData();
            }
        }
        // 上拉加载滑动结束后，停在加载区域
        if (this.scroll.y <= this.scroll.maxScrollY) {
            console.log("执行啦");
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.isRefresh = false;
                this.getScrollData();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        //this.itemsChanged = nextState.items !== this.state.items;
        // if(this.isRefresh){
        //   if(this.state.pullDownStatus != nextState.pullDownStatus){
        //      this.itemsChanged = true;
        //      return true;
        //   }else{
        //     this.itemsChanged = false;
        //     return false;
        //   }
        // }else{
        //   if(this.state.pullUpStatus != nextState.pullUpStatus){
        //      console.log(this.state.pullUpStatus +"##########"+nextState.pullUpStatus);
        //      this.itemsChanged = true;
        //      return true;
        //   }else{
        //      this.itemsChanged = false;
        //      return false;
        //   }          
        // }
        if((this.state.pullDownStatus != nextState.pullDownStatus) || (this.state.pullUpStatus != nextState.pullUpStatus)){
            this.itemsChanged = true;
            console.log(this.state.pullUpStatus +"##########"+nextState.pullUpStatus);
            return true;
        }else{
            this.itemsChanged = false;
            return false;
        }
    }

    componentDidUpdate() {
      // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
      if (this.itemsChanged && this.scroll) {
        this.scroll.refresh();
      }
      return true;
    }

    render(){
        return (
            <div ref="list-wrapper" className="adv-list-wrapper" style={{height:(window.innerHeight-48) + 'px'}}>
                <ul className="adv-list-scroll">
                    <div ref="pullDown" className="scroll-loading">
                        <div className="loading-box">
                            <div className="loading-rond">
                                <div className="rond"></div>
                            </div>
                            <div className="loading-center">
                                <p>{this.pullDownTips[this.state.pullDownStatus]}</p>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.items.map((item, index) => {
                            return <ListItem item={item} key={index}/>
                        })
                    }
                    <div ref="pullUp"className="scroll-loading">
                        <div className="loading-box">
                            <div className="loading-rond">
                                <div className="rond"></div>
                            </div>
                            <div className="loading-center">
                                <p>{this.pullUpTips[this.state.pullUpStatus]}</p>
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

    render(){
        return(
            <li>
            <Link to="detail">
            <div>
            <h2>{this.props.item.title}</h2>
            </div>
            <div data-flex="main:center cross:center">
            <span className="video-play"></span>
            </div>
            <div data-flex="dir:left">
            <p className="adv-invest">{this.props.item.invest}</p>
            <p className="adv-packetcount">红包已领{this.props.item.packetcount}个</p>
            <p className="adv-score">{this.props.item.score}分</p>
            <p className="adv-time"><span>{this.props.item.time}</span></p>
            </div>
            </Link>
            </li>
        )
    }
}



export default List;

