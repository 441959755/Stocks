import BaseSDK from "./BaseSDK"
import LLWLog from "../utils/LLWLog"
import LLWConfig from "../config/LLWConfig"
import PlatDefine from "../define/PlatDefine"
import BridgeDefine from "../define/BridgeDefine"
import LLWUtils from "../utils/LLWUtils"
import NetworkMgr from "../net/NetWorkMgr"

var className = "LLWBridge";
var platMethod = "gameEvent:andparam:";
export default class IOSSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new IOSSDK();
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
                case BridgeDefine.ONIDFAINFO:
                    self.onIDFAInfo(ret);
                default:
                    break;
            }
        }
    }

    login(callback) {
        this._loginCallback = callback;
        this.doGetIDFA();
        // let utils = new LLWUtils();
        // NetworkMgr.getInstance().loginWeb(utils.getUUID(), "", "", callback);
    }

    doLogin(){
        let utils = new LLWUtils();
        NetworkMgr.getInstance().loginWeb(utils.getUUID(), "", "", this._loginCallback);
    }

    doGetIDFA(){
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(className);
            bridge.call(platMethod, BridgeDefine.DOGETIDFA + "", "");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }

    getIDFA(){
        return this._idfa;
    }

    static muteAll() {
    }
    static soundAll() {
    }
    static dismissSpalsh() {
    }
    static showVideo(id, callback) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            IOSSDK._rewardVideoCallback = callback;
            let bridge = Laya.Browser.window.PlatformClass.createClass(className);
            bridge.call("showRewardVideo");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }

    static showInter() {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            let bridge = Laya.Browser.window.PlatformClass.createClass(className);
            bridge.call("showInteraction");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }

    static showFullScreen(callback) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            IOSSDK._fullscreenCallback = callback;
            let bridge = Laya.Browser.window.PlatformClass.createClass(className);
            bridge.call("showFullScreenVideo");
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }
    static onVideoComplete(ret) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            if (IOSSDK._rewardVideoCallback) {
                IOSSDK._rewardVideoCallback(ret);
            }
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }
    static onFullScreenClose(ret) {
        if (LLWConfig.Engine == PlatDefine.ENGINE_LAYA) {
            if (IOSSDK._fullscreenCallback) {
                IOSSDK._fullscreenCallback(ret);
            }
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

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
            IOSSDK._deviceInfo = device;
            LLWLog.log("ricardo setdeviceinfo " + device);
        } else if (LLWConfig.Engine == PlatDefine.ENGINE_COCOS) {

        }
    }
    onIDFAInfo(idfa) {
        LLWLog.log("ricardo idfa info ", idfa);
        this._idfa = idfa;
        this.doLogin();
    }
}