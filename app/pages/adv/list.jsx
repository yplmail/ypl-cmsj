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
            3: '正在刷新',
            4: '刷新成功'
        };

        this.pullUpTips = {
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功'
        };

        this.pageIndex = 1;

        this.isTouching = true;

        this.itemsChanged = false;

        this.onScroll = this.onScroll.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);

        this.onTouchEnd = this.onTouchEnd.bind(this);

        this.timeout = this.timeout.bind(this);
    }

    componentDidMount(){
        this.getScrollData(true);
    }

    getScrollData(isRefresh){
        var self = this;
        let server = new ServerRequest();  
        if(isRefresh){
          this.pageIndex = 1;
        }
        server.get({
            url:'/mock/list.json',
            success:function(response){
               if(isRefresh){
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
                        pullUpStatus: 0,
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
        var height = this.refs.pullDown.offsetHeight;
        this.scroll.scrollTo(0, -height, 500);
        this.scroll.on('scroll', this.onScroll);
        this.scroll.on('scrollEnd', this.onScrollEnd);   
    }

    onScroll(pos){
        let pullDown = this.refs.pullDown;
        // 上拉区域
        // if (pos.y > -1 * pullDown.offsetHeight) {
        //   this.onPullUp();
        // } else {
        //     this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        // }
        // 下拉区域
        // if (pos.y <= this.scroll.maxScrollY + 5) {
        //     this.onPullDown();
        // }
        // 
        console.log(pos.y)
        if (pos.y > -40) {
            this.onPullDown();
        }
    }

    onScrollEnd(){

       let pullDown = this.refs.pullDown;
        // 滑动结束后，停在刷新区域
        if (this.scroll.y > -1 * pullDown.offsetHeight) {                   
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.scroll.scrollTo(0, -1 * pullDown.offsetHeight, 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                this.getScrollData(true);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.scroll.y <= this.scroll.maxScrollY) {
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.getScrollData(false);
            }
        }
    }

    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchEnd(ev) {
        this.isTouching = false;
    }

    onPullDown() {
      if (this.isTouching) {
          if(this.scroll.y < 0){
              this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
          }else{
              this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
          }
      }
    }

    onPullUp() {
      if (this.isTouching) {
        if (this.scroll.y <= this.scroll.maxScrollY - 5) {
            this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
        } else {
            this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
        }
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
      // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
      if (this.itemsChanged && this.scroll) {
        this.scroll.refresh();
      }
      return true;
    }

    render(){
        var scrollHeight = (window.innerHeight-47.5) + 'px';
        return (
            <div ref="list-wrapper" className="adv-list-wrapper" style={{height:scrollHeight}}>
                    <ul className="adv-list-scroll" onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
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

