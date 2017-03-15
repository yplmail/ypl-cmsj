import React from 'react';
import BScroll from 'better-scroll';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';
import './scroll.css';

class IScroll extends React.Component{
    constructor(props) {
        super(props);

        this.pageIndex  = 1;

        this.pageSize   = 10;

        this.totalCount = 0;

        this.pageCount  = 0;

        this.status     = 3;

        this.touching   = false;

        this.pullDownTips = {
            0: '下拉刷新',
            1: '松手刷新',
            2: '正在刷新',
            3: '刷新成功'
        };

        this.pullUpTips = {
            0: '上拉加载',
            1: '松手加载',
            2: '正在加载',
            3: '加载成功',
            4: '没有更多',
        };

        this.onScrollStart = this.onScrollStart.bind(this);

        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.touchStart = this.touchStart.bind(this);

        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount(){
       this.fetchItems();
       this.initScroll();
    }

    assign(){  
        //由于在IOS8中不支持该方法
        // return Object.assign({
        //     pageIndex:this.pageIndex,
        //     pageSize :this.pageSize
        // },this.props.data);
        

        let data = this.props.data;
        
        let obj = {            
            pageIndex:this.pageIndex,
            pageSize :this.pageSize
        };

        for (let r in data) {
            obj[r] = data[r]
        }

        return obj;
    }

    fetchItems(){
        var data = this.assign();
        let server = new ServerRequest();
        server.post({
            url    : this.props.url,
            data   : this.assign(),
            success: function(result){
                this.pageCount  = result.pageCount;
                this.totalCount = result.totalCount;
                this.next(result.datas);
            }.bind(this)
        })
    }

    next(data){
        let container = this.refs.innserscroll;
        if(this.pageIndex == 1){
            if(this.totalCount == 0){
                container.innerHTML = '<div class="no-data">暂无相关数据</div>';
            }else{
                container.innerHTML = '';
                this.template(data);
            }
        }else{
            this.setUpLoadingTips(3);
            this.template(data);
        }
    }

    template(items){
        if(this.totalCount > 10){
            this.refs.pullupTips.style.display = 'block';
        }
        let container = this.refs.innserscroll;
        items.map(function(item,index){        
            container.appendChild(this.props.callback(item));
        }.bind(this));
        this.scroll.refresh();
    }

    initScroll(){
        this.scroll = new BScroll(this.props.el,{probeType: 3,click:true});
        this.scroll.on('scroll', this.onScrollStart);
        this.scroll.on('scrollEnd', this.onScrollEnd);
    }

    onScrollStart(){
        //下拉刷新最新数据
        // if(this.touching && this.scroll.y >= 0){

        //     if(this.status == 3 || this.status == 4){
        //         this.setDownLoadingTips(0)
        //     }

        //     if(this.status == 0 && this.scroll.y >= 40){
        //         this.setDownLoadingTips(1)
        //     }
        //     return false;
        // }

        //上拉加载老数据
        if(this.scroll.y < this.scroll.maxScrollY - 20){

            if(this.status == 3 || this.status == 4){
                this.setUpLoadingTips(0)
            }

            if(this.status == 0 && this.scroll.y <= this.scroll.maxScrollY){
                this.setUpLoadingTips(1)
            }
        }
    }

    onScrollEnd(){
       // if(this.status == 1 && this.scroll.y >= 0){
       //       this.setDownLoadingTips(2);
       //       this.pageIndex = 1;
       //       this.fetchItems();
       //       return false;
       // }

       if(this.status == 1 && this.scroll.y >= this.scroll.maxScrollY){
             if(this.pageIndex < this.pageCount){
                 this.setUpLoadingTips(2);
                 ++this.pageIndex;
                 this.fetchItems();               
             }else{
                 this.setUpLoadingTips(4);
                 this.scroll.refresh();
                 setTimeout(function(){
                     this.scroll.scrollTo(0,this.scroll.maxScrollY+40,500);                    
                 }.bind(this),320);
             }
       }
    }

    // setDownLoadingTips(state){
    //      this.status = state;
    //      this.refs.downLoadingTips.innerText = this.pullDownTips[this.status]
    // }

    setUpLoadingTips(state){
         this.status = state;
         this.refs.upLoadingTips.innerText = this.pullUpTips[this.status]
    }

    touchStart(){
        this.touching = true;
    }

    touchEnd(){
        this.touching = false;
    }

    render(){
        return (
            <div>
                <ul ref="innserscroll" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>                 
                </ul>
                <div className="scroll-loading" ref="pullupTips" >
                <div className="loading-box">
                <div className="loading-rond">
                <div className="rond"></div>
                </div>
                <div className="loading-center">
                <p ref="upLoadingTips"> {this.pullUpTips[this.pullUpStatus]}</p>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default IScroll;
