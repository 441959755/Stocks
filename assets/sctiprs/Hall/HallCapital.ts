
import { pb } from "../../protos/proto";
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";
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
        GlobalEvent.on(EventCfg.GOLDCHANGE, this.initData.bind(this), this);

        GlobalEvent.on(EventCfg.DIAMONDCHANGE, this.initData.bind(this), this);

        GlobalEvent.on(EventCfg.KCOINCHANGE, this.initData.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.DIAMONDCHANGE);
        GlobalEvent.off(EventCfg.KCOINCHANGE);
    }

    start() {
        this.initData();
    }

    initData() {
        if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
            this.goldLabel.string = GameData.properties[pb.GamePropertyId.K];
        }
        else {
            this.goldLabel.string = GameData.properties[pb.GamePropertyId.Gold];
            this.diamondLabel.string = GameData.properties[pb.GamePropertyId.Diamond];
        }
    }

    onBtnClck(event, data) {
        let name = event.target.name;

        if (name == 'btnGold') {
            GlobalEvent.emit('OPENSHOPLAYER', 2)
        }

        else if (name == 'btnDia') {
            GlobalEvent.emit('OPENSHOPLAYER', 1)
        }
    }

}
