import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import List from "../../../sctiprs/Utils/List";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    hisList = [];

    @property(cc.Node)
    scrollNode: cc.Node = null;

    @property(List)
    listV: List = null;

    onEnable() {

        let id = 0
        if (GameData.SpStockData && GameData.SpStockData.id) {
            id = GameData.SpStockData.id;
        }

        if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
            this.hisList = GameData.mncgDataList.orderList.items;
        }

        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            GameData.cgdsStateList.forEach(el => {
                if (el.id == GameData.SpStockData.id) {
                    if (el.state.orderList && el.state.orderList.items) {
                        this.hisList = el.state.orderList.items;
                    }
                }
            })
        }

        if (this.hisList.length <= 0) {
            this.tipsNode.active = true;
        }

        this.listV.numItems = this.hisList.length;
    }

    onListRender(item: cc.Node, idx: number) {
        let handle = item.getComponent('MncdItem');
        handle.onShow(this.hisList[idx]);
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

}
