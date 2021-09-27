const WxAccessUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const WxRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";
const KeyRefreshToken = 'plaza_refresh_token';
export default class IOSSDK {

    static _instance = null;

    className = 'jsAndOCFun';

    static getInstance() {

        if (!this._instance) {
            this._instance = new IOSSDK();
        }
        return this._instance;
    }

    // --调用oc 获取 ios的版本号  Version
    getVersionToOc() {
        var funcName = "getVersionName"
        var ret = jsb.reflection.callStaticMethod(this.className, "getVersionName", null)
        if (ret)
            return ret
        return 0
    }

    //判断是否安装微信
    isInstallWx() {
        return jsb.reflection.callStaticMethod("WeChatModule", "isInstallWx", null);
    }

    loginWx() {

        jsb.reflection.callStaticMethod("WeChatModule", "loginWx", null);

    }

    shareImageWx(imgPath, type) {

        jsb.reflection.callStaticMethod("WeChatModule", "shareImageWx:andType:", imgPath, type);

    }

    shareTextWx(text, type) {

        jsb.reflection.callStaticMethod("WeChatModule", "shareTextWx:andType:", text, type);

    }

    shareUrlWx(url, title, desc, type) {
        jsb.reflection.callStaticMethod("WeChatModule", "shareUrlWx:andTitle:andDesc:andType:", url, title, desc, type);
    }

    //微信登录
    login() {
        let strToken = cc.sys.localStorage.getItem(KeyRefreshToken);
        var self = this;
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
        let kUrl = `${WxAccessUrl}?appid=${this.appId}&secret=${this.appSecret}&code=${codeMsg}&grant_type=authorization_code`;
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
    //调用oc qq登录接口
    callQqLoginToOc() {
        var funcName = "loginInQq"
        jsb.reflection.callStaticMethod(this.className, funcName, null)
    }


    //调用oc qq宝分享接口 shareType 1分享文字   2分享截图
    //sessionOrFriendCircle 1分享给好友   2分享到朋友圈
    callQqShareToOc(title, content, imagePath, url, shareType, sessionOrFriendCircle) {
        var app_name = '炒股达人'

        var funcName = "shareToQq:Content:ImagePath:Url:appName:ShareType:FriendCircle:"
        jsb.reflection.callStaticMethod(this.className, funcName,
            title, content, imagePath, url, app_name, shareType, sessionOrFriendCircle)
    }

    // --检查是否安装qq
    isInstallQq() {
        var funcName = "isInstallQq"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, null)
        if (ret) {
            if (ret == "true") {
                return true
            }
        }
        return false
    }


    // // 调用oc 开始录音接口
    // callStartRecorderToOc(filename) {
    //     var funcName = "prepareRecord:"
    //     var ret = jsb.reflection.callStaticMethod(this.className, funcName, filename)
    // },

    // // --调用oc 停止录音接口 chairID为空，则表示不发送录音
    // callStopRecorderToOc() {
    //     var funcName = "finishRecord"
    //     jsb.reflection.callStaticMethod(this.className, funcName)
    // },

    // // 调用oc 播放录音
    // callPlayRecorderToOc(fileName) {
    //     var funcName = "play:"
    //     jsb.reflection.callStaticMethod(this.className, funcName, fileName)
    // },

    // // --调用oc 停止播放录音
    // callStopPlayRecorderToOc() {
    //     var funcName = "stopPlay"
    //     jsb.reflection.callStaticMethod(this.className, funcName)
    // },


    // // 调用oc 设置录音存放的位置 
    // callSetStorageDirToOc(dir) {
    //     var funcName = "setStorageDir:"
    //     jsb.reflection.callStaticMethod(this.className, funcName, dir)
    // },


    // // 调用取消录音接口 
    // callCancelRecorderToOc() {
    //     var funcName = "cancelRecord"
    //     var ok = jsb.reflection.callStaticMethod(this.className, funcName)
    // },



    //调用oc 获取电量接口
    getBatteryToOc() {
        var funcName = "getBattery"
        var ret = jsb.reflection.callStaticMethod(this.className, "getBattery", null)
        if (ret)
            return ret
        return 0
    }

    // 调用oc 获取wifi或其它网络接口
    getNetStatusToOc() {
        var funcName = "getNetStatus"
        var ret = jsb.reflection.callStaticMethod(this.className, "getNetStatus", null)
        if (ret)
            return ret
        return 0
    }


    //调用oc 获取wifi信号强度  3 2 1 0  3表示wifi信号最大强度  0表示没wifi信号
    getWifiSignalToOc() {
        var funcName = "getSignalStrength"
        var ret = jsb.reflection.callStaticMethod(this.className, "getNetStatus", null)
        if (ret)
            return ret + 1
        return 1
    }

    // 调用ios 复制功能 
    copyborad(str) {
        var funcName = "copyToClipboard:"
        jsb.reflection.callStaticMethod(this.className, funcName, str)
    }


    // ----调用ios 打开Url 
    openUrl(url) {
        var funcName = "openUrl:"
        jsb.reflection.callStaticMethod(this.className, funcName, url)
    }


    setScreenDirection(direct) {
        var funcName = "setScreenDirection:"
        var succ = jsb.reflection.callStaticMethod(this.className, funcName, direct)
        if (succ == 1) {
            return true
        }
    }

    //调用手机振动
    vibratez(aSecond) {
        //  LOG.INFO("js准备调用oc vibratez:")
        var funcName = "vibratez"
        jsb.reflection.callStaticMethod(this.className, funcName, null)
    }

    uploadImg() {
        var funcName = "uploadImg"
        jsb.reflection.callStaticMethod(this.className, funcName, null)
    }

    uploadTx() {
        var funcName = "uploadTx"
        jsb.reflection.callStaticMethod(this.className, funcName, null)
    }

    createQRcode(code, callback) {
        var funcName = "createQRCode:"
        var path = jsb.reflection.callStaticMethod(this.className, funcName, code)
        callback(path)
    }


    scanQRCode() {
        var funcName = "scanQRCode"
        jsb.reflection.callStaticMethod(this.className, funcName, null)
    }

}
