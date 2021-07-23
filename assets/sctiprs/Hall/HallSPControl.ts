import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    znxgNode: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.OPENZNXG, this.onLoadZNXGLayer.bind(this), this);
    }

    onLoadZNXGLayer() {
        if (!this.znxgNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/znxgLayer', (pre) => {
                this.znxgNode = cc.instantiate(pre);
                this.node.addChild(this.znxgNode);
                this.znxgNode.active = true;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            })
        }
        else {
            this.znxgNode.active = true;
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENZNXG);
    }


}
