import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";

import StrategyAIData from "../game/StrategyAIData";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import GlobalEvent from "../Utils/GlobalEvent";
import GlobalHandle from "./GlobalHandle";

export default class EnterGameControl {

    public static onCurPKEnterGame() {
        let kjb = GameCfgText.gameConf.pk.cost[0].v;
        if (GameData.properties[pb.GamePropertyId.Gold] >= Math.abs(kjb)) {
            return true;
        }

        return false;
    }


    //当前定向是否可以进入游戏   
    public static onCurWXIsEnterGame(type?) {

        let data = {
            status: 0,
            count: 0,
        }

        let free, adcount, todayCount;
        if (type) {

        }
        else {
            type = GameCfg.GameType;
        }

        if (type == pb.GameType.ShuangMang) {

            data.status = 1;
            data.count = 1;
            return data;
            // free = 5;
            // adcount = 5;
            // todayCount = GameData.todayGameCount[pb.GameType.ShuangMang];
        }

        else if (type == pb.GameType.DingXiang) {
            free = 3;
            adcount = 0;
            todayCount = GameData.todayGameCount[pb.GameType.DingXiang];
        }

        else if (type == pb.GameType.QiHuo) {
            free = 3;
            adcount = 0;
            todayCount = GameData.todayGameCount[pb.GameType.QiHuo];
        }
        // else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
        //     free = 1;
        //     adcount = 5;
        //     todayCount = GameData.todayGameCount[pb.GameType.ZhiBiao];
        // }

        // else if (GameCfg.GameType == pb.GameType.JJ_PK) {
        //     free = 0;
        //     adcount = 5;
        //     todayCount = GameData.todayGameCount[pb.GameType.JJ_PK];
        //     console.log(todayCount);
        // }

        // else if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
        //     free = 0;
        //     adcount = 5;
        //     todayCount = GameData.todayGameCount[pb.GameType.JJ_DuoKong];
        //     console.log(todayCount);
        // }

        let curCount = free - todayCount;
        //还有免费次数
        if (curCount > 0) {
            data.status = 1;
        }

        else {

            curCount = adcount + curCount;
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
        return data;
    }

    //当前定向是否可以进入游戏   
    public static onCurIsEnterGame() {

        let data = {
            status: 0,
            count: 0,
        }

        let Unlock, free, todayCount, adCount;

        if (GameCfg.GameType == pb.GameType.QiHuo) {
            Unlock = GameData.properties[pb.GamePropertyId.UnlockQhxl]
            free = GameCfgText.gameConf.qhxl.free;
            todayCount = GameData.todayGameCount[pb.GameType.QiHuo];
            adCount = GameCfgText.gameConf.qhxl.ad;
        }

        else if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            Unlock = GameData.properties[pb.GamePropertyId.UnlockTjdxl]
            free = GameCfgText.gameConf.tjdxl.free;
            todayCount = GameData.todayGameCount[pb.GameType.TiaoJianDan];
            adCount = GameCfgText.gameConf.tjdxl.ad;
        }

        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            Unlock = GameData.properties[pb.GamePropertyId.UnlockZbxl]
            free = GameCfgText.gameConf.zbxl.free;
            todayCount = GameData.todayGameCount[pb.GameType.ZhiBiao];
            adCount = GameCfgText.gameConf.zbxl.ad;
        }

        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            Unlock = GameData.properties[pb.GamePropertyId.UnlockDxxl]
            free = GameCfgText.gameConf.dxxl.free;
            todayCount = GameData.todayGameCount[pb.GameType.DingXiang];
            adCount = GameCfgText.gameConf.dxxl.ad;
        }

        //没解锁 不是VIP
        if (!Unlock && new Date().getTime() / 1000 > GameData.properties[pb.GamePropertyId.VipExpiration]) {

            let curCount = free - todayCount;
            //还有免费次数
            if (curCount > 0) {
                data.status = 1;
            }

            else {

                curCount = adCount + curCount;
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

            if (GameCfg.data[0].data.length - 100 > 0) {
                GameCfg.huizhidatas = 100;
                GameData.huizhidatas = 100;
            }
            else {
                GameCfg.huizhidatas = parseInt(GameCfg.data[0].data.length / 2 + '');
                GameData.huizhidatas = parseInt(GameCfg.data[0].data.length / 2 + '');
            }

            console.log(GameCfg.huizhidatas + '  ' + GameData.huizhidatas);

            GlobalEvent.emit('LOADGAME');
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
