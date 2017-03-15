import React from 'react';
import ServerRequest from 'server/serverRequest';
import './share.css';

class Share extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display :'none',
            title   : '',
            desc    : '',
            link    : '',
            imgUrl  : '',
            type    : '',
            dataUrl : '',  
            success : ''     
        }
        this.cancelHandle = this.cancelHandle.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({...props});
    }

    componentDidUpdate(){
        this.share()
    }

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

    cancelHandle(){
        this.setState({display:'none'});
    }

    initConfig(config) {
        wx.config({
            // debug    : true,
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

    share() {
        let share = {
            title   : this.state.title,  // 分享标题
            desc    : this.state.desc,   // 分享描述
            link    : this.state.link,   // 分享链接
            imgUrl  : this.state.imgUrl,  // 分享图标
            type    : this.state.type,    // 分享类型,music、video或link，不填默认为link
            dataUrl : this.state.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空,
            success : this.state.success || this.cancelHandle,
            cancel  : this.cancelHandle
        };

        // console.log('分享参数：');
        // console.log(share);

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

    render(){
        return (
            <div className="share-wrapper" style={{display:this.state.display}} onClick={this.cancelHandle}>
                <div className="content">
                    <p>请点击右上角将本链接发送给指定朋友或分享到朋友圈等</p>
                </div>
            </div>
        )
    }
}

export default Share;
