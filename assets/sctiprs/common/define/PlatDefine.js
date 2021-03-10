// 渠道
var PLAT_WEB = 1;
var PLAT_WECHAT = 2;
var PLAT_QQ = 3;
var PLAT_ANDROID = 4;
var PLAT_IOS = 5;
var PLAT_OPPO = 6;
var PLAT_VIVO = 7;
var PLAT_BD = 8;
var PLAT_TT = 9;
var PLAT_QTT = 10;
var PLAT_MI = 11;
var PLAT_4399 = 12;
var PLAT_WEILI = 13;

// 引擎
var ENGINE_COCOS = 1;
var ENGINE_LAYA = 2;

//游戏横竖屏设置
var LANDSCAPE = "landscape";//横屏
var PORTRAIT = "portrait";//竖屏
export default class PlatDefine {
    // 渠道
    static get PLAT_WEB() { return PLAT_WEB; }
    static get PLAT_WECHAT() { return PLAT_WECHAT; }
    static get PLAT_QQ() { return PLAT_QQ; }
    static get PLAT_ANDROID() { return PLAT_ANDROID; }
    static get PLAT_IOS() { return PLAT_IOS; }
    static get PLAT_OPPO() { return PLAT_OPPO; }
    static get PLAT_VIVO() { return PLAT_VIVO; }
    static get PLAT_BD() { return PLAT_BD; }
    static get PLAT_TT() { return PLAT_TT; }
    static get PLAT_QTT() { return PLAT_QTT; }
    static get PLAT_MI() { return PLAT_MI; }
    static get PLAT_4399() { return PLAT_4399; }
    static get PLAT_WEILI() { return PLAT_WEILI; }

    // 引擎
    static get ENGINE_COCOS() { return ENGINE_COCOS; }
    static get ENGINE_LAYA() { return ENGINE_LAYA; }

    static get LANDSCAPE() { return LANDSCAPE; }
    static get PORTRAIT() { return PORTRAIT; }
}