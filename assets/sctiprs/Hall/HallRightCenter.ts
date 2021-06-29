import { pb } from "../../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    rewardCenterBtn: cc.Node = null;

    @property(cc.Prefab)
    rewardCenterPre: cc.Prefab = null;

    rewardCenterNode: cc.Node = null;

    rewardCenterData = null;



    onLoad() {
        this.rewardCenterBtn.active = false;
        //获取奖励中心的消息
        this.getRewardCenter();

    }

    getRewardCenter() {
        socket.send(pb.MessageId.Req_Hall_BackBag, null, (info) => {
            console.log('getRewardCenter:' + JSON.stringify(info));
            if (info && info.grids) {
                if (info.grids.length > 0) {
                    this.rewardCenterBtn.active = true;
                    this.rewardCenterData = info.grids;
                }
            }
        })
    }

    start() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'rewardCentertBtn') {
            this.onOpenRewardCenterLayer();

        }

    }

    onOpenRewardCenterLayer() {
        if (!this.rewardCenterNode) {
            this.rewardCenterNode = cc.instantiate(this.rewardCenterPre);
            this.node.addChild(this.rewardCenterNode);
        }
        this.rewardCenterNode.active = true;
        let handle = this.rewardCenterNode.getComponent('RewardCenter');
        if (handle) {
            handle.rewardData = this.rewardCenterData;
            handle.onShow();
        } else {
            console.log('HallRightCenter onOpenRewardCenterLayer handle is null');
        }

    }


}
