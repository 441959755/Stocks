import LLWConfig from "../config/LLWConfig";
import PlatDefine from "../config/PlatDefine";
import WebSDK from "./WebSDK";
import WechatSDK from "./WechatSDK";

export default  class LLWSDK{
    static getSDK(){
        switch(LLWConfig.PLATTYPE){
            case PlatDefine.PLAT_WEB:
                let webSDK=WebSDK.getInstance();
                return webSDK;
            case PlatDefine.PLAT_WECHAT:
                let wechatSDK=WechatSDK.getInstance();
                return wechatSDK;
        }
    }
}