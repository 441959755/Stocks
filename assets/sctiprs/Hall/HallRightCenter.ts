import { pb } from "../../protos/proto";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    rewardCenterBtn: cc.Node = null;

    rewardCenterData = null;

    onLoad() {
        this.rewardCenterBtn.active = false;
        GlobalEvent.on('getRewardCenter', this.getRewardCenter.bind(this), this);
    }

    getRewardCenter(call?) {

        socket.send(pb.MessageId.Req_Hall_BackBag, null, (info) => {
            console.log('getRewardCenter:' + JSON.stringify(info));
            if (info && info.grids) {
                if (info.grids.length > 0) {
                    this.rewardCenterBtn.active = true;
                    this.rewardCenterData = info.grids;
                }
            }
            call && (call);
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'rewardCentertBtn') {

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            GlobalEvent.emit(EventCfg.OPENREWARDCENTERLAYER, this.rewardCenterData);

        }
    }

    onDestroy() {
        GlobalEvent.off('getRewardCenter');
    }

}
