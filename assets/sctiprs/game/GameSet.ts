
const { ccclass, property } = cc._decorator;
import GlobalEvent from "../Utils/GlobalEvent";
import GameCfg from "./GameCfg";
import EventCfg from './../Utils/EventCfg';

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    masks: cc.Node[] = [];

    @property(cc.Node)
    linesNode: cc.Node = null;

    @property(cc.Node)
    HNode: cc.Node = null;

    @property(cc.Node)
    VNode: cc.Node = null;

    @property([cc.Label])
    MALabel: cc.Label[] = [];

    @property(cc.Node)
    laNode: cc.Node = null;    //刻度

    // @property([cc.Node])


    onLoad() {
        //设置刻度label位置
        GlobalEvent.on('labelPoint', (rx) => {
            this.laNode.x = rx;
        }, this);

        GlobalEvent.on('setDrawing', (falg) => {
            if (falg) {
                this.node.width = cc.winSize.width - 20;
            } else {
                this.node.width = cc.winSize.width - 20 - 164;
            }
            this.masks.forEach(el => {
                el.width = this.node.width;
            })
        }, this)

    }

    initMALa() {
        let MAla = [];
        if (GameCfg.GameSet.isMA1) {
            MAla.push(this.MALabel[0])
        } else {
            this.MALabel[0].node.active = false;
        }
        if (GameCfg.GameSet.isMA2) {
            MAla.push(this.MALabel[1])
        } else {
            this.MALabel[1].node.active = false;
        }
        if (GameCfg.GameSet.isMA3) {
            MAla.push(this.MALabel[2])
        } else {
            this.MALabel[2].node.active = false;
        }
        if (GameCfg.GameSet.isMA4) {
            MAla.push(this.MALabel[3])
        } else {
            this.MALabel[3].node.active = false;
        }
        if (GameCfg.GameSet.isMA5) {
            MAla.push(this.MALabel[4])
        } else {
            this.MALabel[4].node.active = false;
        }
        if (GameCfg.GameSet.isMA6) {
            MAla.push(this.MALabel[5])
        } else {
            this.MALabel[5].node.active = false;
        }
        if (MAla.length > 0) {
            GlobalEvent.emit(EventCfg.SETMALABEL, MAla);
        }
    }

    start() {
        if (GameCfg.GameSet.isBW) {
            this.node.color = cc.Color.BLACK;
            //  this.mask.color=cc.Color.BLACK;
            this.masks.forEach(el => {
                el.color = cc.Color.BLACK;
            })
            this.linesNode.children.forEach(el => {
                el.color = cc.Color.WHITE;
                if (el.children.length > 0) {
                    el.children.forEach(e => {
                        e.color = cc.Color.WHITE;
                    })
                }
            })
            this.HNode.color = cc.Color.WHITE;
            this.VNode.color = cc.Color.WHITE;
            GameCfg.HZ_white = cc.Color.WHITE;
            // GameCfg.MAColor[0] = cc.Color.WHITE;
            // GameCfg.BOLLColor[0] = cc.Color.WHITE;
            // GameCfg.VOLColor[0] = cc.Color.WHITE;

        } else {
            this.node.color = cc.Color.WHITE;
            // this.mask.color=cc.Color.WHITE;
            this.masks.forEach(el => {
                el.color = cc.Color.WHITE;
            })
            this.linesNode.children.forEach(el => {
                el.color = cc.Color.BLACK;
                if (el.children.length > 0) {
                    el.children.forEach(e => {
                        e.color = cc.Color.BLACK;
                    })
                }
            })
            this.HNode.color = cc.Color.BLACK;
            this.VNode.color = cc.Color.BLACK;

            GameCfg.HZ_white = cc.Color.BLACK;
            // GameCfg.MAColor[0] = cc.Color.BLACK;
            // GameCfg.BOLLColor[0] = cc.Color.BLACK;
            // GameCfg.VOLColor[0] = cc.Color.BLACK;
        }

        this.initMALa();
    }

    onDestroy() {
        GlobalEvent.off('labelPoint');
        GlobalEvent.off('setDrawing');
    }


}
