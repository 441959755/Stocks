import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    block1: cc.Node = null;

    @property(cc.Node)
    block2: cc.Node = null;

    @property(cc.Node)
    block3: cc.Node = null;

    @property(cc.Node)
    block4: cc.Node = null;


    onLoad() {
        GlobalEvent.on(EventCfg.ONMARKUPDATE, this.updateBlcokPoint.bind(this), this);

        GlobalEvent.on(EventCfg.CREATEBLOCK, this.createBlock.bind(this), this);

    }

    //创建方块
    createBlock() {



    }

    //跟新方块的位置
    updateBlcokPoint() {

    }
}
