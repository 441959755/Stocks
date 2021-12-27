import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    DXNode: cc.Node = null;

    QHNode: cc.Node = null;

    SMNode: cc.Node = null;

    ZBNode: cc.Node = null;

    monthNode: cc.Node = null;

    yieldNode: cc.Node = null;  //曲线图

    helpNode: cc.Node = null;  //帮组

    smResetNode: cc.Node = null;  //sm重置

    TJDNode: cc.Node = null;     //tjd选择界面

    TJDHisNode: cc.Node = null;   //条件单历史记录

    TJDGame: cc.Node = null;    //条件单游戏界面

    fenshi: cc.Node = null;

    fenShiGame: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.OPENSMLAYER, this.openSMLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZBLAYER, this.openZBLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDXLAYER, this.openDXLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENQHLAYER, this.openQHLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENSETLAYER, this.openSetLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENHISTORYLAYER, this.openHisLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMONTHLAYER, this.openMonthLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENYIELDLAYER, this.openYieldLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENSMRESETMONEYLAYER, this.openSmResetLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENTIAOJIANDAN, this.openTiaoJianDan.bind(this), this);
        GlobalEvent.on(EventCfg.OPENFENSHI, this.openFenShi.bind(this), this);
        GlobalEvent.on(EventCfg.OPENTJDGAME, this.openTJDGame.bind(this), this);
        GlobalEvent.on(EventCfg.OPENGAMEFENSHI, this.openGameFenShi.bind(this), this);
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
        GlobalEvent.off(EventCfg.OPENSMRESETMONEYLAYER);
        GlobalEvent.off(EventCfg.OPENTIAOJIANDAN);
        GlobalEvent.off(EventCfg.OPENTJDGAME);
        GlobalEvent.off(EventCfg.OPENFENSHI);
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
        LoadUtils.releaseRes('Prefabs/xl/SMResetLayer');
        LoadUtils.releaseRes('Prefabs/xl/SMYieldCurve');
        LoadUtils.releaseRes('Prefabs/tjd/tiaoJianDan');
        LoadUtils.releaseRes('Prefabs/tjd/tjdGame');
        LoadUtils.releaseRes('Prefabs/fsxl/fenshi');
    }

    /**
     * 双盲重置金币
     */
    openSmResetLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.smResetNode, 'Prefabs/xl/SMResetLayer', 10, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.smResetNode = node
        });
    }

    /**
     * 曲线图
     */
    openYieldLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.yieldNode, 'Prefabs/xl/SMYieldCurve', 10, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.yieldNode = node
        });
    }


    /**
     * 月报
     */
    openMonthLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.monthNode, 'Prefabs/xl/SMMonthlyLayer', 10, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.monthNode = node
        });
    }


    /**
     * 历史记录
     */
    openHisLayer() {
        let str = '';
        switch (GameCfg.GameType) {
            case pb.GameType.ZhiBiao:
                str = 'Prefabs/xl/ZBHistoryLayer';
                break;
            case pb.GameType.ShuangMang:
                str = 'Prefabs/xl/HistoryLayerSM';
                break;
            case pb.GameType.DingXiang:
                str = 'Prefabs/xl/DXHistoryLayer';
                break;
            case pb.GameType.QiHuo:
                str = 'Prefabs/xl/QHHistoryLayer';
                break;
            case pb.GameType.TiaoJianDan:
                str = 'Prefabs/tjd/TJDHistoryLayer';
                break;
        }

        PopupManager.openNode(this.node, null, str, 11, null);
    }

    /**
     * 设置
     */
    openSetLayer() {
        let str = '';
        switch (GameCfg.GameType) {
            case pb.GameType.ZhiBiao:
                str = 'Prefabs/xl/ZBSetLayer';
                break;
            case pb.GameType.ShuangMang:

            case pb.GameType.TiaoJianDan:
                str = 'Prefabs/xl/SMSetLayer';
                break;
            case pb.GameType.DingXiang:
                str = 'Prefabs/xl/DXSetLayer';
                break;
            case pb.GameType.QiHuo:
                str = 'Prefabs/xl/QHSetLayer';
                break;
        }

        PopupManager.openNode(this.node, null, str, 10, null);
    }

    /**
     * 双盲
     */
    openSMLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.SMNode, 'Prefabs/xl/shuangmangLayer', 2, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.SMNode = node
        });
    }

    /**
     * 指标
     */
    openZBLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.ZBNode, 'Prefabs/xl/zhibiaoLayer', 3, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.ZBNode = node
        });
    }

    /**
     * 定向
     */
    openDXLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.DXNode, 'Prefabs/xl/DXLayer', 3, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.DXNode = node
        });
    }

    /**
     * 期货
     */
    openQHLayer() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.QHNode, 'Prefabs/xl/qiHuoLayer', 3, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.QHNode = node
        });
    }

    /*
  *打开条件单
  */
    openTiaoJianDan() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.TJDNode, 'Prefabs/tjd/tiaoJianDan', 10, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.TJDNode = node
        });
    }

    openFenShi() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.fenshi, 'Prefabs/fsxl/fenshi', 10, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.fenshi = node
        });
    }

    /*
*打开条件单游戏
*/
    openTJDGame() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.TJDGame, 'Prefabs/tjd/tjdGame', 20, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.TJDGame = node
        });
    }

    openGameFenShi() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.openNode(this.fenShiGame, 'Prefabs/fsxl/GameFenShi', 20, (node) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            this.fenShiGame = node
        });
    }

    openNode(node, url, zIndex, call?) {
        if (!node) {
            LoadUtils.loadRes(url, pre => {
                node = cc.instantiate(pre);
                this.node.addChild(node, zIndex);
                node.active = true;
                call && (call(node));
            })
        }
        else {
            node.active = true;
            call && (call(node));
        }
    }

}
