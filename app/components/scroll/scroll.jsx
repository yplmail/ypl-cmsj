import React from 'react';
import ServerRequest from 'server/serverRequest';
import './scroll.css';

class Scroll extends React.Component{

    constructor(props){

        super(props);

        this.pageIndex = 1;

        this.pageSize  = 10;

        this.url       = props.url;

        this.datas     = props.data || {};

        this.createNode  = props.createNode || function(){};

        this.callback    = props.callback || function(){};

        this.scrollEvent = this.scrollEvent.bind(this);

        this.loading     = false;

    }

    componentDidMount(){

        this.body      = document.querySelector('body');

        this.container = this.refs.scrollcontainer;

        this.scrolltip = this.refs.scrolltips;

        this.loadingtip = this.refs.loadingtips;

        window.addEventListener('scroll',this.scrollEvent,false);

        this.fetchDatas();
    }

    fetchDatas(){
        this.server = new ServerRequest();
        this.server.post({
            url  : this.url,
            data : this.data(),
            success:function(result){
               this.loading    = false;
               this.pageCount  = result.pageCount;
               this.totalCount = result.totalCount;
               this.callback(result);
               this.dealwith(result);
            }.bind(this)
        });
    }

    data(){
        this.datas['pageIndex']  = this.pageIndex;
        this.datas['pageSize']   = this.pageSize;
        return this.datas;
    }

    scrollEvent(event){
        event.preventDefault();
        var scrollpos = this.body.offsetHeight + this.body.scrollTop;
        var maxHeight = this.body.scrollHeight;
        if(scrollpos >= maxHeight - 10){
            if(this.loading) return false;
            this.loading = true;
            if(this.pageIndex < this.pageCount){
                this.loadingtip.innerText='正在加载';
                ++this.pageIndex;
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    this.fetchDatas();
                }.bind(this),200);
            }else{
                this.loadingtip.innerText='没有更多';
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    this.scrolltip.style.display = 'none';
                }.bind(this),200)
            }
        }
    }

    dealwith(result){
        if(this.totalCount == 0){
            this.container.innerHTML = '<p class="no-data">暂无相关数据</p>';
        }else{
            this.createNodes(result.datas);
        }
    }

    createNodes(datas){
        datas.forEach(function(data,index){
            this.container.appendChild(this.createNode(data));
        }.bind(this));

        if(this.totalCount > this.pageSize){
            this.refs.scrolltips.style.display = 'block';
        }
    }

    render(){
        return(
            <div>
                <ul ref="scrollcontainer"></ul>
                <div ref="scrolltips" className="scroll-loading scrolltips">
                    <div className="loading-box">
                        <div className="loading-rond">
                            <div className="rond"></div>
                        </div>
                        <div className="loading-circle">
                            <p ref="loadingtips">下拉加载</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scrollEvent,false);
    }
}

export default Scroll;
