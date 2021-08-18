
import { pb } from "../../../protos/proto";
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

    login(call, uid?) {
        let uuid = uid || LLWUtils.getUUID();
        let loginInfo = {
            account: uuid,
            type: pb.LoginType.WebTest,
            from: pb.AppFrom.WeChatMinProgram,
            pwd: ''
        };

        HttpMgr.getInstance().loginWeb(uuid, loginInfo, call, () => {
            console.log('onLoginCodeHttpRequest err');
            call && call();
        })

    }

    chooseImage() {
        console.log('webSDK is chooseImage null');
    }
}
