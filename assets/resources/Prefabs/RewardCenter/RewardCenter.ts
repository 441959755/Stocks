import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    rewardData = null;

    onLoad() {
        GlobalEvent.on('getRewardCenter', () => {
            this.content.removeAllChildren();
        }, this);
    }

    onShow() {
        if (this.rewardData.length == 0) {
            return;
        } else {
            if (this.content.childrenCount == 0) {
                console.log('RewardCenter rewardData: ' + this.rewardData);
                this.rewardData.forEach((el) => {
                    let node = cc.instantiate(this.item);
                    this.content.addChild(node);
                    let handle = node.getComponent('RewardItem');
                    if (handle) {
                        handle.itemData = el;
                        handle.onShow();
                    }
                    else {
                        console.log('RewardCenter onShow handle is null');
                    }
                });
            }
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'btn_qlingqu') {
            let nodes = this.content.children;
            nodes.forEach((el) => {
                let handle = el.getComponent('RewardItem');
                if (handle) {
                    handle.getItemRewaed();
                }
            })

        }
        else if (name == 'closeBtn') {
            this.node.active = false;
        }
    }

    onDestroy() {
        GlobalEvent.off('getRewardCenter');
    }

}
