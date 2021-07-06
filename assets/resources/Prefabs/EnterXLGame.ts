import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import EnterGameControl from "../../sctiprs/global/EnterGameControl";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    xlname: cc.Label = null;

    @property(cc.Label)
    codename: cc.Label = null;

    onEnable() {
        if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {
            this.xlname.string = '前往定向训练场训练改股票';
        }

        let code = GameCfg.data[0].code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let gpData = GameCfg.data[0].data;
        let time = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        this.codename.string = code + '     ' + time;

    }


    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'qxBtn') {
            this.node.active = false;
        }
        else if (name == 'qdBtn') {

            if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {

                let gameCount = EnterGameControl.onCurDXIsEnterGame();

                if (gameCount.status == 3) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
                    return;
                }

                let data = {
                    ktype: pb.KType.Day,
                    kstyle: pb.KStyle.Random,
                    from: GameCfg.RoomGameData.players[0].result.kFrom,
                    code: GameCfg.RoomGameData.players[0].result.quotesCode,
                    total: 150,
                    to: 0,
                }

                GameCfg.enterGameCache = data;

                GameCfg.GameType = pb.GameType.DingXiang;

                GameCfg.GameSet = GameData.DXSet;

                GameCfg.GameSet.year = (data.from + '').slice(0, 4);

                GameCfg.GameSet.search = data.code;


                EnterGameControl.onClearPreGameDataEnter();
            }

        }
    }


}
