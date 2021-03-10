import BaseSDK from "./BaseSDK"
import PlatDefine from "../define/PlatDefine"
import BridgeDefine from "../define/BridgeDefine"
import LLWLog from "../utils/LLWLog"
import LLWUtils from "../utils/LLWUtils"
import NetworkMgr from "../net/NetworkMgr";
import LLWConfig from "../config/LLWConfig";

var classNameLaya = "demo.MainActivity";
var classNameCocos = "com/liuliuwan/gamebridge/LLWBridge";
var platMethod = "gameEvent";

export default class AndroidSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new AndroidSDK();
        }
        return this._instance;
    }

    init() {
        let self = this;
        window.onGameEvent = function (method, ret) {
            LLWLog.log("ricardo window onGameEvent ", method, ret);
            switch (method) {
                case BridgeDefine.ONVIDEORET:
                self.onVideoRet(ret);
                    break;
                case BridgeDefine.ONFULLSCREENRET:
                self.onFullScreenRet(ret);
                    break;
                case BridgeDefine.ONNETCHANGE:
                self.onNetStateChange(ret);
                    break;
                case BridgeDefine.ONDEVICEINFO:
                self.onDeviceInfo(ret);
                    break;
                default:
                    break;
            }
        }
    }

    login(callback) {
        // this.init();
        let utils = new LLWUtils();
        NetworkMgr.getInstance().loginWeb(utils.getUUID(), "", "", callback);
    }

    muteAll() {
    }
    soundAll() {
    }
    gameReady() {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOGAMEREADY, "");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(ILjava/lang/String;)V", BridgeDefine.DOGAMEREADY, "");
        }
    }
    showVideo(id, callback, pos) {
        this._videoCallback = callback;
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOSHOWVIDEO, "");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(I)V", BridgeDefine.DOSHOWVIDEO);
        }
    }
    showBanner(id) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOSHOWBANNER);
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(I)V", BridgeDefine.DOSHOWBANNER);
        }
    }

    showInter(id) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOSHOWINTER);
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(ILjava/lang/String;)V", BridgeDefine.DOSHOWINTER, "");
        }
    }

    hideBanner() {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOHIDEBANNER);
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(I)V", BridgeDefine.DOHIDEBANNER);
        }
    }
    showFullScreen(id) {
        this._fullscreenCallback = callback;
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOSHOWFULLSCREEN, "");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(ILjava/lang/String;)V", BridgeDefine.DOSHOWFULLSCREEN, "");
        }
    }
    doPay(params) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(classNameLaya);
            bridge.call(platMethod, BridgeDefine.DOPAY, params);
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {
            jsb.reflection.callStaticMethod(classNameCocos, platMethod,
                "(ILjava/lang/String;)V", BridgeDefine.DOPAY, "");
        }
    }
    onVideoRet(ret) {
        LLWLog.log("ricardo onvideocomplete", ret);
        if (this._videoCallback) {
            this._videoCallback(ret);
        }
    }
    onFullScreenRet(ret) {
        LLWLog.log("ricardo onFullScreenRet", ret);
        if (this._fullscreenCallback) {
            this._fullscreenCallback(ret);
        }
    }

    /**
     * 
     * @param ret 0-无网络 1-有网络
     */
    onNetStateChange(ret) {
        LLWLog.log("ricardo onNetStateChange", ret);
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            if (ret == 0) {
                LLWLog.log("ricardo networkbroken");
            } else {
                LLWLog.log("ricardo  networkconnected");
            }
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }
    onDeviceInfo(device) {
        LLWLog.log("ricardo onDeviceInfo", device);
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            AndroidSDK._deviceInfo = device;
            LLWLog.log("ricardo setdeviceinfo " + device);
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }
}