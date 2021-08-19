import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

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

    @property(cc.Node)
    scrollNode: cc.Node = null;

    onEnable() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let id = 0
        if (GameData.SpStockData && GameData.SpStockData.id) {
            id = GameData.SpStockData.id;
        }
        let time = parseInt(new Date().getTime() / 1000 + '');
        let info = {
            uid: GameData.userID,
            to: time,
            pageSize: 200,
            id: id,
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
        let UIScrollControl = this.scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(this.item, this.hisList.length, this.item.getContentSize(), 0, (node, index) => {
            let handle = node.getComponent('MncdItem');
            handle.onShow(this.hisList[index]);
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }
}
