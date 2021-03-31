
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
        call && (call())
        // let httpMgr = HttpMgr.getInstance();
        // let uuid = LLWUtils.getUUID();
        // let err = (err) => {
        //     console.log('log err' + err);
        // }
        // httpMgr.loginWeb(uuid, '', '', call, err);
    }
}
