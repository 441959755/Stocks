import LLWConfig from "../config/LLWConfig"
import PlatDefine from "../define/PlatDefine"
import WebSDK from "./WebSDK"
import AndroidSDK from "./AndroidSDK";
import WechatSDK from "./WechatSDK";
import QQSDK from "./QQSDK";
import IOSSDK from "./IOSSDK";
import OppoQGSDK from "./OppoQGSDK";
import BDSDK from "./BDSDK";
import TTSDK from "./TTSDK";
import VivoSDK from "./VivoSDK";
import QTTSDK from "./QTTSDK";
import MiSDK from "./MiSDK";
import H54399SDK from "./H54399SDK";
import WeiliSDK from "./WeiliSDK";

export default class LLWSDK {
    static getSDK() {
        switch (LLWConfig.PLATTYPE) {
            case PlatDefine.PLAT_WEB:
                let webSDK = WebSDK.getInstance();
                return webSDK;
            case PlatDefine.PLAT_WECHAT:
                let wechatSDK = WechatSDK.getInstance();
                return wechatSDK;
            case PlatDefine.PLAT_QQ:
                let qqSDK = QQSDK.getInstance();
                return qqSDK;
            case PlatDefine.PLAT_ANDROID:
                let androidSDK = AndroidSDK.getInstance();
                return androidSDK;
            case PlatDefine.PLAT_IOS:
                let iosSDK = IOSSDK.getInstance();
                return iosSDK;
            case PlatDefine.PLAT_OPPO:
                let oppoSDK = OppoQGSDK.getInstance();
                return oppoSDK;
            case PlatDefine.PLAT_VIVO:
                let vivoSDK = VivoSDK.getInstance();
                return vivoSDK;
            case PlatDefine.PLAT_BD:
                let bdSDK = BDSDK.getInstance();
                return bdSDK;
            case PlatDefine.PLAT_TT:
                let ttSDK = TTSDK.getInstance();
                return ttSDK;
            case PlatDefine.PLAT_QTT:
                let qttSDK = QTTSDK.getInstance();
                return qttSDK;
            case PlatDefine.PLAT_MI:
                let miSDK = MiSDK.getInstance();
                return miSDK;
            case PlatDefine.PLAT_4399:
                let h54399SDK = H54399SDK.getInstance();
                return h54399SDK;
            case PlatDefine.PLAT_WEILI:
                let weiliSDK = WeiliSDK.getInstance();
                return weiliSDK;
            default:
                // let webSDK = WebSDK.getInstance();
                // return webSDK;
        }
    }
}