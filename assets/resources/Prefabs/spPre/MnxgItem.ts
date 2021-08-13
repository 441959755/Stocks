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

    onEnable() {
        //进来获取的第一条行情
        GlobalEvent.on(EventCfg.CMDQUOTITEM, (info) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            if (!info.items || info.items.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空');
                return;
            }
            if (info.items[0].code == this._code) {
                this.setLabel(info.items[0]);
            }
        })

        //订阅时时行情
        GlobalEvent.on(EventCfg.SYNCQUOTEITEM, (data) => {
            if (data.code == this._code) {
                this.setLabel(data);
            }
        }, this);

        //订阅
        this.CmdQuoteSubscribe(true);

    }

    onShow(data?) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        if (data) {
            this._code = data;
        }

        //获取行情
        {
            let info1 = {
                ktype: pb.KType.Min,
                code: this._code,
                to: parseInt((new Date().getTime()) / 1000 + ''),
                total: 1,
            }
            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1));
            console.log('info:' + JSON.stringify(info1));
        }

        //订阅
        this.CmdQuoteSubscribe(true);
        this.items = GameCfgText.getGPPKItemInfo(this._code);

        if (this.items) {
            this.labs[1].string = this.items[1];
        }

        let code = this._code + '';

        if (code.length >= 7) {
            code = code.slice(1);
        }
        this.labs[0].string = code;
    }

    setLabel(info) {

        this.labs[2].string = ComUtils.changeTwoDecimal(info.price) + '';

        let zd = info.price - info.close;
        if (zd < 0) {
            this.labs[3].node.color = cc.Color.GREEN;
            this.labs[4].node.color = cc.Color.GREEN;
            this.labs[5].node.color = cc.Color.GREEN;
        }
        else {
            this.labs[3].node.color = cc.Color.RED;
            this.labs[4].node.color = cc.Color.RED;
            this.labs[5].node.color = cc.Color.RED;
        }

        this.labs[3].string = ComUtils.changeTwoDecimal(zd) + '';
        let zdf = zd / info.close * 100;
        this.labs[4].string = ComUtils.changeTwoDecimal(zdf) + '%';
        this.labs[5].string = ComUtils.changeTwoDecimal(info.open) + '';
        this.labs[6].string = ComUtils.changeTwoDecimal(info.close) + '';
        this.labs[7].string = ComUtils.changeTwoDecimal(info.high) + '';
        this.labs[8].string = ComUtils.changeTwoDecimal(info.low) + '';
    }


    onDisable() {
        this.CmdQuoteSubscribe(false);
        GlobalEvent.off(EventCfg.CMDQUOTITEM);
        GlobalEvent.off(EventCfg.SYNCQUOTEITEM);
    }

    CmdQuoteSubscribe(flag) {
        if (!this._code) { return }
        let info = {
            items: [{ code: this._code + '', flag: flag }],
        }

        console.log('订阅：' + JSON.stringify(info));
        let CmdQuoteSubscribe = pb.CmdQuoteSubscribe;
        let message = CmdQuoteSubscribe.create(info);
        let buff = CmdQuoteSubscribe.encode(message).finish();

        socket.send(pb.MessageId.Req_QuoteSubscribe, buff, info => {
            console.log('订阅：' + JSON.stringify(info));

        })
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
                        // arr = el.stockList;
                        let index = el.stockList.indexOf(this._code);
                        el.stockList.splice(index, 1);
                    }
                })
            }

            this.node.active = false;
            this.node.destroy();
        }
    }
}
