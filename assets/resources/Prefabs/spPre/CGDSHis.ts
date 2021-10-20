
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

    @property([cc.ScrollView])
    scrollNode: cc.ScrollView[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    hisList = null;

    onShow(id) {

        this.scrollNode.forEach(el => {
            el.node.active = false;
        })

        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.scrollNode[index].node.active = true;
            }
        })

        let id1;
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
            console.log('炒股大赛查询交易记录' + JSON.stringify(res));
            this.hisList = res.items;
            this.createItem();
        })

    }

    createItem() {
        let jtcj = [], jtwt = [], lsjl = [];
        this.hisList.forEach(el => {
            // if (ComUtils.isToday(el.orderId * 1000)) {
            //     //今天成交
            //     if (el.state == pb.OrderState.Done) {
            //         jtcj.push(el);
            //         this.onCreateItem(this.scrollNode[0], jtcj, this.item1, 'MnHisItem');
            //     }
            //     //今天委托
            //     else if (el.state == pb.OrderState.Init) {
            //         jtwt.push(el);
            //         this.onCreateItem(this.scrollNode[1], jtwt, this.item2, 'MnHisItem1');
            //     }
            // }
            // //历史记录
            // else {
            //     lsjl.push(el);
            //     this.onCreateItem(this.scrollNode[2], lsjl, this.item3, 'MnHisItem2');
            // }

            // {"items":[{"orderId":"1634265618","code":600000,"type":"BidMarket","state":"Done","price":9.08,"volume":600,"uid":1000268,"ts":"1634265619","id":20211014,"node":100,"cost":9.02},{"orderId":"1634179243","code":600000,"type":"AskLimit","state":"Done","price":9.02,"volume":1800,"uid":1000268,"ts":"1634179261","id":20211014,"node":100}]}



        });
    }

    onCreateItem(scrollNode, arr, item, str) {
        let UIScrollControl = scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(item, arr.length, item.getContentSize(), 0, (node, index) => {
            let handle = node.getComponent(str);
            handle.onShow(arr[index]);
        })
    }

    onDisable() {
        this.scrollNode.forEach(el => {
            el.content.removeAllChildren();
        })
    }

    onToggleClick(event, data) {
        this.scrollNode.forEach(el => {
            el.node.active = false;
        })
        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.scrollNode[index].node.active = true;
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
