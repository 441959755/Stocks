

import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    label: cc.Label[] = [];

    _curData = null;

    onLoad() {

        GlobalEvent.on(EventCfg.CMDQUOTITEM, (res) => {

            if (this._curData && res.items[0].code == this._curData.code) {
                let signals = res.items[0];
                console.log(ComUtils.fromatTime1(this._curData.tsUpdated));
                if (ComUtils.fromatTime1(signals.timestamp) - ComUtils.fromatTime1(this._curData.tsUpdated) <= 1) {
                    if (this._curData.todaySignal < 0) {
                        this.label[7].string = '推荐买入';

                    }
                    else {
                        this.label[7].string = '推荐卖出';
                    }
                }
                else {
                    if (this._curData.todaySignal < 0) {
                        this.label[7].string = '持股观望';
                    }
                    else {
                        this.label[7].string = '持币观望';
                    }
                }

                GameData.AISignal[this._curData.code + ''] = this.label[7].string;
            }

        }, this);
    }

    onShow(data, index) {

        let code = data.code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this._curData = data;
        this.label[0].string = index;
        this.label[1].string = code || '--';
        this.label[2].string = this._curData.name || '--';
        this.label[3].string = this._curData.lastBidPrice || '--';
        this.label[4].string = this._curData.lastAskPrice || '--';
        this.label[5].string = this._curData.curAskPrice || '--';
        this.label[6].string = this._curData.profitRate || '--';
        this.label[7].string = '--';
        if (GameData.AISignal[data.code + '']) {
            this.label[7].string = GameData.AISignal[data.code + ''];
        }
        else {
            let info1 = {
                ktype: pb.KType.Min,
                code: parseInt(data.code),
                to: parseInt((new Date().getTime()) / 1000 + ''),
                total: 1,
            }
            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1));
        }
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'shanchuBtn') {
            let info = {
                removed: true,
                code: this._curData.code,
                isAiStock: true,
            }

            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();

            socket.send(pb.MessageId.Req_EditAiStockList, buff, (res) => {

            })

            let index = GameData.AIStockList.indexOf(this._curData.code);
            if (index != -1) {
                GameData.AIStockList.splice(index, 1);
            }

            GlobalEvent.emit('collectListUpdate');
            //更新列表
            GlobalEvent.emit('updateCollectList');
        }
        else if (name == 'item2') {
            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._curData.code, this.label[7].string);
        }

    }

    onDestroy() {
        GlobalEvent.off(EventCfg.CMDQUOTITEM)
    }

}
