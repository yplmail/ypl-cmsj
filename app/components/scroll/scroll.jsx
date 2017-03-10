import React from 'react';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './scroll.css';

class Scroll extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.data = {
            pageIndex : this.pageIndex || 1,
            pageSize  : props.pageSize || 10
        }

        this.el  = props.el;

        this.url = props.url;

        this.pageIndex = 1;

        this.pullDownStatus = 3;

        this.pullUpStatus = 0;

        this.isRefresh = false;

        this.loadHeight = 40;

        this.onScroll = this.onScroll.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.initScroll = this.initScroll.bind(this);

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

    componentWillMount(){
       Object.assign(this.data,this.props.data);
    }

    componentDidMount(){
        this.fetchItems();
        this.initScroll();
    }

    componentDidUpdate() {
        setTimeout(function(){
            if(this.refs.pullUp){
                this.refs.pullUp.style.display='block';
            }
            if(this.refs.pullDown){
                // this.refs.pullDown.style.display='block';
                // setTimeout(function(){
                //     this.scroll.scrollTo(0, -this.loadHeight, 500);
                // }.bind(this), 300)
            }
            this.scroll.refresh();
        }.bind(this), 500)
    }

    fetchItems(){
        let server = new ServerRequest();
        server.post({
            url    : this.url,
            data   : this.data,
            success: function(response){
                this.isRefresh = true;
                this.next(response);
            }.bind(this)
        })
    }

    next(response){
        if(this.pageIndex == 1){
            if (this.pullDownStatus == 3) {
                this.setPullDownTips(4);
                this.setState({items: response.datas});
            }
        }else{
            if (this.pullUpStatus == 2) {
                this.setPullUpTips(3);
                this.setState({items: this.state.items.concat(response.datas)});
            }
        }

    }

    initScroll(){
        this.scroll = new BScroll(this.props.el, {
            probeType: 3,
            click:true
        })
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
        // 下拉滑动结束后，停在刷新区域
        if (this.scroll.y > -1 * this.loadHeight) {
            if (this.pullDownStatus <= 1) {
                // 没有发起刷新,那么弹回去
                //this.scroll.scrollTo(0, -1 * this.loadHeight, 500);
            } else if (this.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setPullDownTips(3);
                this.pageIndex = 1;
                this.fetchItems();
            }
        }

        // 上拉滑动结束后，停在加载区域
        if (this.scroll.y <= this.scroll.maxScrollY) {
            if (this.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setPullUpTips(2);
                ++this.pageIndex;
                if(this.pageIndex <= this.pageCount){
                    this.fetchItems();
                }else{
                    --this.pageIndex;
                    this.setPullUpTips(4);
                    let timer = setTimeout(function(){
                       clearInterval(timer);
                       this.scroll.scrollTo(0, this.scroll.y + this.loadHeight, 500);
                       this.setPullUpTips(0);
                    }.bind(this),500)
                }
            }
        }
    }

    setPullDownTips(status){
        this.pullDownStatus = status;
        if(this.refs.pullDownTips){
            this.refs.pullDownTips.innerText = this.pullDownTips[status];
        }
    }

    setPullUpTips(status){
        this.pullUpStatus = status;
        if(this.refs.pullUpTips){
            this.refs.pullUpTips.innerText = this.pullUpTips[status];
        }
    }

    elements(){
        let content = '';
        if(this.isRefresh){
            if(this.state.items.length > 0){
                content = this.state.items.map((item, index) => {
                            return <this.props.row item={item} key={index}/>
                          })
            }else{
                content = <div className="no-video">暂无相关视频</div>;
            }
        }
        return content;
    }

    render(){
        return (
            <ul>
                <div className="scroll-loading" ref="pullDown" >
                <div className="loading-box">
                <div className="loading-rond">
                <div className="rond"></div>
                </div>
                <div className="loading-center">
                <p ref="pullDownTips">{this.pullDownTips[this.pullDownStatus]}</p>
                </div>
                </div>
                </div>
                {this.elements()}
                <div className="scroll-loading" ref="pullUp">
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
        )
    }
}

export default Scroll;

