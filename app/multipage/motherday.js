(function() {
    utils.post({
        url: 'user/wechatShare',
        data: {
            url: location.href.replace(/#.+$/, '')
        },
        success: function(data) {
            initWechat(data.wxConfig);
        }
    })


    function initWechat(config) {
        wx.config({
            //debug    :true,
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

        var share = {
            title : '母亲节丨玩游戏，赢好礼送母亲',
            desc  : '玩游戏赢取母亲节礼物，多款礼物等你领！', 
            link  : location.protocol + '//' + location.hostname + '/multipage/motherday.html',
            imgUrl: location.protocol + '//' + location.hostname + '/images/strawberry_logo.png'
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
    }

})();
