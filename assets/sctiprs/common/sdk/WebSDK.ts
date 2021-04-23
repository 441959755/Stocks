
import HttpMgr from "../net/HttpMgr";
import LLWUtils from "../utils/LLWUtils";

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


        let uuid = LLWUtils.getUUID();

        let loginInfo = {
            account: '021OBl000AFyvL1wE4300Yw4111OBl0N',
            type: 99,
            from: 8888,
            pwd: ''
        };

        HttpMgr.getInstance().loginWeb(uuid, loginInfo, call, () => {
            console.log('onLoginCodeHttpRequest err');
            call && call();
        })

    }
}
