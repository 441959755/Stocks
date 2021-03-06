import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
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
                total: 20,
            }
            this.getAIStockList(data);
        }, this);

        this.scrollview1.node.on('scroll-to-bottom', () => {
            console.log('scroll-to-bottom');
            let data = {
                rankFrom: this.AIProfitCount + 1,
                total: 20,
            }
            this.getAIProfitList(data);
        }, this);

        GlobalEvent.on('shouCangAdd', (data) => {
            let node = cc.instantiate(this.preItem2);
            this.content2.addChild(node);
            let handle = node.getComponent('ZnxgItem2');
            handle.onShow(data, GameData.AIStockList.length - 1);
        }, this);



        GlobalEvent.on(EventCfg.SELECTBK, this.onShowSelectBk.bind(this), this);

    }

    onShowSelectBk() {
        let i = 0;
        let nodes = this.content.children;
        nodes.forEach((el, index) => {
            if (index > 0) {
                let handle = el.getComponent('ZnxgItem');

                let flag = this.getBKISShow(handle._curData.code);
                if (flag) { i++ }
                el.active = flag;

                handle.setIndex(i);

            }
        })
    }

    onDestroy() {
        GlobalEvent.off('shouCangAdd');
    }

    start() {
        let data = {
            //    rankFrom: 1,
            tsUpdateFrom: parseInt(new Date().getTime() / 1000 + ''),
            total: 20,
        }
        this.getAIStockList(data);
    }

    onEnable() {
        GlobalEvent.on('UpdateShouCang', this.getCollectList.bind(this), this);
        GameCfg.GameType = 'ZNXG';
    }

    onDisable() {
        GameCfg.GameType = null;
        GlobalEvent.off('UpdateShouCang');
    }

    onBtnToggle(event, data) {
        let name = event.node.name;

        this.scrollview.node.active = false;
        this.scrollview1.node.active = false;
        this.scrollview2.node.active = false;

        //AI????????????
        if (name == 'toggle1') {
            this.scrollview.node.active = true;
            if (this.AIStockList.length > 0) {
                this.tipsNode.active = false;
            }
            else {
                this.tipsNode.active = true;
            }

        }
        //Ai????????????
        else if (name == 'toggle2') {
            this.scrollview1.node.active = true;
            if (this.AIProfitCount == 0) {
                this.tipsNode.active = true;
                let data = {
                    rankFrom: 1,
                    total: 20,
                }
                this.getAIProfitList(data);
            }
        }
        //????????????
        else if (name == 'toggle3') {
            this.scrollview2.node.active = true;
            //  if (this.collectList.length == 0) {
            this.tipsNode.active = true;
            this.getCollectList();
            // }
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

    //AI????????????
    getAIStockList(data) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(data);
        let buff = CmdQueryAiStockList.encode(message).finish();
        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.AIStockList = [];
            console.log('??????AI?????????????????????' + JSON.stringify(res));

            res.items.forEach((el, index) => {
                this.AIStockList.push(el);
                //   if (el.todaySignal < 0) {
                let node = cc.instantiate(this.preItem);
                this.content.addChild(node);
                let handle = node.getComponent('ZnxgItem');
                handle.onShow(el, index + this.AIStockCount);
                //  }
            });
            this.AIStockCount += data.total;

            if (this.AIStockList.length > 0) {
                this.tipsNode.active = false;
            }
        })
    }

    //AI????????????
    getAIProfitList(data) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(data);
        let buff = CmdQueryAiStockList.encode(message).finish();
        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.AIProfitList = [];
            console.log('??????AI????????????' + JSON.stringify(res));

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

    //??????
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

            console.log('??????AI?????????????????????' + JSON.stringify(res));

            let tt = 0;
            res.items.forEach((el, index) => {

                if (!this.content2.children[index]) {
                    let node = cc.instantiate(this.preItem2);
                    this.content2.addChild(node);
                }
                let handle = this.content2.children[index].getComponent('ZnxgItem2');
                let flag = this.getBKISShow(el.code);
                if (flag) { tt++ }
                this.content2.children[index].active = flag;

                handle.onShow(el, tt);

            });
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
