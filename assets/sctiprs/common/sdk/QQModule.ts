import HttpMgr from '../net/HttpMgr';
import { pb } from "../../../protos/proto";

const wxClassPath = "org/cocos2dx/javascript/AppActivity";

const KeyRefreshToken = 'plaza_refresh_token';

const appId = "1105791492";

const appSecret = "FbT8AXU17ggHMy8E";

const WxAccessUrl = "https://graph.qq.com/user/get_user_info?access_token=";

// const WxRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";

export default class QQModule {

    Callback = null;

    constructor() {
        console.log('QQModule--构造函数');
        this.initQQ();
    }

    //判断是否安装微信
    isInstallQQ() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                wxClassPath,
                "isInstallQQ",
                "()Z");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("WeChatModule", "isInstallQQ", null);
        }
        // return true;
    }

    initQQ() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                wxClassPath,
                "initQQ",
                "(Ljava/lang/String;Ljava/lang/String;)V", appId, appSecret);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("WeChatModule", "initQQ:andSecret:", appId, appSecret);
        }
    }

    loginQQ() {

        if (cc.sys.os === cc.sys.OS_ANDROID) {

            jsb.reflection.callStaticMethod(
                wxClassPath,
                "loginQQ",
                "()V");

        } else if (cc.sys.os === cc.sys.OS_IOS) {

            jsb.reflection.callStaticMethod("WeChatModule", "loginQQ", null);

        }

    }

    shareImageQQ(imgPath, type) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                wxClassPath,
                "shareImageQQ",
                "(Ljava/lang/String;I)V", imgPath, type);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("WeChatModule", "shareImageQQ:andType:", imgPath, type);
        }
    }

    shareTextQQ(text, type) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                wxClassPath,
                "shareTextQQ",
                "(Ljava/lang/String;I)V", text, type);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("WeChatModule", "shareTextQQ:andType:", text, type);
        }
    }

    shareUrlQQ(url, title, desc, type) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                wxClassPath,
                "shareUrlQQ",
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V", url, title, desc, type);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("WeChatModule", "shareUrlQQ:andTitle:andDesc:andType:", url, title, desc, type);
        }
    }

    //QQ登录
    login(Callback, err?) {
        this.Callback = Callback;
        console.log('微信登录');
        let strToken = cc.sys.localStorage.getItem(KeyRefreshToken);
        var self = this;
        if (strToken) {
            let token = JSON.parse(strToken);
            let appid = token.appid;
            let refresh_token = token.refresh_token;
            let kUrl = `${111}?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`;
            console.log('kUrl' + kUrl);
            this.Callback && (this.Callback(refresh_token));
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
        if (this.isInstallQQ() === false) {
            err && err(('微信登录失败，请检查是否安装微信'));
            return false;
        }

        // if (gg.isWindows) {
        //     gg.fun.createDialog('WechatLoginView', '', false);
        //     return true;
        // } else {
        this.loginQQ();
        // }
    }

    onQQLoginResultCallback(result, codeMsg) {

        console.log('QQ登录返回' + result + '    ' + 'codeMsg' + codeMsg);

        //   this.getUserInfo();
        // let loginInfo = {
        //     account: codeMsg,
        //     type: pb.LoginType.WeChat,
        //     from: pb.AppFrom.Test,
        //     // pwd: ''
        // };

        // HttpMgr.getInstance().loginWeb(null, loginInfo, this.Callback, () => {
        //     console.log('onLoginCodeHttpRequest err');
        //     // call && call();
        // })

    }

    getUserInfo() {
        // if (cc.sys.os === cc.sys.OS_ANDROID) {
        //     return jsb.reflection.callStaticMethod(
        //         wxClassPath,
        //         "getUserInfo",
        //         "(Ljava/lang/String;Ljava/lang/String;)V");
        // } else if (cc.sys.os === cc.sys.OS_IOS) {
        //     return jsb.reflection.callStaticMethod("WeChatModule", "initQQ:andSecret:", null);
        // }
    }

    // onQQUserInfoCallback(result, codeMsg) {
    //     console.log('用户信息：' + result + codeMsg);
    // }

    onQQShareResultCallback(result, msg) {

    }

    onQQPayResultCallback(result, msg) {

    }

    onWindowLoginCallback(code) {
        this.onQQLoginResultCallback(true, code);
    }

    resetWx() {
        cc.sys.localStorage.removeItem(KeyRefreshToken);
    }

    shareAppMessage() {

    }
}

