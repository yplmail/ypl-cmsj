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

        this.state = { items: [] };

        this.pageIndex = 1;

        this.pullDownStatus = 3;

        this.pullUpStatus = 0;

        this.isTouching = true;

        this.itemsChanged = false;

        this.isRefresh = true;

        this.onScroll = this.onScroll.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.timeout = this.timeout.bind(this);

        this.success  = this.success.bind(this);
    }

    componentDidMount(){
        this.getScrollData(true);
    }

    setPullDownTips(status){
        let pullDownTips = {
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功'
        };
        this.pullDownStatus = status;
        this.refs.pullDownTips.innerText = pullDownTips[status];
    }

    setPullUpTips(status){
        let pullUpTips = {
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功'
        };
        this.pullUpStatus = status;
        this.refs.pullUpTips.innerText = pullUpTips[status];
    }

    getScrollData(isRefresh){
        var self = this;
        let server = new ServerRequest();
        if(isRefresh){
          this.pageIndex = 1;
        }
        server.get({
            url:'/mock/list.json',
            success:this.success
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
        console.log(pos.y)
        if (pos.y > -1 * this.loadHeight) {
            this.onPullDown();
        }else{
            this.setPullDownTips(0);
        }

        //上拉加载老数据
        if(pos.y < this.scroll.maxScrollY){
            this.onPullUp();
        }
    }

    onScrollEnd(){
       let pullDown = this.refs.pullDown;
        // 下拉滑动结束后，停在刷新区域
        if (this.scroll.y > -1 * this.loadHeight) {
            if (this.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.scroll.scrollTo(0, -1 * this.loadHeight, 200);
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
                this.getScrollData();
            }
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

    success(response){
      if(this.isRefresh){
          if (this.pullDownStatus == 3) {
              this.setPullDownTips(4);
              this.setState({items: response.data});
              this.initScroll();
          }
      }else{
          if (this.pullUpStatus == 2) {
              this.setPullUpTips(3);
              this.setState({
                  items: this.state.items.concat(response.data)
              });
          }
      }
      ++this.pageIndex;
    }


    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
      // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
      if (this.itemsChanged && this.scroll) {
        if(!this.isRefresh){
          this.setPullUpTips(0);
        }
        this.scroll.refresh();
      }
      return true;
    }

    render(){
        var scrollHeight = (window.innerHeight-47.5) + 'px';
        return (
            <div ref="list-wrapper" className="adv-list-wrapper" style={{height:scrollHeight}}>
                    <ul className="adv-list-scroll">
                    <div ref="pullDown" className="scroll-loading">
                      <div className="loading-box">
                      <div className="loading-rond">
                      <div className="rond"></div>
                      </div>
                      <div className="loading-center">
                      <p ref="pullDownTips"></p>
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
                      <p ref="pullUpTips"></p>
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


