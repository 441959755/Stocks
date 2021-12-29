
import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import List from "../../../sctiprs/Utils/List";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item2: cc.Node = null;

    @property(cc.Node)
    item3: cc.Node = null;

    @property([cc.ScrollView])
    scrollNode: cc.ScrollView[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    hisList = null;

    @property(List)
    listV: List = null;

    @property(List)
    listV1: List = null;

    @property(List)
    listV2: List = null;

    dqcc = [];

    lscc = [];

    cjjl = [];

    @property(cc.Node)
    tipsNode: cc.Node = null;

    onShow(id) {

        this.tipsNode.active = false;
        this.scrollNode.forEach(el => {
            el.node.active = false;
        })

        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.scrollNode[index].node.active = true;
                if (this.scrollNode[index].content.children.length <= 0) {
                    this.tipsNode.active = true;
                }
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


        GameData.cgdsStateList.forEach(el => {
            if (el.id == id) {

                this.dqcc = el.state.positionList.items;
            }
        })

        if (this.dqcc.length > 0) {

            this.tipsNode.active = true;
            this.listV.numItems = this.dqcc.length;
        }
    }



    createItem() {
        // this.hisList.forEach(el => {
        //     if (ComUtils.isToday(el.orderId * 1000)) {
        //         //今天成交
        //         if (el.state == pb.OrderState.Done) {
        //             this.jtcj.push(el);
        //         }
        //         //今天委托
        //         else if (el.state == pb.OrderState.Init) {
        //             this.jtwt.push(el);
        //         }
        //     }
        //     //历史记录
        //     else {
        //         this.lsjl.push(el);
        //     }
        // });


        // this.listV1.numItems = this.jtwt.length;
        // this.listV2.numItems = this.lsjl.length;
    }

    onListRender(item: cc.Node, idx: number) {
        let handle = item.getComponent('CGDSHisItem');
        handle.onShow(this.dqcc[idx]);
    }

    // onListRender1(item: cc.Node, idx: number) {
    //     let handle = item.getComponent('MnHisItem1');
    //     handle.onShow(this.jtwt[idx]);
    // }

    // onListRender2(item: cc.Node, idx: number) {
    //     let handle = item.getComponent('MnHisItem2');
    //     handle.onShow(this.lsjl[idx]);
    // }

    onToggleClick(event, data) {
        this.scrollNode.forEach(el => {
            el.node.active = false;
        })
        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                this.scrollNode[index].node.active = true;
                if (this.scrollNode[index].content.children.length <= 0) {
                    this.tipsNode.active = true;
                }
                else {
                    this.tipsNode.active = false;
                }
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
