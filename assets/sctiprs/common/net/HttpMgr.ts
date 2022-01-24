
import HttpUtils from "./HttpUtils";
import { pb } from "../../../protos/proto";
import LLWConfig from "../config/LLWConfig";

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

        let url = LLWConfig.LoginURL + '/l';

        data.websocket = true
        let CmdLogin = pb.CmdLogin;
        let message = CmdLogin.create(data);
        let buff1 = CmdLogin.encode(message).finish();

        buff1 = buff1.buffer.slice(buff1.byteOffset, buff1.byteLength + buff1.byteOffset);

        HttpUtils.sendXHRAB(url, buff1, (buff) => {

            let CmdLoginReply = pb.CmdLoginReply;
            let decoded = CmdLoginReply.decode(new Uint8Array(buff));

            if (decoded) {
                call && (call(decoded));
            }

        }, err);
    }

    getGPData(info, call?) {
        let url = 'https://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';

        HttpUtils.sendRequest(url, info, (res) => {
            res = res.replace('(', '');
            res = res.replace(')', '');

            res = JSON.parse(res);
            console.log('data.length + :' + JSON.stringify(res));
            let data = [];
            res.data.forEach(el => {
                let arr = el.split(',');
                let da = {
                    timestamp: arr[0],
                    open: parseFloat(arr[1]),
                    price: parseFloat(arr[2]),
                    close: parseFloat(arr[2]),
                    high: parseFloat(arr[3]),
                    low: parseFloat(arr[4]),
                    amount: parseInt(arr[5]),
                    volume: parseInt(arr[6]),
                }
                data.push(da);
            });

            console.log('data.length + :' + JSON.stringify(data));

            call && call(data);

        })

    }

}
