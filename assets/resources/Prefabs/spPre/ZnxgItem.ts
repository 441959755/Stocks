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

    @property(cc.Node)
    yiShouCang: cc.Node = null;

    onLoad() {
        GlobalEvent.on('collectListUpdate', this.yiShouCangIsShow.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off('collectListUpdate');
    }

    onShow(data, index) {
        this._curData = data;
        index += 1;
        this.label[0].string = index;
        this.label[1].string = data.code;
        this.label[2].string = data.name;
        this.label[3].string = data.industry;
        this.label[4].string = data.curAskPrice;
        if (data.todaySignal && data.todaySignal < 0) {
            this.label[5].string = '建议买入';
        }


        this.yiShouCangIsShow();
    }

    yiShouCangIsShow() {
        this.yiShouCang.active = false;

        GameData.AIStockList.forEach(el => {
            if (el == this._curData.code) {
                this.yiShouCang.active = true;
            }
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'shoucangBtn') {
            let info = {
                removed: false,
                code: this._curData.code,
                isAiStock: true,
            }

            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();

            socket.send(pb.MessageId.Req_EditAiStockList, buff, (res) => {

            })
            GameData.AIStockList.push(this._curData.code);
            this.yiShouCang.active = true;

            GlobalEvent.emit('shouCangAdd', this._curData);

        }
    }
}
