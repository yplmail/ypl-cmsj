;(function (window, document) {
    var setFontSize = function () {
        var clientWith = window.innerWidth;
        if(clientWith > 414) clientWith = 414;
        var width = clientWith * (window.devicePixelRatio || 1);
        var html = document.querySelector("html");
        html.style.fontSize = (width / 7.5) * (1/window.devicePixelRatio) + 'px';
        var body = document.querySelector("body");
        body.style.height = window.innerHeight + 'px';
    };
    window.addEventListener('load',function(){
        setFontSize();       
    })
    window.addEventListener('resize',function(){
        //setFontSize();
    });
})(window, document)