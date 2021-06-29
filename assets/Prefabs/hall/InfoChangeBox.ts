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

    @property(cc.Node)
    content: cc.Node = null;

    location = '';

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.Toggle)
    toggle2: cc.Toggle = null;


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
            this.location = '';
            let items = GameData.location.split(' ');
            this.initLocation(items);
        }, this);
    }

    initLocation(items) {
        let nodes = this.content.children;

        for (let index = 0; index < nodes.length; index++) {
            let str = nodes[index].children[0].children[0].getComponent(cc.Label).string;
            if (str == items[0]) {
                nodes[index].children[0].children[1].active = true;
                let arr = nodes[index].children;
                if (items[1]) {
                    for (let t = 1; t < arr.length; t++) {
                        let str = arr[t].children[0].getComponent(cc.Label).string;
                        if (str == items[1]) {
                            arr[t].children[1].active = true;
                        } else {
                            arr[t].children[1].active = false;
                        }
                        arr[t].active = false;
                    }
                }

            } else {
                nodes[index].children[0].children[1].active = false;
            }
        }
    }

    start() {

    }

    onEnable() {
        if (GameData.gender == 1) {
            this.toggle1.isChecked = true;
            this.toggle2.isChecked = false;
        } else {
            this.toggle2.isChecked = true;
            this.toggle1.isChecked = false;
        }
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

        else if (name == 'node') {
            this.selectLocation(event.target);
        }

    }

    selectLocation(node) {
        let nodes = node.parent.children;

        let str = this.location.split(' ');


        if (str[0] != '' && str.length == 1) {
            if (node.children[0].getComponent(cc.Label).string == this.location) {
                nodes.forEach((element, index) => {
                    if (index != 0 && element.active) {
                        element.active = false;
                    }
                    else if (index != 0 && !element.active) {
                        element.active = true;
                    }

                });
                let nodes1 = this.content.children;
                for (let index = 0; index < nodes1.length; index++) {
                    let str1 = nodes1[index].children[0].children[0].getComponent(cc.Label).string;
                    if (str1 == str[0]) {
                        this.location = '';
                    }
                }
                return;
            }
            this.location += ' ' + node.children[0].getComponent(cc.Label).string;
            node.children[1].active = true;

            this.content1.active = false;
            this.content2.active = false;
            this.content3.active = false;
            this.layer.active = false;
            GameData.location = this.location;
            let data = {
                uid: GameData.userID,
                location: GameData.location,
            }

            let id = pb.MessageId.Req_Hall_EditLocation;
            this.onSendMessage(id, data);
        }
        else if (str[0] == '') {
            this.location = node.children[0].getComponent(cc.Label).string;
            node.children[1].active = true;

            nodes.forEach(element => {
                element.active = true;
            });
        } else {
            nodes.forEach((element, index) => {
                if (index != 0 && element.active) {
                    element.active = false;
                }
                else if (index != 0 && !element.active) {
                    element.active = true;
                }

            });
        }

        let items = this.location.split(' ');
        this.initLocation(items);
    }

    onChangeUserGender(index) {
        let str;
        if (index == 1) {
            str = '1';
        } else {
            str = '0';
        }
        this.content1.active = false;
        this.content2.active = false;
        this.content3.active = false;
        this.layer.active = false;
        GameData.gender = str;
        let data = {
            uid: GameData.userID,
            gender: GameData.gender,
        }
        let id = pb.MessageId.Req_Hall_EditGender;
        this.onSendMessage(id, data);

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
