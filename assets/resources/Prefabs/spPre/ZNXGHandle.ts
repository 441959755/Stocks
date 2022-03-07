import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import List from "../../../sctiprs/Utils/List";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    AIStockList = [];

    AIProfitList = [];

    collectList = [];

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

    @property(List)
    listV: List = null;

    @property(List)
    listV1: List = null;

    @property(List)
    listV2: List = null;

    @property(cc.Node)
    toggle3mask: cc.Node = null;

    onLoad() {
        //选择板块
        GlobalEvent.on(EventCfg.SELECTBK, this.onShowSelectBk.bind(this), this);
        //更新列表
        GlobalEvent.on('updateCollectList', this.getCollectList.bind(this), this);
    }

    onShowSelectBk() {
        let arr = [];
        this.AIStockList.forEach((el, index) => {
            let flag = this.getBKISShow(el.code);
            if (flag) {
                arr.push(el);
            }
        })
        this.AIStockList = arr;
        this.listV.numItems = this.AIStockList.length;
    }


    start() {

        this.getAIStockList();

        this.scrollview.node.active = true;
        this.scrollview1.node.active = false;
        this.scrollview2.node.active = false;

    }

    onEnable() {

        GameCfg.GameType = 'ZNXG';
        this.toggle3mask.active = !GameData.vipStatus;

    }

    onBtnToggle(event, data) {
        let name = event.node.name;

        this.scrollview.node.active = false;
        this.scrollview1.node.active = false;
        this.scrollview2.node.active = false;

        //AI买入信息
        if (name == 'toggle1') {

            this.scrollview.node.active = true;
            this.scrollview.content.children.forEach(el => {
                el.active = true;;
            })

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
            this.scrollview1.content.children.forEach(el => {
                el.active = true;;
            })
            if (this.AIProfitList.length == 0) {
                this.tipsNode.active = true;
                let data = {
                    rankFrom: 1,
                    total: 100,
                }
                this.getAIProfitList(data);
            }
            else {
                this.tipsNode.active = false;
            }
        }
        //我的收藏
        else if (name == 'toggle3') {
            this.scrollview2.node.active = true;
            this.tipsNode.active = true;
            this.getCollectList();
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            GameCfg.GameType = null;
            this.node.active = false;
        }

        else if (name == 'sp_topbtn_help') {
            PopupManager.openHelpLayer();
        }

        else if (name == 'sp_topbtn_zhengu') {
            GlobalEvent.emit(EventCfg.OPENZGLAYER);
        }

        else if (name == 'bkBtn') {
            GlobalEvent.emit(EventCfg.OPENBKBOX);
        }

        else if (name == 'toggle3mask') {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '开启VIP或解锁该功能取限制');
        }
    }

    //AI买入信号
    getAIStockList() {

        socket.send(pb.MessageId.Req_QueryAiStockList, null, (res) => {
            this.AIStockList = [];
            console.log('查询AI选股的股票列表' + JSON.stringify(res));
            // let time = new Date().getTime() / 1000;
            res.items.forEach(el => {
                if (el.todaySignal < 0 && /*(time - el.tsUpdated) <= 48 * 60 * 60 &&*/ el.industry != '指数') {
                    this.AIStockList.push(el);
                }
            });
            this.listV.numItems = this.AIStockList.length;
        })

        this.tipsNode.active = false;
    }

    onListRender(item: cc.Node, idx: number) {
        let handle = item.getComponent('ZnxgItem');
        handle.onShow(this.AIStockList[idx], idx);
    }

    //AI收益信号
    getAIProfitList(data) {

        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(data);
        let buff = CmdQueryAiStockList.encode(message).finish();

        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {
            this.AIProfitList = [];
            this.AIProfitList = res.items;
            console.log('查询AI收益列表' + JSON.stringify(res));
            this.listV1.numItems = this.AIProfitList.length;

        })
        this.tipsNode.active = false;
    }

    onListRender1(item: cc.Node, idx: number) {
        let handle = item.getComponent('ZnxgItem1');
        handle.onShow(this.AIProfitList[idx], idx);
    }

    //收藏
    getCollectList() {
        this.collectList = JSON.parse(JSON.stringify(GameData.AIStockList));

        if (this.collectList.length <= 0) {
            this.listV2.numItems = this.collectList.length;
            this.tipsNode.active = true;
            return;
        }
        else {
            this.tipsNode.active = false;
        }

        let info = {
            codes: this.collectList,
        }

        console.log(JSON.stringify(info));

        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(info);
        let buff = CmdQueryAiStockList.encode(message).finish();

        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {

            console.log('查询AI选股的股票列表' + JSON.stringify(res));
            this.collectList = res.items;
            this.listV2.numItems = this.collectList.length;
        })

    }

    onListRender2(item: cc.Node, idx: number) {
        let handle = item.getComponent('ZnxgItem2');
        handle.onShow(this.collectList[idx], idx + 1);
    }

    getBKISShow(code) {

        code = code + ''
        if (code.length >= 7) {
            code = code.slice(1);
        }

        if (GameData.SelectBk[0]) {
            return true;
        }

        else if (code.slice(0, 3) == '002' || code.slice(0, 3) == '003') {
            return GameData.SelectBk[3];
        }

        else if (code.slice(0, 3) == '300') {
            return GameData.SelectBk[4];
        }

        else if (code.slice(0, 3) == '688') {
            return GameData.SelectBk[4];
        }

        else if (code.slice(0, 2) == '60' || code.slice(0, 2) == '688') {
            return GameData.SelectBk[1];
        }

        else if (code.slice(0, 2) == '00' || code.slice(0, 2) == '30') {
            return GameData.SelectBk[2];
        }

        return false;
    }

    onDestroy() {
        GlobalEvent.off('shouCangAdd');
        GlobalEvent.off(EventCfg.SELECTBK);
    }

}
