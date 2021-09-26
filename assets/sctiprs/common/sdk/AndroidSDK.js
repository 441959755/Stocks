
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

    //Android相关
    //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "requestLogin", "(Ljava/lang/String;)V", strPlatform);

    // --调用java 微信登录接口
    callWeixinLoginToJava(call) {
        console.log("lua准备调用java loginInWx:")
        var funcName = "loginInWx"
        var sigs = "()V"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        return ret

    }

    // 调用java 微信分享接口 shareType 1分享文字   2分享截图
    // sessionOrFriendCircle 1分享给好友   2分享到朋友圈
    callWeixinShareToJava(title, content, imagePath, url, shareType, sessionOrFriendCircle) {
        console.log("lua准备调用java WeixinShareToJava:")
        if (typeof (shareType) != "number" || shareType == 1) {
            shareType = 1;
            imagePath = "pic path"
        }

        var funcName = "shareToWxCirleOfFriend"
        if (typeof (sessionOrFriendCircle) != "number" || sessionOrFriendCircle == 1) {
            funcName = "shareToWx"
        }

        var sigs = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V"

        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs,
            title, content, imagePath, url, shareType)
        return ret
    }

    //检查是否安装微信
    isInstallWeixin() {
        var funcName = "isInstallweixn"
        var sigs = "()Ljava/lang/String;"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
        if (ret) {
            if (ret == "true") {
                return true
            }
        }
        return false
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

    // //调用java 开始录音接口
    // callStartRecorderToJava(fileName) {
    //     console.log("js准备调用java startRecorderToJava:")
    //     var className = window.app_pack + "/voicesdk/VoiceRecorder"
    //     var funcName = "prepare"
    //     var sigs = "(Ljava/lang/String;)V"
    //     var ret = jsb.reflection.callStaticMethod(className, funcName, sigs, fileName)
    // }

    // //调用java 停止录音接口 ，则表示不发送录音
    // callStopRecorderToJava() {
    //     console.log("js准备调用java stopRecorderToJava:")

    //     //录音完后，发送给服务器 wav转amr格式 ，这个转的代码使用 c++中的源代码 
    //     //接收到服务器下发到 语音，保存到amr格式的文件，然后转成wav的格式 本地播放之。

    //     var className = window.app_pack + "/voicesdk/VoiceRecorder"
    //     var funcName = "release"
    //     var sigs = "()V"
    //     var ret = jsb.reflection.callStaticMethod(className, funcName, sigs)
    // }

    // // 调用java 取消录音接口 
    // callCancelRecorderToJava() {
    //     console.log("js准备调用java callCancelRecorderToJava:")
    //     var className = window.app_pack + "/voicesdk/VoiceRecorder"
    //     var funcName = "cancel"
    //     var sigs = "()V"
    //     var ok = jsb.reflection.callStaticMethod(className, funcName, sigs)
    // }

    // 调用java 播放录音接口 
    // callPlayRecorderToJava(fileName) {
    //     console.log("js准备调用java callPlayRecorderToJava:")
    //     var className = window.app_pack + "/voicesdk/VoicePlayer"
    //     var funcName = "play"
    //     var sigs = "(Ljava/lang/String;)V"
    //     var ret = jsb.reflection.callStaticMethod(className, funcName, sigs, fileName)
    // }

    // 调用java 停止播放录音
    // callStopPlayRecorderToJava() {
    //     console.log("js准备调用java callStopPlayRecorderToJava:")
    //     var className = window.app_pack + "/voicesdk/VoiceRecorder"
    //     var funcName = "stop"
    //     var sigs = "()V"
    //     var ret = jsb.reflection.callStaticMethod(className, funcName, sigs)
    // }

    //调用java 设置录音存放的位置 
    // callSetStorageDirToJava(dir) {
    //     console.log("js准备调用java callSetStorageDirToJava:")
    //     var className = window.app_pack + "/voicesdk/VoiceRecorder"
    //     var funcName = "setStorageDir"
    //     var sigs = "(Ljava/lang/String;)V"
    //     var ret = jsb.reflection.callStaticMethod(className, funcName, sigs, dir)
    //     return ret
    // }

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

    //调用振动
    vibratez(aSecond) {
        console.log("js准备调用java vibratez:")
        var funcName = "vibratez"
        var sigs = "(I)I"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs, aSecond);
        console.log("调用结果:", ret)
        return ret
    }

    //屏幕装换
    setScreenDirection(direct) {
        var funcName = "setScreenDirection"
        var sigs = "(I)I"
        var succ = jsb.reflection.callStaticMethod(this.className, funcName, sigs, direct);
        if (succ == 1) {
            return true
        }
    }
    //二维码扫描
    scanQRCode() {
        var funcName = "scanQRCode"
        var sigs = "()V"
        var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
    }

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