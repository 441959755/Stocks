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

    yieldNode: cc.Node = null;  //曲线图

    helpNode: cc.Node = null;  //帮组

    onLoad() {
        GlobalEvent.on(EventCfg.OPENSMLAYER, this.openSMLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZBLAYER, this.openZBLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDXLAYER, this.openDXLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENQHLAYER, this.openQHLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENSETLAYER, this.openSetLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENHISTORYLAYER, this.openHisLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMONTHLAYER, this.openMonthLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENYIELDLAYER, this.openYieldLayer.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENSMLAYER);
        GlobalEvent.off(EventCfg.OPENZBLAYER);
        GlobalEvent.off(EventCfg.OPENDXLAYER);
        GlobalEvent.off(EventCfg.OPENQHLAYER);
        GlobalEvent.off(EventCfg.OPENSETLAYER);
        GlobalEvent.off(EventCfg.OPENHISTORYLAYER);
        GlobalEvent.off(EventCfg.OPENMONTHLAYER);
        GlobalEvent.off(EventCfg.OPENYIELDLAYER);
        GlobalEvent.off(EventCfg.OPENHELPLAYER);
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
        LoadUtils.releaseRes('Prefabs/xl/SMMonthlyLayer');
    }

    /**
     * 曲线图
     */
    openYieldLayer() {
        this.openNode(this.yieldNode, 'Prefabs/xl/SMYieldCurve', 10, (node) => { this.yieldNode = node });
    }


    /**
     * 月报
     */
    openMonthLayer() {
        this.openNode(this.monthNode, 'Prefabs/xl/SMMonthlyLayer', 10, (node) => { this.monthNode = node });
    }


    /**
     * 历史记录
     */
    openHisLayer() {
        switch (GameCfg.GameType) {
            case pb.GameType.ZhiBiao:
                this.openNode(this.ZBHisNode, 'Prefabs/xl/ZBHisLayer', 11, (node) => { this.ZBHisNode = node });
                break;
            case pb.GameType.ShuangMang:
                this.openNode(this.SMHisNode, 'Prefabs/xl/SMHisLayer', 11, (node) => {
                    this.SMHisNode = node;
                });
                break;
            case pb.GameType.DingXiang:
                this.openNode(this.DXHisNode, 'Prefabs/xl/DXHisLayer', 11, (node) => {
                    this.DXHisNode = node;
                });
                break;
            case pb.GameType.QiHuo:
                this.openNode(this.QHHisNode, 'Prefabs/xl/QHHisLayer', 11, (node) => {
                    this.QHHisNode = node;
                });
                break;
        }
    }

    /**
     * 设置
     */
    openSetLayer() {
        switch (GameCfg.GameType) {
            case pb.GameType.ZhiBiao:
                this.openNode(this.ZBSetNode, 'Prefabs/xl/ZBSetLayer', 10, (node) => { this.ZBSetNode = node });
                break;
            case pb.GameType.ShuangMang:
                this.openNode(this.SMSetNode, 'Prefabs/xl/SMSetLayer', 10, (node) => { this.SMSetNode = node });
                break;
            case pb.GameType.DingXiang:
                this.openNode(this.DXSetNode, 'Prefabs/xl/DXSetLayer', 10, (node) => { this.DXSetNode = node });
                break;
            case pb.GameType.QiHuo:
                this.openNode(this.QHSetNode, 'Prefabs/xl/QHSetLayer', 10, (node) => { this.QHSetNode = node });
                break;
        }
    }

    /**
     * 双盲
     */
    openSMLayer() {
        this.openNode(this.SMNode, 'Prefabs/xl/shuangmangLayer', 2, (node) => { this.SMNode = node });
    }

    /**
     * 指标
     */
    openZBLayer() {
        this.openNode(this.ZBNode, 'Prefabs/xl/zhibiaoLayer', 3, (node) => { this.ZBNode = node });
    }

    /**
     * 定向
     */
    openDXLayer() {
        this.openNode(this.DXNode, 'Prefabs/xl/DXLayer', 3, (node) => { this.DXNode = node });
    }

    /**
     * 期货
     */
    openQHLayer() {
        this.openNode(this.QHNode, 'Prefabs/xl/qiHuoLayer', 3, (node) => { this.QHNode = node });

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
        }
    }



}
