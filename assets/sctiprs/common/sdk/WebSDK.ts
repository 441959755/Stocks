
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
            account: uuid,
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
