import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    autoCallback = null;

    @property([cc.Label])
    labdes: cc.Label[] = [];

    alllv = 0.00;

    curlv = 0.00;

    huiheshu = 0;

    mrPrice = 0;

    viewData = null;

    rateItem = null;

    @property(cc.Node)
    findLayer: cc.Node = null;

    @property(cc.Node)
    fupanNode: cc.Node = null;

    @property(cc.Node)
    tipsBox: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.GAMEFUPAN, () => {
            if (GameCfg.GameType == pb.GameType.FenShi) {
                this.fupanNode.getComponent('FuPan').onShow(this.alllv);
                this.fupanNode.active = true;
            }
        }, this);

        GlobalEvent.on('onClickPosUpdateLabel', (index) => {
            if (index <= 0) { return };

            if (index <= 120) {
                this.tipsBox.x = this.node.width / 2 - 10 - this.tipsBox.width / 2;
            }
            else {
                this.tipsBox.x = -(this.node.width / 2 - 10 - this.tipsBox.width / 2);
            }
            this.tipsBox.active = true;

            this.tipsBox.getComponent('FSTipsBox').onShow(index);

        }, this);
    }

    onEnable() {
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        this.fupanNode.active = false;
        this.findLayer.active = false;
        this.tipsBox.active = false;
        this.huiheshu = 0;
        this.rateItem = null;
        this.mrPrice = 0;
        this.curlv = 0.00;
        this.alllv = 0.00;
        GameCfg.GAMEFUPAN = false;
        GameCfg.fill = [];

        this.viewData = GameCfg.data[0].data;
        this.setLabelData();

        if (GameCfg.GameSet.isAuto && !this.autoCallback) {

            this.autoCallback = setInterval(() => {

                this.curlv = this.getCurLv();

                if (GameCfg.fill[GameCfg.fill.length - 1] && !GameCfg.fill[GameCfg.fill.length - 1].end) {
                    GameCfg.fill[GameCfg.fill.length - 1].rate = this.curlv;
                }

                GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);

                this.setLabelData();

            }, GameCfg.GameSet.KSpeed * 1000);
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GAMEFUPAN);
        GlobalEvent.off('onClickPosUpdateLabel');
    }

    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'sys_back') {
            if (GameCfg.GAMEFUPAN) {
                GameCfg.GAMEFUPAN = false;
                this.node.parent.active = false;
                GlobalEvent.emit(EventCfg.LEAVEGAME);
            }
            else {
                PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                    this.alllv = (this.alllv + 1) * (this.curlv + 1) - 1;
                    this.curlv = 0.00;
                    this.autoCallback && (clearInterval(this.autoCallback));
                    this.autoCallback = null;
                    this.findLayer.active = true;
                    this.findLayer.getComponent('FSFinal').onShow(this.alllv);
                    this.labdes[0].string = (this.alllv * 100).toFixed(2) + '%';
                    if (this.alllv < 0) {
                        this.labdes[0].node.color = new cc.Color().fromHEX('#31a633');
                    }
                    else {
                        this.labdes[0].node.color = new cc.Color().fromHEX('#e94343');
                    }
                    this.labdes[1].string = (this.curlv * 100).toFixed(2) + '%';
                    if (this.curlv < 0) {
                        this.labdes[1].node.color = new cc.Color().fromHEX('#31a633');
                    }
                    else {
                        this.labdes[1].node.color = new cc.Color().fromHEX('#e94343');
                    }
                })
            }
        }

        //卖出
        else if (name == 'xl_btn_maichu') {
            event.target.active = false;
            this.curlv = this.getCurLv(1);

            if (GameCfg.fill[GameCfg.fill.length - 1]) {
                GameCfg.fill[GameCfg.fill.length - 1].rate = this.curlv;
                GameCfg.fill[GameCfg.fill.length - 1].end = GameCfg.huizhidatas - 1;
            }
            this.getAllLv();
            if (!GameCfg.GameSet.isAuto) {
                GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
            }

            this.setLabelData();

            this.mrPrice = 0;
        }

        //买入
        else if (name == 'xl_btn_mairu') {
            event.target.children[0].active = true;
            this.mrPrice = this.viewData[GameCfg.huizhidatas - 1].close;
            this.curlv = this.getCurLv();

            let start = GameCfg.huizhidatas;
            let sign = 1;
            this.rateItem = {
                rate: this.curlv,
                start: start,
                end: null,
                state: sign,
            };
            //   if (GameCfg.fill.length > 0 && GameCfg.fill[GameCfg.fill.length - 1].end) {
            GameCfg.fill.push(this.rateItem);
            // } else if (GameCfg.fill.length == 0) {
            //     GameCfg.fill.push(this.rateItem);
            // } else {
            //     GameCfg.fill[GameCfg.fill.length - 1].rate = this.curlv;
            // }
            if (!GameCfg.GameSet.isAuto) {
                GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
            }
            this.setLabelData();
        }

        else if (name == 'xl_btn_guanwang') {
            this.curlv = this.getCurLv();
            if (GameCfg.fill[GameCfg.fill.length - 1]) {
                GameCfg.fill[GameCfg.fill.length - 1].rate = this.curlv;
            }

            if (!GameCfg.GameSet.isAuto) {
                GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
            }
            this.setLabelData();
        }
    }

    getCurLv(num?) {
        if (!this.mrPrice) { return 0 }
        if (!num) { num = 0 }
        if (this.viewData[GameCfg.huizhidatas - num]) {
            let curClose = parseFloat(this.viewData[GameCfg.huizhidatas - num].close);
            return (curClose - this.mrPrice) / this.mrPrice;
        }
    }

    getAllLv() {
        if (!this.mrPrice) { return 0 }
        if (this.viewData[GameCfg.huizhidatas - 1]) {
            let curClose = parseFloat(this.viewData[GameCfg.huizhidatas - 1].close);
            let rate = (curClose - this.mrPrice) / this.mrPrice;
            this.curlv = 0.00;
            this.alllv = (this.alllv + 1) * (rate + 1) - 1;
        }
    }

    setLabelData() {
        this.labdes[0].string = (this.alllv * 100).toFixed(2) + '%';
        this.labdes[1].string = (this.curlv * 100).toFixed(2) + '%';
        if (this.curlv < 0) {
            this.labdes[1].node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.labdes[1].node.color = new cc.Color().fromHEX('#e94343');
        }

        if (this.alllv < 0) {
            this.labdes[0].node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.labdes[0].node.color = new cc.Color().fromHEX('#e94343');
        }

        let code = GameCfg.data[0].code;
        if ((code + '').length >= 7) {
            code = code.slice(1);
        }

        this.labdes[2].string = GameCfg.data[0].name + '    ' + code;
        this.huiheshu = (GameCfg.data[0].data.length - GameCfg.huizhidatas)
        this.labdes[3].string = '回合数：' + this.huiheshu;

        if (this.huiheshu <= 0) {
            this.autoCallback && (clearInterval(this.autoCallback));
            this.autoCallback = null;
            this.findLayer.active = true;
            this.alllv = (this.alllv + 1) * (this.curlv + 1) - 1;
            this.curlv = 0.00;
            this.findLayer.getComponent('FSFinal').onShow(this.alllv);
            this.labdes[0].string = (this.alllv * 100).toFixed(2) + '%';
            if (this.alllv < 0) {
                this.labdes[0].node.color = new cc.Color().fromHEX('#31a633');
            }
            else {
                this.labdes[0].node.color = new cc.Color().fromHEX('#e94343');
            }
            this.labdes[1].string = (this.curlv * 100).toFixed(2) + '%';
            if (this.curlv < 0) {
                this.labdes[1].node.color = new cc.Color().fromHEX('#31a633');
            }
            else {
                this.labdes[1].node.color = new cc.Color().fromHEX('#e94343');
            }
        }
    }

    onDisable() {
        this.autoCallback && (clearInterval(this.autoCallback));
        this.autoCallback = null;
    }

}
