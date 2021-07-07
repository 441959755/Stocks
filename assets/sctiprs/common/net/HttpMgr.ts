
import HttpUtils from "./HttpUtils";


export default class HttpMgr {

    static _instance: HttpMgr = null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new HttpMgr();
        }
        return this._instance;
    }

    append(url, key, value) {
        url = url + '&' + key + '=' + value;
        return url;
    }


    loginWeb(openId, data, call, err) {
        // let url = 'http://192.168.100.198:80/l';
        //let url = 'http://121.9.210.218:8080/l';
        let url = 'http://test.chaogugame.com/l';

        let buff1 = PB.onCmdLoginConvertToBuff(data);

        buff1 = buff1.buffer.slice(buff1.byteOffset, buff1.byteLength + buff1.byteOffset);


        HttpUtils.sendXHRAB(url, buff1, (buff) => {
            // console.log(buff);

            // let decoded = buff.split(',');
            // let addr = decoded[4].slice(0, decoded[4].length - 1);
            // let t = addr.indexOf(':')
            // addr = addr.slice(t + 1);
            // let info = {
            //     uid: parseInt(decoded[2].split(':')[1]),
            //     token: (decoded[3].split(':')[1]).replace(/"/g, ''),
            //     gameAddr: addr.replace(/"/g, ''),
            // }
            // console.log(info);
            //  if (window.wx) {

            // let stringToUint8Array = function (str) {
            //     var arr = [];
            //     for (var i = 0, j = str.length; i < j; ++i) {
            //         arr.push(str.charCodeAt(i));
            //     }

            //     var tmpUint8Array = new Uint8Array(arr);
            //     return tmpUint8Array
            // }

            // let arr = stringToUint8Array(buff);
            // console.log(arr);
            // decoded = JSON.stringify(buff);
            // decoded = JSON.parse(decoded);

            //  decoded = PB.onCmdLoginConvertToData(arr);
            // } else {
            let decoded = PB.onCmdLoginConvertToData(buff);
            // }
            console.log(decoded);
            if (decoded) {
                call && (call(decoded));
            }

        }, err);
    }

    // items = [{ "opId": "Ask", "kOffset": 105, "volume": "1" },
    // { "opId": "Bid", "kOffset": 106, "volume": "1" },
    // { "opId": "Long", "kOffset": 106, "volume": "1" },
    // { "opId": "Short", "kOffset": 107, "volume": "1" },
    // { "opId": "Ask", "kOffset": 107, "volume": "1" },
    // { "opId": "Bid", "kOffset": 108, "volume": "1" },
    // { "opId": "Long", "kOffset": 108, "volume": "1" },
    // { "opId": "Short", "kOffset": 109, "volume": "1" },
    // { "opId": "Ask", "kOffset": 109, "volume": "1" },
    // { "opId": "Bid", "kOffset": 110, "volume": "1" },
    // { "opId": "Long", "kOffset": 110, "volume": "1" },
    // { "opId": "Short", "kOffset": 111, "volume": "1" },
    // { "opId": "Ask", "kOffset": 111, "volume": "1" },
    // { "opId": "Bid", "kOffset": 112, "volume": "1" },
    // { "opId": "Long", "kOffset": 112, "volume": "1" },
    // { "opId": "Short", "kOffset": 113, "volume": "1" },
    // { "opId": "Ask", "kOffset": 113, "volume": "1" },
    // { "opId": "Bid", "kOffset": 114, "volume": "1" },
    // { "opId": "Long", "kOffset": 114, "volume": "1" },
    // { "opId": "Short", "kOffset": 115, "volume": "1" }]
}
