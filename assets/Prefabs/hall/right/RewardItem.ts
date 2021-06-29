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

    onShow() {
        this.yiLingQu.active = this.LQFALG;
    }

    start() {

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
