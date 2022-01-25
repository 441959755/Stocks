import GlobalEvent from "./Utils/GlobalEvent";
import EventCfg from "./Utils/EventCfg";
import GameCfg from "./GameCfg";
import { pb } from "../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    topNode: cc.Node = null;

    @property(cc.Node)
    bottomNode: cc.Node = null;

    @property(cc.Node)
    labelBox: cc.Node = null;

    @property([cc.Node])
    lineNodes: cc.Node[] = [];

    @property([cc.Node])
    labelNodes: cc.Node[] = [];

    @property(cc.Node)
    RNode: cc.Node = null;

    @property(cc.Node)
    LNOde: cc.Node = null;


    onLoad() {
        let preScale = this.node.height;
        this.node.on('size-changed', () => {

            if (preScale != this.node.height) {

                let scale = this.node.height / preScale;
                this.topNode.height *= scale;
                this.bottomNode.height *= scale;
                this.labelBox && (this.labelBox.height *= scale)
                this.setLabelPos();
                //   GlobalEvent.emit('znDrswWidth');
                setTimeout(() => {
                    GlobalEvent.emit(EventCfg.SET_DRAW_SIZE);
                    GlobalEvent.emit('boxSlecetPos', this.node.convertToWorldSpaceAR(this.topNode.position));
                }, 100)
            }

            preScale = this.node.height;
        }, this);

    }

    setLabelPos() {

        if (GameCfg.GameType != pb.GameType.FenShi) {

            this.labelNodes.forEach((el, index) => {
                if (el) {
                    if (index < 4) {
                        let f = this.topNode.height / 4;
                        el.y = this.node.height - index * f - 25;

                        if (index != 0) {
                            this.lineNodes[index - 1].y = this.node.height - index * f;
                        }

                    } else {
                        let f = this.bottomNode.height / 4;

                        el.y = (7 - index) * f - 20;

                    }
                }

            })

            this.lineNodes.forEach((el, index) => {
                if (el) {
                    if (index < 3) {
                        // let f = this.topNode.height / 4;
                        // el.y = this.node.height - ((index + 1) * f);
                    } else {
                        let f = this.bottomNode.height / 4;
                        el.y = (6 - index) * f;
                    }
                }

            })
        } else {
            this.RNode.children.forEach((el, index) => {
                if (el) {
                    let f = this.topNode.height / 4;
                    el.y = this.node.height - index * f - 25;
                }
            })

            this.LNOde.children.forEach((el, index) => {
                if (el) {
                    if (index < 5) {
                        let f = this.topNode.height / 4;
                        el.y = this.node.height - index * f - 25;
                    } else {
                        let f = this.topNode.height / 4;
                        el.y = this.node.height - (index - 1) * f - 25;
                    }

                }
            })
        }
    }
}
