import React from 'react';
import ServerRequest from 'server/serverRequest';
import './share.css';

class Share extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display :'none',
            content : '请点击右上角将本链接发送给指定朋友或分享到朋友圈等',
        }
        this.config = {};
        this.touchHandle = this.touchHandle.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            display : props.display || 'none',
            content : props.content || '请点击右上角将本链接发送给指定朋友或分享到朋友圈等'
        });
        props.link && this.share(props);
    }

    share(data) {
        let share = {
            title   : data.title,  // 分享标题
            desc    : data.desc,   // 分享描述
            link    : data.link,   // 分享链接
            imgUrl  : data.imgUrl,  // 分享图标
            type    : data.type,    // 分享类型,music、video或link，不填默认为link
            dataUrl : data.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空,
            success : data.success,
            cancel  : function(){
                 this.setState({display:'none'});
            }.bind(this)
        };
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
    };

    componentDidMount(){
        var server = new ServerRequest();
        server.post({
            url :'wechatShare',
            data:{
                url : location.href.replace(/#.+$/, '')
            },
            success:function(result){
               this.initConfig(result.wxConfig);
            }.bind(this)
        })
    }    

    initConfig(config) {
        wx.config({
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
