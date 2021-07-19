import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfgText from "../GameText";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import GlobalHandle from "../global/GlobalHandle";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    matchPK: cc.Node = null;

    @property(cc.Node)
    chuangGuan: cc.Node = null;

    @property(cc.Node)
    cjdz: cc.Node = null;

    @property(cc.Node)
    RoomNode: cc.Node = null;


    onLoad() {
        //匹配PK
        GlobalEvent.on(EventCfg.OPENMATCHPK, () => { this.matchPK.active = true; }, this)

        //闯关
        GlobalEvent.on(EventCfg.OPENCHUANGUAN, () => { this.chuangGuan.active = true; }, this);

        //房间
        GlobalEvent.on(EventCfg.OPENROOM, () => { this.RoomNode.active = true }, this);

        //创建对战
        GlobalEvent.on(EventCfg.OPENCJDZ, () => { this.cjdz.active = true }, this);

        //自己进入房间的消息
        GlobalEvent.on(EventCfg.RoomGameDataSelf, this.onSelfEnterRoomGameData.bind(this), this);

        //其他玩家进入房间
        GlobalEvent.on(EventCfg.RoomGameDataOther, this.onOtherEnterRoomGameData.bind(this), this);

        //// 同步房间游戏状态
        GlobalEvent.on(EventCfg.RoomGameStatus, this.onRoomGameStatus.bind(this), this);

    }



    // 同步房间游戏状态
    onRoomGameStatus(data?) {
        setTimeout(() => {
            cc.director.loadScene('game');
        }, 800)
    }

    onOtherEnterRoomGameData(info) {

        GameData.Players[1] = info.player;

        GlobalEvent.emit('SHOWOTHERPLAYER');
    }

    onSelfEnterRoomGameData(info) {
        GameCfg.GameType = info.game;
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
            GameData.Players[1] = info.players[1].gd;
            this.matchPK.active = true;
            GlobalEvent.emit('SHOWOTHERPLAYER');
            this.onRoomGameStatus();
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENMATCHPK);
        GlobalEvent.off(EventCfg.RoomGameDataSelf);
        GlobalEvent.off(EventCfg.RoomGameDataOther);
        GlobalEvent.off(EventCfg.OPENCHUANGUAN);
        GlobalEvent.off(EventCfg.OPENCJDZ);
        GlobalEvent.off(EventCfg.OPENROOM);

    }


}
