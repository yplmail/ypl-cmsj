import React from 'react';
import Iscroll from 'iscroll-lite';
import ServerRequest from 'server/serverRequest';
import common from '../../common/common';

class ScrollLite extends React.Component{

    constructor(props){

        super(props);

        this.pageIndex = 1;

        this.pageSize  = 10;

        this.element   = props.el;

        this.url       = props.url;

        this.datas     = props.datas;

        this.callback  = props.callback;

        this.datas['pageIndex']  = this.pageIndex;

        this.datas['pageSize']   = this.pageSize;
    }

    componentDidMount(){
        this.instance();
        this.fetchDatas();
    }

    componentDidUpdate(){
        this.isrcoll.refresh();
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

        this.server.xhr.abort();

        if(this.iscroll.directionY == 1){

        }else{

        }
    }

    scrollEnd(){
        //下拉滑动结束
        if(this.iscroll.y == 0){

        }

        //上拉滑动结束
        if(this.iscroll.y == this.iscroll.maxScrollY){

        }
    }

    fetchDatas(){
        this.server = new ServerRequest();
        this.server.post({
            url  : this.url,
            data : this.datas,
            success:function(result){
               this.dealwith(result);
            }.bind(this)
        });
    }

    dealwith(result){
       if(result.totalCount == 0){
            this.noDatas();
       }

       if(result.totalCount <= 10){
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
        this.upscrolltips.style.display='block';
        this.parentNodes= this.srcollcontainer.parentNodes[0];
        this.srcollcontainer.height = this.parentNodes.offsetHeight + 'px';
        this.nodes(datas);
    }

    maxDatas(datas){
        this.downscrolltips.style.display='block';
        this.upscrolltips.style.display='block';
        this.nodes(datas);
    }

    nodes(datas){
        this.refs.srcollcontainer.innerHTML = this.callback(datas);
        this.iscroll.scrollTo(0,-40,500)
    }

    render(){
        return(
            <div id="wrapper">
                <div id="scroller">
                    <div ref="downscrolltips" class="scrolltips">
                        <span></span>
                        <span class="innerTips">下拉刷新</span>
                    </div>
                    <ul ref="srcollcontainer" class="srcoll-container">
                        <li>Pretty row 1</li>
                        <li>Pretty row 2</li>
                        <li>Pretty row 3</li>
                        <li>Pretty row 4</li>
                        <li>Pretty row 5</li>
                        <li>Pretty row 6</li>
                        <li>Pretty row 7</li>
                        <li>Pretty row 8</li>
                        <li>Pretty row 9</li>
                        <li>Pretty row 11</li>
                        <li>Pretty row 12</li>
                        <li>Pretty row 13</li>
                        <li>Pretty row 14</li>
                        <li>Pretty row 15</li>
                        <li>Pretty row 16</li>
                        <li>Pretty row 17</li>
                        <li>Pretty row 18</li>
                        <li>Pretty row 19</li>
                        <li>Pretty row 20</li>
                        <li>Pretty row 21</li>
                    </ul>
                    <div ref="upscrolltips" class="scrolltips">
                        <span></span>
                        <span class="innerTips">下拉刷新</span>
                    </div>
                </div>
            </div>
        );
    }
}
