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
    url1 = null;
    taiticBox: cc.Node = null;

    finalLayer: cc.Node = null;

    onLoad() {
        this.onLoadOpsControl();

        GlobalEvent.on('OPENTAITICBOX', this.openTaiticBox.bind(this), this);
        GlobalEvent.on('OPENFINALLAYER', this.openFinalLayer.bind(this), this);

    }

    //打开结算页
    openFinalLayer() {

        if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            this.url1 = 'Prefabs/game/TjdFinalLayer';
        }

        LoadUtils.openNode(this.node, this.finalLayer, this.url, 20, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.finalLayer = node;
            this.finalLayer.active = true;
        })
    }

    //打开策略设置  、买入、卖出、止损
    openTaiticBox(type, zhichan, call, obj) {
        this.openNode(this.taiticBox, 'Prefabs/game/taiticBox', 10, (node) => {
            this.taiticBox = node;
            node.getComponent('TaiticBox').onShow(type, zhichan, call, obj);
        });
    }

    onLoadOpsControl() {
        //条件单
        if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            this.url = 'Prefabs/game/tjdcontrol';
        }
        //双盲
        else if (GameCfg.GameType == pb.GameType.ShuangMang) {
            this.url = 'Prefabs/game/smControl';
        }
        this.openNode(this.openNode, this.url, 1);
    }

    onDestroy() {
        LoadUtils.releaseRes(this.url);
        LoadUtils.releaseRes(this.url1);
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
                call && (call(node))
            })
        }
        else {
            node.active = true;
            call && (call(node));
        }
    }

}
