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
                start = start + name.length + 1
                end = document.cookie.indexOf(";", start)
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(start, end))
            }
        }
        return ""
    },

}
export default common;
