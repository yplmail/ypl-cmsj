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

        this.pullDownStatus = 3;

        this.pullUpStatus = 0;

        this.isRefresh = false;

        this.loadHeight = 40;

        this.touch      = false;

        // this.touchStart = this.touchStart.bind(this);

        // this.onScroll = this.onScroll.bind(this);

        // this.onScrollEnd = this.onScrollEnd.bind(this);

        // this.initScroll = this.initScroll.bind(this);

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
        this.scroll = new BScroll(this.el,{probeType: 3,click:true})
        this.fetchItems();
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
                this.scroll.refresh()
            }.bind(this)
        })        
    }

    elements(){
        let content = '';
        if(this.state.items.length > 0){
            content = this.state.items.map((item, index) => {
                        return <this.props.row item={item} key={index}/>
                      })
        }else{
            content = <div className="no-video">暂无相关视频</div>;
        }
        return content;         
    }

    render(){ 
        return (
            <ul>
                {this.elements()}
            </ul>
        )
    }
}

export default IScroll;