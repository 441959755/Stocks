import { pb } from "../../protos/proto";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import GameCfg from "./GameCfg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    opsControl: cc.Node = null;
    url = null;

    taiticBox: cc.Node = null;

    onLoad() {
        this.onLoadOpsControl();

        GlobalEvent.on('OPENTAITICBOX', this.openTaiticBox.bind(this), this);

    }

    //打开策略设置
    openTaiticBox(type) {
        this.openNode(this.taiticBox, 'Prefabs/game/taiticBox', 10, (node) => {
            this.taiticBox = node;
            node.getComponent('TaiticBox').onShow(type);
        });
    }

    onLoadOpsControl() {
        if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            this.url = 'Prefabs/game/tjdcontrol';
        }
        this.openNode(this.openNode, this.url, 1);
    }

    onDestroy() {
        LoadUtils.releaseRes(this.url);
        LoadUtils.releaseRes('Prefabs/game/taiticBox');
        GlobalEvent.off('OPENTAITICBOX');
    }


    openNode(node, url, zIndex, call?) {
        if (!node) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes(url, pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                node = cc.instantiate(pre);
                this.node.addChild(node, zIndex);
                node.active = true;
                call(node);
            })
        }
        else {
            node.active = true;
            call(node);
        }
    }

}
