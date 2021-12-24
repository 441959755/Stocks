import { pb } from "../../../protos/proto";
import GameData from "../../GameData";
import EventCfg from "../../Utils/EventCfg";
import GlobalEvent from "../../Utils/GlobalEvent";
import LoadImg from "../../Utils/LoadImg";
import LLWConfig from "../config/LLWConfig";
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

    appSecret = "9b1174a6fb93bd7a831338f8e21db0db";

    static _instance = null;

    static WeChatModule = null;

    public loginPlat = null;

    photoCallback = null;

    className = 'org/cocos2dx/javascript/AppActivity';

    callback = null;

    access_token = null;

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

    //账号登入
    login(call, id, pw?) {

        if (id && pw) {
            let loginInfo = {
                account: id,
                type: pb.LoginType.MobilePhoneId,
                //  from: pb.AppFrom.Android_001,
                from: LLWConfig.FROM,
                pwd: pw
            };

            HttpMgr.getInstance().loginWeb(id, loginInfo, call, (err) => {
                console.log('onLoginCodeHttpRequest err' + err);
            })
        }
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
        } else {
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

    // --调用java QQ登录接口
    callQqLoginToJava(call?) {

        this.callback = call;

        let RefreshToken = cc.sys.localStorage.getItem(QQRefreshToken);

        if (RefreshToken) {

            let access_token = JSON.parse(RefreshToken).access_token;

            this.loginPlat = pb.LoginType.QQ;

            console.log(JSON.stringify(access_token));
            this.loginServer(access_token);
            console.log(access_token);
        } else {
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
        setTimeout(() =>
            jsb.reflection.callStaticMethod(this.className, funcName, sigs, str)
            , 100);
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

        this.access_token = data.access_token;

        //  this.getUserInfo(data);

    }

    getQQInfo(result) {
        console.log("登录回调:" + result);
        // let userInfoString = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getQQInfo", "()Ljava/lang/String;");
        // console.log('getQQInfo' + userInfoString);

        setTimeout(() => {
            result = JSON.parse(result);

            GameData.userName = result.nickname;

            GameData.gender = result.sex || result.gender;

            let headUrl = result.headimgurl || result.figureurl_1;

            LoadImg.downloadRemoteImageAndSave(headUrl, (tex, sp) => {
                console.log('downloadRemoteImageAndSave' + sp + ' ' + tex);
                GameData.headimgurl = tex;
                GameData.headImg = sp;
                this.loginServer(this.access_token);
            }, true);
        }, 1000);
    }

    loginServer(token) {

        let loginInfo = {
            account: token,
            type: this.loginPlat,
            //from: pb.AppFrom.WeChatMinProgram,
            // type: pb.LoginType.WeChat,
            // from: pb.AppFrom.Test,
            from: LLWConfig.FROM,
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
                    + 'oauth_consumer_key=1105791492&openid=' + obj.openid;
            }
        } else if (this.loginPlat == pb.LoginType.WeChat) {

            let WeChatInfo = cc.sys.localStorage.getItem('WeChatInfo');

            if (!WeChatInfo) {
                url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + obj.access_token + '&openid=' + obj.openid;
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
            } else {

                this.loginServer(obj.access_token);
            }
        }

    }


    callWXPayToJava(appid, partnerid, prepayid, nonce_str, timestamp, sign) {

        var funcName = "payWx"

        var sigs = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"

        console.log(appid + nonce_str + partnerid + prepayid + timestamp + sign);
        jsb.reflection.callStaticMethod(this.className, funcName, sigs, appid, partnerid, prepayid, nonce_str, timestamp, sign)

    }

    //获取选择图片
    pickImage(type, call) {
        //  this.photoCallback=call;
        // this.photoCallback&&(this.photoCallback(null));

        //
        // let tmpPath = jsb.fileUtils.getWritablePath() + 'tmpPhoto.jpg';
        //
        if (type == 1) {
            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AvatarManager', 'openGallery', '(Ljava/lang/String;)V', 'yourKey')
            // jsb.reflection.callStaticMethod(
            //     'org/cocos2dx/javascript/DeviceModule',
            //     "selectPhoto",
            //     "(Ljava/lang/String;)V",
            //     tmpPath);
        } else if (type == 2) {
            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AvatarManager', 'openCamera', '(Ljava/lang/String;)V', 'yourKey')
            //  jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AvatarManager', 'openCamera', '(Ljava/lang/String;)V', 'yourKey')
        }
    }

    //选择相册回调
    selectPhotoCallback(path) {

        //先释放原来的同名图片
        cc.loader.load(path, (err, tex) => {
            if (err) {
                cc.error(err);
            } else {
                console.log('选择相册回调' + tex);
                //  var spriteFrame = new cc.SpriteFrame(tex);

                this.photoCallback && (this.photoCallback(tex));
            }
        });

    }

}

