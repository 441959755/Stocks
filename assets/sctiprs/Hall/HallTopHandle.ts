import { pb } from "../../protos/proto";
import GameData from "../GameData";
import ComUtils from "../Utils/ComUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    vipTimeLabel: cc.Label = null;

    setLayer: cc.Node = null;

    vipExplain: cc.Node = null;

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
            PopupManager.openNode(this.node.parent, this.setLayer, 'Prefabs/hallSetLayer', 10, (node) => {
                this.setLayer = node;
            })
        }

        //vip说明
        else if (name == 'main_tb_vip') {
            PopupManager.loadVipExplain();
        }

    }

    onDestroy() {
        LoadUtils.releaseRes('Prefabs/hallSetLayer');
        LoadUtils.releaseRes('Prefabs/vipExplain');
    }

}
