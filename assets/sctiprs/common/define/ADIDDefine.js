import LLWConfig from "../config/LLWConfig"
import PlatDefine from "../define/PlatDefine"

//web广告ID
var ID_WEB_APPID = "";
var ID_WEB_BANNER = "";
var ID_WEB_VIDEO = "";
var ID_WEB_INTER = "";

//微信广告ID
var ID_WECHAT_APPID = "wx2adf93e6ebf289ab";
var ID_WECHAT_BANNER = "adunit-0e137d4dbef230bd";
var ID_WECHAT_VIDEO = "adunit-0ba624ea9ccad0b8";
var ID_WECHAT_INTER = "adunit-a724bb9454ec2207";

//QQ广告ID
var ID_QQ_APPID = "1109686096";
var ID_QQ_BANNER = "4b867d22aaf7b9905e3e118b13b15d5f";
var ID_QQ_VIDEO = "5219aada740266cf70923d6db82e9526";
var ID_QQ_INTER = "";

//Android广告ID
var ID_ANDROID_APPID = "";
var ID_ANDROID_BANNER = "";
var ID_ANDROID_VIDEO = "";
var ID_ANDROID_INTER = "";

//IOS广告ID
var ID_IOS_APPID = "";
var ID_IOS_BANNER = "";
var ID_IOS_VIDEO = "";
var ID_IOS_INTER = "";

//OPPO广告
var ID_OPPO_PACKAGE = "com.liuliuwan.qmslm.nearme.gamecenter";
var ID_OPPO_APPID = "30203041";
var ID_OPPO_BANNER = "125882";
var ID_OPPO_NATIVE = "125885";
var ID_OPPO_VIDEO = "125886";
var ID_OPPO_INSERT = "125883";

//VIVO广告
var ID_VIVO_APPID = "100002419";
var ID_VIVO_BANNER = "b414762e09c94e23abe5cad29a37aa78";
var ID_VIVO_INTER = "d1de716f7acf47918d1d40c7d5892be2";
var ID_VIVO_VIDEO = "078606d658564d9db6f3f4c297c519c7";

//BD广告ID
var ID_BD_APPID = "";
var ID_BD_BANNER = "";
var ID_BD_VIDEO = "";
var ID_BD_INTER = "";

//头条广告ID
var ID_TT_APPID = "tt100266bf8f28fcce";
var ID_TT_BANNER = "99jlk2nmm0k1g8h5ej";
var ID_TT_VIDEO = "8ebhbkgk7eff1fe0hq";
var ID_TT_INTER = "";

//QTT广告ID
var ID_QTT_APPID = "";
var ID_QTT_BANNER = "";
var ID_QTT_VIDEO = "";
var ID_QTT_INTER = "";

//小米广告ID
var ID_MI_APPID = "";
var ID_MI_BANNER = "";
var ID_MI_VIDEO = "";
var ID_MI_INTER = "";

//4399广告ID
var ID_4399_APPID = "";
var ID_4399_BANNER = "";
var ID_4399_VIDEO = "";
var ID_4399_INTER = "";

//微鲤广告ID
var ID_WEILI_APPID = "";
var ID_WEILI_BANNER = "";
var ID_WEILI_VIDEO = "";
var ID_WEILI_INTER = "";

//广告参数
var ID_APPID = [
    ID_WEB_APPID,
    ID_WECHAT_APPID,
    ID_QQ_APPID,
    ID_ANDROID_APPID,
    ID_IOS_APPID,
    ID_OPPO_APPID,
    ID_VIVO_APPID,
    ID_BD_APPID,
    ID_TT_APPID,
    ID_QTT_APPID,
    ID_MI_APPID,
    ID_4399_APPID,
    ID_WEILI_APPID,
];
var ID_BANNER = [
    ID_WEB_BANNER,
    ID_WECHAT_BANNER,
    ID_QQ_BANNER,
    ID_ANDROID_BANNER,
    ID_IOS_BANNER,
    ID_OPPO_BANNER,
    ID_VIVO_BANNER,
    ID_BD_BANNER,
    ID_TT_BANNER,
    ID_QTT_BANNER,
    ID_MI_BANNER,
    ID_4399_BANNER,
    ID_WEILI_BANNER,
];
var ID_INTER = [
    ID_WEB_INTER,
    ID_WECHAT_INTER,
    ID_QQ_INTER,
    ID_ANDROID_INTER,
    ID_IOS_INTER,
    ID_OPPO_INSERT,
    ID_VIVO_INTER,
    ID_BD_INTER,
    ID_TT_INTER,
    ID_QTT_INTER,
    ID_MI_INTER,
    ID_4399_INTER,
    ID_WEILI_INTER,
];
var ID_VIDEO = [
    ID_WEB_VIDEO,
    ID_WECHAT_VIDEO,
    ID_QQ_VIDEO,
    ID_ANDROID_VIDEO,
    ID_IOS_VIDEO,
    ID_OPPO_VIDEO,
    ID_VIVO_VIDEO,
    ID_BD_VIDEO,
    ID_TT_VIDEO,
    ID_QTT_VIDEO,
    ID_MI_VIDEO,
    ID_4399_VIDEO,
    ID_WEILI_VIDEO,
];
export default class ADIDDefine {
    static get ID_OPPO_APPID() { return ID_OPPO_APPID; }
    static get ID_OPPO_PACKAGE() { return ID_OPPO_PACKAGE; }
    static get ID_APPID() { return ID_APPID[LLWConfig.PLATTYPE - 1] }
    static get ID_BANNER() { return ID_BANNER[LLWConfig.PLATTYPE - 1] }
    static get ID_INTER() { return ID_INTER[LLWConfig.PLATTYPE - 1] }
    static get ID_VIDEO() { return ID_VIDEO[LLWConfig.PLATTYPE - 1] }
}