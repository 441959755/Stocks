import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ZNXGNode: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.OPENZNXG, () => { this.ZNXGNode.active = true }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENZNXG);
    }


}
