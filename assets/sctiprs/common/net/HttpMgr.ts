
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
        //let url = 'http://192.168.100.198:80/l';
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

    getGPData(info, call?) {
        let url = 'http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';

        HttpUtils.sendRequest(url, info, (res) => {
            res = res.replace('(', '');
            res = res.replace(')', '');

            res = JSON.parse(res);
            let data = [];
            res.data.forEach(el => {
                let arr = el.split(',');
                let da = {
                    timestamp: arr[0],
                    open: arr[1],
                    price: arr[2],
                    high: arr[3],
                    low: arr[4],
                    amount: arr[5],
                    volume: arr[6],
                }
                data.push(da);
            });

            console.log(data.length + ':' + JSON.stringify(data));
            call && call(data);

        })
        // let data = [{ timestamp: "2021-07-16", open: "95.00", price: "143.86", high: "156.00", low: "95.00", amount: "212932", volume: "2681778368.00" }, { timestamp: "2021-07-23", open: "140.00", price: "140.49", high: "156.00", low: "134.96", amount: "197252", volume: "2842907904.00" }, { timestamp: "2021-07-30", open: "137.67", price: "179.52", high: "179.52", low: "130.00", amount: "123144", volume: "1847640864.00" }, { timestamp: "2021-08-05", open: "193.01", price: "203.11", high: "206.00", low: "155.01", amount: "132160", volume: "2381050880.00" }];
        // call && call(data);
    }


}
