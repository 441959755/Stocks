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




    onEnable() {
        if (GameData.selfStockList.length > 0) {
            //  if (this.content1.children.length < GameData.selfStockList.length) {
            GameData.selfStockList.forEach((el, index) => {
                if (!this.content1.children[index]) {
                    let node = cc.instantiate(this.item1);
                    this.content1.addChild(node);
                }
                let handle = this.content1.children[index].getComponent('MyxgItem');
                handle.onShow(el);
            })
            //  }
        }
        else {
            this.tipsNode.active = true;
        }
        this.onUpdateMycgData();
    }



    //资产数据
    onUpdateMycgData() {

        this.zzcLa.string = '0';
        this.kczcLa.string = GameData.mncgDataList.account || 0;
        //TODO
        this.cczcLa.string = '0';
        this.wtzcLa.string = '0';

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
