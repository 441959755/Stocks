import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import StrategyAIData from "../game/StrategyAIData";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import GlobalHandle from "./GlobalHandle";

export default class EnterGameControl {

    public static onCurPKEnterGame() {
        let kjb = GameCfgText.gameTextCfg.pk.cost[0].v;
        if (GameData.properties[pb.GamePropertyId.Gold] >= Math.abs(kjb)) {
            return true;
        }
        return false;
    }

    //当前定向是否可以进入游戏   
    public static onCurDXIsEnterGame() {
        let data = {
            status: 0,
            count: 0,
        }

        //没解锁 不是VIP
        if (!GameData.properties[pb.GamePropertyId.UnlockDxxl] && !GameData.properties[pb.GamePropertyId.Vip]) {

            let curCount = GameCfgText.gameTextCfg.dxxl.free - GameData.todayGameCount[pb.GameType.DingXiang];
            //还有免费次数
            if (curCount > 0) {
                data.status = 1;
            }
            else {
                curCount = GameCfgText.gameTextCfg.dxxl.ad + curCount;
                //还有看广告次数

                if (curCount > 0) {
                    data.status = 2;
                }

                //什么都没有了
                else {
                    data.status = 3;
                }
            }

            data.count = curCount;
        }

        return data;
    }


    //清除上局数据在进入游戏
    public static onClearPreGameDataEnter(data?, flag?) {

        let cb = () => {
            GameCfg.allRate = 0;
            GameCfg.finalfund = 0;
            GameCfg.fill = [];
            GameCfg.blockHistoy = [];
            GameCfg.mark = [];
            GameCfg.notice = [];
            GameCfg.history.allRate = 0;
            StrategyAIData.onClearData();
            cc.director.loadScene('game');
        }

        if (flag) {
            GlobalHandle.onCmdGameStartQuoteQuery(data, cb)
        }

        else {
            GlobalHandle.onCmdGameStartReq(() => {
                if (GameCfg.GameType == pb.GameType.ShuangMang || GameCfg.GameType == pb.GameType.DingXiang || GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {
                    GlobalHandle.onCmdGameStartQuoteQuery(data, cb)
                }
                else if (GameCfg.GameType == pb.GameType.QiHuo) {
                    GlobalHandle.onCmdGameStartQuoteQueryQH(data, cb);
                }
                else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                    GlobalHandle.onCmdGameStartQuoteQuery(data, cb);
                }
            })
        }
    }

}
