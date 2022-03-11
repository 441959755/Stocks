
import { pb } from "../../../protos/proto";
import LLWConfig from "../config/LLWConfig";
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
        let a = Math.random() * 10;
        let uuid = '1314713188' + a;

        let loginInfo = {
            account: uuid,
            //  type: pb.LoginType.MobilePhoneId,
            type: pb.LoginType.AppTest,
            // from: LLWConfig.FROM,
            pwd: '123456'
        };

        HttpMgr.getInstance().loginWeb(uuid, loginInfo, call, () => {
            console.log('onLoginCodeHttpRequest err');
        })

    }

    chooseImage() {
        console.log('webSDK is chooseImage null');
    }

    copyborad(str) {
        let input = str;
        const el = document.createElement('textarea');
        el.value = input;
        el.setAttribute('readonly', '');
        el.style.contain = 'strict';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '12pt';

        const selection = getSelection();
        let originalRange = false;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = input.length;

        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) { }

        document.body.removeChild(el);

        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }

        return success;
    }

    shareAppMessage() {
        console.log('shareAppMessage');
    }

    onShareAppMessage() {
        console.log('onShareAppMessage');
    }

    showVideoAd(call) {
        call && (call(1));
    }

    onShow() {

    }

}
