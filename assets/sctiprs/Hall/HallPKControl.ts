import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfgText from "../GameText";

import GameData from "../GameData";
import LoadUtils from "../Utils/LoadUtils";
import GlobalHandle from "../global/GlobalHandle";
import PopupManager from "../Utils/PopupManager";
import GameCfg from "../game/GameCfg";
import ComUtils from "../Utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

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
    }

    onEnable() {
        if (GameData.isToAGame) {
            GameData.isToAGame = false;
            this.openMatchPk();
        }
    }

    openMrtLayer(data) {
        PopupManager.openNode(this.node, null, 'Prefabs/pk/MRT', 10, (node) => {
            let handle = node.getComponent('MRTHandle');
            handle.MRTData = data;
            handle.initShow();
        })
    }

    openCgsLvRank(id, stage) {
        PopupManager.openNode(this.node, null, 'Prefabs/pk/cgsLvRank', 10, (node) => {
            let handle = node.getComponent('CgsLvRank');
            handle.reqGameCgsGetStageRank(id, stage);
        })
    }

    openAddRoomLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/pk/AddRoom', 3, null);
    }

    openCjdzLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/pk/creatorRoom', 3, null);
    }

    /**
     * 
     */
    openRoom() {
        console.log('openRoom');
        PopupManager.openNode(this.node, null, 'Prefabs/pk/Room', 3, null);
    }

    /**
     * 
     * 打开匹配PK
     */
    openMatchPk() {
        PopupManager.openNode(this.node, null, 'Prefabs/pk/matchPK', 3, null);
    }

    /**
     * 闯关
     */
    openChuangGuan() {
        PopupManager.openNode(this.node, null, 'Prefabs/pk/CGSPK', 2, null);
    }

    // 同步房间游戏状态
    onRoomGameStatus(data?) {
        console.log('进入房间');
        // setTimeout(() => {
        //     GlobalEvent.emit('LOADGAME');
        // }, 2000)
    }

    onOtherEnterRoomGameData(info) {
        console.log('其他玩家进入房间：' + JSON.stringify(info));
        GameData.Players[1] = info.player;
        GameData.otherHead = info.wxHeadicon;
        GlobalEvent.emit('SHOWOTHERPLAYER');
    }

    onSelfEnterRoomGameData(info) {
        //不是好友pk
        if (!GameData.RoomType) {
            GlobalHandle.onLineInvite();
        }

        console.log('进入房间：' + JSON.stringify(info));

        info.id && (GameData.roomId = info.id)

        GameCfg.GameType = info.game;
        GameCfg.GameSet = JSON.parse(JSON.stringify(GameData.JJPKSet));
        //   GameCfg.GameSet = GameData.JJPKSet;

        let code = info.quotes.items[0].code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let items = GameCfgText.getGPPKItemInfo(code);
        GameCfg.data[0].code = code;
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].data = [];
        GameCfg.data[0].circulate = items[4];
        GameCfg.data[0].tsGameFrom = parseInt(info.tsGameFrom);
        GameCfg.data[0].tsGameCur = parseInt(info.tsGameCur);

        GameData.huizhidatas = parseInt(info.tsQuoteStart) + 1;
        GameCfg.huizhidatas = parseInt(info.tsQuoteStart) + 1;

        if (info.players[0].gd.uid == GameData.userID) {

            GameData.Players[0] = info.players[0].gd;

            if (info.players[1].gd) {
                GameData.Players[1] = info.players[1].gd;
                GameData.otherHead = info.players[1].wxHeadicon;
            }
            else {
                GameData.Players[1] = null;
                GameData.otherHead = null;
            }
        }

        else if (info.players[1].gd.uid == GameData.userID) {
            GameData.Players[0] = info.players[1].gd;
            if (info.players[1].gd) {
                GameData.Players[1] = info.players[0].gd;
                GameData.otherHead = info.players[0].wxHeadicon;
            }
            else {
                GameData.Players[1] = null;
                GameData.otherHead = null;
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

        console.log(info.players[1].gd + '  ' + info.quotes);

        console.log(GameData.RoomType);

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
    }

}
