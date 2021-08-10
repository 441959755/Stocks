// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labs: cc.Label[] = [];

    _curData = null;

    onShow(data) {
        this._curData = data;


        let code = data.code + '';
        let items = GameCfgText.getGPPKItemInfo(code);
        if (items) {
            this.labs[0].string = items[1];
        }
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this.labs[1].string = code;

        let time = data.ts * 1000;
        this.labs[2].string = new Date(time).toLocaleDateString();
        this.labs[3].string = new Date(time).toLocaleTimeString();

        this.labs[4].string = data.price;
        this.labs[5].string = data.volume;
        //  this.labels[6].string = data.volume;

        this.labs[6].string = data.price * data.volume + '';
        if (data.type == pb.OrderType.AskLimit) {
            this.labs[7].string = '买入';
        }
        if (data.type == pb.OrderType.BidLimit) {
            this.labs[7].string = '卖出';
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'sp_btn_chedan') {

            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let info = {
                orderId: this._curData.orderId,
                type: this._curData.type,
                code: this._curData.code,
                uid: GameData.userID,
            }

            let CmdStockOrderCancel = pb.CmdStockOrderCancel;
            let message = CmdStockOrderCancel.create(info);
            let buff = CmdStockOrderCancel.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_OrderCancel, buff, (res) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                console.log('删除委托记录' + JSON.stringify(res));

                this.node.destroy();
            })
        }
    }
}
