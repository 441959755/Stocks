
import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

declare const async: any;
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item1: cc.Node = null;

    @property(cc.Node)
    item2: cc.Node = null;

    @property(cc.Node)
    item3: cc.Node = null;

    @property([cc.Node])
    contents: cc.Node[] = [];

    @property([cc.Node])
    viewNode: cc.Node[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property(cc.Node)
    tipsNode: cc.Node = null;

    hisList = null;

    today = null;

    onShow(id) {

        this.viewNode.forEach(el => {
            el.active = false;
        })
        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.viewNode[index].active = true;
            }
        })

        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let time = parseInt(new Date().getTime() / 1000 + '');
        let info = {
            uid: id,
            to: time,
            pageSize: 200,
            id: GameData.SpStockData.id || 0,
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


    createItem() {
        async.eachLimit(this.hisList, 1, (el, cb) => {
            if (ComUtils.isToday(el.orderId * 1000)) {
                //今天成交
                if (el.state == pb.OrderState.Done) {
                    let item = cc.instantiate(this.item1);
                    this.contents[0].addChild(item);
                    let handle = item.getComponent('MnHisItem');
                    handle.onShow(el);
                }
                //今天委托
                else if (el.state == pb.OrderState.Init) {
                    let item = cc.instantiate(this.item2);
                    this.contents[1].addChild(item);
                    let handle = item.getComponent('MnHisItem1');
                    handle.onShow(el);

                }
            }
            //历史记录
            else {
                let item = cc.instantiate(this.item3);
                this.contents[2].addChild(item);
                let handle = item.getComponent('MnHisItem2');
                handle.onShow(el);
            }

            setTimeout(cb, 0);
        })
    }

    onDisable() {
        this.contents.forEach(el => {
            el.removeAllChildren();
        })
    }

    onToggleClick(event, data) {
        //    let name = event.node.name;
        this.viewNode.forEach(el => {
            el.active = false;
        })
        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.viewNode[index].active = true;
            }
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }


}
