import React from 'react';
import Iscroll from './iscroll';
import './iscroll.css';
import ServerRequest from 'server/serverRequest';

class Scroll extends React.Component{

    constructor(props){

        super(props);

        this.pageIndex = 1;

        this.pageSize  = 10;

        this.element   = props.el;

        this.url       = props.url;

        this.datas     = props.datas || {};

        this.callback  = props.callback || function(){};

        this.datas['pageIndex']  = this.pageIndex;

        this.datas['pageSize']   = this.pageSize;

        this.up = true;    
    }

    componentDidMount(){
        this.instance();
        this.fetchDatas();
    }

    instance(){
        this.iscroll = new Iscroll(this.element,{
            probeType:3,
            click : true,
        });

        this.iscroll.on('scrollStart', function() {
            this.scrollStart();
        }.bind(this))

        this.iscroll.on('scrollEnd', function() {
            this.scrollEnd();
        }.bind(this))
    }

    scrollStart(){

        /**
         * 只有开启了下轮滑动
         * 立即结束上轮没有结束的请求
         */
        this.server.xhr.abort();
  
        if(this.iscroll.directionY == -1){
            this.up = false;
            this.refs.downLoadingTips.innerText = '下拉刷新';         
        }else{
            this.up = true;
            this.refs.upLoadingTips.innerText   = '上拉加载';     
        }
    }

    scrollEnd(){

        /**
         * 防止非人为滑动下的操作
         * @param  {[type]} this.iscroll.directionY ! [description]
         * @return {[type]} [description]
         */
        if(this.iscroll.directionY != 1 && this.iscroll.directionY != -1){
            return false;
        }

        /**
         * 防止下拉的同时执行
         * this.iscroll.scrollTo(0,this.iscroll.maxScrollY + 40,500);
         */
        if(this.iscroll.directionY == -1){
            this.up = true;     
        }

        /**
         * 下拉滑动结束
         * @param  {[type]} this.iscroll.y [description]
         * @return {[type]}                [description]
         */
        if(this.iscroll.y == 0){
            this.refs.downLoadingTips.innerText = '正在刷新';
            this.pageIndex = 1;
            this.datas['pageIndex'] = this.pageIndex;
            this.fetchDatas();
            return false;
        }

        /**
         * 上拉滑动结束
         * @param  {[type]} this.iscroll.y [description]
         * @return {[type]}                [description]
         */
        if(this.iscroll.y == this.iscroll.maxScrollY && this.pageCount > 1){
            this.refs.downLoadingTips.innerText = '正在加载';
            if(this.pageIndex < this.pageCount){
                this.datas['pageIndex'] = ++this.pageIndex;
                this.fetchDatas();
            }else{
                this.refs.upLoadingTips.innerText = '没有更多';
                let timer = setTimeout(function(){
                    clearTimeout(timer);
                    if(this.up){
                        this.iscroll.scrollTo(0,this.iscroll.maxScrollY + 40,500); 
                        this.iscroll.refresh();                        
                    }
                }.bind(this),320);
            }
        }
    }

    fetchDatas(){
        this.server = new ServerRequest();
        this.server.post({
            url  : this.url,
            data : this.datas,
            success:function(result){
               this.pageCount = result.pageCount;
               this.dealwith(result);
            }.bind(this)
        });
    }

    dealwith(result){
        
        if(this.pageIndex == 1) {
            this.refs.downLoadingTips.innerText = '刷新成功';              
        }else{
            this.refs.upLoadingTips.innerText   = '加载成功'; 
        }

        if(result.totalCount == 0){
            this.noDatas();
        }

        if(result.totalCount > 0 && result.totalCount <= 10){
            this.minDatas(result.datas);
        }

        if(result.totalCount > 10){
            this.maxDatas(result.datas);
        }
    }

    noDatas(){
       this.refs.srcollcontainer.innerHTML='<div class="no-data">暂无相关数据</div>';
    }

    minDatas(datas){
        this.wrapper = document.querySelector(this.element);
        this.refs.downscrolltips.style.display='block';
        this.refs.srcollcontainer.style.height = this.wrapper.style.height || this.styles(this.wrapper).height;
        this.nodes(datas);
    }

    maxDatas(datas){
        this.refs.downscrolltips.style.display='block';
        this.refs.upscrolltips.style.display='block';
        this.nodes(datas);
    }

    nodes(datas){

        if(this.pageIndex == 1){
            this.refs.srcollcontainer.innerHTML = "";
        }

        let container = this.refs.srcollcontainer;

        datas.forEach(function(data,index){
            container.appendChild(this.callback(data));            
        }.bind(this));
          
        let timer = setTimeout(function(){
            clearTimeout(timer);
            this.ended();
        }.bind(this),300);
    }

    ended(){
        if(this.pageIndex == 1){
            this.iscroll.scrollTo(0,-40,500);                
        }else{
            this.iscroll.scrollTo(0 , this.iscroll.maxScrollY + 40 , 500); 
        }
        this.iscroll.refresh();          
    }

    styles(el){
        return el.currentStyle ? el.currentStyle : document.defaultView.getComputedStyle(el, null);                 
    }

    render(){
        return(
            <div className="scroll-wrapper">
                <div className="scroll-loading scrolltips" ref="downscrolltips">
                    <div className="loading-box">
                        <div className="loading-rond">
                            <div className="rond"></div>
                        </div>
                        <div className="loading-circle">
                            <p ref="downLoadingTips">下拉刷新</p>
                        </div>
                    </div>
                </div>

                <ul ref="srcollcontainer" className="srcoll-container">

                </ul>

                <div className="scroll-loading scrolltips" ref="upscrolltips">
                    <div className="loading-box">
                        <div className="loading-rond">
                            <div className="rond"></div>
                        </div>
                        <div className="loading-circle">
                            <p ref="upLoadingTips">上拉加载</p>
                        </div>
                    </div>
                </div>                    
            </div>
        );
    }
}

export default Scroll;
