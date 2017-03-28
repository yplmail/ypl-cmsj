import React from 'react';
import ServerRequest from 'server/serverRequest';

class ScrollList extends React.Component{

    constructor(props){

        super(props);

        this.pageIndex = 1;

        this.pageSize  = 10;

        this.element   = props.el;

        this.url       = props.url;

        this.datas     = props.datas || {};

        this.datas['pageIndex']  = this.pageIndex;

        this.datas['pageSize']   = this.pageSize;

        this.createNode    = props.createNode || function(){};

        this.scrollEvent = this.scrollEvent.bind(this);

        this.wrapper = document;

    }

    componentDidMount(){
        
        this.body      = document.querySelector('body');

        this.container = this.refs.scrollcontainer;

        this.wrapper   = this.container.parentNode;

        this.scrolltip = this.refs.loadingtips;
      
        this.fetchDatas();

        window.addEventListener('scroll',this.scrollEvent,false);
    }

    scrollEvent(event){
        var scrollpos = this.body.offsetHeight + this.body.scrollTop;
        var maxHeight = this.body.scrollHeight;
        var loadingtip = this.refs.loadingtips;
        if(scrollpos == maxHeight){
            if(this.pageIndex < this.pageCount){
                loadingtip.innerText='正在加载';
                ++this.pageIndex;
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    this.fetchDatas();
                }.bind(this),320);
            }else{
                if(loadingtip) loadingtip.innerText='没有更多'; 
            }
        }      
    }

    fetchDatas(){
        this.server = new ServerRequest();
        this.server.post({
            url  : this.url,
            data : this.datas,
            success:function(result){
               this.pageCount  = result.pageCount;
               this.totalCount = result.totalCount;
               this.dealwith(result);
            }.bind(this)
        });
    }

    dealwith(result){
        if(this.totalCount == 0){
            this.container.innerText = '<p class="no-data">暂无相关数据</p>';
        }else{
            this.createNodes(result.datas);      
        }       
    }

    createNodes(datas){
        datas.forEach(function(data,index){
            this.container.appendChild(this.createNode(data));
        }.bind(this)); 

        if(this.totalCount > this.pageSize){
            this.scrolltip.style.display = 'block';
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

export default ScrollList;