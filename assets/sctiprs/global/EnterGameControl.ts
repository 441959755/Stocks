import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import StrategyAIData from "../game/StrategyAIData";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import GlobalHandle from "./GlobalHandle";

export default class EnterGameControl {

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
    public static onClearPreGameDataEnter(data?) {
        let cb = () => {
            GameCfg.huizhidatas = GameData.huizhidatas;
            GameCfg.allRate = 0;
            GameCfg.finalfund = 0;
            GameCfg.fill = [];
            GameCfg.blockHistoy = [];
            GameCfg.mark = [];
            GameCfg.notice = [];
            GameCfg.GAMEFUPAN = false;
            GameCfg.history.allRate = 0;

            GlobalEvent.emit(EventCfg.LEVELCHANGE);
            StrategyAIData.onClearData();
            cc.director.loadScene('game');
        }

        GlobalHandle.onCmdGameStartReq(() => {
            if (!data) {
                cb && cb();
            }
            else {
                if (GameCfg.GameType == pb.GameType.ShuangMang || GameCfg.GameType == pb.GameType.DingXiang) {
                    GlobalHandle.onCmdGameStartQuoteQuery(data, cb)
                }
                else if (GameCfg.GameType == pb.GameType.QiHuo) {
                    GlobalHandle.onCmdGameStartQuoteQueryQH(data, cb);
                }
                else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                    GlobalHandle.onCmdGameStartQuoteQuery(data, cb);
                }
            }
        })
    }


}
