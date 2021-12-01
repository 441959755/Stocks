import { pb } from "../../../protos/proto";
import GameData from "../../GameData";
import EventCfg from "../../Utils/EventCfg";
import GlobalEvent from "../../Utils/GlobalEvent";
import LoadImg from "../../Utils/LoadImg";
import HttpMgr from "../net/HttpMgr";
import HttpUtils from "../net/HttpUtils";

const WxAccessUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const WxRefreshUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token";
const KeyRefreshToken = 'plaza_refresh_token';

const QQRefreshToken = 'QQRefreshToken';

export default class IOSSDK {

    static _instance = null;

    className = 'WXPay';

    appId = "wx2f88189155732f56";

    appSecret = "9b1174a6fb93bd7a831338f8e21db0db";

    static WeChatModule = null;

    public loginPlat = null;

    callback = null;

    access_token = null;

    WXtoken = {
        access_token: null,
        refresh_token: null,
        openid: null,
    };

    static getInstance() {

        if (!this._instance) {
            this._instance = new IOSSDK();
        }
        return this._instance;
    }

    //账号登入
    login(call, id, pw?) {
        if (id && pw) {
            let loginInfo = {
                account: id,
                type: pb.LoginType.MobilePhoneId,
                from: pb.AppFrom.IosAppleStore,
                // type: pb.LoginType.WeChat,
                // from: pb.AppFrom.Test,
                pwd: pw
            };

            HttpMgr.getInstance().loginWeb(id, loginInfo, call, () => {
                console.log('onLoginCodeHttpRequest err');
                // call && call();
            })
        }
    }

    loginServer(token) {

        let loginInfo = {
            account: token,
            type: this.loginPlat,
            //from: pb.AppFrom.WeChatMinProgram,
            // type: pb.LoginType.WeChat,
            from: pb.AppFrom.IosAppleStore,
            pwd: ''
        };

        HttpMgr.getInstance().loginWeb(token, loginInfo, this.callback, () => {
            console.log('onLoginCodeHttpRequest err');
        })
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

    // --调用oc 获取 ios的版本号  Version
    getVersionToOc() {
        var funcName = "getVersionName"
        var ret = jsb.reflection.callStaticMethod(this.className, "getVersionName", null)
        if (ret)
            return ret
        return 0
    }





    shareTextWx(text, type) {

        jsb.reflection.callStaticMethod("WeChatModule", "shareTextWx:andType:", text, type);

    }

    shareUrlWx(url, title, desc, type) {
        jsb.reflection.callStaticMethod("WeChatModule", "shareUrlWx:andTitle:andDesc:andType:", url, title, desc, type);
    }

    //微信登录
    loginWX1(call) {
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

                this.loginServer(result.access_token);

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
        if (result === false) {
            let msg = {
                ret: false,
                msg: '微信登录失败，' + codeMsg,
            };
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

            this.getUserInfo(result);
        })
    }

    onWxShareResultCallback(result, msg) {

    }

    onWxPayResultCallback(result, msg) {
        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, msg);
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

    getUserInfo(obj?) {
        let url;
        if (this.loginPlat == pb.LoginType.QQ) {

            let QQInfo = cc.sys.localStorage.getItem('QQInfo');
            if (!QQInfo) {
                url = 'https://graph.qq.com/user/get_user_info?access_token=' + obj.access_token
                    + 'oauth_consumer_key=1105791492&openid=' + obj.openid;
            }
        }
        else if (this.loginPlat == pb.LoginType.WeChat) {

            let WeChatInfo = cc.sys.localStorage.getItem('WeChatInfo');

            if (!WeChatInfo) {
                url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + obj.
                    access_token + '&openid=' + obj.openid;
            }

            if (url) {
                HttpUtils.loadRequest(url, null, (result) => {
                    console.log('wx getUserInfo 11' + result);

                    result = JSON.parse(result);

                    GameData.userName = result.nickname;

                    GameData.gender = result.sex || result.gender;

                    let headUrl = result.headimgurl || result.figureurl_1;

                    LoadImg.downloadRemoteImageAndSave(headUrl, (tex, sp) => {
                        console.log('downloadRemoteImageAndSave' + sp + ' ' + tex);
                        GameData.headimgurl = tex;
                        GameData.headImg = sp;
                        this.loginServer(obj.access_token);
                    }, true);

                })
            }
            else {

                this.loginServer(obj.access_token);
            }
        }

    }

    callWXPayToJava(appid, partnerid, prepayid, nonce_str, timestamp, sign) {

        var funcName = "payWx:appid:partnerid:prepayid:nonce_str:timestamp:sign:"

        var ret = jsb.reflection.callStaticMethod(this.className, funcName, appid,
            partnerid, prepayid, nonce_str, timestamp, sign)

    }


    //获取选择图片
    pickImage(type, needClip, clipSize, callback) {

        if (needClip == undefined) {
            needClip = false;
        }
        var clipX = 0, clipY = 0;

        if (clipSize) {
            clipX = 150;
            clipY = 150;
        }

        var dict = {
            needClip: needClip,
            clipX: clipX,
            clipY: clipY,
        }

        var methodName = 'pickImage';

        if (type == 1) {
            methodName = 'useSystemAlbum';
        }
        else if (type == 2) {
            methodName = 'useSystemCamera';
        }


        var ret = jsb.reflection.callStaticMethod(this.className, methodName, JSON.stringify(dict));

        if (ret) {
            callback && (callback(ret));
        }

    }

}
