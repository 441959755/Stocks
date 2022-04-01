import { pb } from '../../protos/proto';
import GameCfg from '../game/GameCfg';
import GameData from '../GameData';
import EventCfg from '../Utils/EventCfg';
import GlobalEvent from '../Utils/GlobalEvent';

function PBHelper() {
}

PBHelper.prototype = {

    //查询行情
    onCmdQuoteQueryConvertToBuff(data) {
        let CmdQuoteQuery = pb.CmdQuoteQuery;
        let message = CmdQuoteQuery.create(data)
        let buff = CmdQuoteQuery.encode(message).finish();

        return buff;
    },

    //修改玩家信息
    onCmdEditInfoConvertToBuff(data) {
        let CmdEditNick = pb.PlayerInfo;
        let message = CmdEditNick.create(data);
        let buff = CmdEditNick.encode(message).finish();
        return buff;
    },


    // 查询期货行情
    onCmdQuoteQueryFutureConverToBuff(data) {
        let CmdQuoteQueryFuture = pb.CmdQuoteQueryFuture;
        let message = CmdQuoteQueryFuture.create(data)
        let buff = CmdQuoteQueryFuture.encode(message).finish();

        return buff;
    },

    selectBlackData(id, buff) {

        if (id == pb.MessageId.Rep_Game_Login) {

            let CmdGameLoginReply = pb.CmdGameLoginReply;
            let data = CmdGameLoginReply.decode(new Uint8Array(buff));

            return data;
        } else if (id == pb.MessageId.Rep_QuoteQuery) {
            let Quotes = pb.Quotes;
            let data = Quotes.decode(new Uint8Array(buff));

            if (data.items.length == 1) {
                GlobalEvent.emit(EventCfg.CMDQUOTITEM, data);
            }

            return data;
        }
        //同步玩家游戏属性
        else if (id == pb.MessageId.Sync_S2C_GameProperty) {
            let GameProperties = pb.GameProperties;
            let decode = GameProperties.decode(new Uint8Array(buff));

            for (let i = 0; i < decode.items.length; i++) {
                GameData.properties[decode.items[i].id] = decode.items[i].newValue;
                console.log('id:' + decode.items[i].id + '   ' + 'value:' + decode.items[i].newValue);
            }
            console.log('更新属性:' + JSON.stringify(decode));

            GameData.properties = GameData.properties;
        }

        // 同步输赢计数器：GameCounters
        else if (id == pb.MessageId.Sync_S2C_GameCounter) {
            let GameCounters = pb.GameCounters;
            let decode = GameCounters.decode(new Uint8Array(buff));
            console.log('同步输赢计数器：GameCounters' + JSON.stringify(decode));
            GameData.GameCounters = decode.items;
            GlobalEvent.emit(EventCfg.GMAECOUNTERSCHANGE);
        }

        //当日首次登录会收到
        else if (id == pb.MessageId.Sync_S2C_FirstLoginToday) {
            console.log('首次登入');
            GameData.firstGame = true;
        } else if (id == pb.MessageId.Rep_Game_Start
            || id == pb.MessageId.Rep_Hall_EditIcon
            || id == pb.MessageId.Rep_Hall_EditNick
            || id == pb.MessageId.Rep_Hall_EditLocation
            || id == pb.MessageId.Rep_Hall_EditGender
            || id == pb.MessageId.Rep_Hall_UploadIcon
            || id == pb.MessageId.Rep_Game_SmxlReset
            || id == pb.MessageId.Rep_Hall_ResetGameCounter
            || id == pb.MessageId.Rep_Hall_GetItem
            || id == pb.MessageId.Rep_Game_CgsGetStageAward
            || id == pb.MessageId.Rep_Game_OrderCancel
            || id == pb.MessageId.Rep_Hall_MobileBind
            || id == pb.MessageId.Rep_Hall_UnlockGame
            || id == pb.MessageId.Rep_Hall_Exchange) {
            let ErrorInfo = pb.ErrorInfo;
            let data = ErrorInfo.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Rep_Game_QueryGameResult) {

            let CmdQueryGameResultReply = pb.CmdQueryGameResultReply;
            let data = CmdQueryGameResultReply.decode(new Uint8Array(buff));
            return data;

        }

        else if (id == pb.MessageId.Rep_Game_SmxlReport) {
            let CmdGetSmxlReportReply = pb.CmdGetSmxlReportReply;
            let data = CmdGetSmxlReportReply.decode(new Uint8Array(buff));
            return data;
        }
        //期货行情
        else if (id == pb.MessageId.Rep_QuoteQueryFuture) {
            let QuotesFuture = pb.QuotesFuture;
            let data = QuotesFuture.decode(new Uint8Array(buff));
            return data;
        }
        //// 同步双盲训练状态
        else if (id == pb.MessageId.Sync_S2C_GameSmxl) {
            let SmxlState = pb.SmxlState;
            let data = SmxlState.decode(new Uint8Array(buff));
            console.log('同步双盲训练状态' + JSON.stringify(data));
            GameData.SmxlState = data;

        }
        //同步当日游戏次数数据
        else if (id == pb.MessageId.Sync_S2C_GameTimes) {
            // 当日游戏次数计数器
            let TodayGameTimes = pb.TodayGameTimes;
            let data = TodayGameTimes.decode(new Uint8Array(buff));
            console.log('当日游戏次数计数器:' + JSON.stringify(data));
            GameData.todayGameCount = data.counter;
            GlobalEvent.emit(EventCfg.GMAECOUNTERSCHANGE);

        } else if (id == pb.MessageId.Rep_Game_GetGameOperation) {

            let GameOperations = pb.GameOperations;
            let data = GameOperations.decode(new Uint8Array(buff));

            return data;
        }

        //进入房间应答
        else if (id == pb.MessageId.Rep_Room_Enter) {
            let CmdRoomEnterReply = pb.CmdRoomEnterReply;
            let data = CmdRoomEnterReply.decode(new Uint8Array(buff));
            return data;
        }

        //自己进入房间（客户端收到自己进入房间的消息，将玩家拉入房间）
        else if (id == pb.MessageId.Sync_Room_Enter_Self) {

            setTimeout(() => {
                let RoomData = pb.RoomData;
                let data = RoomData.decode(new Uint8Array(buff));
                console.log('拉入房间' + data.auto + '   ' + data.creator);
                if (data.auto) {
                    if (GameData.userID == data.creator) {
                        GameData.RoomType = 1;
                    }
                    else {
                        GameData.RoomType = 2;
                    }
                }

                if (data.game == pb.GameType.JJ_PK || data.game == pb.GameType.JJ_DuoKong) {

                    let RoomGameData = pb.RoomGameData;
                    let message = RoomGameData.decode(new Uint8Array(buff));
                    console.log('房间ID' + JSON.stringify(GameData.roomId));
                    console.log('自己进入房间' + JSON.stringify(message));

                    //断线拉入
                    if (!GameData.roomId) {
                        GameData.selfEnterRoomData = message;
                    }

                    //创建、加入
                    else {
                        GlobalEvent.emit(EventCfg.RoomGameDataing, message)
                    }
                }
            }, 300);
        }

        // 其他玩家进入房间：SyncRoomEnter
        else if (id == pb.MessageId.Sync_Room_Enter) {
            GameData.leaveUid = null;
            let SyncRoomEnter = pb.SyncRoomEnter;
            let data = SyncRoomEnter.decode(new Uint8Array(buff));
            console.log('其他玩家进入房间:' + JSON.stringify(data));
            GlobalEvent.emit(EventCfg.RoomGameDataOther, data);
        }

        //// 玩家离开房间
        else if (id == pb.MessageId.Sync_Room_Leave || id == pb.MessageId.Sync_Room_Leave_Self) {
            let SyncRoomLeave = pb.SyncRoomLeave;
            let data = SyncRoomLeave.decode(new Uint8Array(buff));
            if (data.uid == GameData.userID) {
                GameData.roomId = 0;
                GameData.JJCapital = 0;
                GameData.Players = [];

            }
            else {
                GameData.leaveUid = data.uid;
            }
            GlobalEvent.emit(EventCfg.ROOMLEAVE, data);
        }

        //  获取背包列表应答：Backbag
        else if (id == pb.MessageId.Rep_Hall_BackBag) {
            let backbag = pb.Backbag;
            let data = backbag.decode(new Uint8Array(buff));
            return data;
        }
        // 玩家准备就绪
        else if (id == pb.MessageId.Sync_Room_Ready) {
            let RoomPlayerStatus = pb.RoomPlayerStatus;
            let data = RoomPlayerStatus.decode(new Uint8Array(buff));
            console.log('玩家准备就绪' + JSON.stringify(data));
            GlobalEvent.emit(EventCfg.ROOMOLAYERSTATUS, data);
        }

        //// 同步房间游戏状态
        else if (id == pb.MessageId.Sync_Room_GameStatus) {
            let RoomGameStatus = pb.RoomGameStatus;
            let data = RoomGameStatus.decode(new Uint8Array(buff));
            console.log('同步房间游戏状态' + JSON.stringify(data));
            GlobalEvent.emit(EventCfg.RoomGameStatus, data);
        }

        /// 重连上
        else if (id == pb.MessageId.Sync_Room_ReConn) {
            let RoomData = pb.RoomData;
            let data = RoomData.decode(new Uint8Array(buff));
            console.log(' 重连上' + JSON.stringify(data));
        }

        ////同步 游戏操作
        else if (id == pb.MessageId.Sync_Room_GameOp) {
            let RoomGameOp = pb.RoomGameOp;
            let data = RoomGameOp.decode(new Uint8Array(buff));

            let GameOperationItem = pb.GameOperations;
            let ops = GameOperationItem.decode(new Uint8Array(data.ops));

            if (GameData.userID != data.id) {
                GlobalEvent.emit(EventCfg.UPDATEOTHERPLAYEROPT, ops);
            }
        }

        //// 游戏结果
        else if (id == pb.MessageId.Sync_Room_GameResult) {
            let RoomGameResult = pb.RoomGameResult;
            let data1 = RoomGameResult.decode(new Uint8Array(buff));
            let RoomGameData = pb.RoomGameData;
            let result = RoomGameData.decode(new Uint8Array(data1.result));
            console.log('游戏结果' + JSON.stringify(result));
            GameCfg.RoomGameData = result;
            GlobalEvent.emit(EventCfg.GAMEOVEER);
        }

        //离开房间应答
        else if (id == pb.MessageId.Rep_Room_Leave) {
            let CmdRoomLeaveReply = pb.CmdRoomLeaveReply;
            let data = CmdRoomLeaveReply.decode(new Uint8Array(buff));
            console.log('离开房间应答' + JSON.stringify(data));
            return data;
        }

        //查询当前一轮闯关赛配置数据应答：CgsConf
        else if (id == pb.MessageId.Rep_Game_CgsGetConf) {
            let CgsConf = pb.CgsConf;
            let data = CgsConf.decode(new Uint8Array(buff));
            return data;
        }

        //查询闯关赛通关排行应答：RankingList
        //  查询闯关赛关卡排行应答：RankingList
        //  查询闯关赛排行榜应答：RankingList
        else if (id == pb.MessageId.Rep_Game_CgsGetClearanceRank ||
            id == pb.MessageId.Rep_Game_CgsGetStageRank ||
            id == pb.MessageId.Rep_Game_CgsGetSeasonRank) {
            let RankingList = pb.RankingList;
            let data = RankingList.decode(new Uint8Array(buff));
            return data;
        }

        //同步闯关赛游戏数据
        else if (id == pb.MessageId.Sync_S2C_GameCg_GD) {
            let JjGame = pb.JjGame;
            let data = JjGame.decode(new Uint8Array(buff));
            GlobalEvent.emit(EventCfg.GETCGSDATA, data);
        }

        else if (id == pb.MessageId.Sync_S2C_GameCg) {
            let CgState = pb.CgState;
            let data = CgState.decode(new Uint8Array(buff));
            GameData.cgState = data;
        }
        //创建房间应答
        else if (id == pb.MessageId.Rep_Room_Create) {
            let CmdRoomCreateReply = pb.CmdRoomCreateReply;
            let data = CmdRoomCreateReply.decode(new Uint8Array(buff));

            return data;
        }
        //系统广播：Notice
        //服务器发到客户端的消息（包括邀请或聊天消息）：Notice
        else if (id == pb.MessageId.Sync_S2C_Message ||
            id == pb.MessageId.Sync_S2C_Broadcast) {
            let Notice = pb.Notice;
            let data = Notice.decode(new Uint8Array(buff));
            console.log('服务器发到客户端的消息');

            GlobalEvent.emit(EventCfg.INVITEMESSAGE, data);

        }
        // 准备就绪应答（无）
        // 领取每日看广告奖励应答：无
        else if (id == pb.MessageId.Rep_Room_Ready ||
            id == pb.MessageId.Rep_Hall_GetDailyAdAward) {

        }
        //查询AI选股的股票列表响应：
        else if (id == pb.MessageId.Rep_QueryAiStockList) {
            let CmdQueryAiStockListReply = pb.CmdQueryAiStockListReply;
            let data = CmdQueryAiStockListReply.decode(new Uint8Array(buff));
            return data;
        }
        //股票的买卖信号
        else if (id == pb.MessageId.Rep_QueryAiSignal) {
            let CmdQueryAiSignalReply = pb.CmdQueryAiSignalReply;
            let data = CmdQueryAiSignalReply.decode(new Uint8Array(buff));
            GlobalEvent.emit('AISIGNAL', data);
            return data;
        }
        //同步模拟炒股状态
        else if (id == pb.MessageId.Sync_S2C_GameMncg) {
            let MncgState = pb.MncgState;
            let data = MncgState.decode(new Uint8Array(buff));
            console.log('同步模拟炒股状态' + JSON.stringify(data));
            GameData.mncgDataList = data;

            GlobalEvent.emit(EventCfg.CHANGEMNCGACCOUNT);
        }

        //   同步实时行情
        else if (id == pb.MessageId.Sync_S2C_QuoteItem) {
            let QuoteItem = pb.QuoteItem;
            let data = QuoteItem.decode(new Uint8Array(buff));
            //  console.log('同步实时行情' + JSON.stringify(data));
            GlobalEvent.emit(EventCfg.SYNCQUOTEITEM, data);
        }
        //关注/删除股票应答：无
        else if (id == pb.MessageId.Rep_Game_MncgEditStockList) {

        }
        //	// 金币和资产互相兑换应答
        else if (id == pb.MessageId.Rep_Game_MncgExchange) {
            let CmdMncgExchangeReply = pb.CmdMncgExchangeReply;
            let data = CmdMncgExchangeReply.decode(new Uint8Array(buff));

            return data;
        }
        // 查询交易记录应
        else if (id == pb.MessageId.Rep_Game_OrderQuery) {
            let StockOrderList = pb.StockOrderList;
            let data = StockOrderList.decode(new Uint8Array(buff));
            return data;
        } else if (id == pb.MessageId.Rep_QuoteSubscribe) {
            // let StockOrderList = pb.StockOrderList;
            // let data = StockOrderList.decode(new Uint8Array(buff));
            // return data;
        } else if (id === pb.MessageId.Rep_Game_Order) {
            let CmdStockOrderReply = pb.CmdStockOrderReply;
            let data = CmdStockOrderReply.decode(new Uint8Array(buff));
            return data;
        }
        //获取炒股大赛列表应答
        else if (id == pb.MessageId.Rep_Game_CgdsList) {
            let CgdsList = pb.CgdsList;
            return CgdsList.decode(new Uint8Array(buff));
        }
        //报名炒股大赛应答
        else if (id == pb.MessageId.Rep_Game_CgdsReg) {
            let CmdCgdsRegReply = pb.CmdCgdsRegReply;
            return CmdCgdsRegReply.decode(new Uint8Array(buff));
        }
        //获取炒股大赛排行榜
        else if (id == pb.MessageId.Rep_Game_CgdsRanking) {
            let RankingList = pb.RankingList;
            return RankingList.decode(new Uint8Array(buff));
        }
        //同步所有炒股大赛状态
        else if (id == pb.MessageId.Sync_S2C_GameCgds) {
            let CgdsState = pb.CgdsState;
            GameData.cgdsStateList = CgdsState.decode(new Uint8Array(buff)).items;
            console.log('同步所有炒股大赛状态' + JSON.stringify(GameData.cgdsStateList));
        }

        //同步一条炒股大赛状态
        else if (id == pb.MessageId.Sync_S2C_GameCgdsItem) {
            let CgdsStateItem = pb.CgdsStateItem;
            let data = CgdsStateItem.decode(new Uint8Array(buff));
            console.log('同步一条炒股大赛状态' + JSON.stringify(data));

            for (let i = 0; i < GameData.cgdsStateList.length; i++) {
                if (GameData.cgdsStateList[i].id == data.id) {
                    GameData.cgdsStateList[i] = data;
                    break;
                }
            }

            GlobalEvent.emit(EventCfg.CHANGEMNCGACCOUNT);
        }

        //保存学习任务进度应答：无
        else if (id == pb.MessageId.Rep_Hall_SaveStudyProgress) {
        }

        //同步任务进度及奖励：TaskItem
        else if (id == pb.MessageId.Sync_S2C_TaskProgress) {
            let TaskItem = pb.TaskItem;
            let data = TaskItem.decode(new Uint8Array(buff));
            console.log('同步任务进度及奖励' + JSON.stringify(data));
            GameData.gameData.tasks.daily[data.taskId] = data;
            GlobalEvent.emit('UPDATETASKDATA');
        }

        //领取日常任务奖励应答
        else if (id == pb.MessageId.Rep_Hall_GetDailyTaskAward) {
            let ErrorInfo = pb.ErrorInfo;
            let data = ErrorInfo.decode(new Uint8Array(buff));
            return data;
        }

        //查询玩家资料应答
        else if (id == pb.MessageId.Rep_Hall_QueryPlayer) {
            let PlayerInfo = pb.PlayerInfo;
            let data = PlayerInfo.decode(new Uint8Array(buff))
            GlobalEvent.emit('REPPLAYERINFO', data);
            return data;
        }
        // 查询等级排行应答：RankingList
        //查询威望排行应答：RankingList
        // 查询威望周排行应答：RankingList
        // 获取炒股大赛排行榜应答
        // 查询闯关赛排行榜应答
        else if (id == pb.MessageId.Rep_Hall_GetFameRanking
            || id == pb.MessageId.Rep_Hall_GetFameRankingWeekly
            || id == pb.MessageId.Rep_Hall_GetLevelRanking
            || id == pb.MessageId.Rep_Game_CgsGetSeasonRank
            || id == pb.MessageId.Rep_Game_CgdsRanking) {
            let RankingList = pb.RankingList;
            let data = RankingList.decode(new Uint8Array(buff));
            return data;
        }

        // 商城下购买应答
        else if (id == pb.MessageId.Rep_Hall_ShopOrder) {
            let CmdShopOrderReply = pb.CmdShopOrderReply;
            let data = CmdShopOrderReply.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Rep_Game_Over) {
            let CmdGameOverReply = pb.CmdGameOverReply;
            let data = CmdGameOverReply.decode(new Uint8Array(buff));
            return data;
        }

        //领取破产奖励应答
        else if (id == pb.MessageId.Rep_Hall_GetBrokenAward) {
            console.log('领取破产奖励应答' + id);
            return null;
        }

        else if (id == pb.MessageId.Sync_S2C_GoldAwardPrompt) {
            let CmdGoldAwardPrompt = pb.CmdGoldAwardPrompt;
            let data = CmdGoldAwardPrompt.decode(new Uint8Array(buff));
            console.log('领取奖励：' + JSON.stringify(data));
            GameData.goldAwardPrompt = data;
            GlobalEvent.emit('CmdGoldAwardPrompt', data);
        }

        // 领取每周豪礼
        else if (id == pb.MessageId.Rep_Hall_GetWeeklyAward) {
            let CmdGetWeeklyAwardReply = pb.CmdGetWeeklyAwardReply;
            let data = CmdGetWeeklyAwardReply.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Rep_Hall_QueryEventLog) {
            let Events = pb.Events;
            let data = Events.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Rep_Hall_Get7Award) {
            //领取7次奖励应答
            return null;
        }

        //查询参与过的活动
        else if (id == pb.MessageId.Rep_Hall_GetActivityLogs) {
            let ActivityLogs = pb.ActivityLogs;
            let data = ActivityLogs.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Sync_S2C_ActivityConf) {
            let ActivityConf = pb.ActivityConf;
            let data = ActivityConf.decode(new Uint8Array(buff));
            console.log('活动配置' + JSON.stringify(data));
            GameData.ActivityConf = data.items;
            return;
        }
    }
}

module.exports = PBHelper;
