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

        let time = data.orderId * 1000;
        this.labels[2].string = new Date(time).toLocaleDateString();
        this.labels[3].string = new Date(time).toLocaleTimeString();

        this.labels[4].string = ComUtils.changeTwoDecimal(data.price) + '';

        this.labels[5].string = ComUtils.changeTwoDecimal(data.volume) + '';

        this.labels[6].string = ComUtils.changeTwoDecimal(data.price * data.volume) + '';

        if (data.type == pb.OrderType.AskLimit || data.type == pb.OrderType.AskMarket) {
            this.labels[7].string = '买入';
        }
        if (data.type == pb.OrderType.BidLimit || data.type == pb.OrderType.BidMarket) {
            this.labels[7].string = '卖出';
        }

        if (data.state == pb.OrderState.Init) {
            this.labels[8].string = '委托中（未成交）';
        }
        else if (data.state == pb.OrderState.Partial) {
            this.labels[8].string = '部分成交';
        }
        else if (data.state == pb.OrderState.Done) {
            this.labels[8].string = '已成交';
        }
        else if (data.state == pb.OrderState.ManulCancel) {
            this.labels[8].string = '手动撤销';
        }
        else if (data.state == pb.OrderState.AutoCancel) {
            this.labels[8].string = '自动撤销';
        }
    }

}
