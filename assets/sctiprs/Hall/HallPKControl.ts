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

        GlobalEvent.on(EventCfg.OPENMRTLAYER, this.openMrtLayer.bind(this), this);

        //  自己进入房间的消息
        GlobalEvent.on(EventCfg.RoomGameDataSelf, this.onSelfEnterRoomGameData.bind(this), this);

        //其他玩家进入房间
        GlobalEvent.on(EventCfg.RoomGameDataOther, this.onOtherEnterRoomGameData.bind(this), this);
        //// 同步房间游戏状态
        GlobalEvent.on(EventCfg.RoomGameStatus, this.onRoomGameStatus.bind(this), this);

        GameData.Players = [];
        GameData.Players.length = 0;
    }

    onEnable() {
        if (GameData.isToAGame) {
            GameData.isToAGame = false;
            this.openMatchPk();
        }
    }

    openMrtLayer(data) {
        this.openNode(this.mrtNode, 'Prefabs/pk/MRT', 10, (node) => {
            this.mrtNode = node;
            let handle = this.mrtNode.getComponent('MRTHandle');
            handle.MRTData = data;
            handle.initShow();
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
        console.log('进入房间');
        // setTimeout(() => {
        //     cc.director.loadScene('game');
        // }, 2000)
    }

    onOtherEnterRoomGameData(info) {
        console.log('其他玩家进入房间：' + JSON.stringify(info));
        GameData.Players[1] = info.player;

        GlobalEvent.emit('SHOWOTHERPLAYER');
    }

    onSelfEnterRoomGameData(info) {

        info.id && (GameData.roomId = info.id)

        GameCfg.GameType = info.game;

        GameCfg.GameSet = GameData.JJPKSet;

        let code = info.code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let items = GameCfgText.getGPPKItemInfo(code);
        GameCfg.data[0].code = code;
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].data = [];
        GameCfg.data[0].circulate = items[4];
        GameCfg.data[0].tsGameFrom = info.tsGameFrom;
        GameCfg.data[0].tsGameCur = info.tsGameCur;

        GameData.huizhidatas = info.tsQuoteStart + 1;
        GameCfg.huizhidatas = info.tsQuoteStart + 1;

        if (info.players[0].gd.uid == GameData.userID) {
            GameData.Players[0] = info.players[0].gd;

            if (info.players[1].gd) {
                GameData.Players[1] = info.players[1].gd;
            }
        }

        else if (info.players[1].gd.uid == GameData.userID) {
            GameData.Players[0] = info.players[1].gd;

            if (info.players[1].gd) {
                GameData.Players[1] = info.players[0].gd;
            }
        }

        info.quotes && (info.quotes.items.forEach((el, index) => {
            //   if (index != 0) {
            //  let date = new Date(el.timestamp);
            let ye = (el.timestamp + '').slice(0, 4);
            let mon = (el.timestamp + '').slice(4, 6);
            let da = (el.timestamp + '').slice(6);
            let fromDate = ye + '-' + mon + '-' + da;
            //  if (fromDate != d) {
            let data = {
                day: fromDate || 0,
                open: el.open || 0,
                close: el.price || 0,
                high: el.high || 0,
                low: el.low || 0,
                price: el.amount || 0,
                value: el.volume || 0,
                Rate: (el.volume / GameCfg.data[0].circulate) * 100
            };
            if (GameCfg.data[0].circulate == 0) {
                data.Rate = 1;
            }
            GameCfg.data[0].data.push(data);
        })
        )

        if (info.players[1].gd && info.quotes) {

            if (GameData.RoomType) {

                if (info.players[0].gd.uid == GameData.userID) {
                    GameData.Players[0] = info.players[0].gd;
                    GameData.Players[1] = info.players[1].gd;
                }
                else if (info.players[1].gd.uid == GameData.userID) {
                    GameData.Players[0] = info.players[1].gd;
                    GameData.Players[1] = info.players[0].gd;
                }

                GlobalEvent.emit(EventCfg.OPENROOM);

            }
            else {
                this.openMatchPk();

                GlobalEvent.emit('SHOWOTHERPLAYER');
            }
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENMATCHPK);
        GlobalEvent.off(EventCfg.RoomGameDataSelf);
        GlobalEvent.off(EventCfg.RoomGameDataOther);
        GlobalEvent.off(EventCfg.OPENCHUANGUAN);
        GlobalEvent.off(EventCfg.OPENCJDZ);
        GlobalEvent.off(EventCfg.OPENROOM);
        GlobalEvent.off(EventCfg.OPENJRDZ);
        GlobalEvent.off(EventCfg.OPENCGSLVRANK);

        GlobalEvent.off(EventCfg.OPENMRTLAYER);
        GlobalEvent.off(EventCfg.RoomGameStatus);
        LoadUtils.releaseRes('Prefabs/pk/matchPK');
        LoadUtils.releaseRes('Prefabs/pk/CGSPK');
        LoadUtils.releaseRes('Prefabs/pk/Room');
        LoadUtils.releaseRes('Prefabs/pk/creatorRoom');
        LoadUtils.releaseRes('Prefabs/pk/AddRoom');
        LoadUtils.releaseRes('Prefabs/pk/cgsLvRank');
        LoadUtils.releaseRes('Prefabs/pk/MRT');
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
