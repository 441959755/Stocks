
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

    onShow(arr) {
        this.dqcc = [];
        this.cjjl = [];
        this.lscc = [];

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
            uid: GameData.userID,
            to: time,
            pageSize: 2000,
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

        let items = [];

        GameData.cgdsStateList.forEach(el => {
            if (el.id == id1) {
                items = el.state.positionList.items;
            }
        })

        if (items.length > 0) {

            items.forEach(el => {
                this.dqcc.push({ item: el, price: arr[el.code].price })
            })

            this.tipsNode.active = false;
        }
    }



    createItem() {

        if (this.dqcc.length > 0) {
            this.listV.numItems = this.dqcc.length;
        }

        let arrs = {
            code: null,
            for: null,
            end: null,
            input: 0,
            income: 0,
            bidPrice: 0,
            askPrice: 0,
        };

        let obj: any = {};

        this.hisList.forEach(el => {

            if (el.state == pb.OrderState.Done) {

                this.cjjl.push(el);

                if (obj[el.code + '']) {

                    if (el.type == pb.OrderType.AskLimit || el.type == pb.OrderType.AskMarket) {
                        obj[el.code + ''].input += el.volume;
                        obj[el.code + ''].bidPrice += el.volume * el.price;
                    }

                    else if (el.type == pb.OrderType.BidLimit || el.type == pb.OrderType.BidMarket || el.type == pb.OrderType.BidMarket_Auto) {
                        obj[el.code + ''].income += el.volume;
                        obj[el.code + ''].askPrice += el.volume * el.price;
                    }

                    if (obj[el.code + ''].form > el.ts) {
                        obj[el.code + ''].form = el.ts;
                    }

                    else if (obj[el.code + ''].end < el.ts) {
                        obj[el.code + ''].end = el.ts;
                    }
                }

                else {
                    obj[el.code + ''] = arrs;
                    obj[el.code + ''].code = el.code;
                    obj[el.code + ''].form = el.ts;
                    obj[el.code + ''].end = el.ts;
                    if (el.type == pb.OrderType.AskLimit || el.type == pb.OrderType.AskMarket) {
                        obj[el.code + ''].input = el.volume;
                        obj[el.code + ''].bidPrice = el.volume * el.price;
                    }

                    else if (el.type == pb.OrderType.BidLimit || el.type == pb.OrderType.BidMarket || el.type == pb.OrderType.BidMarket_Auto) {
                        obj[el.code + ''].income = el.volume;
                        obj[el.code + ''].askPrice = el.volume * el.price;
                    }
                }
            }

        });

        for (let k in obj) {

            if (obj[k].input - obj[k].income == 0) {
                this.lscc.push(obj[k]);
            }
        }

        this.listV2.numItems = this.cjjl.length;
        this.listV1.numItems = this.lscc.length;
    }

    onListRender(item: cc.Node, idx: number) {
        let handle = item.getComponent('CGDSHisItem');
        handle.onShow(this.dqcc[idx]);
    }

    onListRender1(item: cc.Node, idx: number) {
        let handle = item.getComponent('CGDSHisItem1');
        handle.onShow(this.lscc[idx]);
    }

    onListRender2(item: cc.Node, idx: number) {
        let handle = item.getComponent('CGDSHisItem2');
        handle.onShow(this.cjjl[idx]);
    }

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
