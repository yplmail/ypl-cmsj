import 'layer/layer.css';
import layer from 'layer/layer.js';

function share(content) {
    var shareContent = {
        title   : content.shareTitle, // 分享标题
        desc    : content.shareDesc,  // 分享描述
        link    : content.shareLink,  // 分享链接
        imgUrl  : content.shareImgurl // 分享图标      
        type    : '', // 分享类型,music、video或link，不填默认为link
        dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空,
        success : function(){
        	// 用户确认分享后执行的回调函数
        }      
    };
    initWechatConfig(shareContent);
};

function initWechatConfig(content) {
    wx.config({
        appId    : result.appid,
        timestamp: result.timestamp,
        nonceStr : result.nonceStr,
        signature: result.signature,
        jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
    });

    wx.error(function(res) {
        layer.open({
            content: '微信初始化信息验证失败'
        });
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

function getChannel() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "wechat";
    } else {
        return "wap";
    }
}

