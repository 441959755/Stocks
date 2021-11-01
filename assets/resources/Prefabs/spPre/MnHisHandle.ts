
import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

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

    @property(cc.Node)
    scrollNode: cc.Node = null;

    @property(cc.Node)
    scrollNode1: cc.Node = null;

    @property(cc.Node)
    scrollNode2: cc.Node = null;

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

        let id1 = 0
        if (GameData.SpStockData && GameData.SpStockData.id) {
            id1 = GameData.SpStockData.id;
        }
        let time = parseInt(new Date().getTime() / 1000 + '');
        let info = {
            uid: id,
            to: time,
            pageSize: 200,
            id: id1,
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

        let jtcj = [], jtwt = [], lsjl = [];
        this.hisList.forEach(el => {
            if (ComUtils.isToday(el.orderId * 1000)) {
                //今天成交
                if (el.state == pb.OrderState.Done) {
                    jtcj.push(el);
                }
                //今天委托
                else if (el.state == pb.OrderState.Init) {
                    jtwt.push(el);
                }
            }
            //历史记录
            else {
                lsjl.push(el);
            }
        });

        this.onCreateItem(this.scrollNode, jtcj, this.item1, 'MnHisItem');
        this.onCreateItem(this.scrollNode1, jtwt, this.item2, 'MnHisItem1');
        this.onCreateItem(this.scrollNode2, lsjl, this.item3, 'MnHisItem2');
    }

    onCreateItem(scrollNode, arr, item, str) {
        let UIScrollControl = scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(item, arr.length, item.getContentSize(), 0, (node, index) => {
            let handle = node.getComponent(str);
            handle.onShow(arr[index]);
        })
    }

    onDisable() {
        this.contents.forEach(el => {
            el.removeAllChildren();
        })
    }

    onToggleClick(event, data) {
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
