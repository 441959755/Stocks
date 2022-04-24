
import { pb } from "../../protos/proto";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HallCapital extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    diamondLabel: cc.Label = null;

    onLoad() {
        GlobalEvent.on(EventCfg.GOLDCHANGE, this.initData.bind(this), this);

        GlobalEvent.on(EventCfg.DIAMONDCHANGE, this.initData.bind(this), this);
    }

    start() {
        this.initData();
    }

    initData() {
        this.goldLabel.string = GameData.properties[pb.GamePropertyId.Gold];
        this.diamondLabel.string = GameData.properties[pb.GamePropertyId.Diamond];
    }

    onBtnClck(event, data) {
        let name = event.target.name;

        if (name == 'btnGold') {
            this.openShopLayer(2);
        }

        else if (name == 'btnDia') {
            this.openShopLayer(1);
        }
    }

    openShopLayer(type){
        PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/shop/shop', 88, (node) => {
            type && (node.getComponent('ShopControl').onShow(type));
        })
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.DIAMONDCHANGE);
    }

}
