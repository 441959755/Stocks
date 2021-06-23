import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import { pb } from "../../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content1: cc.Node = null;

    @property(cc.Node)
    content2: cc.Node = null;

    @property(cc.Node)
    content3: cc.Node = null;

    @property(cc.Node)
    layer: cc.Node = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Label)
    title: cc.Label = null;


    onLoad() {
        this.content1.active = false;
        this.content2.active = false;
        this.content3.active = false;
        this.layer.active = false;
        GlobalEvent.on('openChangeUserNameLayer', () => {
            this.layer.active = true;
            this.content1.active = true;
            this.title.string = '修改昵称';
        }, this);

        GlobalEvent.on('openChangeGenderLayer', () => {
            this.layer.active = true;
            this.content2.active = true;
            this.title.string = '修改性别';
        }, this);

        GlobalEvent.on('openChangeLocationLayer', () => {
            this.layer.active = true;
            this.content3.active = true;
            this.title.string = '选择地区';
        }, this);
    }

    start() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        let index = parseInt(data);
        if (name == 'tckCloseBtn') {
            this.content1.active = false;
            this.content2.active = false;
            this.content3.active = false;
            this.layer.active = false;
        }
        else if (name == 'btnSubmit') {
            this.onChangeUsetName();
        }

        else if (index == 1 || index == 2) {
            this.onChangeUserGender(index);
        }

        else if (name == 'item') {

        }

    }

    onChangeUserGender(index) {

    }

    onChangeUsetName() {
        let v = this.editBox.string;
        if (this.testTestlength(v)) {

            let data = {
                uid: GameData.userID,
                nick: v,
            }

            let id = pb.MessageId.Req_Hall_EditNick;

            this.onSendMessage(id, data, () => {
                this.content1.active = false;
                this.content2.active = false;
                this.content3.active = false;
                this.layer.active = false;
                GameData.userName = v;
            });
        }
    }

    onSendMessage(id, data, call?) {

        socket.send(id, PB.onCmdEditInfoConvertToBuff(data), (info) => {
            console.log('onCmdEditInfoConvertToBuff:' + JSON.stringify(info));
            if (!info) {
                call && (call())
            } else {
                console.log(info.code + info.err);
            }

        })
    }

    testTestlength(v) {
        if (v == GameData.userName) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的昵称不要跟以前的一样');
            return false;
        }

        let flag = 1;
        //[\u4e00-\u9fa5]为汉字的unicode编码，/i表示匹配的时候不区分大小写。
        var rx = /[a-z\d]/i, rxcn = /[\u4e00-\u9fa5]/, num = 0, chr;


        for (var i = 0, j = v.length; i < j; i++) {

            chr = v.charAt(i);

            if (rx.test(chr)) num += 1;

            else if (rxcn.test(chr)) num += 2;

            else {
                flag = 3;
                break;
            }
        }
        if (flag != 3) {
            if (num > 12) {
                // console.log(" * 长度最多为6个汉字或12个字母数字！")
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '昵称长度最多为6个汉字或12个字母数字！');
                return false;
            }
            else if (num < 1) {

                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的昵称不能为空！');
                return false;
            }
            return true;
        }
        else {

            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '输入的昵称不能包含特殊符号！');
            return false;
        }

    }

    onDestroy() {
        GlobalEvent.off('openChangeUserNameLayer');
        GlobalEvent.off('openChangeGenderLayer');
        GlobalEvent.off('openChangeLocationLayer');

    }

}
