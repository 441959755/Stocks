

import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    label: cc.Label[] = [];

    _curData = null;

    onShow(data, index) {

        this._curData = data;
        this.label[0].string = index + 1;
        this.label[1].string = this._curData.code;
        this.label[2].string = this._curData.name;
        this.label[3].string = this._curData.lastAskPrice;
        this.label[4].string = this._curData.lastBidPrice;
        this.label[5].string = this._curData.curAskPrice;
        this.label[6].string = this._curData.profitRate;
        if (this._curData.todaySignal > 0) {
            this.label[7].string = '建议买入';
        }
        else if (this._curData.todaySignal > 0) {
            this.label[7].string = '建议卖出';
        }
        else {
            this.label[7].string = '建议观望';
        }

        let me = {
            code: data,
        }
        let CmdQueryAiSignal = pb.CmdQueryAiSignal;
        let message1 = CmdQueryAiSignal.create(me);
        let buff1 = CmdQueryAiSignal.encode(message1).finish();
        socket.send(pb.MessageId.Req_QueryAiSignal, buff1, (res) => {

            console.log('股票的买卖信号' + JSON.stringify(res));

            let flag = 0;
            if (res.signals) {
                for (let i = res.signals.length - 1; i >= 0; i--) {
                    if (res.signals[i].flag == 1) {
                        flag = 1;
                        break;
                    }
                    else if (res.signals[i].flag == -1) {
                        flag = -1;
                        break;
                    }
                }
            }


            if (flag == 1 && this._curData.todaySignal > 0) {
                this.label[7].string = '建议持仓';
            }
            else if (flag == -1 && this._curData.todaySignal < 0) {
                this.label[7].string = '建议持仓';
            }
        })
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
            this.node.destroy();

            let index = GameData.AIStockList.indexOf(this._curData.code);
            if (index != -1) {
                GameData.AIStockList.splice(index, 1);
            }

            GlobalEvent.emit('collectListUpdate');

        }
        else if (name == 'item2') {
            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._curData.code);
        }

    }

}
