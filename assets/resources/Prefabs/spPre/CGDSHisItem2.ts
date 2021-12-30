import { pb } from "../../../protos/proto";
import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    onShow(data) {
        let code = data.code + '';
        let items = GameCfgText.getGPPKItemInfo(code);
        if (items) {
            this.labels[0].string = items[1];
        }
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this.labels[1].string = code;

        let time = data.ts * 1000;

        let ts = ComUtils.getYMDHMS(time);

        this.labels[2].string = ts.year + '/' + ts.month + '/' + ts.date;
        this.labels[3].string = ts.hours + ':' + ts.minute + ':' + ts.second;

        this.labels[4].string = ComUtils.changeTwoDecimal(data.price) + '';
        this.labels[5].string = ComUtils.changeTwoDecimal(data.volume) + '';
        //  this.labels[6].string = data.volume;

        this.labels[6].string = ComUtils.changeTwoDecimal(data.price * data.volume) + '';
        if (data.type == pb.OrderType.AskLimit || data.type == pb.OrderType.AskMarket) {
            this.labels[7].string = '买入';
        }
        if (data.type == pb.OrderType.BidLimit || data.type == pb.OrderType.BidMarket) {
            this.labels[7].string = '卖出';
        }
        if (data.type == pb.OrderType.BidMarket_Auto) {// 系统自动卖（比如：比赛结束，但玩家的股票账户仍然持
            this.labels[7].string = '系统自动卖';
        }
    }
}
