

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

    // 调用oc 微信登录接口
    callWeixinLoginToOc() {
        var funcName = "loginInWx"
        jsb.reflection.callStaticMethod(this.className, funcName, null)
    }

    // 调用oc 微信分享接口 shareType 1分享文字   2分享截图
    // sessionOrFriendCircle 1分享给好友   2分享到朋友圈
    callWeixinShareToOc(title, content, imagePath, url, shareType, sessionOrFriendCircle) {
        if (typeof (shareType) != "number" || shareType == 1) {
            shareType = 1;
            imagePath = "pic path"
        }


        var funcName = "shareToWxSession:"
        if (typeof (sessionOrFriendCircle) != "number" || sessionOrFriendCircle == 2) {
            funcName = "shareToWxFriendCircle:"
        }
        funcName = funcName + "Content:ImagePath:Url:ShareType:"

        jsb.reflection.callStaticMethod(this.className, funcName,
            title, content, imagePath, url, shareType)
    }


    // 检查是否安装微信
    isInstallWeixin() {
        var funcName = "isInstallweixn"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, null)
        if (ret) {
            if (ret == "true") {
                return true
            }
        }
        return false
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

//登录系统回调接口
window.loginCallback = function (data) {
    promptText("登录回调:" + data)
}

//扫描回调
window.scamCallback = function (data) {
    promptText("扫描回调:" + data)
}

window.createQRcodeCallback = function (data) {
    promptText("二维码回调:" + data)
}

window.uploadImgCallbcak = function (texture) {

}

window.statusBarOrientationChanged = function () {
    var frameSize = cc.view.getFrameSize()

    if (direct == 1)//竖屏
    {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
        if (frameSize.width > frameSize.height) {
            cc.view.setFrameSize(frameSize.height, frameSize.width);
        }
    }
    else {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
        if (frameSize.height > frameSize.width) {
            cc.view.setFrameSize(frameSize.height, frameSize.width);
        }
    }
}