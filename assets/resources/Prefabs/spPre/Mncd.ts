import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/GameCfg";
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

    onShow() {

        this.content.removeAllChildren();

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
        else {
            this.tipsNode.active = false;
        }

        this.hisList.forEach(el => {
            let item = cc.instantiate(this.item);
            this.content.addChild(item);
            let handle = item.getComponent('MncdItem');
            handle.onShow(el);
        })


    }

    // onListRender(item: cc.Node, idx: number) {
    //     let handle = item.getComponent('MncdItem');
    //     handle.onShow(this.hisList[idx]);
    // }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

}
