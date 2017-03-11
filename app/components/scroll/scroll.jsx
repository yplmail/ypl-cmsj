import React from 'react';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './scroll.css';

class Scroll extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            datas      : [],
            totalCount : 0,
            pageIndex  : 1,
            pageCount  : 0,
            pageSize   : 10
        };

        this.el  = props.el;

        this.url = props.url;
        
        this.pageIndex = 1;

        this.pageSize  = 10;

        this.pullDownStatus = 3;

        this.pullUpStatus   = 0;

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
       this.data = Object.assign({
           pageSize  : 10,
           pageIndex : this.pageIndex
       },this.props.data);
    }

    componentDidMount(){
        this.fetchDatas();
        this.initScroll();
    }

    componentDidUpdate(el,props) {
        if(this.refs.pullUp && props.totalCount > 10){
            this.refs.pullUp.style.display='block';
        }

        if(this.refs.pullDown){
            this.refs.pullDown.style.display='block';
            this.scroll.scrollTo(0, -this.loadHeight, 500);
        }

        setTimeout(function(){
            this.scroll.refresh();
            if(this.pageIndex > 1){
                this.scroll.scrollTo(0,this.scroll.maxScrollY-40,1);               
            }
        }.bind(this), 500)
    }

    assign(){
        return Object.assign({
            pageIndex:this.pageIndex,
            pageSize :this.pageSize
        },this.props.data);        
    }

    fetchDatas(){
        let server = new ServerRequest();
        server.post({
            url    : this.url,
            data   : this.assign(),
            success: function(response){
                this.isRefresh = true;
                this.next(response);
            }.bind(this)
        })
    }

    next(response){
        if(this.pageIndex == 1){
            this.setPullDownTips(4);
            this.setState({...response});
            this.scroll.scrollTo(0, -40, 500);
        }else{
            this.setPullUpTips(3);
            this.state.datas.concat(response.datas);
            response.datas = this.state.datas;
            this.setState({...response});

        }
    }

    initScroll(){
        this.scroll = new BScroll(this.props.el, {
            probeType: 3,
            click:true
        })
        this.scroll.on('scrollEnd', this.onScrollEnd);
        this.scroll.on('scroll', this.onScroll);
    }

    onScroll(){
        if(this.scroll.y > -40){
            if(this.pullDownStatus != 3){
                if(this.scroll.y < 0){
                    this.setPullDownTips(1);
                }else{    
                    this.up   = false;
                    this.down = true;
                    this.setPullDownTips(2);
                }
            }           
           return false;
        }

        if(this.scroll.y < this.scroll.maxScrollY){
            if(this.pullUpStatus != 2){
                if (this.scroll.y <= this.scroll.maxScrollY) {
                    this.up   = true;
                    this.down = false;
                    this.setPullUpTips(1);
                } else {
                    this.setPullUpTips(0);
                }
            }            
        }
    }

    onScrollEnd(){
        // 下拉滑动结束后，停在刷新区域
        if (this.down && this.scroll.y > -40) {
            if(this.pullDownStatus == 2){
                this.setPullDownTips(3);
                this.pageIndex = 1;
                this.fetchDatas();                
            }
            return false;
        }

        // 上拉滑动结束后，停在加载区域
        if (this.up && this.scroll.y <= this.scroll.maxScrollY) {     
            if (this.pullUpStatus == 1) { 
                this.setPullUpTips(2);
                if(this.state.pageIndex < this.state.pageCount){
                    ++this.pageIndex;
                    this.fetchDatas();
                }else{
                    this.nomore();
                }
            }
        }
    }

    nomore(){
        this.setPullUpTips(4);
        let timer = setTimeout(function(){
           clearInterval(timer);
           this.scroll.scrollTo(0, this.scroll.y + this.loadHeight, 500);
           this.setPullUpTips(0);
        }.bind(this),500)        
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
            if(this.state.datas.length > 0){
                content = this.state.datas.map((item, index) => {
                    return <this.props.row item={item} key={index}/>
                })
            }else{
                content = <div className="no-video">暂无相关视频</div>;
            }
        }
        return content;
    }

    render(){
        var content = this.elements();
        console.log(content)
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

