import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfgText from "../GameText";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import LoadUtils from "../Utils/LoadUtils";
import ActionUtils from "../Utils/ActionUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    matchPK: cc.Node = null;

    chuangGuan: cc.Node = null;

    cjdz: cc.Node = null;// 创建对战

    RoomNode: cc.Node = null;

    addRoom: cc.Node = null;

    cgsLvRank: cc.Node = null;

    otherHis: cc.Node = null;

    mrtNode: cc.Node = null;

    otherPlayerInfo: cc.Node = null; //其他玩家信息

    onLoad() {
        //匹配PK
        GlobalEvent.on(EventCfg.OPENMATCHPK, this.openMatchPk.bind(this), this)
        //闯关
        GlobalEvent.on(EventCfg.OPENCHUANGUAN, this.openChuangGuan.bind(this), this);
        //房间
        GlobalEvent.on(EventCfg.OPENROOM, this.openRoom.bind(this), this);
        //创建对战
        GlobalEvent.on(EventCfg.OPENCJDZ, this.openCjdzLayer.bind(this), this);

        GlobalEvent.on(EventCfg.OPENJRDZ, this.openAddRoomLayer.bind(this), this);

        GlobalEvent.on(EventCfg.OPENCGSLVRANK, this.openCgsLvRank.bind(this), this);

        GlobalEvent.on(EventCfg.OPENOTHERPLAYERHISLAYER, this.openOtherHisLayer.bind(this), this);

        GlobalEvent.on(EventCfg.OPENMRTLAYER, this.openMrtLayer.bind(this), this);


        //自己进入房间的消息
        //  GlobalEvent.on(EventCfg.RoomGameDataSelf, this.onSelfEnterRoomGameData.bind(this), this);
        //其他玩家进入房间
        GlobalEvent.on(EventCfg.RoomGameDataOther, this.onOtherEnterRoomGameData.bind(this), this);
        //// 同步房间游戏状态
        GlobalEvent.on(EventCfg.RoomGameStatus, this.onRoomGameStatus.bind(this), this);

        GameData.Players = [];
        GameData.Players.length = 0;
    }

    openMrtLayer(data) {
        this.openNode(this.mrtNode, 'Prefabs/pk/MRT', 10, (node) => {
            this.mrtNode = node;
            let handle = this.mrtNode.getComponent('MRTHandle');
            handle.MRTData = data;
            handle.initShow();
        });
    }

    openOtherHisLayer(data) {
        this.openNode(this.otherHis, 'Prefabs/otherPlayerHisInfo', 10, (node) => {
            this.otherHis = node;
            this.otherHis.getComponent('OtherPlayerHisInfo').playeInfo = data;
            this.otherHis.getComponent('OtherPlayerHisInfo').onShow();
        });
    }

    openCgsLvRank(id, stage) {
        this.openNode(this.cgsLvRank, 'Prefabs/pk/cgsLvRank', 10, (node) => {
            this.cgsLvRank = node;
            let handle = this.cgsLvRank.getComponent('CgsLvRank');
            handle.reqGameCgsGetStageRank(id, stage);
        });
    }

    openAddRoomLayer() {
        this.openNode(this.addRoom, 'Prefabs/pk/AddRoom', 3, (node) => { this.addRoom = node });
    }

    openCjdzLayer() {
        this.openNode(this.cjdz, 'Prefabs/pk/creatorRoom', 3, (node) => { this.cjdz = node });
    }

    /**
     * 
     */
    openRoom() {
        this.openNode(this.RoomNode, 'Prefabs/pk/Room', 3, (node) => { this.RoomNode = node });
    }

    /**
     * 
     * 打开匹配PK
     */
    openMatchPk() {
        this.openNode(this.matchPK, 'Prefabs/pk/matchPK', 3, (node) => { this.matchPK = node });
    }

    /**
     * 闯关
     */
    openChuangGuan() {
        this.openNode(this.chuangGuan, 'Prefabs/pk/CGSPK', 3, (node) => { this.chuangGuan = node });
    }

    // 同步房间游戏状态
    onRoomGameStatus(data?) {
        setTimeout(() => {
            cc.director.loadScene('game');
        }, 500)
    }

    onOtherEnterRoomGameData(info) {

        GameData.Players[1] = info.player;

        GlobalEvent.emit('SHOWOTHERPLAYER');
    }

    // onSelfEnterRoomGameData(info) {

    //     if (info.players[1].gd && info.quotes) {
    //         GameData.Players[1] = info.players[1].gd;

    //         if (GameData.RoomType) {
    //             if (info.players[0].gd.uid == GameData.userID) {
    //                 GameData.Players[0] = info.players[0].gd;
    //                 GameData.Players[1] = info.players[1].gd;
    //             }
    //             else if (info.players[1].gd.uid == GameData.userID) {
    //                 GameData.Players[0] = info.players[1].gd;
    //                 GameData.Players[1] = info.players[0].gd;
    //             }
    //             GlobalEvent.emit(EventCfg.OPENROOM);
    //         }
    //         else {
    //             this.matchPK.active = true;
    //             GlobalEvent.emit('SHOWOTHERPLAYER');
    //         }

    //     }

    // }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENMATCHPK);
        // GlobalEvent.off(EventCfg.RoomGameDataSelf);
        GlobalEvent.off(EventCfg.RoomGameDataOther);
        GlobalEvent.off(EventCfg.OPENCHUANGUAN);
        GlobalEvent.off(EventCfg.OPENCJDZ);
        GlobalEvent.off(EventCfg.OPENROOM);
        GlobalEvent.off(EventCfg.OPENJRDZ);
        GlobalEvent.off(EventCfg.OPENCGSLVRANK);
        GlobalEvent.off(EventCfg.OPENOTHERPLAYERHISLAYER);
        GlobalEvent.off(EventCfg.OPENMRTLAYER);
        GlobalEvent.off(EventCfg.RoomGameStatus);
        LoadUtils.releaseRes('Prefabs/pk/matchPK');
        LoadUtils.releaseRes('Prefabs/pk/CGSPK');
        LoadUtils.releaseRes('Prefabs/pk/Room');
        LoadUtils.releaseRes('Prefabs/pk/creatorRoom');
        LoadUtils.releaseRes('Prefabs/pk/AddRoom');
        LoadUtils.releaseRes('Prefabs/pk/cgsLvRank');
        LoadUtils.releaseRes('Prefabs/pk/MRT');
        LoadUtils.releaseRes('Prefabs/otherPlayerHisInfo');

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
