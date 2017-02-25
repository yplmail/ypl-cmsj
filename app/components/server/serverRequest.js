import 'layer/layer.css';
import layer from 'layer/layer.js';
import ENVIRONMENT from '../../config/config.js'
import API from '../../config/api.js'


class ServerRequest {
    constructor() {
        this.arr = [];
        this.str = '';
        this.data = {};
        this.domain = ENVIRONMENT[process.env.NODE_ENV];
        this.url = '';
        this.async = true;
        this.dataType = 'json';
        this.timeout = 3000;
        this.xhr = new XMLHttpRequest();
        this.success = function() {};
        this.error = function() {};
        this._readystatechange();
    }

    post(data) {
        for (let r in data) {
            this[r] = data[r]
        }
        this.method = 'POST';
        this._request();
    }

    get(data) {
        for (let r in data) {
            this[r] = data[r]
        }
        this.method = 'GET';
        this._request();
    }

    _request() {
        Object.assign(this.data, this._getDefaultData());

        for (let d in this.data) {
            this.arr.push(d + '=' + encodeURIComponent(this.data[d]));
        }

        this.str = this.arr.join("&");

        if(this.mock){
            this.url = this.url + '?' + Date.now();       
        }else{
            this.url = this.domain + API[this.url] + '?' + Date.now();            
        }

        if (this.method == 'GET') {
            if (this.str) this.url = this.url + '&' + this.str;
            //layer.open({type: 2});
            this.xhr.open(this.method, this.url, this.async);
            this.xhr.send(null);
        } else {
            this._timeout(this.xhr)
            this.xhr.open(this.method, this.url, this.async);
            this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.xhr.send(this.str);
        }
    }

    _readystatechange() {
        let self = this;
        this.xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                var head = this.getAllResponseHeaders();
                var response = this.responseText;
                if (/application\/json/.test(head) || self.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                    response = JSON.parse(response);
                }
                //layer.closeAll({type: 2});
                if (this.status == 200) {
                    if(response.code == 0){
                        self._success(response.data);                                
                    }else{
                        self._fail(response.msg);
                    }
                } else {
                    self._fail(this.statusText);
                }
            }
        }
    }

    _timeout() {
        var self = this;
        if ('timeout' in this.xhr) {
            this.xhr.timeout = this.timeout;
            this.xhr.ontimeout = function() {
                self._fial('请求超时...');
            }
        } else {
            var timer = setTimeout(function() {
                self.xhr.abort();
                self._fial('请求超时...');
                clearTimeout(timer);
            }, this.timeout);
        }
    }

    _getDefaultData(){
       return{
            app_key     : 'channel_wechat_1',
            app_version : '1.0.0',
            api_version : '1.0.0',
            timestamp   : new Date().Format("yyyy-MM-dd hh:mm:ss")       
       }
    }

    _success(result) {
        this.success(result, this.xhr);
    }

    _fail(msg) {
        this.error(msg, this.xhr);
    }
}

export default ServerRequest;
