
import LLWSDK from "../common/sdk/LLWSDK";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import Socket from "../common/net/Socket";
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Node)
    dlNode: cc.Node = null;  //登入节点

    @property(cc.Node)
    zhNode: cc.Node = null;  //找回账号节点

    @property(cc.Node)
    zcNode: cc.Node = null;  //注册账号节点

    @property(cc.EditBox)
    account: cc.EditBox = null;  //账号输入框

    @property(cc.EditBox)
    password: cc.EditBox = null;  //密码

    @property(cc.Toggle)
    zcToggle: cc.Toggle = null;  //

    start() {

        GlobalEvent.emit(EventCfg.LOADINGHIDE);


        //微信小程序
        if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
            console.log('微信小程序');
            LLWSDK.getSDK().login(this.loginResultCallback.bind(this));
        }
        else {
            this.tipsLabel.string = '会员登入';

            this.onShowNode(this.dlNode);

            let acc = cc.sys.localStorage.getItem('ACCOUNT');

            if (acc) {
                this.account.string = acc;
            }

            let pass = cc.sys.localStorage.getItem('PASSWORD');

            if (pass) {
                this.password.string = pass;
            }
        }

    }

    onShowNode(node) {
        this.dlNode.active = false;
        this.zhNode.active = false;
        this.zcNode.active = false;
        node.active = true;
    }

    onBtnclick(event, data) {

        let name = event.target.name;

        //忘记密码
        if (name == 'btnwjmm') {
            this.tipsLabel.string = '忘记密码';
            this.onShowNode(this.zhNode);
        }

        //注册账号
        else if (name == 'btnzc') {
            this.tipsLabel.string = '注册账号';
            this.onShowNode(this.zcNode);
        }

        //点击登入
        else if (name == 'login_dl') {
            if (this.password.string == '' || this.account.string == '') {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '账号或密码不能为空');
                return;
            }
            else {
                this.loginServer();
            }

        }

        //qq登入
        else if (name == 'login_qqdl') {
            if (LLWSDK.getSDK().isInstallQq) {
                LLWSDK.getSDK().callQqLoginToJava(this.loginResultCallback.bind(this));
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '检查是否安QQ');
            }
        }

        //微信登入
        else if (name == 'login_wxdl') {
            LLWSDK.getSDK().loginWX1(this.loginResultCallback.bind(this));
        }
    }

    //获取token
    loginServer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let uid = this.account.string;
        let pw = this.password.string;
        cc.sys.localStorage.setItem('ACCOUNT', uid);
        cc.sys.localStorage.setItem('PASSWORD', pw);
        LLWSDK.getSDK().login(this.loginResultCallback.bind(this), uid, pw);
    }

    //登入游戏
    loginResultCallback(decoded) {

        if (decoded.err.err) {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, decoded.err.err);
            return;
        }
        console.log(decoded.token + decoded.uid + decoded.gameAddr);

        if (decoded) {

            decoded.token && (GameData.token = decoded.token);
            decoded.uid && (GameData.userID = decoded.uid);
            if (decoded.gameAddr) {
                window.socket = new Socket(decoded.gameAddr);
            }

        } else {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '网络连接错误，请检查网络是否连接.');
        }
    }
}
