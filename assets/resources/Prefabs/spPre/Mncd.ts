import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
declare const async: any;
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    hisList = null;

    onEnable() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let time = parseInt(new Date().getTime() / 1000 + '');
        let info = {
            uid: GameData.userID,
            to: time,
            pageSize: 200,
        }

        let CmdQueryStockOrder = pb.CmdQueryStockOrder;
        let message = CmdQueryStockOrder.create(info);
        let buff = CmdQueryStockOrder.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_OrderQuery, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            console.log('查询交易记录' + JSON.stringify(res));
            this.hisList = res.items;

            this.createItem();
        })
    }

    onDisable() {
        this.content.removeAllChildren();
    }

    createItem() {
        async.eachLimit(this.hisList, 1, (el, cb) => {
            if (el.state == pb.OrderState.Init) {
                let item = cc.instantiate(this.item);
                this.content.addChild(item);
                let handle = item.getComponent('MncdItem');
                handle.onShow(el);
            }
            setTimeout(cb, 0);
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }
}
