import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    downBoxs: cc.Node[] = [];

    @property([cc.Node])
    contents: cc.Node[] = [];

    @property(cc.EditBox)
    editbox: cc.EditBox = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property([cc.Label])
    boxsLa: cc.Label[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];


    onLoad() {

        this.editbox.node.on('editing-did-ended', (edit) => {
            let str = edit.string;
            if (str == '') {
                this.editbox.string = '随机选股';
                return;
            }
            let datas = GameCfgText.stockList;
            let flag = false,
                tt = [];
            for (let i = 0; i < datas.length; i++) {
                let arr1 = datas[i].split('|');
                let str1 = arr1[0];
                if (arr1[0].length >= 7) {
                    str1 = arr1[0].slice(1);
                }
                if (tt.length >= 100) {
                    break;
                }
                if (str1.indexOf(str) != -1) {
                    tt.push(datas[i]);
                    flag = true;
                    //  break;
                } else if (arr1[1].indexOf(str) != -1) {
                    tt.push(datas[i]);
                    flag = true;
                    //  break;
                }
            }
            if (!flag) {

                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有找查到您要的股票.');
                this.editbox.string = '随机选股';

            } else {

                this.contents[4].removeAllChildren();
                this.downBoxs[4].active = true;

                for (let i = 0; i < tt.length; i++) {
                    let arr = tt[i].split('|');
                    let str = arr[0];
                    if (arr[0].length >= 7) {
                        str = arr[0].slice(1);
                    }
                    if (i == 0) {
                        this.editbox.string = str + '  ' + arr[1];
                        GameData.FSSet.search = arr[0];
                        this.checkCond();
                    }
                    let node = cc.instantiate(this.item);
                    this.contents[4].addChild(node);
                    node.getComponent(cc.Label).string = str + '  ' + arr[1];
                }
            }
        }, this);

    }


    onEnable() {

        this.editbox.string = '随机选股';
        let f = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
        let y = f.getFullYear() + '';
        let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
        let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

        this.boxsLa[0].string = y;
        this.boxsLa[1].string = m + '';
        this.boxsLa[2].string = d + '';

        if (!GameData.FSSet.isAuto) {
            this.toggles.forEach(el => {
                el.isChecked = false;
            })
        }
        else {
            this.toggles[3].isChecked = true;
            this.toggles[2].isChecked = false;
            this.toggles[1].isChecked = false;
            this.toggles[0].isChecked = false;
            if (GameData.FSSet.KSpeed == 0.2) {
                this.toggles[0].isChecked = true;
            }
            else if (GameData.FSSet.KSpeed == 0.5) {
                this.toggles[1].isChecked = true;
            }
            else {
                this.toggles[2].isChecked = true;
            }
        }

        this.checkTime();

    }

    checkTime() {
        let f = new Date();

        let y = f.getFullYear() + '';
        let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
        let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

        let f1 = new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000);

        let y1 = f1.getFullYear() + '';
        let m1 = f1.getMonth() + 1 >= 10 ? f1.getMonth() + 1 : '0' + (f1.getMonth() + 1);
        let d1 = f1.getDate() >= 10 ? f1.getDate() : '0' + f1.getDate();

        this.contents[1].children.forEach((el, index) => {
            el.getComponent(cc.Label).string = parseInt(y) - index + '';
            el.color = cc.Color.WHITE;
            el.getComponent(cc.Button).interactable = true;
            el.getComponent(cc.Button).enableAutoGrayEffect = false;
            if (el.getComponent(cc.Label).string < y1 || el.getComponent(cc.Label).string > y) {
                el.color = new cc.Color().fromHEX('#a0a0a0');
                el.getComponent(cc.Button).interactable = false;
                el.getComponent(cc.Button).enableAutoGrayEffect = true;
            }
        })

        let yt = y1 + m1;

        let xt = y + m;

        this.contents[2].children.forEach((el, index) => {

            if (this.boxsLa[0].string == '随机') {
                el.color = new cc.Color().fromHEX('#a0a0a0');
                el.getComponent(cc.Button).interactable = false;
                el.getComponent(cc.Button).enableAutoGrayEffect = true;
            }
            else {
                el.color = cc.Color.WHITE;
                el.getComponent(cc.Button).interactable = true;
                el.getComponent(cc.Button).enableAutoGrayEffect = false;
                if (this.boxsLa[0].string + el.getComponent(cc.Label).string > xt) {
                    el.color = new cc.Color().fromHEX('#a0a0a0');
                    el.getComponent(cc.Button).interactable = false;
                    el.getComponent(cc.Button).enableAutoGrayEffect = true;
                }

                else if (this.boxsLa[0].string + el.getComponent(cc.Label).string < yt) {
                    el.color = new cc.Color().fromHEX('#a0a0a0');
                    el.getComponent(cc.Button).interactable = false;
                    el.getComponent(cc.Button).enableAutoGrayEffect = true;
                }
            }
        })

        yt = y1 + m1 + d1;

        xt = y + m + d;

        this.contents[3].children.forEach((el, index) => {
            if (this.boxsLa[0].string == '随机') {
                el.color = new cc.Color().fromHEX('#a0a0a0');
                el.getComponent(cc.Button).interactable = false;
                el.getComponent(cc.Button).enableAutoGrayEffect = true;
            } else {
                el.color = cc.Color.WHITE;
                el.getComponent(cc.Button).interactable = true;
                el.getComponent(cc.Button).enableAutoGrayEffect = false;
                if (this.boxsLa[0].string + this.boxsLa[1].string + el.getComponent(cc.Label).string > xt) {
                    el.color = new cc.Color().fromHEX('#a0a0a0');
                    el.getComponent(cc.Button).interactable = false;
                    el.getComponent(cc.Button).enableAutoGrayEffect = true;
                }

                else if (this.boxsLa[0].string + this.boxsLa[1].string + el.getComponent(cc.Label).string < yt) {
                    el.color = new cc.Color().fromHEX('#a0a0a0');
                    el.getComponent(cc.Button).interactable = false;
                    el.getComponent(cc.Button).enableAutoGrayEffect = true;
                }
            }

        })
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            GameCfg.GameType = null;
            this.node.active = false;
        }

        else if (name == 'sys_helpbig1') {
            GlobalEvent.emit(EventCfg.OPENHELPLAYER);
        }

        else if (name == 'setTJDBtn') {
            GlobalEvent.emit(EventCfg.OPENSETLAYER);
        }

        //开始游戏
        else if (name == 'startFSBtn') {
            this.onStartGame();
        }

        else if (name == 'selectBtn2') {
            let index = parseInt(curdata);
            this.downBoxs[index - 1].active = true;
        }

        else if (name == 'DCnode') {
            event.target.parent.active = false;
        }

        else if (name == 'item') {
            if (curdata == 1) {
                this.editbox.string = event.target.getComponent(cc.Label).string;
                this.checkCond();
            }
            else if (curdata == 2) {
                this.boxsLa[0].string = event.target.getComponent(cc.Label).string;
                this.checkTime();
            }
            else if (curdata == 3) {
                this.boxsLa[1].string = event.target.getComponent(cc.Label).string;
                this.checkTime();
            }

            else if (curdata == 4) {
                this.boxsLa[2].string = event.target.getComponent(cc.Label).string;
                this.checkTime();
            }
            this.downBoxs.forEach(el => {
                el.active = false;
            })
        }

    }

    //检查条件是否满足
    checkCond() {
        let str = this.editbox.string;
        let datas = str.trim().split(/\s+/);
        let times = GameCfgText.getTimeByCodeName1(datas[0]);
        if (!times) { return }
        if (times.end < ComUtils.fromatTime1((new Date().getTime() - 14 * 24 * 60 * 60 * 1000) / 1000)) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有最新能两周数据');
            this.editbox.string = '随机选股';
        }
    }


    onToggleClick(event, curData) {

        this.toggles[0].isChecked = false;
        this.toggles[1].isChecked = false;
        this.toggles[2].isChecked = false;
        this.toggles[3].isChecked = true;

        if (curData == 1) {
            GameData.FSSet.KSpeed = 0.2;
        }

        else if (curData == 2) {
            GameData.FSSet.KSpeed = 0.5;
        }

        else if (curData == 3) {
            GameData.FSSet.KSpeed = 1;
        }
        else {
            if (GameData.FSSet.KSpeed == 0.2) {
                this.toggles[0].isChecked = true;
            }
            else if (GameData.FSSet.KSpeed == 0.5) {
                this.toggles[1].isChecked = true;
            }
            else if (GameData.FSSet.KSpeed == 1) {
                this.toggles[2].isChecked = true;
            }
        }

    }

    onStartGame() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let ktype = pb.KType.Min;

        let tDate = this.boxsLa[0].string + this.boxsLa[1].string + this.boxsLa[2].string;

        let ts = ComUtils.getTimestamp(tDate);

        let curDate = new Date(ts * 1000);
        let hour = curDate.getHours();

        let from, to, code;
        let time = curDate.getTime() - (hour) * 60 * 60 * 1000;
        from = parseInt(new Date(time).getTime() / 1000 + '');
        to = parseInt(curDate.getTime() / 1000 + '');

        let items;
        if (this.editbox.string == '随机选股') {
            items = GameCfgText.getItemsByTime1();
            code = items[0];
        }

        let info1 = {
            ktype: ktype,
            code: code,
            to: to,
            from: from,
        }

        socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1), info => {
            GameCfg.GameSet = GameData.FSSet;
            console.log('分数据：' + JSON.stringify(info));
            GameData.huizhidatas = 1;
            GameCfg.huizhidatas = 1;
            GlobalEvent.emit(EventCfg.OPENGAMEFENSHI);
        })

    }

}
