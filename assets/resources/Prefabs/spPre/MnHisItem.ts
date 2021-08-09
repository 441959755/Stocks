import { pb } from "../../../protos/proto";
import GameCfgText from "../../../sctiprs/GameText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];


    onShow(data) {
        //   [{"orderId":"1628477629","code":1301019,"type":"AskLimit","state":"Done",//"price":44.12,"volume":200,"uid":1000243,"ts":"1628477976","node":100}]}
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
        this.labels[2].string = new Date(time).toLocaleDateString();
        this.labels[3].string = new Date(time).toLocaleTimeString();

        this.labels[4].string = data.price;
        this.labels[5].string = data.volume;
        //  this.labels[6].string = data.volume;

        this.labels[6].string = data.price * data.volume + '';
        if (data.type == pb.OrderType.AskLimit) {
            this.labels[7].string = '买入';
        }
        if (data.type == pb.OrderType.BidLimit) {
            this.labels[7].string = '卖出';
        }
    }
}
