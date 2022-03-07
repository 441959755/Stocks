import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";

import ActionUtils from "../Utils/ActionUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

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
        GlobalEvent.off(EventCfg.OPENSMRESETMONEYLAYER);
        GlobalEvent.off(EventCfg.OPENTIAOJIANDAN);
        GlobalEvent.off(EventCfg.OPENTJDGAME);
        GlobalEvent.off(EventCfg.OPENFENSHI);
        GlobalEvent.off(EventCfg.OPENGAMEFENSHI);
    }

    /**
     * 双盲重置金币
     */
    openSmResetLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/SMResetLayer', 10, (node) => {
            ActionUtils.openBox(node);
        });
    }

    /**
     * 曲线图
     */
    openYieldLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/SMYieldCurve', 10, (node) => {
            ActionUtils.openBox(node);
        });
    }


    /**
     * 月报
     */
    openMonthLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/SMMonthlyLayer', 10, (node) => {
            ActionUtils.openBox(node);
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

        PopupManager.openNode(this.node, null, str, 11, (node) => {
            ActionUtils.openBox(node);
        });
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

        PopupManager.openNode(this.node, null, str, 10, (node) => {
            ActionUtils.openBox(node);
        });
    }

    /**
     * 双盲
     */
    openSMLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/shuangmangLayer', 3, null);
    }

    /**
     * 指标
     */
    openZBLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/zhibiaoLayer', 3, null);
    }

    /**
     * 定向
     */
    openDXLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/DXLayer', 3, null);
    }

    /**
     * 期货
     */
    openQHLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/xl/qiHuoLayer', 3, null);
    }

    /*
  *打开条件单
  */
    openTiaoJianDan() {
        PopupManager.openNode(this.node, null, 'Prefabs/tjd/tiaoJianDan', 10, null);
    }

    openFenShi() {
        PopupManager.openNode(this.node, null, 'Prefabs/fsxl/fenshi', 10, null);
    }

    /*
    *打开条件单游戏
    */
    openTJDGame() {
        PopupManager.openNode(this.node, null, 'Prefabs/tjd/tjdGame', 20, null);
    }

    openGameFenShi() {
        PopupManager.openNode(this.node, null, 'Prefabs/fsxl/GameFenShi', 20, null);
    }

}
