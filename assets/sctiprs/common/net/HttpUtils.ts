

export default {

    sendRequest: function (path, data, handler, err?) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var str = "?";
        for (var k in data) {
            if (str != "?") {
                str += "&";
            }
            str += k + "=" + data[k];
        }

        // var requestURL = path + encodeURI(str).replace(/\+/g,"%2B");
        var requestURL = path + encodeURI(str);
        console.log("RequestURL:" + requestURL);
        xhr.open("GET", requestURL, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    //  var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(xhr.responseText);
                    }
                } catch (e) {
                    console.log("err:" + e);
                }
                finally {

                }
            }
        };

        xhr.ontimeout = function (ret) {

            err && (err(ret))
        }

        xhr.onerror = function (ret) {

            err && (err(ret));
        }

        xhr.send();
        return xhr;
    },

    sendXHRAB(url, data, handle, err?) {
        var xhr = cc.loader.getXMLHttpRequest();

        // xhr.overrideMimeType("text/plain; charset=x-user-defined");
        // xhr.responseType = "arraybuffer";

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200) {
                handle && handle(xhr.response);
            }
            else if (xhr.status === 404) {
                console.log("404 page not found!");
                //  err && err("404 page not found!");
            }
            else if (xhr.readyState === 3) {
                console.log("Request dealing!");
                // err && err("Request dealing!");
            }
            else if (xhr.readyState === 2) {

                console.log("Request received! ");
                //  err && err("Request received!");
            }
            else if (xhr.readyState === 1) {
                console.log("Server connection established! Request hasn't been received");
                //  err && err("Server connection established! Request hasn't been received");
            }
            else if (xhr.readyState === 0) {
                console.log("Request hasn't been initiated!");
                //  err && err("Request hasn't been initiated!");
            }
        }

        xhr.open('POST', url, true);
        //  xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("Content-Type", "application/x-protobuf");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        //   if (window.wx) {
        // xhr.responseType = 'text';
        // } else {
        xhr.responseType = "arraybuffer";
        // }

        //console.log(data);
        xhr.send(data);
    },


    loadRequest: function (path, data, handler, err?) {
        
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;

        console.log("RequestURL:" + path);

        xhr.open("GET", path, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    //  var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(xhr.responseText);
                    }
                } catch (e) {
                    console.log("err:" + e);
                }
                finally {

                }
            }
        };

        xhr.ontimeout = function (ret) {
            //  
            err && (err(ret))
        }

        xhr.onerror = function (ret) {
            //  GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            err && (err(ret));
        }

        xhr.send();
        return xhr;
    },

    loadRequest1: function (path, data, handler, err?) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;

        console.log("RequestURL:" + path);

        xhr.open("GET", path, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    //  var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(xhr.responseText);
                    }
                } catch (e) {
                    console.log("err:" + e);
                }
                finally {

                }
            }
        };

        xhr.ontimeout = function (ret) {
            //  
            err && (err(ret))
        }

        xhr.onerror = function (ret) {
            //  GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            err && (err(ret));
        }

        xhr.setRequestHeader("Content-Type", "application/x-protobuf");
        xhr.responseType = "arraybuffer";
        xhr.send();
        return xhr;
    },

    toDataURL(buf, callback) {
        // var xhr = new XMLHttpRequest();
        // xhr.onload = function () {
        //     var reader = new FileReader();
        //     reader.onloadend = function () {
        //         callback(reader.result);
        //     }
        //     reader.readAsDataURL(xhr.response);
        // };
        // xhr.open('GET', url);
        // xhr.responseType = 'blob';
        // xhr.send();

        // let getBase64Image = (img) => {
        //     var canvas = document.createElement("canvas");
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     var ctx = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0, img.width, img.height);
        //     var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        //     var dataURL = canvas.toDataURL("image/" + ext);
        //     return dataURL;
        // }


        // let dataURLtoBlob = (dataurl) => {
        //     var arr = dataurl.split(','),
        //         mime = arr[0].match(/:(.*?);/)[1],
        //         bstr = atob(arr[1]),
        //         n = bstr.length,
        //         u8arr = new Uint8Array(n);
        //     while (n--) {
        //         u8arr[n] = bstr.charCodeAt(n);
        //     }
        //     return new Blob([u8arr], {
        //         type: mime
        //     });
        // }




        // var img = url;
        // var image = new Image();
        // image.src = img;
        // image.onload = function () {
        //     //这样就获取到了文件的Base64字符串
        //     var base64 = getBase64Image(image);
        //     //Base64字符串转二进制
        //     var file = dataURLtoBlob(base64);

        //     callback && (callback(file));

        // }

    }

}
