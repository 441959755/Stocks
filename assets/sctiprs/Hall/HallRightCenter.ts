import { pb } from "../../protos/proto";
import ActionUtils from "../Utils/ActionUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    rewardCenterBtn: cc.Node = null;

    rewardCenterData = null;

    rewardCenterNode = null;

    onLoad() {
        this.rewardCenterBtn.active = false;

        GlobalEvent.on('getRewardCenter', this.getRewardCenter.bind(this), this);

        GlobalEvent.on('REWARDITEM', (count) => {
            console.log(count);
            if (count > 0) {
                this.rewardCenterBtn.active = true;
            }
            else {
                this.rewardCenterBtn.active = false;
            }
        }, this);
    }

    getRewardCenter(call?) {

        socket.send(pb.MessageId.Req_Hall_BackBag, null, (info) => {
            console.log('getRewardCenter:' + JSON.stringify(info));

            if (info && info.grids.length > 0) {
                this.rewardCenterBtn.active = true;
            }
            else {
                this.rewardCenterBtn.active = false;
            }
            this.rewardCenterData = info.grids || [];

            call && (call);
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'rewardCentertBtn') {
            PopupManager.openNode(cc.find('Canvas'), this.rewardCenterNode, 'Prefabs/RewardCenter/rewardCenter', 12, (node) => {
                ActionUtils.openBox(node);
                this.rewardCenterNode = node;
                let handle = this.rewardCenterNode.getComponent('RewardCenter');
                if (handle) {
                    handle.rewardData = this.rewardCenterData;
                    handle.onShow();
                }
            })
        }
    }

    onDestroy() {
        GlobalEvent.off('getRewardCenter');
        GlobalEvent.off('REWARDITEM');
    }

}
