import React from 'react';
import ServerRequest from 'server/serverRequest';
import './share.css';

class Share extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display :'none',
            content : '请点击右上角将本链接发送给指定朋友或分享到朋友圈等'
        }
        this.touchHandle = this.touchHandle.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            display : nextProps.display,
            content : nextProps.content || '请点击右上角将本链接发送给指定朋友或分享到朋友圈等'
        });
    }

    componentDidMount(){
        var server = new ServerRequest(); 
        server.post({
            url :'wechatShare',
            data:{
                url : location.href
            },
            success:function(result){
               this.share(result);
            }.bind(this)
        })      
    }


    share(data) {
        let content = data.shareContent || {};
        let config  = data.wxConfig;
        var shareContent = {
            title   : content.shareTitle, // 分享标题
            desc    : content.shareDesc,  // 分享描述
            link    : content.shareLink,  // 分享链接
            imgUrl  : content.shareImgurl, // 分享图标      
            type    : '', // 分享类型,music、video或link，不填默认为link
            dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空,
            success : function(){
                // 用户确认分享后执行的回调函数
            }      
        };
        this.initWechatConfig(shareContent,config);
    };

    initWechatConfig(share,config) {
        wx.config({
            appId    : config.appId,
            timestamp: config.timestamp,
            nonceStr : config.nonceStr,
            signature: config.signature,
            jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
        });

        wx.error(function(res) {
            // layer.open({
            //     content: '微信初始化信息验证失败',
            //     time   : 2
            // });
        });

        wx.ready(function() {
            // 分享到朋友圈
            wx.onMenuShareTimeline(share);
            // 分享给朋友
            wx.onMenuShareAppMessage(share);
            // 分享到QQ
            wx.onMenuShareQQ(share);
            //分享到QQ空间
            wx.onMenuShareWeibo(share);
        });
    }

    touchHandle(){
       this.setState({display:'none'});
    }

    render(){
        return (
            <div className="share-wrapper" style={{display:this.state.display}} onClick={this.touchHandle}>
                <div className="content">
                    <p>{this.state.content}</p>             
                </div>
            </div>
        )
    }
}

export default Share;