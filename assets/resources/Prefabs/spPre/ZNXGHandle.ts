import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


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


    onLoad() {
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

        let UIScrollControl = this.scrollview.getComponent('UIScrollControl');
        UIScrollControl.clear();
        UIScrollControl.initControl(this.preItem, arr.length, this.preItem.getContentSize(), 0, (node, index) => {
            let handle = node.getComponent('ZnxgItem');
            handle.onShow(arr[index], index);
        })
    }

    onDestroy() {
        GlobalEvent.off('shouCangAdd');
        GlobalEvent.off(EventCfg.SELECTBK);
    }

    start() {
        // let data = {
        //     //    rankFrom: 1,
        //     // tsUpdateFrom: parseInt(new Date().getTime() / 1000 + ''),
        //     // total: 250,
        // }
        this.getAIStockList();
    }

    onEnable() {
        GameCfg.GameType = 'ZNXG';
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
            GlobalEvent.emit(EventCfg.OPENHELPLAYER);
        }

        else if (name == 'sp_topbtn_zhengu') {
            GlobalEvent.emit(EventCfg.OPENZGLAYER);
        }

        else if (name == 'bkBtn') {
            GlobalEvent.emit(EventCfg.OPENBKBOX);
        }
    }

    //AI买入信号
    getAIStockList() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        // let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        // let message = CmdQueryAiStockList.create(data);
        // let buff = CmdQueryAiStockList.encode(message).finish();
        socket.send(pb.MessageId.Req_QueryAiStockList, null, (res) => {

            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.AIStockList = [];
            //this.AIStockList = res.items;
            console.log('查询AI选股的股票列表' + JSON.stringify(res));
            let time = new Date().getTime() / 1000;

            res.items.forEach(el => {
                if (el.todaySignal < 0 && /*(time - el.tsUpdated) <= 48 * 60 * 60 &&*/ el.industry != '指数') {
                    this.AIStockList.push(el);
                }
            });

            let UIScrollControl = this.scrollview.getComponent('UIScrollControl');
            UIScrollControl.initControl(this.preItem, this.AIStockList.length, this.preItem.getContentSize(), 0, (node, index) => {
                let handle = node.getComponent('ZnxgItem');
                handle.onShow(this.AIStockList[index], index);
            })

        })
        this.tipsNode.active = false;
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
            this.AIProfitList = res.items;
            console.log('查询AI收益列表' + JSON.stringify(res));

            let UIScrollControl = this.scrollview1.getComponent('UIScrollControl');
            UIScrollControl.initControl(this.preItem1, res.items.length, this.preItem1.getContentSize(), 0, (node, index) => {
                let handle = node.getComponent('ZnxgItem1');
                handle.onShow(res.items[index], index);
            })

        })
        this.tipsNode.active = false;
    }

    //收藏
    getCollectList() {

        if (GameData.AIStockList.length == 0) {
            return;
        }

        this.collectList = JSON.parse(JSON.stringify(GameData.AIStockList));

        let info = {
            codes: this.collectList,
        }

        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(info);
        let buff = CmdQueryAiStockList.encode(message).finish();
        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {

            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            console.log('查询AI选股的股票列表' + JSON.stringify(res));

            let UIScrollControl = this.scrollview2.getComponent('UIScrollControl');
            UIScrollControl.clear();

            UIScrollControl.initControl(this.preItem2, res.items.length, this.preItem2.getContentSize(), 0, (node, index) => {

                let handle = node.getComponent('ZnxgItem2');
                handle.onShow(res.items[index], index + 1);

            })
        })
        this.tipsNode.active = false;
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

}
