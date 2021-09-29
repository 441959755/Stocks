import { pb } from "../../../protos/proto";
import GameData from "../../GameData";
import EventCfg from "../../Utils/EventCfg";
import GlobalEvent from "../../Utils/GlobalEvent";
import LoadUtils from "../../Utils/LoadUtils";
import HttpMgr from "../net/HttpMgr";
import HttpUtils from "../net/HttpUtils";

const wxClassPath = 'org/cocos2dx/javascript/AppActivity';

const WxAccessUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const WxRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";

const QQAccessUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const QQRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";

const KeyRefreshToken = 'plaza_refresh_token';

const QQRefreshToken = 'QQRefreshToken';

export default class AndroidSDK {

    appId = "wx2f88189155732f56";

    // appSecret = "1b9333210af08f2e53575726d93fd21b";

    appSecret = "9b1174a6fb93bd7a831338f8e21db0db";

    static _instance = null;

    static WeChatModule = null;

    public loginPlat = null;

    className = 'org/cocos2dx/javascript/AppActivity';

    callback = null;

    WXtoken = {
        access_token: null,
        refresh_token: null,
        openid: null,
    };

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
        console.log('js微信登录');
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
    login(call) {
        this.callback = call;
        this.loginPlat = pb.LoginType.WeChat;

        let strToken = cc.sys.localStorage.getItem(KeyRefreshToken);

        if (strToken) {
            let token = JSON.parse(strToken);
            let appid = this.appId;
            let refresh_token = token.refresh_token;
            let kUrl = `${WxRefreshUrl}?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`;

            HttpUtils.loadRequest(kUrl, null, (result) => {
                console.log('微信登录refresh_token，' + result);
                result = JSON.parse(result);

                if (result.errcode) {
                    this.resetWx();
                    this.loginWx();
                    return;
                }

                this.WXtoken.access_token = result.access_token;
                this.WXtoken.refresh_token = result.refresh_token;
                this.WXtoken.openid = result.openid;

                cc.sys.localStorage.setItem(KeyRefreshToken, JSON.stringify(this.WXtoken));
                this.getUserInfo();
            })
        }
        else {
            //检查是否安装微信

            if (this.isInstallWx()) {
                console.log('微信登录失败，请检查是否安装微信');
            }


            this.loginWx();
        }
    }

    onWxLoginResultCallback(result, codeMsg) {
        console.log('微信登录，' + result + '   ' + codeMsg);
        // 微信登录，true   051QV0100o0RuM1HqS200U2S5D1QV01T
        if (result === false) {
            let msg = {
                ret: false,
                msg: '微信登录失败，' + codeMsg,
            };

            //  cc.director.emit("WxLoginCallback", msg);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '微信登录失败');
            return;
        }

        let kUrl = `${WxAccessUrl}?appid=${this.appId}&secret=${this.appSecret}&code=${codeMsg}&grant_type=authorization_code`;

        HttpUtils.loadRequest(kUrl, null, (result) => {
            console.log('微信登录authorization_code，' + result);
            result = JSON.parse(result);

            if (result.errcode) {
                this.resetWx();
                this.loginWx();
                return;
            }

            this.WXtoken.access_token = result.access_token;
            this.WXtoken.refresh_token = result.refresh_token;
            this.WXtoken.openid = result.openid;

            cc.sys.localStorage.setItem(KeyRefreshToken, JSON.stringify(this.WXtoken));

            this.getUserInfo();

        })
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
    callQqLoginToJava(call?) {
        this.callback = call;
        let RefreshToken = cc.sys.localStorage.getItem(QQRefreshToken);

        if (RefreshToken) {

            let access_token = JSON.parse(RefreshToken).access_token;

            this.loginServer(access_token);
        }
        else {
            this.loginPlat = pb.LoginType.QQ;

            console.log("js准备调用java callQqLoginToJava:")
            var funcName = "loginInQq"
            var sigs = "()V"
            var ret = jsb.reflection.callStaticMethod(this.className, funcName, sigs)
            return ret
        }
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
        this.loginPlat = pb.LoginType.QQ;

        cc.sys.localStorage.setItem(QQRefreshToken, data);

        data = JSON.parse(data);

        this.getQQInfo();
    }

    getQQInfo() {
        let userInfoString = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getQQInfo", "()Ljava/lang/String;");
        console.log('getQQInfo' + userInfoString);

    }



    loginServer(token) {

        let loginInfo = {
            account: token,
            type: this.loginPlat,
            //from: pb.AppFrom.WeChatMinProgram,
            // type: pb.LoginType.WeChat,
            from: pb.AppFrom.Test,
            pwd: ''
        };

        HttpMgr.getInstance().loginWeb(token, loginInfo, this.callback, () => {
            console.log('onLoginCodeHttpRequest err');
        })
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

    getUserInfo(obj?) {
        let url;
        if (this.loginPlat == pb.LoginType.QQ) {
            let QQInfo = cc.sys.localStorage.getItem('QQInfo');
            if (!QQInfo) {
                url = 'https://graph.qq.com/user/get_user_info?access_token=' + obj.access_token
                    + 'oauth_consumer_key=12345&openid=' + obj.openid;
            }
        }
        else if (this.loginPlat == pb.LoginType.WeChat) {
            let WeChatInfo = cc.sys.localStorage.getItem('WeChatInfo');
            if (!WeChatInfo) {
                url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + this.WXtoken.
                    access_token + '&openid=' + this.WXtoken.openid;
            }
        }

        if (url) {
            HttpUtils.loadRequest(url, null, (result) => {
                console.log('wx getUserInfo 11' + result);

                result = JSON.parse(result);

                GameData.userName = result.nickname;

                GameData.gender = result.sex || result.gender;

                let headUrl = result.headimgurl || result.figureurl_1;

                let obj = { url: headUrl + '?file=a.png', type: 'png' };
                LoadUtils.loadHead(obj, (img) => {
                    GameData.headimgurl = img;
                    GameData.headImg = new cc.SpriteFrame(img);
                })

                this.loginServer(this.WXtoken.access_token);
            })
        }
        else {
            this.loginServer(this.WXtoken.access_token);
        }

    }

}

