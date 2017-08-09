(function() {
    var wrapper = document.querySelector('.wrapper');
    wrapper.style.minHeight = window.innerHeight + 'px';

    if (utils.isMT() == 'ios') {
        location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuncao.adv.cmsj";
    }else{
        utils.post({
            url: 'config/app/version',
            success: function(data) {
                if (utils.isMT() == 'android') {
                    $(".download-android").css('display', 'block').attr('data-href', data.android.downloadUrl);
                    if (data.android.status == "1") {
                        var androidstr = data.android.releaseTime ? data.android.releaseTime.substr(0, 10) : '';
                        var androidUpdateInfo = 'V' + data.android.version + '版本   ' + androidstr.replace(/-/g, '/');
                        $(".android-version").text(androidUpdateInfo);
                    } else {
                        $(".android-version").text('正在提交审核...');
                        $(".android-version").css({ 'color': '#999' });
                        $(".download-android").css({
                            backgroundImage: 'url(./images/download_android_gray.png)',
                            borderColor: '#999'
                        })
                    }
                }else if(utils.isMT() == 'ios'){
                    $(".download-ios").css('display', 'block').attr('data-href', data.ios.downloadUrl);
                    if (data.ios.status == "1") {
                        var iosstr = data.ios.releaseTime ? data.ios.releaseTime.substr(0, 10) : '';
                        var iosUpdateInfo = 'V' + data.ios.version + '版本   ' + iosstr.replace(/-/g, '/');
                        $(".ios-version").text(iosUpdateInfo);
                    } else {
                        $(".ios-version").text('正在提交审核...');
                        $(".ios-version").css({ 'color': '#999' });
                        $(".download-ios").css({
                            backgroundImage: 'url(./images/download_ios_gray.png)',
                            borderColor: '#999'
                        })
                    }           
                }else{
                    $(".download-android").css('display', 'block').attr('data-href', data.android.downloadUrl);
                    if (data.android.status == "1") {
                        var androidstr = data.android.releaseTime ? data.android.releaseTime.substr(0, 10) : '';
                        var androidUpdateInfo = 'V' + data.android.version + '版本   ' + androidstr.replace(/-/g, '/');
                        $(".android-version").text(androidUpdateInfo);
                    } else {
                        $(".android-version").text('正在提交审核...');
                        $(".android-version").css({ 'color': '#999' });
                        $(".download-android").css({
                            backgroundImage: 'url(./images/download_android_gray.png)',
                            borderColor: '#999'
                        })
                    }

                    $(".download-ios").css('display', 'block').attr('data-href', data.ios.downloadUrl);
                    if (data.ios.status == "1") {
                        var iosstr = data.ios.releaseTime ? data.ios.releaseTime.substr(0, 10) : '';
                        var iosUpdateInfo = 'V' + data.ios.version + '版本   ' + iosstr.replace(/-/g, '/');
                        $(".ios-version").text(iosUpdateInfo);
                    } else {
                        $(".ios-version").text('正在提交审核...');
                        $(".ios-version").css({ 'color': '#999' });
                        $(".download-ios").css({
                            backgroundImage: 'url(./images/download_ios_gray.png)',
                            borderColor: '#999'
                        })
                    }  
                }

                if (!utils.iswechat()) {
                    if (utils.isMT() == 'android') {
                        location.href = $(".download-android").data('href');
                    }
                }

                if (!utils.iswechat()) {
                    if (utils.isMT() == 'ios') {
                        location.href = $(".download-ios").data('href');
                    }
                }
            }
        })       
    }   


    $(".download-ios").on('click', function() {
        if (utils.iswechat()) {
            $(".mask").css({ display: 'block' });
        } else {
            location.href = $(".download-ios").data('href');
        }
    })

    $(".download-android").on('click', function() {
        if (utils.iswechat()) {
            $(".mask").css({ display: 'block' });
        } else {
            location.href = $(".download-android").data('href');
        }
    })

    $(".mask").on('click', function() {
        $(".mask").css({ display: 'none' });
    })

    var tk = utils.getcookies('token');
    var shareId = tk ? tk.split("_")[1] : '';
    wechatshare.share({
        title : '下载草莓视频APP', // 分享标题
        desc  : '草莓视频带你一起发现创意美', // 分享描述
        link  : location.protocol + '//' + location.hostname + '/multipage/download.html', // 分享链接
        imgUrl: location.protocol + '//' + location.hostname + '/images/strawberry_logo.png'
    })
})()
