
const wxClassPath = "com/jujing/stock/wxapi/WeChatModule";

const WxAccessUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const WxRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";

const APP_ID = "wx2f88189155732f56";
const SECRET = "1b9333210af08f2e53575726d93fd21b";

const KeyRefreshToken = 'plaza_refresh_token';

export default class AndroidSDK {

    static _instance = null;

    static WeChatModule = null;

    className = 'org/cocos2dx/javascript/AppActivity';

    static getInstance() {

        if (!this._instance) {
            this._instance = new AndroidSDK();
        }
        return this._instance;
    }

    //判断是否安装微信
    isInstallWx() {

        return jsb.reflection.callStaticMethod(
            wxClassPath,
            "isInstallWx",
            "()Z");

    }

    loginWx() {
        jsb.reflection.callStaticMethod(
            wxClassPath,
            "loginWx",
            "()V");
    }

    shareImageWx(imgPath, type) {

        jsb.reflection.callStaticMethod(
            wxClassPath,
            "shareImageWx",
            "(Ljava/lang/String;I)V", imgPath, type);

    }

    shareTextWx(text, type) {

        jsb.reflection.callStaticMethod(
            wxClassPath,
            "shareTextWx",
            "(Ljava/lang/String;I)V", text, type);

    }

    shareUrlWx(url, title, desc, type) {

        jsb.reflection.callStaticMethod(
            wxClassPath,
            "shareUrlWx",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V", url, title, desc, type);

    }

    //微信登录
    login() {
        let strToken = cc.sys.localStorage.getItem(KeyRefreshToken);

        if (strToken) {
            let token = JSON.parse(strToken);
            let appid = token.appid;
            let refresh_token = token.refresh_token;
            let kUrl = `${WxRefreshUrl}?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`;
            // http.get({ url: kUrl, timeout: 10000 }, function (err, result) {
            //     if (err || result.errcode) {
            //         self.resetWx();
            //         self.loginWx();
            //         return;
            //     }
            //     let msg = {};
            //     msg.ret = true;
            //     msg.access_token = result.access_token;
            //     msg.openid = result.openid;
            //     let token = {};
            //     token.refresh_token = result.refresh_token;
            //     token.appid = appid;
            //     cc.sys.localStorage.setItem(KeyRefreshToken, JSON.stringify(token));
            //     cc.director.emit("WxLoginCallback", msg);
            // }.bind(self));
            // return true;
        }

        //检查是否安装微信
        if (this.isInstallWx() === false) {
            console.log('微信登录失败，请检查是否安装微信');
            return false;
        }

        // if (gg.isWindows) {
        //     gg.fun.createDialog('WechatLoginView', '', false);
        //     return true;
        // } else {
        return this.loginWx();
        // }
    }

    onWxLoginResultCallback(result, codeMsg) {
        if (result === false) {
            let msg;
            msg.ret = false;
            msg.msg = '微信登录失败，' + codeMsg;
            cc.director.emit("WxLoginCallback", msg);
            return;
        }

        var self = this;
        let kUrl = `${WxAccessUrl}?appid=${1}&secret=${1}&code=${codeMsg}&grant_type=authorization_code`;
        // http.get({ url: kUrl, timeout: 10000 }, function (err, result) {
        //     if (err || result.errcode) {
        //         self.resetWx();
        //         let msg = {};
        //         msg.ret = false;
        //         msg.msg = '微信登录失败,请稍后重试';
        //         cc.director.emit("WxLoginCallback", msg);
        //         return;
        //     }
        //     let msg = {};
        //     msg.ret = true;
        //     msg.access_token = result.access_token;
        //     msg.openid = result.openid;
        //     let token = {};
        //     token.refresh_token = result.refresh_token;
        //     token.appid = self.appid;
        //     cc.sys.localStorage.setItem(KeyRefreshToken, JSON.stringify(token));
        //     cc.director.emit("WxLoginCallback", msg);
        // });
    }

    onWxShareResultCallback(result, msg) {

    }

    onWxPayResultCallback(result, msg) {

    }

    onWindowLoginCallback(appId, appSecret, code) {
        // this.appId = appId;
        // this.appSecret = appSecret;
        this.onWxLoginResultCallback(true, code);
    }

    resetWx() {
        cc.sys.localStorage.removeItem(KeyRefreshToken);
    }

    // --调用java QQ登录接口
    callQqLoginToJava() {
        console.log("js准备调用java callQqLoginToJava:")
        var funcName = "loginInQq"
        var sigs = "()V"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        return ret
    }

    // 调用java qq分享接口 shareType 1分享文字   2分享截图
    // sessionOrFriendCircle 1分享给好友   2分享到朋友圈
    // inviteLoginCallback 分享后的回调
    callQqShareToJava(title, content, imagePath, url, shareType, sessionOrFriendCircle) {
        console.log("js准备调用java callQqShareToJava:")
        if (typeof (shareType) != "number" || shareType == 1) {
            shareType = 1;
            imagePath = "pic path"
        }
        let app_name = '炒股达人';
        var funcName = "shareToQQ"

        var sigs = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;II)V"

        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs,
            title, content, imagePath, url, app_name, shareType, sessionOrFriendCircle)
        return ret
    }

    //检查是否安qq
    isInstallQq() {
        var funcName = "isInstallQq"
        var sigs = "()Ljava/lang/String;"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        if (ret) {
            if (ret == "true") {
                return true
            }
        }
        return false
    }


    // --调用java 获取电量接口
    getBatteryToJava() {
        var className = "org/cocos2dx/lua/AppActivity"
        var funcName = "getBattery"
        var sigs = "()I"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        if (ret) {
            return ret
        }

        return 0
    }

    //调用java 获取wifi信号强度  3 2 1 0  3表示wifi信号最大强度  0表示没wifi信号
    getWifiSignalToJava() {
        var funcName = "getSignalStrength"
        var sigs = "()I"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        if (ret) {
            return ret
        }

        return 0
    }

    //调用java 获取 AndroidManifest.xml文件中的版本号
    getVersionToJava() {
        var funcName = "getVersionName"
        var sigs = "()Ljava/lang/String;"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        if (ret) {
            return ret
        }
        return ""
    }

    //调用java 打开Url
    openUrl(url) {
        var funcName = "openUrl"
        var args = { url }
        var sigs = "(Ljava/lang/String;)V"
        jsb.reflection.callStaticMethod(this.className, funcName, sigs, url)
    }

    // 调用java 复制到剪贴板
    copyborad(str) {
        var funcName = "copyToClipboard"
        var sigs = "(Ljava/lang/String;)V"
        jsb.reflection.callStaticMethod(this.className, funcName, sigs, str)
    }

    // //调用振动
    // vibratez(aSecond) {
    //     console.log("js准备调用java vibratez:")
    //     var funcName = "vibratez"
    //     var sigs = "(I)I"
    //     var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs, aSecond);
    //     console.log("调用结果:", ret)
    //     return ret
    // }

    // //屏幕装换
    // setScreenDirection(direct) {
    //     var funcName = "setScreenDirection"
    //     var sigs = "(I)I"
    //     var succ = jsb.reflection.callStaticMethod(this.className, funcName, sigs, direct);
    //     if (succ == 1) {
    //         return true
    //     }
    // }
    // //二维码扫描
    // scanQRCode() {
    //     var funcName = "scanQRCode"
    //     var sigs = "()V"
    //     var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
    // }

    uploadImg() {
        var funcName = "uploadImg"
        var sigs = "()V"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
    }

    uploadTx() {
        var funcName = "uploadTx"
        var sigs = "()V"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
    }

    //生成二维码
    createQRcode(code, callback) {
        var funcName = "createQRCode"
        //var filePath = cc.FileUtils:getInstance():getWritablePath()
        var sigs = "(Ljava/lang/String;)Ljava/lang/String;"
        var path = jsb.reflection.callStaticMethod(this.className, funcName, sigs,
            code)
        callback(path)
    }

    //登录系统回调接口
    loginCallbackQQ(data) {
        console.log("登录回调:" + data)
        // ret":0,"openid":"89D78D1C3B890199821B91C223182057","access_token":"FBEFAE1F56A199EBB13E638E74D25D57","pay_token":"B52443D58A0DE62B6E2A059A164299AC","expires_in":7776000,"pf":"desktop_m_qq-10000144-android-2002-","pfkey":"31d18413f7306978f30a23756f0cc7ca","msg":"","login_cost":87,"query_authority_cost":0,"authority_cost":0,"expires_time":1640494638472,"AppId":"1105791492","Secret":"FbT8AXU17ggHMy8E"}

    }



    uploadImgCallbcak(texture) {

    }

    // statusBarOrientationChanged() {
    //     var frameSize = cc.view.getFrameSize()

    //     if (direct == 1)//竖屏
    //     {
    //         cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
    //         if (frameSize.width > frameSize.height) {
    //             cc.view.setFrameSize(frameSize.height, frameSize.width);
    //         }
    //     }
    //     else {
    //         cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
    //         if (frameSize.height > frameSize.width) {
    //             cc.view.setFrameSize(frameSize.height, frameSize.width);
    //         }
    //     }
    // }

}

