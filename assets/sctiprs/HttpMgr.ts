
export default {

    sendRequest : function(path, data, handler,err?){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var str = "?";
        for(var k in data){
            if(str != "?"){
                str += "&";
            }
            str += k + "=" + data[k];
        }
 
       // var requestURL = path + encodeURI(str).replace(/\+/g,"%2B");
        var requestURL=path+encodeURI(str);
        console.log("RequestURL:" + requestURL);
        xhr.open("GET", requestURL, true);
 
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if(handler !== null){
                        handler(ret);
                    }
                } catch (e) {
                    console.log("err:" + e);
                }
                finally{
 
                }
            }
        };

        xhr.ontimeout=function(ret){
            err&&(err(ret))
        }

        xhr.onerror=function(ret){
            err&&(err(ret));
        }
 
        xhr.send();
        return xhr;
    },
}
