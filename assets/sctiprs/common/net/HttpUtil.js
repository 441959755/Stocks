export default class HttpUtils {

    httpUtilGet(url, response, error, process, timeout = null) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {

            var XMLHttpReq = xhr;
            if (XMLHttpReq.readyState == 4 && (XMLHttpReq.status >= 200 && XMLHttpReq.status < 300)) {
                var data = XMLHttpReq.responseText;
                var json = JSON.parse(data);
                if (response) {
                    response(data);
                }
            }
        };
        xhr.timeout = 5000; // 超时时间，单位是毫秒
        xhr.ontimeout = function(e){
            console.log("ricardo timeout", e);
            if(timeout){
                timeout();
            }
        };
        xhr.send(null);
    }

    httpUtilPost(url, params, response, error, process, timeout = null) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {

            var XMLHttpReq = xhr;
            if (XMLHttpReq.readyState == 4 && (XMLHttpReq.status >= 200 && XMLHttpReq.status < 300)) {
                var data = XMLHttpReq.responseText;
                var json = JSON.parse(data);
                if (response) {
                    response(data);
                }
            }
        };
        xhr.timeout = 5000; // 超时时间，单位是毫秒
        xhr.ontimeout = function(e){
            if(timeout){
                timeout();
            }
        };
        xhr.send(params);
    }

    httpUtilPostJson(url, json, response, error, process, timeout = null) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {

            var XMLHttpReq = xhr;
            if (XMLHttpReq.readyState == 4 && (XMLHttpReq.status >= 200 && XMLHttpReq.status < 300)) {
                var data = XMLHttpReq.responseText;
                var json = JSON.parse(data);
                if (response) {
                    response(data);
                }
            }
        };
        xhr.timeout = 5000; // 超时时间，单位是毫秒
        xhr.ontimeout = function(e){
            if(timeout){
                timeout();
            }
        };
        xhr.send(json);
    }
};