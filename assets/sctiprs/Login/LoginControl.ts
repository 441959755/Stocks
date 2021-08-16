
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";
import LLWSDK from "../common/sdk/LLWSDK";
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

    @property(cc.Node)
    password: cc.EditBox = null;  //密码

    @property(cc.Toggle)
    zcToggle: cc.Toggle = null;  //

    start() {

        //web 本地测试
        if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WEB) {
            this.tipsLabel.string = '会员登入';
            this.onShowNode(this.dlNode);
            setTimeout(() => {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '当前为测试版本，输入任意账号即可');
            }, 300)
        }
        else {
            //其他平台登入TODO
        }

        cc.director.preloadScene('Login', () => {
            console.log('Login 场 景 加 载 完 成');
        })

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
            let uid = this.account.string;
            console.log('登入账号：' + uid);
            this.loginServer(uid);
        }

        //点击注册
        else if (name == 'login_zc') {

        }

    }

    loginServer(uid) {

        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        // 接DSK
        let llwSDK = LLWSDK.getSDK()
        llwSDK.login((decoded) => {
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
        }, uid);
    }
}
