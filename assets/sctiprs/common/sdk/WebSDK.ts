
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
        // let uuid = uid || LLWUtils.getUUID();
        let uuid = 'ooCB-vzwiiiPUPx6SJpZ5sTQJiB0';
        let loginInfo = {
            account: uuid,
            type: pb.LoginType.QQ,
            from: pb.AppFrom.WeChatMinProgram,
            // type: pb.LoginType.WeChat,
            // from: pb.AppFrom.Test,
            pwd: ''
        };

        HttpMgr.getInstance().loginWeb(uuid, loginInfo, call, () => {
            console.log('onLoginCodeHttpRequest err');
            // call && call();
        })

    }

    chooseImage() {
        console.log('webSDK is chooseImage null');
    }
}
