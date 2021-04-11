
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
            account: '021RtIll2SnIO64FcTml2S3ssO1RtIl-',
            type: 2,
            from: 8888,
            pwd: ''
        };
        HttpMgr.getInstance().loginWeb(uuid, loginInfo, call, () => {
            console.log('onLoginCodeHttpRequest err');
            call && call();
        })

    }
}
