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
        //更新列表
        GlobalEvent.on('updateCollectList', this.yiShouCangIsShow.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off('collectListUpdate');
    }

    onShow(data, index) {
        let code = data.code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this._curData = data;
        this.label[0].string = index + 1 || '--';
        this.label[1].string = code || '--';
        this.label[2].string = data.name || '--';
        this.label[3].string = data.industry || '--';
        this.label[4].string = data.lastBidPrice || '--';
        if (data.todaySignal && data.todaySignal < 0) {
            this.label[5].string = '建议买入';
        }

        if (data.todaySignal && data.todaySignal > 0) {
            this.label[5].string = '建议卖出';
        }

        if (data.todaySignal && data.todaySignal == 0) {
            this.label[5].string = '建议观望';
        }

        this.yiShouCangIsShow();
    }

    setIndex(index) {
        this.label[0].string = index + '';
    }

    yiShouCangIsShow() {
        this.yiShouCang.active = false;

        GameData.AIStockList.forEach(el => {
            if (this._curData && el == this._curData.code) {
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
        else if (name == 'item') {
            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._curData.code, this.label[5].string);
        }

    }
}

