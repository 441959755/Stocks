import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfgText from "../GameText";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import { pb } from "../../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    matchPK: cc.Node = null;


    onLoad() {
        //匹配PK
        GlobalEvent.on(EventCfg.OPENMATCHPK, () => { this.matchPK.active = true; }, this)

        //自己进入房间的消息
        GlobalEvent.on(EventCfg.RoomGameDataSelf, this.onSelfEnterRoomGameData.bind(this), this);

        //其他玩家进入房间
        GlobalEvent.on(EventCfg.RoomGameDataOther, this.onOtherEnterRoomGameData.bind(this), this);

        //// 同步房间游戏状态
        GlobalEvent.on(EventCfg.RoomGameStatus, this.onRoomGameStatus.bind(this), this);
    }

    // 同步房间游戏状态
    onRoomGameStatus(data?) {
        cc.director.loadScene('game');
    }


    onOtherEnterRoomGameData(info) {

        GameData.Players[1] = info.player;
        GlobalEvent.emit('SHOWOTHERPLAYER');

    }

    onSelfEnterRoomGameData(info) {
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

        if (info.players[0].gd) {
            GameData.Players[0] = info.players[0].gd;
        }



        info.quotes.items.forEach((el, index) => {
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
            // }
        });

        if (info.game == pb.GameType.JJ_PK) {
            GameCfg.GameSet = GameData.JJPKSet;
            GameCfg.GameType = pb.GameType.JJ_PK;
        }

        if (info.players[1].gd) {
            GameData.Players[1] = info.players[1].gd;
            // GlobalEvent.emit('SHOWOTHERPLAYER');


            this.onRoomGameStatus();
        }

    }

    start() {

    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENMATCHPK);
        GlobalEvent.off(EventCfg.RoomGameDataSelf);
        GlobalEvent.off(EventCfg.RoomGameDataOther);
    }

    // update (dt) {}
}
