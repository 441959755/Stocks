import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import GameCfg from "./GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockHandle extends cc.Component {

    @property(cc.Node)
    block1: cc.Node = null;

    @property(cc.Node)
    block2: cc.Node = null;

    @property(cc.Node)
    block3: cc.Node = null;

    @property(cc.Node)
    block4: cc.Node = null;

    blockNods = [];

    onLoad() {
        GlobalEvent.on(EventCfg.ONMARKUPDATE, this.updateBlcokPoint.bind(this), this);

        GlobalEvent.on(EventCfg.CREATEBLOCK, this.createBlock.bind(this), this);

        GlobalEvent.on(EventCfg.LEAVEGAME, this.leaveGame.bind(this), this);
    }

    //创建方块
    createBlock(type, index?) {
        if (!index) {
            index = GameCfg.huizhidatas;
        }

        let some = index - GameCfg.beg_end[0];
        if (some < 0) { return }

        let startX = some == 0 ? 10 : 10 + (some * GameCfg.hz_width);

        let node;

        if (type == 1) {
            node = cc.instantiate(this.block1);
        }
        else if (type == 2) {
            node = cc.instantiate(this.block2);
        }
        else if (type == 3) {
            node = cc.instantiate(this.block3);
        }
        else if (type == 4) {
            node = cc.instantiate(this.block4);
        }

        else if (type == 5) {
            node = cc.instantiate(this.block1);
        }
        else if (type == 6) {
            node = cc.instantiate(this.block2);
        }
        else if (type == 7) {
            node = cc.instantiate(this.block3);
        }
        else if (type == 8) {
            node = cc.instantiate(this.block4);
        }

        this.node.addChild(node);

        node.x = startX;
        node.y = 0;

        this.blockNods[index - 1] = [node, index - 1];

        GameCfg.blockHistoy.push([index - 1, type]);

    }

    leaveGame() {
        this.node.removeAllChildren();
        GameCfg.blockHistoy = [];
        this.blockNods = [];
    }

    //跟新方块的位置
    updateBlcokPoint(posInfo) {

        this.onBlockRangeHide();
        if (this.blockNods[posInfo.index]) {
            this.blockNods[posInfo.index][0].active = true;
            this.blockNods[posInfo.index][0].x = posInfo.lowPos.x;
        }
    }

    onBlockRangeHide() {
        this.blockNods.forEach((el, i) => {
            if (el && el[0]) {
                if (el[1] < GameCfg.beg_end[0] || el[1] >= GameCfg.beg_end[1]) {
                    el[0].active = false;
                }
            }

        })
    }

    onDestroy() {

        GlobalEvent.off(EventCfg.ONMARKUPDATE);

        GlobalEvent.off(EventCfg.CREATEBLOCK)
    }
}
