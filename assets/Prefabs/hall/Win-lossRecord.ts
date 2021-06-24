import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    tipsLabel: cc.Node = null;



    start() {

    }

    onEnable() {
        if (GameData.GameCounters.length == 0) {
            this.tipsLabel.active = true;
            return
        }
        else {
            this.tipsLabel.active = false;

            if (this.content.childrenCount > 0) {
                let nodes = this.content.children;


            }
            else {
                GameData.todayGameCount.forEach((el, index) => {
                    let node = cc.instantiate(this.item);
                    this.content.addChild(node);
                    let label1 = node.getChildByName('label1');
                    let label2 = node.getChildByName('label2');
                    if (index == pb.GameType.ShuangMang) {

                    }
                    else if (index == pb.GameType.DingXiang) {

                    }
                    else if (index == pb.GameType.FenShi) {

                    }
                    else if (index == pb.GameType.ZhiBiao) {

                    }
                    else if (index == pb.GameType.TiaoJianDan) {

                    }


                });

            }


        }
    }

    // update (dt) {}
}
