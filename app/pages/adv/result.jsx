import React   from 'react';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';
import Scroll from 'scroll/scroll';
import Share   from 'share/share';
import './result.css';

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            result : {
                beyondUserRate:0,
                publisher : {}
            },
            count  : 0,
            share :{
                display :'none',
                title   : '',
                desc    : '',
                link    : '',
                imgUrl  : '',
                type    : '',
                dataUrl : '',
                success : ''
            }
        }

        this.shareHandle = this.shareHandle.bind(this);

        this.query = this.props.params;

        this.data = {
            el  : '.result-record',
            url : 'packetRecord',
            data: {publishId:this.query.videoId},
            createNode : this.template.bind(this),
            callback   : this.count.bind(this)
        };

        this.tips = {
            '1'  : '糟糕，发给你的洲际红包被萨德拦截了！',
            '2'  :  '“因为理解，所以等待”，等你下次再来',
            '3'  :  '这是一个亿的项目，只是今天的收益暂时为零',
            '4'  :  '抢红包不易，且行且珍惜',
            '5'  :  '表急，接下来有一场红包雨！',
            '6'  :   '来，准备好姿势，咱们再来一次',
            '7'  :  '运营今天回村了，网慢，你懂滴',
            '8'  :   '好乖哦，知道给肉疼的运营留点纸巾钱',
            '9'  :  '怎么可能？你刚才一定走神了！',
            '10' :  '单身二十年的手速还抢不到？什么RP！',
            '11' :  '怎么做到的？连着WIFI都抢不到！',
            '12' :  '鉴定完毕，你的手还是太短啦~',
            '13' :  '知道为什么没中么？你没有姨妈红的手机呐！',
            '14' :  '明明可以靠颜值，你却偏要靠运气。这下好了~ ',
            '15' :  '哥（姐），知道你视金钱如废土',
            '16' :  '哥，想想那谁，这都不算事',
            '17' :  '真不是我的错，我也不知道红包去哪个星球了',
            '18' :  '别急，我们许总已经在抢银行了',
            '19' :  '我知道你想憋个大的，继续',
            '20' :  '喔噻，哥，赶快去买张彩票吧，双色球6 6 6 6 6 6 8'                       
        }

        this.percent = {
            '1' : '城市套路深，何必太认真，你却认真打败了全国##%的用户',
            '2' : '姿势太帅，恭喜你打败了全国##%的红包用户',
            '3' : '闹哪样？一不小心你就打败了全国##%的用户'            
        }
    }

    componentDidMount(){
        this.openPacket();
        this.getVideo();
    }

    /**
     * 打开红包
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    openPacket(event){
        let server = new ServerRequest();
        server.post({
            url : 'receive',
            data:{
                publishId : this.query.videoId,
                videoPlayRecordId : this.query.playId
            },
            success:function(result){
                this.setState({
                    'result' : result
                })
            }.bind(this)
        });
    }

    getVideo(){
        let server = new ServerRequest();
        server.post({
            url:'advDetail',
            data:{
                publishId: this.query.videoId
            },
            success:function(data){
                data = {};
                let tk = common.getcookies('token');
                let shareId = tk ? tk.split("_")[1] : '';
                this.setState({
                    share : {
                        title   : data.title,
                        desc    : data.publishVideoDesc || '一起发现创意美',
                        link    : 'http://'+location.hostname+'/#/share/'+data.publishId+'/'+shareId,
                        imgUrl  : data.coverUrl,
                        type    : 'video',
                        dataUrl : data.playUrl,
                        success : this.shareSuccess.bind(this)
                    }
                });
            }.bind(this)
        })
    }

    shareHandle(){
        this.setState({
            share:{display:'block'}
        });        
    }

    shareSuccess(){
        this.setState({
            share  :{
                 display:'none'
            }
        });
        let server = new ServerRequest();
        server.post({
            url:'shareSuccess',
            data:{
                publishId:this.props.videoId
            },
            success:function(response){
               //微信自带分享成功提示
            }
        });        
    }

    count(result){
        this.setState({count : result.totalCount})
    }

    template(item,font){
        let element = document.createElement('li');
        element.setAttribute('data-flex', 'dir:left box:justify');
        element.innerHTML = this.innerHtml(item);
        return element;
    }

    innerHtml(item){
        let coverUrl = item.avatar ? 'url('+item.avatar+')' : '';
        return '<div class="record-header" data-flex="main:center cross:center"><i style={{backgroundImage:coverUrl}}></i></div>'+
                '<div class="record-content" >'+
                '<p>'+item.nickname+'</p>'+
                '<p>'+item.date.substr(5)+'</p>'+
                '</div>'+
                '<div class="record-amount">'+
                '<span>'+item.amount+'元</span>'+
                '</div>';
    }

    result(){
        let data = this.state.result;
        if(data.amount == '0'){ 
            return <div className="no-winning">{this.tips[Math.ceil(Math.random()*20)]}</div>
        }else{
            let str = this.percent[Math.ceil(Math.random()*3)];
            return <div>
                       <div className="packet-amount">{data.amount}</div>
                       <div className="packet-tip">已存入我的钱包</div>
                       <div className="packet-percent">{str.replace("##",data.beyondUserRate)}</div>
                   </div>
        }
    }

    render(){
        let avatar = this.state.result.publisher.avatar;
        let coverUrl = avatar ? 'url('+avatar+')' : '';
    	return(
          <div className="result-wrapper">
	          <div className="result-content">
		          <div className="header">
			          <i className="header-img" style={{backgroundImage:coverUrl}}></i>
		          </div>
		          <div className="content">
			          <div className="packet-title">{this.state.result.publisher.name}</div>
			          <div className="packet-wish">{this.state.result.thanksWords}</div>
                      {this.result()}
			          <div className="packet-share"><span onClick={this.shareHandle}>分享</span></div>
		          </div>
	          </div>
              <div className="result-line"></div>
		      <h1>已抢{this.state.count}个红包</h1>
              <div className="result-record">
                  <Scroll {...this.data} />         
	          </div>
              <Share {...this.state.share}/>
          </div>
    	);
    }

}

export default Result;

