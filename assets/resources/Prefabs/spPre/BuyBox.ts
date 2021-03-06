import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    codeLabel: cc.Label = null;

    @property(cc.EditBox)
    priceLabel: cc.EditBox = null;

    @property(cc.Label)
    mrslLabel: cc.Label = null;

    @property(cc.Label)
    kmgsLabel: cc.Label = null;

    @property(cc.Button)
    mrxdBtn: cc.Button = null;

    @property(cc.Node)
    btnSelecet: cc.Node = null;

    curData = null;

    kyzc = null;

    kmsl = null;

    cursl = null;

    onShow(data) {

        if (!data) {
            this.btnSelecet.active = true;
            this.priceLabel.string = '0';
        }
        else {
            this.curData = data;
            this.nameLabel.string = this.curData.name;
            this.codeLabel.string = this.curData.code;
            this.priceLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        this.mrslLabel.string = '0';

        if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
            this.kyzc = GameData.mncgDataList.account;
        }
        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            GameData.cgdsStateList.forEach(el => {
                if (el.id == GameData.SpStockData.id) {
                    this.kyzc = el.state.account;
                }
            })
        }

        if (!this.kyzc) {
            this.kmgsLabel.string = '0';
            this.kmsl = 0;
        }
        else {
            let num = parseInt(this.kyzc / 100 / this.curData.price + '');
            this.kmsl = num * 100;
            this.kmgsLabel.string = this.kmsl + '';
        }

        if (!this.kyzc || !this.kmsl) {
            this.mrxdBtn.interactable = false;
            this.mrxdBtn.enableAutoGrayEffect = true;
        }
        else {
            this.mrxdBtn.interactable = true;
            this.mrxdBtn.enableAutoGrayEffect = false;
        }
    }

    onBtnClick(event) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
        //??????????????????  ???
        else if (name == 'sp_znxg_sub') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            this.curData.price -= 0.01;
            this.priceLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        else if (name == 'sp_znxg_add') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            this.curData.price += 0.01;
            this.priceLabel.string = ComUtils.changeTwoDecimal(this.curData.price) + '';
        }

        //????????????
        else if (name == 'sp_znxg_subd') {

            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }

            if (this.cursl > this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }

            if (!this.cursl) {
                return;
            }
            this.cursl -= 100;
            this.mrslLabel.string = this.cursl + '';
        }

        else if (name == 'sp_znxg_addd') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }

            if (this.cursl + 100 > this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }

            this.cursl += 100;
            this.mrslLabel.string = this.cursl + '';

        }
        //??????
        else if (name == 'sp_znxg_qc') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            this.cursl = this.kmsl;
            this.mrslLabel.string = this.cursl + '';
        }
        //1/2
        else if (name == 'sp_znxg_fc1') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            if (!this.kmsl) { return };
            let num = parseInt(this.kmsl / 100 / 2 + '') * 100;
            this.cursl = num;
            this.mrslLabel.string = this.cursl + '';

        }
        //1/3
        else if (name == 'sp_znxg_fc2') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            if (!this.kmsl) { return };
            let num = parseInt(this.kmsl / 100 / 3 + '') * 100;
            this.cursl = num;
            this.mrslLabel.string = this.cursl + '';
        }
        //1/4
        else if (name == 'sp_znxg_fc3') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            if (!this.kmsl) { return };
            let num = parseInt(this.kmsl / 100 / 4 + '') * 100;
            this.cursl = num;
            this.mrslLabel.string = this.cursl + '';
        }
        //????????????
        else if (name == 'sp_znxg_mrxd') {
            if (!this.kmsl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '???????????????????????????????????????');
                return;
            }
            if (!this.cursl) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '????????????????????????');
                return;
            }
            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            let info = {
                code: this.curData.code,
                type: pb.OrderType.AskLimit,
                price: this.curData.price,
                volume: this.cursl,
                uid: GameData.userID,
                amount: this.curData.price * this.cursl,
                id: GameData.SpStockData.id || 0,
            }
            let CmdStockOrder = pb.CmdStockOrder;
            let message = CmdStockOrder.create(info);
            let buff = CmdStockOrder.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_Order, buff, (res) => {
                console.log('??????????????????:' + JSON.stringify(res));
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                if (res.orderId) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '??????????????????!');
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result.err);
                }
            })

        }

    }

}
