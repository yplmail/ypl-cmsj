;
(function(window, document) {
    var setFontSize = function() {
        var clientWith = window.innerWidth;
        if (clientWith > 414) clientWith = 414;
        var width = clientWith * (window.devicePixelRatio || 1);
        var html = document.querySelector("html");
        html.style.fontSize = (width / 7.5) * (1 / window.devicePixelRatio) + 'px';
        var body = document.querySelector("body");
        body.style.minHeight = window.innerHeight + 'px';
        body.style.minWidth = window.innerWidth + 'px';
    };
    window.addEventListener('load', function() {
        setFontSize();
    })
    window.addEventListener('resize', function() {
        //setFontSize();
    });

    Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
})(window, document)
