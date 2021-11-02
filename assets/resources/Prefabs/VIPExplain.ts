import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    vipTimeLabel: cc.Label = null;

    start() {

        if (GameData.properties[pb.GamePropertyId.Vip]) {
            ComUtils.getVIPDisTime(this.getVIPDisTime.bind(this));
        }
        else {
            this.vipTimeLabel.node.active = false;
        }
    }

    getVIPDisTime(obj) {
        this.vipTimeLabel.node.active = true;
        this.vipTimeLabel.string = '您是尊贵的VIP用户，您的VIP剩余时间：' + obj.day + '天' + obj.hours + '时' + obj.minute + '分';
    }


    onBtnClick(event, curData) {

        let name = event.target.name;
        if (name == 'sys_close') {
            this.node.active = false;
        }

        else if (name == 'sys_vip_vipjk90') {

        }

        else if (name == 'sys_vip_vipyk30') {

        }
    }
}
