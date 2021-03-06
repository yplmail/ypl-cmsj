const common = {
    minutes: (ms) => {
        let m = parseInt(ms / (1000 * 60));
        let s = parseInt((ms % (1000 * 60)) / 1000);
        return m + ':' + s;
    },

    setcookies: (name, value, expiredays) => {
        let d = new Date()
        d.setDate(d.getDate() + expiredays)
        document.cookie = name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + d.toGMTString())+";path=/";
    },

    getcookies: (name) => {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + "=")
            if (start != -1) {
                start = start + name.length + 1;
                let end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(start, end))
            }
        }
        return ""
    },

    getsearch(){
        var arr  = location.search.substring(1).split('&');
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

    isWechat: () => {
        var ua = navigator.userAgent;
        if (/MicroMessenger/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    },

    trim: (str) => {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },

    encode: (str) => {
        if (str.length == 0) return "";
        var s = "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    },

    isAndroid: () => {
        var isAndroid = false;
        var ua = navigator.userAgent;
        if (/MicroMessenger/i.test(ua) && /Android/i.test(ua)) {
            isAndroid = true;
        }
        return isAndroid;
    },

    getDateDiff: (str) => {
        str = str ? str.replace(/-/g,'/') : '';
        if(!str) return '';
        let now = Date.now();
        let timeStamp = new Date(str).getTime();
        let diffValue = now - timeStamp;
        if (diffValue < 0) return ''
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let half = day * 15;
        let month = day * 30;
        let monthC = diffValue / month;
        let weekC  = diffValue / (7 * day);
        let dayC   = diffValue / day;
        let hourC  = diffValue / hour;
        let minC   = diffValue / minute;
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
        }else{
            return '刚刚'
        }
    },

    changeTitle : (title) => {
        const iframe = document.createElement('iframe');
        iframe.src = '../favicon.ico';
        document.title = title;
        document.body.appendChild(iframe);
        let timer = setTimeout(() => {
            clearTimeout(timer);
            document.body.removeChild(iframe);
        }, 300);        
    },

    remRatio : () => {
        let width = Math.min(window.innerWidth,414);  
        return width / 7.5;
    },

    joinImageUrl:(url) =>{
        if(!url){
            return require('../images/mine_header_icon.png');
        }else if(/^http:\/\//.test(url) || /^https:\/\//.test(url)){
            return url;
        }else{
            if(process.env.NODE_ENV == 'production'){
                return 'https://file.springrass.com'+url;
            }else{
                return 'https://prefile.springrass.com'+url;
            }                
        }
    }

}
export default common;
