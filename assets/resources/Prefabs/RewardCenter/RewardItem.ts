
import { pb } from "../../../protos/proto";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    itemData = null;

    LQFALG = false;

    @property(cc.Node)
    itemNodes: cc.Node = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Node)
    yiLingQu: cc.Node = null;

    @property(cc.Node)
    lingQu: cc.Node = null;

    @property(cc.Label)
    goldLa: cc.Label = null;

    @property(cc.Label)
    diaLa: cc.Label = null;

    @property(cc.Label)
    vipLa: cc.Label = null;

    @property(cc.Label)
    expLa: cc.Label = null;

    @property(cc.Label)
    tickLa: cc.Label = null;

    onShow() {
        this.yiLingQu.active = this.LQFALG;
        //var reg = /\\|\//g;

        //   let arr = this.itemData.properties.replace(reg, '');
        let arr = JSON.parse(this.itemData.properties);

        this.itemNodes.children.forEach(el => {
            el.active = false;
        })

        arr.P.forEach(el => {

            if (el.v && el.i == pb.GamePropertyId.Gold) {
                this.itemNodes.children[0].active = true;
                this.goldLa.string = el.v;
            }
            else if (el.v && el.i == pb.GamePropertyId.Diamond) {
                this.itemNodes.children[1].active = true;
                this.diaLa.string = el.v;
            }
            else if (el.v && el.i == pb.GamePropertyId.Vip) {
                this.itemNodes.children[2].active = true;
                this.vipLa.string = el.v;
            }
            else if (el.v && el.i == pb.GamePropertyId.Exp) {
                this.itemNodes.children[3].active = true;
                this.expLa.string = el.v;
            }
            else if (el.v && el.i == pb.GamePropertyId.Fame) {
                this.itemNodes.children[4].active = true;
                this.tickLa.string = el.v;
            }

        });

        this.tipsLabel.string = this.itemData.memo;
    }

    getItemRewaed() {

        if (!this.LQFALG) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let data = {
                ts: this.itemData.ts,
            }
            let CmdGetItem = pb.CmdGetItem;
            let message = CmdGetItem.create(data);
            let buff = CmdGetItem.encode(message).finish();

            socket.send(pb.MessageId.Req_Hall_GetItem, buff, (info) => {
                console.log('getRewardCenter:' + JSON.stringify(info));

                this.LQFALG = true;
                this.yiLingQu.active = this.LQFALG;

                this.lingQu.active = false;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);

            })
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'btn_lingqu') {
            this.getItemRewaed();
        }
    }

}
