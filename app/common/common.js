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
            ((expiredays == null) ? "" : ";expires=" + d.toGMTString())
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

    getTime : (str) => {
        let d2 = new Date(str).getTime();
        let timestap = Date.now() - d2;
        let m = timestap/1000 /60
        return '今天';
    } 

}
export default common;
