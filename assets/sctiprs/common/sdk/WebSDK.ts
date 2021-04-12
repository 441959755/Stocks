
import HttpMgr from "../net/HttpMgr";
import LLWUtils from "../utils/LLWUtils";
import pb from '../../../protos/proto';
export default class WebSDK {

    static _instance = null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new WebSDK();
        }
        return this._instance;
    }

    init() {

    }

    login(call) {

        let httpMgr = HttpMgr.getInstance();
        let uuid = LLWUtils.getUUID();

        let loginInfo = {
            account: '021OBl000AFyvL1wE4300Yw4Hk3OBl0N',
            type: 99,
            from: 8888,
            pwd: ''
        };

        console.log('loginInfo' + loginInfo);

        let data = PB.onCmdLoginConvertToBuff(loginInfo);

        console.log(data);

        HttpMgr.getInstance().loginWeb(uuid, data, call, () => {
            console.log('onLoginCodeHttpRequest err');
            call && call();
        })

    }
}
