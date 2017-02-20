import 'layer/layer.css';
import layer from 'layer/layer.js';
class ServerRequest {
    constructor(url = window.location.pathname) {
        this.arr = [];
        this.str = '';
        this.data = {};
        this.url = url;
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
        for (let d in this.data) {
            this.arr.push(d + '=' + encodeURIComponent(this.data[d]));
        }
        this.str = this.arr.join("&");
        this.url = this.url + '?' + Date.now();
        if (this.method == 'GET') {
            if (this.str) this.url = this.url + '&' + this.str;
            layer.open({type: 2});
            this.xhr.open(this.method, this.url, this.async);
            this.xhr.send(null);
        } else {
            this._timeout(this.xhr);
            this.xhr.open(this.method, this.url, this.async);
            this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.xhr.send(this.str);
        }
    }

    _readystatechange() {
        var self = this;
        this.xhr.onreadystatechange = function() {
            if (self.xhr.readyState == 4) {
                var head = self.xhr.getAllResponseHeaders();
                var response = self.xhr.responseText;
                if (/application\/json/.test(head) || self.params.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                    response = JSON.parse(response);
                }
                layer.closeAll({type: 2});
                if (self.xhr.status == 200) {
                    self._success(response);
                } else {
                    self._fail(self.xhr.statusText);
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

    _success(result) {
        this.success(result, this.xhr);
    }

    _fail(msg) {
        this.error(msg, this.xhr);
    }
}

export default ServerRequest;
