
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Node)
    notice: cc.Node = null;  //通知内容节点

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

        //web 本地测试
        if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WEB) {
            this.tipsLabel.string = '会员登入';
            this.onShowNode(this.dlNode);
            setTimeout(() => {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '当前为测试版本，输入任意账号即可');
            }, 500)
        }
        else {
            //其他平台登入TODO
        }
    }

    onShowNode(node) {
        this.notice.active = false;
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
            this.loginServer();
        }
        //qq登入
        else if (name == 'login_qqdl') {
            if (llwSDK.isInstallQq) {

                llwSDK.callQqLoginToJava(this.loginResultCallback.bind(this));
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '检查是否安QQ');
            }

        }
        //微信登入
        else if (name == 'login_wxdl') {
            llwSDK.loginWX1(this.loginResultCallback.bind(this));
        }
    }

    //获取token
    loginServer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let uid = this.account.string;
        let pw = this.password.string;
        console.log('登入账号：' + uid);
        llwSDK.login(this.loginResultCallback.bind(this), uid, pw);
    }

    //登入游戏
    loginResultCallback(decoded) {
        console.log(decoded.token + decoded.uid + decoded.gameAddr);
        if (decoded) {
            decoded.token && (GameData.token = decoded.token);
            decoded.uid && (GameData.userID = decoded.uid);
            if (decoded.gameAddr) {
                socket = socket(decoded.gameAddr);
            }
        } else {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '网络连接错误，请检查网络是否连接.');
        }
    }
}
