import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content1: cc.Node = null;

    @property(cc.Node)
    content2: cc.Node = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item1: cc.Node = null;

    @property(cc.Node)
    item2: cc.Node = null;

    @property(cc.Label)
    zzcLa: cc.Label = null;

    @property(cc.Label)
    kczcLa: cc.Label = null;

    @property(cc.Label)
    cczcLa: cc.Label = null;

    @property(cc.Label)
    wtzcLa: cc.Label = null;


    start() {

        if (GameData.selfStockList.length > 0) {
            // this.tipsNode.active = false;
            // let info = {
            //     codes: GameData.selfStockList,
            // }

            // let CmdQueryAiStockList = pb.CmdQueryAiStockList;
            // let message = CmdQueryAiStockList.create(info);
            // let buff = CmdQueryAiStockList.encode(message).finish();

            // socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {

            //     console.log('查询模拟选股的股票列表' + JSON.stringify(res));

            //     res.items.forEach((el, index) => {

            //         if (!this.content1.children[index]) {
            //             let node = cc.instantiate(this.item1);
            //             this.content1.addChild(node);
            //         }

            //         let handle = this.content1.children[index].getComponent('MyxgItem1');
            //         handle.onShow(el);
            //     });
            // })

        }
        else {
            this.tipsNode.active = true;
        }

    }

    onEnable() {
        this.onUpdateMycgData();
    }

    //资产数据
    onUpdateMycgData() {
        if (!GameData.mncgDataList) {
            this.zzcLa.string = '0';
            this.kczcLa.string = '0';
            this.cczcLa.string = '0';
            this.wtzcLa.string = '0';
        }
        else {
            //TODO
        }

    }



    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

        //记录
        else if (name == 'sp_topbtn_jyjl') {
            GlobalEvent.emit(EventCfg.OPENMYHISLAYER);
        }

        //添加自选
        else if (name == 'sp_topbtn_tianjia') {
            GlobalEvent.emit(EventCfg.OPENADDZXGPBOX);
        }

        //帮组
        else if (name == 'sp_topbtn_help') {
            GameCfg.GameType = 'MYXG';
            GlobalEvent.emit(EventCfg.OPENHELPLAYER);
        }

        else if (name == 'sp_mncg_arrqh') {

        }

        //越换资产
        else if (name == 'sp_mncg_dhzc') {
            GlobalEvent.emit(EventCfg.OPENDHZCLLAYER);
        }

    }


    onToggleClick(event, data) {
        let name = event.node.name;

        if (name == 'toggle1') {

        }
        else if (name == 'toggle2') {

        }
    }
}
