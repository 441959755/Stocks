import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    AIStockList = null;

    AIStockCount = 0;

    AIProfitList = null;

    AIProfitCount = 0;

    collectList = [];

    collectCount = 0;

    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollview1: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollview2: cc.ScrollView = null;

    @property(cc.Node)
    preItem: cc.Node = null;

    @property(cc.Node)
    preItem1: cc.Node = null;

    @property(cc.Node)
    preItem2: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    content1: cc.Node = null;

    @property(cc.Node)
    content2: cc.Node = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;


    onLoad() {
        this.scrollview.node.on('scroll-to-bottom', () => {
            console.log('scroll-to-bottom');
            let tsUpdated = this.AIStockList[this.AIStockList.length - 1].tsUpdated;
            let data = {
                tsUpdateFrom: tsUpdated,
                total: 30,
            }
            this.getAIStockList(data);
        }, this);

        this.scrollview1.node.on('scroll-to-bottom', () => {
            console.log('scroll-to-bottom');
            let data = {
                rankFrom: this.AIProfitCount + 1,
                total: 30,
            }
            this.getAIProfitList(data);
        }, this);

        GlobalEvent.on('shouCangAdd', (data) => {
            let node = cc.instantiate(this.preItem2);
            this.content2.addChild(node);
            let handle = node.getComponent('ZnxgItem2');
            handle.onShow(data, GameData.AIStockList.length);
        }, this);
    }

    onDestroy() {
        GlobalEvent.off('shouCangAdd');
    }

    start() {
        let data = {
            //    rankFrom: 1,
            tsUpdateFrom: parseInt(new Date().getTime() / 1000 + ''),
            total: 30,
        }
        this.getAIStockList(data);
    }

    onBtnToggle(event, data) {
        let name = event.node.name;

        this.scrollview.node.active = false;
        this.scrollview1.node.active = false;
        this.scrollview2.node.active = false;

        //AI买入信息
        if (name == 'toggle1') {
            this.scrollview.node.active = true;
            if (this.AIStockList.length > 0) {
                this.tipsNode.active = false;
            }
            else {
                this.tipsNode.active = true;
            }

        }
        //Ai收益排行
        else if (name == 'toggle2') {
            this.scrollview1.node.active = true;
            if (this.AIProfitCount == 0) {
                this.tipsNode.active = true;
                let data = {
                    rankFrom: 1,
                    total: 30,
                }
                this.getAIProfitList(data);
            }
        }
        //我的收藏
        else if (name == 'toggle3') {
            this.scrollview2.node.active = true;
            if (this.collectList.length == 0) {
                this.tipsNode.active = true;
                this.getCollectList();
            }
            // else if (GameData.AIStockList.length > this.collectList.length) {
            //     for (let i = this.collectList.length - 1; i < GameData.AIStockList.length - 1; i++) {
            //         let node = cc.instantiate(this.preItem2);
            //         this.content2.addChild(node);
            //         let handle = node.getComponent('ZnxgItem2');
            //         handle.onShow(GameData.AIStockList[i], i);
            //     }

            //     this.collectList = JSON.parse(JSON.stringify(GameData.AIStockList));

            //     this.collectCount = this.collectList.length;
            // }
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

    //AI买入信号
    getAIStockList(data) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(data);
        let buff = CmdQueryAiStockList.encode(message).finish();
        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.AIStockList = [];
            console.log('查询AI选股的股票列表' + JSON.stringify(res));

            res.items.forEach((el, index) => {
                this.AIStockList.push(el);
                if (el.todaySignal < 0) {
                    let node = cc.instantiate(this.preItem);
                    this.content.addChild(node);
                    let handle = node.getComponent('ZnxgItem');
                    handle.onShow(el, index + this.AIStockCount);
                }
            });
            this.AIStockCount += data.total;

            if (this.AIStockList.length > 0) {
                this.tipsNode.active = false;
            }
        })
    }

    //AI收益信号
    getAIProfitList(data) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(data);
        let buff = CmdQueryAiStockList.encode(message).finish();
        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.AIProfitList = [];
            console.log('查询AI收益列表' + JSON.stringify(res));

            res.items.forEach((el, index) => {
                this.AIProfitList.push(el);
                // if (el.todaySignal < 0) {
                let node = cc.instantiate(this.preItem1);
                this.content1.addChild(node);
                let handle = node.getComponent('ZnxgItem1');
                handle.onShow(el, index + this.AIProfitCount);
                //   }
            });

            this.AIProfitCount += data.total;
            if (this.AIProfitList.length > 0) {
                this.tipsNode.active = false;
            }
        })
    }

    //收藏
    getCollectList() {
        if (GameData.AIStockList.length == 0) {
            return;
        }
        this.collectList = JSON.parse(JSON.stringify(GameData.AIStockList));

        this.collectCount = this.collectList.length;

        let info = {
            codes: this.collectList,
        }
        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(info);
        let buff = CmdQueryAiStockList.encode(message).finish();

        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {

            console.log('查询AI选股的股票列表' + JSON.stringify(res));

            res.items.forEach((el, index) => {
                let node = cc.instantiate(this.preItem2);
                this.content2.addChild(node);
                let handle = node.getComponent('ZnxgItem2');
                handle.onShow(el, index);
            });

        })

        this.tipsNode.active = false;
    }

}
