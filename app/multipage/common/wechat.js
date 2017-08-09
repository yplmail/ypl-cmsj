var wechatshare = {
    init: function() {
        utils.post({
            url: 'user/wechatShare',
            data: {
                url: location.href.replace(/#.+$/, '')
            },
            success: function(data) {
                var config = data.wxConfig;
                wx.config({
                    appId: config.appId,
                    timestamp: config.timeStamp,
                    nonceStr: config.nonceStr,
                    signature: config.signature,
                    jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
                });
                wx.error(function(res) {
                    layer.open({
                        content: '微信初始化信息验证失败',
                        time: 2
                    });
                }.bind(this));
            }
        })
    },

    share: function(share) {
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
}

wechatshare.init();
