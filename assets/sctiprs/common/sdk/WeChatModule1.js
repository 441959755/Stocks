//import HttpUtils from "../net/HttpUtils";

const wxClassPath = "org/cocos2dx/javascript/AppActivity";

const KeyRefreshToken = 'plaza_refresh_token';

const appId = "wx2f88189155732f56";

const appSecret = "1b9333210af08f2e53575726d93fd21b";

const WxAccessUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const WxRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";


var WeChatModule = cc.Class({
    name: "WeChatModlue",

    properties: {
        appId: '',
        appSecret: '',
    },

    //构造函数
    ctor: function () {
        console.log(`[WeChatModule][ctor]---构造函数`);
        this.initWx();
    },

    //判断是否安装微信
    isInstallWx: function () {
        //  if (gg.isAndroid === true) {
        return jsb.reflection.callStaticMethod(
            wxClassPath,
            "isInstallWx",
            "()Z");
        // } else if (gg.isIOS === true) {
        //     return jsb.reflection.callStaticMethod("WeChatModule", "isInstallWx");
        // }
        // return true;
    },

    //初始化接口 需要传入appId和secret
    initWx: function () {
        this.appId = appId;
        this.appSecret = appSecret;
        // if (gg.isAndroid === true) {
        return jsb.reflection.callStaticMethod(
            wxClassPath,
            "initWx",
            "(Ljava/lang/String;Ljava/lang/String;)V", appId, appSecret);
        // } else if (gg.isIOS === true) {
        //     return jsb.reflection.callStaticMethod("WeChatModule", "initWx:andSecret:", appId, appSecret);
        // }
        // return true;
    },

    loginWx: function () {

        // if (gg.isAndroid === true) {
        jsb.reflection.callStaticMethod(
            wxClassPath,
            "loginWx",
            "()V");
        // } else if (gg.isIOS === true) {
        //     jsb.reflection.callStaticMethod("WeChatModule", "loginWx");
        // }
        //  return true;
    },

    shareImageWx: function (imgPath, type) {
        // if (gg.isAndroid === true) {
        jsb.reflection.callStaticMethod(
            wxClassPath,
            "shareImageWx",
            "(Ljava/lang/String;I)V", imgPath, type);
        // } else if (gg.isIOS === true) {
        //     jsb.reflection.callStaticMethod("WeChatModule", "shareImageWx:andType:", imgPath, type);
        // }
    },

    shareTextWx: function (text, type) {
        // if (gg.isAndroid === true) {
        jsb.reflection.callStaticMethod(
            wxClassPath,
            "shareTextWx",
            "(Ljava/lang/String;I)V", text, type);
        // } else if (gg.isIOS === true) {
        //     jsb.reflection.callStaticMethod("WeChatModule", "shareTextWx:andType:", text, type);
        // }
    },

    shareUrlWx: function (url, title, desc, type) {
        //if (gg.isAndroid === true) {
        jsb.reflection.callStaticMethod(
            wxClassPath,
            "shareUrlWx",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V", url, title, desc, type);
        // } else if (gg.isIOS === true) {
        //     jsb.reflection.callStaticMethod("WeChatModule", "shareUrlWx:andTitle:andDesc:andType:", url, title, desc, type);
        // }
    },

    //微信登录
    login: function () {
        console.log('微信登录');
        let strToken = cc.sys.localStorage.getItem(KeyRefreshToken);
        var self = this;
        if (strToken) {
            let token = JSON.parse(strToken);
            let appid = token.appid;
            let refresh_token = token.refresh_token;
            let kUrl = `${WxRefreshUrl}?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`;
            console.log('kUrl' + kUrl);
            // HttpUtils.loadRequest(kUrl, null, (result) => {
            //     let msg;
            //     msg.ret = true;
            //     msg.access_token = result.access_token;
            //     msg.openid = result.openid;
            //     let token;
            //     token.refresh_token = result.refresh_token;
            //     token.appid = appid;
            //     cc.sys.localStorage.setItem(KeyRefreshToken, JSON.stringify(token));
            //     call && (call(msg));
            // }, (err) => {
            //     this.resetWx();
            //     this.loginWx();
            //     return;
            // })
            return true;
        }

        //检查是否安装微信
        if (this.isInstallWx() === false) {
            err && err(('微信登录失败，请检查是否安装微信'));
            return false;
        }

        // if (gg.isWindows) {
        //     gg.fun.createDialog('WechatLoginView', '', false);
        //     return true;
        // } else {
        this.loginWx();
        // }
    },

    onWxLoginResultCallback: function (result, codeMsg) {
        console.log('result' + result + '    ' + 'codeMsg' + codeMsg);

        if (result === false) {
            let msg = {};
            msg.ret = false;
            msg.msg = '微信登录失败，' + codeMsg;
            cc.director.emit("WxLoginCallback", msg);
            return;
        }

        var self = this;
        let kUrl = `${WxAccessUrl}?appid=${this.appId}&secret=${this.appSecret}&code=${codeMsg}&grant_type=authorization_code`;
        console.log('kUrl' + kUrl);
        // HttpUtils.loadRequest(kUrl, null, (result) => {
        //     let msg;
        //     msg.ret = true;
        //     msg.access_token = result.access_token;
        //     msg.openid = result.openid;
        //     let token;
        //     token.refresh_token = result.refresh_token;
        //     token.appid = appId;
        //     cc.sys.localStorage.setItem(KeyRefreshToken, JSON.stringify(token));

        // });
    },

    onWxShareResultCallback: function (result, msg) {

    },

    onWxPayResultCallback: function (result, msg) {

    },

    onWindowLoginCallback: function (code) {
        this.onWxLoginResultCallback(true, code);
    },

    resetWx: function () {
        cc.sys.localStorage.removeItem(KeyRefreshToken);
    },
});

module.exports = WeChatModule;