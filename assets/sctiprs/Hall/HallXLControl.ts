import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    DXNode: cc.Node = null;

    QHNode: cc.Node = null;

    SMNode: cc.Node = null;

    ZBNode: cc.Node = null;

    ZBSetNode: cc.Node = null;

    SMSetNode: cc.Node = null;

    QHSetNode: cc.Node = null;

    DXSetNode: cc.Node = null;

    ZBHisNode: cc.Node = null;

    SMHisNode: cc.Node = null;

    QHHisNode: cc.Node = null;

    DXHisNode: cc.Node = null;

    monthNode: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.OPENSMLAYER, this.openSMLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZBLAYER, this.openZBLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDXLAYER, this.openDXLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENQHLAYER, this.openQHLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENSETLAYER, this.openSetLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENHISTORYLAYER, this.openHisLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMONTHLAYER, this.openMonthLayer.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENSMLAYER);
        GlobalEvent.off(EventCfg.OPENZBLAYER);
        GlobalEvent.off(EventCfg.OPENDXLAYER);
        GlobalEvent.off(EventCfg.OPENQHLAYER);
        GlobalEvent.off(EventCfg.OPENSETLAYER);
        LoadUtils.releaseRes('Prefabs/xl/ZBSetLayer');
        LoadUtils.releaseRes('Prefabs/xl/SMSetLayer');
        LoadUtils.releaseRes('Prefabs/xl/DXSetLayer');
        LoadUtils.releaseRes('Prefabs/xl/QHSetLayer');
        LoadUtils.releaseRes('Prefabs/xl/shuangmangLayer');
        LoadUtils.releaseRes('Prefabs/xl/zhibiaoLayer');
        LoadUtils.releaseRes('Prefabs/xl/DXLayer');
        LoadUtils.releaseRes('Prefabs/xl/qiHuoLayer');
        LoadUtils.releaseRes('Prefabs/xl/ZBHisLayer');
        LoadUtils.releaseRes('Prefabs/xl/SMHisLayer');
        LoadUtils.releaseRes('Prefabs/xl/DXHisLayer');
        LoadUtils.releaseRes('Prefabs/xl/QHHisLayer');
    }

    /**
     * 月报
     */
    openMonthLayer() {
        if (!this.monthNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/xl/SMMonthlyLayer', pre => {
                this.monthNode = cc.instantiate(pre);
                this.node.addChild(this.monthNode, 10);

            })
        }
    }

    /**
     * 历史记录
     */
    openHisLayer() {
        switch (GameCfg.GameType) {
            case pb.GameType.ZhiBiao:
                this.openNode(this.ZBHisNode, 'Prefabs/xl/ZBHisLayer', 11);
                break;
            case pb.GameType.ShuangMang:
                this.openNode(this.SMHisNode, 'Prefabs/xl/SMHisLayer', 11);
                break;
            case pb.GameType.DingXiang:
                this.openNode(this.DXHisNode, 'Prefabs/xl/DXHisLayer', 11);
                break;
            case pb.GameType.QiHuo:
                this.openNode(this.QHHisNode, 'Prefabs/xl/QHHisLayer', 11);
                break;
        }

    }

    /**
     * 设置
     */
    openSetLayer() {
        switch (GameCfg.GameType) {
            case pb.GameType.ZhiBiao:
                this.openNode(this.ZBSetNode, 'Prefabs/xl/ZBSetLayer', 10);
                break;
            case pb.GameType.ShuangMang:
                this.openNode(this.SMSetNode, 'Prefabs/xl/SMSetLayer', 10);
                break;
            case pb.GameType.DingXiang:
                this.openNode(this.DXSetNode, 'Prefabs/xl/DXSetLayer', 10);
                break;
            case pb.GameType.QiHuo:
                this.openNode(this.QHSetNode, 'Prefabs/xl/QHSetLayer', 10);
                break;
        }
    }

    /**
     * 双盲
     */
    openSMLayer() {
        if (this.SMNode) {
            this.SMNode.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/xl/shuangmangLayer', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.SMNode = cc.instantiate(pre);
                this.node.addChild(this.SMNode, 2);
                this.node.active = true;
            })
        }
    }

    /**
     * 指标
     */
    openZBLayer() {
        if (!this.ZBNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/xl/zhibiaoLayer', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.ZBNode = cc.instantiate(pre);
                this.node.addChild(this.ZBNode, 3);
                this.ZBNode.active = true;
            })
        }
        else {
            this.ZBNode.active = true;
        }
    }

    /**
     * 定向
     */
    openDXLayer() {
        if (!this.DXNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/xl/DXLayer', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.DXNode = cc.instantiate(pre);
                this.node.addChild(this.DXNode, 4);
                this.DXNode.active = true;
            })
        }
        else {
            this.DXNode.active = false;
        }
    }

    /**
     * 期货
     */
    openQHLayer() {
        if (!this.QHNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/xl/qiHuoLayer', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.QHNode = cc.instantiate(pre);
                this.node.addChild(this.QHNode, 5);
                this.QHNode.active = true;
            })
        }
        else {
            this.QHNode.active = true;
        }

    }

    openNode(node, url, zIndex) {
        if (!node) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes(url, pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                node = cc.instantiate(pre);
                this.node.addChild(node, zIndex);
                node.active = true;
            })
        }
        else {
            node.active = true;
        }
    }



}
