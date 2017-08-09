import React from 'react';
import ServerRequest from 'server/serverRequest';
import './share.css';

class Share extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display:this.props.display
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({display:nextProps.display});
    }    

    cancelHandle(){
        this.props.handle && this.props.handle();
    }

    render(){
        return (
            <div className="share-wrapper" style={{display:this.state.display}} onClick={this.cancelHandle.bind(this)}>
                <div id="shareLogo" className="content"></div>
            </div>
        )
    }
}

const Wechat = {
    fetchWechatInfo:function(shareData){
        var server = new ServerRequest();
        server.post({
            url :'wechatShare',
            data:{
                url : location.href.replace(/#.+$/, '')
            },
            success:function(result){
               this.initWechat(result.wxConfig,shareData);
            }.bind(this)
        })  
    },

    initWechat:function(config,shareData){
        wx.config({
            //debug    : true,
            appId    : config.appId,
            timestamp: config.timeStamp,
            nonceStr : config.nonceStr,
            signature: config.signature,
            jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
        });

        wx.error(function(res){
            layer.open({
                content: '微信初始化信息验证失败',
                time   : 2
            });
        }.bind(this));  

        let content = {
            title   : shareData.title,  // 分享标题
            desc    : shareData.desc,   // 分享描述
            link    : shareData.link,   // 分享链接
            imgUrl  : shareData.imgUrl,  // 分享图标
            type    : shareData.type,    // 分享类型,music、video或link，不填默认为link
            dataUrl : shareData.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空,
            success : shareData.success
        };

        wx.ready(function() {
            // 分享到朋友圈
            wx.onMenuShareTimeline(content);
            // 分享给朋友
            wx.onMenuShareAppMessage(content);
            // 分享到QQ
            wx.onMenuShareQQ(content);
            //分享到QQ空间
            wx.onMenuShareWeibo(content);
        });
    }
}

export {Share,Wechat};
