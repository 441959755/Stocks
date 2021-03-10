import PlatDefine from "../define/PlatDefine"

var CHANNELID = "weixin.wzgdmj";
var VERSION = 100001;
var GAMEID = 32005;
var PLATTYPE = PlatDefine.PLAT_WEB;
var LOGINWS = "wss://xiaoyouxi.game.i66wan.com/feixingqi_ios";
var ADVISIBLE = true; //广告开关: true-展示,false-隐藏
var LogSwitch = false; //日志开关: true-显示, false-隐藏
var Engine = PlatDefine.ENGINE_COCOS; //引擎: cocos layabox
var NaviSwitch = true; //跳转开关: true-展示,false-隐藏
var Orientation = PlatDefine.LANDSCAPE; //屏幕方向
var ShareSwitch = true; //分享开关:true-显示分享按钮,false-隐藏
export default class LLWConfig {
    static get CHANNELID() {
        return CHANNELID;
    }
    static get VERSION() {
        return VERSION;
    }
    static get GAMEID() {
        return GAMEID;
    }
    static get PLATTYPE() {
        return PLATTYPE;
    }
    static get LOGINWS() {
        return LOGINWS;
    }
    static get ADVISIBLE() {
        return ADVISIBLE;
    }
    static get LogSwitch() {
        return LogSwitch;
    }
    static get Engine() {
        return Engine;
    }
    static get Orientation() {
        return Orientation;
    }
    static get ShareSwitch() {
        return ShareSwitch;
    }
}