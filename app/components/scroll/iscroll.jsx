import React from 'react';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './scroll.css';

class IScroll extends React.Component{
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

        this.pullDownStatus = 0;

        this.pullUpStatus = 0;

        this.isRefresh = false;

        this.loadHeight = 40;

        this.touching = false;

        this.touchStart = this.touchStart.bind(this);

        this.touchEnd = this.touchEnd.bind(this);

        this.onScroll = this.onScroll.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);


        this.pullDownTips = {
            1: '下拉刷新',
            2: '松手刷新',
            3: '正在刷新',
            4: '刷新成功'
        };

        this.pullUpTips = {
            1: '上拉加载',
            2: '松手加载',
            3: '正在加载',
            4: '加载成功'
        };
    }

    componentWillMount(){
       Object.assign(this.data,this.props.data);
    }

    componentDidMount(){
       this.fetchItems();
       this.initScroll();
    }

    fetchItems(){
        let server = new ServerRequest();
        server.post({
            url    : 'correlationVideo',
            data   : this.data,
            success: function(result){
                this.setState({
                    items:result.datas
                })
                this.end();
            }.bind(this)
        })
    }

    initScroll(){
        this.scroll = new BScroll(this.el,{probeType: 3,click:true});
        this.scroll.on('scroll', this.onScroll);
        this.scroll.on('scrollEnd', this.onScrollEnd);
    }

    onScroll(){
        //下拉刷新最新数据
        if(this.touching && this.scroll.y >= 0){
            this.setDownLoadingTips(0)
            this.refs.pullDown.style.display='block';
        }

        if (this.touching &&  this.scroll.y > 10 && this.scroll.y < 40) {
            this.setDownLoadingTips(1);
        }

        if (this.touching && this.scroll.y >= 40) {
            this.setDownLoadingTips(2);
        }

        //上拉加载老数据
        if(this.scroll.y >= this.scroll.maxScrollY){
            this.refs.pullUp.style.display='block';
        }

        if(this.scroll.y > (this.scroll.maxScrollY-40)){
            if(this.pullUpStatus != 2){
                this.setUpLoadingTips(1);
            }
        }

        if(this.scroll.y <= (this.scroll.maxScrollY-40)){
            this.setUpLoadingTips(2);
        }
    }

    onScrollEnd(){
       if(this.scroll.y >= 0 && this.pullDownStatus == 2){
             this.setDownLoadingTips(3);
             this.pageIndex = 1;
             this.fetchItems();
       }

       if(this.pullUpStatus == 2){
             this.setUpLoadingTips(3);
             ++this.pageIndex;
             this.fetchItems();
       }
    }

    setDownLoadingTips(status){
         this.pullDownStatus = status;
         this.refs.downLoadingTips.innerText = this.pullDownTips[status]
    }

    setUpLoadingTips(status){
         this.pullUpStatus = status;
         this.refs.upLoadingTips.innerText = this.pullUpTips[status]
    }

    end(){
        if(this.pageIndex == 1){
            this.pullDownStatus = 4;
            this.refs.downLoadingTips.innerText = this.pullDownTips[4]
        }else{
            this.pullUpStatus = 4;
            this.refs.upLoadingTips.innerText = this.pullUpTips[4];
        }

        setTimeout(function(){
           if(this.pageIndex == 1){
               this.refs.pullDown.style.display='none';
           }else{
               this.refs.pullUp.style.display='none';
           }
           this.scroll.refresh();
        }.bind(this), 300)
    }

    elements(){
        if(this.state.items.length > 0){
            var content = this.state.items.map((item, index) => {
                return <this.props.row item={item} key={index}/>
            })
        }else{
            var content = <div className="no-video">暂无相关视频</div>;
        }
        return content;
    }

    touchStart(){
        this.touching = true;
    }

    touchEnd(){
        this.touching = false;
    }

    render(){
        return (
            <ul onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                <div className="scroll-loading" ref="pullDown">
                <div className="loading-box">
                <div className="loading-rond">
                <div className="rond"></div>
                </div>
                <div className="loading-center">
                <p ref="downLoadingTips"> {this.pullDownTips[this.pullDownStatus]}</p>
                </div>
                </div>
                </div>
                {this.elements()}
                <div className="scroll-loading" ref="pullUp" >
                <div className="loading-box">
                <div className="loading-rond">
                <div className="rond"></div>
                </div>
                <div className="loading-center">
                <p ref="upLoadingTips"> {this.pullUpTips[this.pullUpStatus]}</p>
                </div>
                </div>
                </div>
            </ul>
        )
    }

    componentDidUpdate(){
        setTimeout(function(){
           this.scroll && this.scroll.refresh();
        }.bind(this),500)
    }
}

export default IScroll;
