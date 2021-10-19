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

    @property([cc.Label])
    labs: cc.Label[] = [];

    _code = null;

    items = null;

    onLoad() {
        GlobalEvent.on('UPDATEITEMDATA', (info) => {
            if (this._code == info.code) {
                this.setLabel(info);
            }
        }, this);
    }

    onShow(data?, info?) {
        if ((!this._code || this._code != data) && data) {

            if (data) {
                this._code = data;
            }

            this.items = GameCfgText.getGPPKItemInfo(this._code);

            if (this.items) {
                this.labs[1].string = this.items[1];
            }

            let code = this._code + '';

            if (code.length >= 7) {
                code = code.slice(1);
            }
            this.labs[0].string = code;

            info && (this.setLabel(info));
        }
    }

    setLabel(info) {

        this.labs[2].string = ComUtils.changeTwoDecimal(info.price) + '';

        let zd = info.price - info.close;
        if (zd < 0) {
            this.labs[3].node.color = new cc.Color().fromHEX('#31a633');
            this.labs[4].node.color = new cc.Color().fromHEX('#31a633');
            this.labs[5].node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.labs[3].node.color = new cc.Color().fromHEX('#e94343');
            this.labs[4].node.color = new cc.Color().fromHEX('#e94343');
            this.labs[5].node.color = new cc.Color().fromHEX('#e94343');
        }

        this.labs[3].string = ComUtils.changeTwoDecimal(zd) + '';
        let zdf = zd / info.close * 100;
        this.labs[4].string = ComUtils.changeTwoDecimal(zdf) + '%';
        this.labs[5].string = ComUtils.changeTwoDecimal(info.open) + '';
        this.labs[6].string = ComUtils.changeTwoDecimal(info.close) + '';
        this.labs[7].string = ComUtils.changeTwoDecimal(info.high) + '';
        this.labs[8].string = ComUtils.changeTwoDecimal(info.low) + '';
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //看信号买卖
        if (name == 'item') {

            if (this.items[3] != 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '该股票已退市');
                return;
            }

            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._code);
        }
        //删除
        else if (name == 'sp_btn_shanchu') {
            let id = 0;
            if (GameData.SpStockData && GameData.SpStockData.id) {
                id = GameData.SpStockData.id;
            }

            let info = {
                removed: true,
                code: this._code,
                isAiStock: false,
                id: id,
            }

            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();
            socket.send(pb.MessageId.Req_Game_MncgEditStockList, buff, (res) => {

            })

            if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
                let index = GameData.selfStockList.indexOf(this._code);
                GameData.selfStockList.splice(index, 1);

            }
            else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
                GameData.cgdsStockList.forEach(el => {
                    if (el.id == GameData.SpStockData.id) {
                        let index = el.stockList.indexOf(this._code);
                        el.stockList.splice(index, 1);
                    }
                })
            }

            GlobalEvent.emit(EventCfg.ADDZXGP);

        }
    }
}
