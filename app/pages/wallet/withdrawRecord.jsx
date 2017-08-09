import React from 'react';
import Scroll from 'scroll/scroll';
import ServerRequest from 'server/serverRequest';
import common from 'common/common';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import './withdrawRecord.css';

class WithdrawRecord extends React.Component{
    constructor(props){
        super(props);
        this.pageIndex = 1;
        this.pageSize  = 10;
        this.pageCount = 0;
        this.firstrender = true;
        this.state = {
             items:[],
             loadingTips:false
        }
        this.scrolloptions = {
            scrollbars: true,
            bounce    : true,
            click     : true      
        }

        this.originType = {
            1:'观看获赠',
            2:'分享获赠',
            3:'邀请注册获赠'
        }

        this.status = {
            10:'资金冻结',
            20:'提现中...',
            21:'提现成功',
            22:'提现失败'
        }

        this.payType = {
            1: '微信红包',
            2: '微信提现',
            3: 'APP提现',
            4: 'APP提现到微信红包',
            5: '使用H5来充值到平台',
            6: '使用APP来充值到平台',
            7: '小程序提现'
        }         
    }

    componentWillMount(){
        this.fetchWithdrawRecord();
    }

    fetchWithdrawRecord(){
        let server = new ServerRequest();
        server.post({
            url: 'withdrawList',
            data:{
              user_id : common.getcookies('token').split("_")[1],
              pageIndex:this.pageIndex,
              pageSize :this.pageSize
            },
            success:function(response){
                this.isLoading = false;
                this.pageCount = response.pageCount;
                this.firstrender = false;
                this.setState({
                  loadingTips: this.pageIndex < this.pageCount ? true : false,
                  items:this.state.items.concat(response.datas)
                });
            }.bind(this)
        }) 
    }

    onScrollEnd(scroll){
        if(scroll.y < 0 && Math.abs(scroll.y) >= Math.abs(scroll.maxScrollY)){
            if(this.isLoading) return false;
            if(this.pageIndex < this.pageCount){
                ++this.pageIndex;
                this.isLoading = true;
                this.fetchWithdrawRecord();                  
            }
        }
    }     

    loop(item,index){
        return  (
          <li key={index} data-flex="dir:top box:first" style={{'height':item.errorReason ? '1.65rem':'1.23rem' }}>
		        <div className="record-title" data-flex="dir:left main:justify cross:bottom">
			        <h3>{this.payType[item.payType]}</h3>
			        <p><span>{item.amount}</span><span>元</span></p>
		        </div>
		        <div className="record-status" data-flex="dir:left main:justify cross:center">
			        <p>{item.transTime.replace(/-/g,'/')}</p>
			        <p style={{'color':item.status=='22'?'#666':'#cbae67'}}>{this.status[item.status]}</p>
		        </div>
		        <div className="record-result" style={{'display':item.errorReason ? '':'none'}} data-flex="dir:left cross:top">
		        	<p className="ellipsis" style={{'width':'6rem','textAlign':'left'}}>{item.errorReason}</p>
		        </div>
          </li>  
        )    
    }  

    render(){
        let scroll = [];
        if(this.state.items.length > 0){
            this.state.items.forEach(function(item,index){
               scroll.push(this.loop(item,index));
            }.bind(this))   
        }else{
            if(!this.firstrender){
              scroll.push(
                  <div className="iscroll-empty" data-flex="cross:center main:center">
                      <img src={require('../../images/no_data.png')} />
                  </div>
              ); 
            }          
        }
        return(
          <div className="item withdrawrecord-outer" style={{height:this.props.height +'px'}}>
            <div className="withdrawrecord-scroll">
                <ReactIScroll iScroll={iScroll} onScrollEnd={this.onScrollEnd.bind(this)} options={this.scrolloptions}>
                    <ul>
                      {scroll}
                      <div className="scroll-loading" style={{display:this.state.loadingTips ? 'block':'none'}}>
                      <div className="loading-box">
                      <div className="loading-rond">
                      <div className="rond"></div>
                      </div>
                      <div className="loading-circle">
                      <p>正在加载</p>
                      </div>
                      </div>
                      </div>
                    </ul>   
                </ReactIScroll> 
            </div> 
          </div>
        );
    }
}

export default WithdrawRecord;

