var utils = {
    post: function(obj) {
        if (obj.loadLayer) {
            var index = layer.open({ type: 2 });
        }
        var promise = $.ajax({
            type: 'post',
            cache: false,
            dataType: 'json',
            url: utils.environment() + obj.url,
            data: utils.extends(obj.data),
            success: function(response) {
                if (response.code == 0) {
                    obj.success && obj.success(response.data);
                } else {
                    layer.open({ content: response.msg || '网络有点小情绪', time: 2 });
                }
            },
            error: function(a, b, c) {
                layer.open({ content: '网络有点小情绪', time: 2 });
            },
            complete: function() {
                if (obj.loadLayer) {
                    layer.close(index);
                }
            }
        });
        return promise;
    },

    environment: function() {
        if (location.hostname === "m.springrass.com") {
            return 'https://api.springrass.com/rest/';
        } else if (location.hostname === "prem.springrass.com") {
            return 'https://preapi.springrass.com/rest/';
        } else {
            return 'https://api.tes.springrass.com/rest/';
        }
    },

    extends: function(data) {
        data = data || {};
        var params = {};
        var defaults = {
            app_key: 'channel_wechat_1',
            app_version: '1.0.0',
            api_version: '1.0.0',
            timestamp: new Date().Format("yyyy-MM-dd hh:mm:ss")
        }

        for (var d in data) {
            if (data[d] && data[d] != 'undefined' && data[d] != 'null') {
                params[d] = data[d];
            }
        }

        for (var r in defaults) {
            params[r] = defaults[r];
        }

        if (utils.getcookies('token')) {
            params['token'] = utils.getcookies('token');
        }

        return params;
    },

    iswechat: function() {
        var ua = navigator.userAgent;
        if (/MicroMessenger/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    },

    getsearch: function() {
        var arr = location.search.substring(1).split('&');
        var data = {};
        for (var i = 0; i < arr.length; i++) {
            var pos = arr[i].indexOf('=');
            if (pos === -1) {
                continue;
            }
            data[arr[i].substring(0, pos)] = decodeURIComponent(arr[i].substring(pos + 1));
        }
        return data;
    },

    joinImageUrl: function(url) {
        if (url) {
            if (/^http:\/\//.test(url) || /^https:\/\//.test(url)) {
                return url;
            } else {
                if (location.hostname === "m.springrass.com") {
                    return 'http://file.springrass.com' + url;
                } else {
                    return 'http://prefile.springrass.com' + url;
                }
            }
        } else {
            return './images/person_header.png'
        }

    },

    domain: function() {
        return location.protocol + '//' + location.host + '/'
    },

    remRatio: function() {
        var width = Math.min(window.innerWidth, 414);
        return width / 7.5;
    },

    setcookies: function(name, value, expiredays) {
        var d = new Date()
        d.setDate(d.getDate() + expiredays)
        document.cookie = name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + d.toGMTString()) + ";path=/";
    },

    getcookies: function(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=")
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(start, end))
            }
        }
        return ""
    },

    isMT: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/android/i) == "android") {
            return 'android';
        } else if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {
            return 'ios'
        } else {
            return 'other'
        }
    },

    transformThousand: function(n) {
        if (isNaN(n)) {
            return n;
        } else {
            var num = n * 　1;
            if (num < 10000) {
                return num;
            } else {
                return (num / 10000) + '万';
            }
        }
    },

    getDateDiff: function (str){
        str = str ? str.replace(/-/g, '/') : '';
        if (!str) return '';
        var now = Date.now();
        var timeStamp = new Date(str).getTime();
        var diffValue = now - timeStamp;
        if (diffValue < 0) return ''
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var half = day * 15;
        var month = day * 30;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            return parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            return parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return parseInt(minC) + "分钟前";
        } else {
            return '刚刚'
        }
    }
}
