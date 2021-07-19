
import { pb } from "../../protos/proto";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    diamondLabel: cc.Label = null;


    onLoad() {
        GlobalEvent.on(EventCfg.GOLDCHANGE, () => { this.goldLabel.string = GameData.properties[pb.GamePropertyId.Gold] }, this);

        GlobalEvent.on(EventCfg.DIAMONDCHANGE, () => {
            this.diamondLabel.string = GameData.properties[pb.GamePropertyId.Diamond];
        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.DIAMONDCHANGE);
    }


    start() {
        //  this.node.zIndex = 99;
        this.goldLabel.string = GameData.properties[pb.GamePropertyId.Gold];
        this.diamondLabel.string = GameData.properties[pb.GamePropertyId.Diamond];

    }

    onBtnClck(event, data) {
        let name = event.target.name;
        if (name == 'btnGold') {
            console.log('点击金币')

        }
        else if (name == 'btnDia') {
            console.log('点击钻石');

        }

    }

}
