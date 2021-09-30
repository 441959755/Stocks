import { pb } from "../../protos/proto";
import HttpUtils from "../common/net/HttpUtils";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    phoneNumber: cc.EditBox = null;

    @property(cc.EditBox)
    password: cc.EditBox = null;

    @property(cc.EditBox)
    authCode: cc.EditBox = null;

    @property(cc.Label)
    authCodeLabel: cc.Label = null;

    @property(cc.Toggle)
    toggle: cc.Toggle = null;

    pNum = null;

    pw = null;

    ac = null;

    cb = null;

    onLoad() {
        this.phoneNumber.node.on('editing-did-ended', edit => {
            let str = parseInt(edit.string);
            if (this.isPhoneNumber(str)) {
                this.pNum = str + '';
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的手机号有误，请重新输入');
                this.phoneNumber.string = '';
                return;
            }
        }, this);

        this.password.node.on('editing-did-ended', edit => {
            let str = edit.string;
            if (!str || str.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '密码不能为空！');
                this.password.string = '';
                return;
            }
            this.pw = str;
        }, this);

        this.authCode.node.on('editing-did-ended', edit => {
            let str = edit.string;
            if (!str || str.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '验证码不能为空！');
                this.authCode.string = '';
                return;
            }
            else {
                this.ac = str;
            }
        }, this);
    }

    onEnable() {
        this.authCodeLabel.string = '获取验证码';
        this.phoneNumber.string = '';
        this.password.string = '';
        this.authCode.string = '';
        this.pNum = null;
        this.ac = null;
        this.pw = null;
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'btnAuthCode') {
            this.getAuthCode();
        }

        else if (name == 'btnzc') {
            GlobalEvent.emit('openProtocol', '用户协议', 'http://www.cgdr168.com/user/decription1000.html');
        }

        else if (name == 'zccloseBtn') {
            this.node.active = false;
            this.node.parent.children[0].active = true;
        }

        else if (name == 'login_zc') {

            if (!this.pNum || this.pNum.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '手机号不能为空');
                return;
            }

            if (!this.pw || this.pw.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '密码不能为空！');
                return;
            }

            if (!this.ac || this.ac.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '验证码不能为空！');
                return;
            }

            if (!this.toggle) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '用户协议请知晓！');
                return;
            }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            let data1 = {
                account: this.pNum,
                type: pb.LoginType.MobilePhoneId,
                pwd: this.pw,
                smsCode: this.ac,
                from: pb.AppFrom.Test,
            }

            let url = 'http://test.chaogugame.com/r';
            let CmdRegistry = pb.CmdRegistry;
            let message = CmdRegistry.create(data1);
            let buff = CmdRegistry.encode(message).finish();

            HttpUtils.sendXHRAB(url, buff, (buf) => {

                let CmdLoginReply = pb.CmdLoginReply;
                let decoded = CmdLoginReply.decode(new Uint8Array(buf));

                if (decoded.err.err) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, decoded.err.err);
                    return;
                }

                GameData.account = this.pNum;
                GameData.password = this.pw;

                //登入游戏
                if (decoded) {
                    decoded.token && (GameData.token = decoded.token);
                    decoded.uid && (GameData.userID = decoded.uid);
                    if (decoded.gameAddr) {
                        socket = socket(decoded.gameAddr);
                    }
                }

            }, (err) => {
                console.log('获取短信验证码:' + JSON.stringify(err));
            });

        }
    }


    //获取验证码
    getAuthCode() {

        if (!this.pNum || this.pNum.length <= 0) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '手机号不能为空');
            return;
        }

        if (this.cb) {
            return;
        }

        let url = 'http://test.chaogugame.com/sms';

        // 获取短信验证码
        // message CmdGetSms {
        // 	string account = 1; // 玩家账号：手机号
        // 	string captcha = 2; // 图形码（区分机器人还是人类的图灵测试）
        // }
        let data = {
            account: this.pNum,
        }
        let CmdGetSms = pb.CmdGetSms;
        let message = CmdGetSms.create(data);
        let buff = CmdGetSms.encode(message).finish();

        HttpUtils.sendXHRAB(url, buff, (buf) => {

        }, (err) => {
            console.log('获取短信验证码:' + JSON.stringify(err));
        });

        let count = 60;

        this.cb = setInterval(() => {
            count--;
            this.authCodeLabel.string = '重新发送：' + count;
            if (count <= 0) {
                this.cb && (clearInterval(this.cb));
                this.cb = null;
                this.authCodeLabel.string = '获取验证码';
            }
        }, 1000);

    }


    //是否为手机号
    isPhoneNumber(tel) {
        var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        return reg.test(tel);
    }

    onDisable() {
        this.cb && (clearInterval(this.cb));
        this.cb = null;
    }


}
