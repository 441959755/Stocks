
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
        let url = 'http://192.168.100.198:80/l';

        HttpUtils.sendXHRAB(url, data, (buff) => {
            console.log(buff);

            let decoded = PB.onCmdLoginConvertToData(buff);

            if (decoded) {
                call && (call(decoded));
            }

        }, err);
    }


}
