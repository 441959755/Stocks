import NetWorkMgr from "../net/NetWorkMgr"
import Utils from "../utils/LLWUtils"
import BaseSDK from "./BaseSDK"
export default class WebSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new WebSDK();
        }
        return this._instance;
    }
    init() {
    }
    login(callback) {
        let netWorkMgr = new NetWorkMgr();
        let utils = new Utils();
        let uuid = utils.getUUID();
        netWorkMgr.loginWeb(uuid, "", "", callback);
    }
    showVideo(id, callback, pos){
        callback(1);
    }
}