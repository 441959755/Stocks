import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WelfareHandle extends cc.Component {

    @property(cc.EditBox)
    editbox: cc.EditBox = null;

    @property(cc.EditBox)
    editbox1: cc.EditBox = null;

    @property(cc.Label)
    coupon: cc.Label = null;

    protected onLoad(): void {

        this.editbox1.node.on(
            'editing-did-ended',
            edit => {
                let str = edit.string;
                if (str == '') {
                    return;
                }
                else {
                    if (parseInt(str) > GameData.properties[pb.GamePropertyId.K]) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换K币不能超可用k币数量！')
                        this.editbox1.string = '';
                        return;
                    }

                    else {
                        this.coupon.string = parseInt(parseInt(str) / 10 + '') + '';
                    }
                }
            }, this
        )
    }

    onBtnClick(event, curData) {

        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'main_fl_tjdhsq') {

            if (this.editbox.string == '') {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入用户ID!');
                return;
            }

            if (this.editbox1.string == '') {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请输入要兑换的K币!');
                return;
            }

            if (parseInt(this.editbox1.string) < 10) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换的K币要大于等于10');
                return;
            }

            let data = {
                type: pb.ExchangeType.ExchangeType_K2Coupon,
                amount: parseInt(this.editbox1.string),
                uid: parseInt(this.editbox.string)
            }

            let CmdExchange = pb.CmdExchange;
            let message = CmdExchange.create(data);
            let buff = CmdExchange.encode(message).finish();

            socket.send(pb.MessageId.Req_Hall_Exchange, buff, (res) => {
                if (res.err) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err);
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换成功！');
                }
            })

        }
    }
}
