import { pb } from "../../protos/proto";
import Socket from "../../sctiprs/common/net/Socket";
import LLWSDK from "../../sctiprs/common/sdk/LLWSDK";
import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    inviterData = null;

    start() {

        this.inviterData = GameData.gameData.inviter_state;

        if (this.inviterData) {

            this.labels[0].string = this.inviterData.Awarded[pb.GamePropertyId.Gold] + '/' + this.inviterData.Total;

            this.labels[1].string = this.inviterData.Awarded[pb.GamePropertyId.Gold] * 500 + '';

            this.labels[2].string = this.inviterData.Total * 500 - this.inviterData.Awarded[pb.GamePropertyId.Gold] * 500 + '';

            this.labels[3].string = this.inviterData.Awarded[pb.GamePropertyId.Vip] + '/' + this.inviterData.Total;

            this.labels[4].string = this.inviterData.Awarded[pb.GamePropertyId.Vip] / 10 * 3 + '';

            this.labels[5].string = this.inviterData.Total / 10 * 3 - this.inviterData.Awarded[pb.GamePropertyId.Vip] / 10 * 3 + '';
        }
    }


    onBtnClick(event, customData) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        //领取金币
        else if (name == 'jxzx_lq1') {
            if (!this.inviterData) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '暂无数据');
            }
            else {
                this.getInviterAward(pb.GamePropertyId.Gold, this.inviterData.Total - this.inviterData.Awarded[pb.GamePropertyId.Gold])
            }
        }

        //领取VIP
        else if (name == 'jxzx_lq2') {
            if (!this.inviterData) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '暂无数据');
            }
            else {
                this.getInviterAward(pb.GamePropertyId.Vip, this.inviterData.Total - this.inviterData.Awarded[pb.GamePropertyId.Vip])
            }
        }

        //邀请
        else if (name == 'main_yq_yqhy') {
            LLWSDK.getSDK().shareAppMessage(GameData.userID);
        }
    }

    getInviterAward(type, count) {
        let info = {
            property_id: type,
            count: count,
        }
        console.log('领取' + type + '    ' + count);

        let CmdGetInviterAward = pb.CmdGetInviterAward;
        let message = CmdGetInviterAward.create(info);
        let buff = CmdGetInviterAward.encode(message).finish();

        socket.send(pb.MessageId.Req_Hall_GetInviterAward, buff, (res) => {
            console.log('领取邀请奖励' + JSON.stringify(res));
            if (res.err) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err);
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '领取成功!');
            }
        })
    }

    // let info = {
    //     code: this.curData.code,
    //     type: pb.OrderType.BidLimit,
    //     price: this.curData.price,
    //     volume: this.curSellCount,
    //     uid: GameData.userID,
    //     amount: this.curData.price * this.curSellCount,
    //     id: id,
    // }

    // let CmdStockOrder = pb.CmdStockOrder;
    // let message = CmdStockOrder.create(info);
    // let buff = CmdStockOrder.encode(message).finish();

    // socket.send(pb.MessageId.Req_Game_Order, buff, (res) => {

    //     console.log('卖出下单应答:' + JSON.stringify(res));

    //     GlobalEvent.emit(EventCfg.LOADINGHIDE);

    //     if (res.orderId) {

    //         GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '卖出下单成功!');

    //         this.node.active = false;
    //     }
    //     else {
    //         GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result.err);
    //     }
    // })

}
