import LLWConfig from "../config/LLWConfig";
import PlatDefine from "../config/PlatDefine";
import WebSDK from "./WebSDK";
import WechatSDK from "./WechatSDK";
import AndroidSDK from './AndroidSDK';
import IOSSDK from "./IOSSDK";

export default class LLWSDK {

    static getSDK() {
        switch (LLWConfig.PLATTYPE) {
            case PlatDefine.PLAT_WEB:
                let webSDK = WebSDK.getInstance();
                return webSDK;
            case PlatDefine.PLAT_WECHAT:
                let wechatSDK = WechatSDK.getInstance();
                return wechatSDK;
            case PlatDefine.PLAT_ANDROID:
                let androidSDK = AndroidSDK.getInstance();
                return androidSDK;
            case PlatDefine.PLAT_IOS:
                let iosSDK = IOSSDK.getInstance();
                return iosSDK;
        }
    }
}