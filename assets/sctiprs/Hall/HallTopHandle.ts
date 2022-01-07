import { pb } from "../../protos/proto";
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";
import GameData from "../GameData";
import ActionUtils from "../Utils/ActionUtils";
import ComUtils from "../Utils/ComUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    vipTimeLabel: cc.Label = null;

    onLoad() {
        //vip
        GlobalEvent.on(EventCfg.VIPCHANGE, this.setVIPstatus.bind(this), this);
    }


    start() {
        this.setVIPstatus();
    }


    setVIPstatus() {
        if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
            ComUtils.getVIPDisTime(this.getVIPDisTime.bind(this));
        }
        else {
            this.vipTimeLabel.string = 'VIP';
        }
    }

    getVIPDisTime(obj) {
        this.vipTimeLabel.string = obj.day + '天' + obj.hours + '时';
    }

    onBtnClick(event, curData) {

        let name = event.target.name;
        //设置
        if (name == 'xl_topbtn_xlsz') {

            PopupManager.openNode(this.node.parent, null, 'Prefabs/hallSetLayer', 11, (node) => {
                ActionUtils.openBox(node);
            })

        }

        //vip说明
        else if (name == 'main_tb_vip') {
            PopupManager.loadVipExplain();
        }

        else if (name == 'main_tb_qq') {
            let str = '';
            if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
                str = 'Prefabs/sericeBox1';
            }
            else {
                str = 'Prefabs/sericeBox';
            }
            PopupManager.openNode(this.node.parent, null, 'Prefabs/sericeBox', 11, (node) => {
                ActionUtils.openBox(node);
            })

        }

    }

}
