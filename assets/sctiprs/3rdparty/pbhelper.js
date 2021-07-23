
import { pb } from '../../protos/proto';
import GameCfg from '../game/GameCfg';
import GameData from '../GameData';
import EventCfg from '../Utils/EventCfg';
import GlobalEvent from '../Utils/GlobalEvent';

function PBHelper() {

}

//let window = global || window;

PBHelper.prototype = {

    //登入信息转BUff
    onCmdLoginConvertToBuff(data) {
        let Login = pb.CmdLogin;
        console.log('message' + JSON.stringify(data));
        let message = Login.create({ account: data.account, type: data.type, from: data.from, pwd: data.pwd });

        let buff = Login.encode(message).finish();
        return buff;
    },

    //登人返回信息
    onCmdLoginConvertToData(buff) {
        let CmdLoginReply = pb.CmdLoginReply;
        let decoded = CmdLoginReply.decode(new Uint8Array(buff));
        // let decoded = CmdLoginReply.decode(buff);
        console.log('onCmdLoginConvertToData:' + JSON.stringify(decoded));

        if (decoded.err && decoded.err.code == -1) {
            console.log('登入错误:' + decoded.err.err);
            return;
        }
        return decoded;

    },

    //游戏登入信息
    onCmdGameLoginConvertToBuff() {
        let CmdGameLogin = pb.CmdGameLogin;
        let message = CmdGameLogin.create({
            uid: GameData.userID,
            token: GameData.token,
        })
        console.log('游戏登入信息' + JSON.stringify(message));
        let buff = CmdGameLogin.encode(message).finish();
        console.log('onCmdGameLoginConvertToBuff' + buff);

        return buff;
    },

    //游戏登入返回信息
    onCmdGameLoginReplyConvertToData(buff) {
        let CmdGameLoginReply = pb.CmdGameLoginReply;
        let decoded = CmdGameLoginReply.decode(new Uint8Array(buff));
        console.log(' onCmdGameLoginReplyConvertToData:' + JSON.stringify(decoded));
        return decoded;
    },

    //游戏开始
    onCmdGameStartConvertToBuff(data) {
        let CmdGameStart = pb.CmdGameStart;
        let message = CmdGameStart.create(data)
        let buff = CmdGameStart.encode(message).finish();
        return buff;
    },

    //查询行情
    onCmdQuoteQueryConvertToBuff(data) {
        let CmdQuoteQuery = pb.CmdQuoteQuery;
        let message = CmdQuoteQuery.create({
            ktype: data.ktype,
            code: data.code,
            from: data.from,
            total: data.total,
            to: data.to,
            kstyle: data.kstyle,
        })

        let buff = CmdQuoteQuery.encode(message).finish();
        return buff;
    },

    //游戏结束上传数据
    onCmdGameOverConvertToBuff(datas) {

        let CmdGameOver = pb.CmdGameOver;

        let message = CmdGameOver.create({ result: datas.result, operations: datas.operations })
        console.log(message);

        let buff = CmdGameOver.encode(message).finish();

        // let decode = CmdGameOver.decode(new Uint8Array(buff));

        return buff;
    },

    //查询游戏结果
    onCmdQueryGameResultConvertToBuff(data) {
        console.log(JSON.stringify(data));
        let CmdQueryGameResult = pb.CmdQueryGameResult;
        let message = CmdQueryGameResult.create(data)

        let buff = CmdQueryGameResult.encode(message).finish();
        return buff;
    },

    //查询游戏结果应答
    onCmdQueryGameResultReplyConvertToData(buff) {
        let CmdQueryGameResultReply = pb.CmdQueryGameResultReply;
        let decode = CmdQueryGameResultReply.decode(new Uint8Array(buff));
        console.log('查询游戏结果应答' + JSON.stringify(decode));
        return decode;
    },


    //修改玩家信息
    onCmdEditInfoConvertToBuff(data) {
        let CmdEditNick = pb.PlayerInfo;
        let message = CmdEditNick.create(data);
        let buff = CmdEditNick.encode(message).finish();
        return buff;
    },

    // onCmdUploadIconConvertToBuff(data) {
    //     let CmdUploadIcon = pb.PlayerInfo;
    //     let message = CmdUploadIcon.create({
    //         uid: data.uid,
    //         icon: data.icon,
    //     })
    //     let buff = CmdUploadIcon.encode(message).finish();
    //     return buff;
    // },

    onAdClickedConvertTpBuff(data) {
        let AdClicked = pb.AdClicked;
        let message = AdClicked.create({
            uid: data.uid,
            pos: data.pos,
            url: data.url,
            from: data.from,
        })

        let buff = AdClicked.encode(message).finish();
        return buff;
    },

    // 查询期货行情
    onCmdQuoteQueryFutureConverToBuff(data) {
        let CmdQuoteQueryFuture = pb.CmdQuoteQueryFuture;
        let message = CmdQuoteQueryFuture.create({
            ktype: data.ktype,
            code: data.code,
            from: data.from,
            total: data.total,
            to: data.to,
        })
        let buff = CmdQuoteQueryFuture.encode(message).finish();
        return buff;
    },

    // 查询游戏操作步骤
    onCmdGetGameOperations(data) {
        let CmdGetGameOperations = pb.CmdGetGameOperations;
        let message = CmdGetGameOperations.create({
            uid: data.uid,
            ts: data.ts,
        })
        let buff = CmdGetGameOperations.encode(message).finish();

        return buff;
    },

    // 查询游戏操作步骤应答
    onCmdGetGameOperationsReply(buff) {
        let GameOperations = pb.GameOperations;
        let decode = GameOperations.decode(new Uint8Array(buff));
        console.log('查询游戏操作步骤应答' + JSON.stringify(decode));
        return decode;

    },

    onReqRoomEnterBuff(data) {
        let CmdRoomEnter = pb.CmdRoomEnter;
        let message = CmdRoomEnter.create(data);
        let buff = CmdRoomEnter.encode(message).finish();
        return buff;
    },

    onRepRoomEnterMessage(buff) {
        let CmdRoomEnterReply = pb.CmdRoomEnterReply;
        let decode = CmdRoomEnterReply.decode(new Uint8Array(buff));
        return decode;
    },

    //自己进入房间（客户端收到自己进入房间的消息，将玩家拉入房间）：
    onSyncRoomEnterSelfMessage(buff) {
        let RoomData = pb.RoomData;
        let decode = RoomData.decode(new Uint8Array(buff));
        return decode;
    },

    //房间数据
    onRoomGameDataMessage(buff) {
        let RoomGameData = pb.RoomGameData;
        let decode = RoomGameData.decode(new Uint8Array(buff));
        return decode;
    },

    //重置游戏胜负统计：CmdResetGameCounter
    onResetGameCounter(data) {
        let CmdResetGameCounter = pb.CmdResetGameCounter;
        let message = CmdResetGameCounter.create(data);
        let buff = CmdResetGameCounter.encode(message).finish();
        return buff;

    },


    selectBlackData(id, buff) {

        if (id == pb.MessageId.Rep_Game_Login) {
            let data = this.onCmdGameLoginReplyConvertToData(buff);
            return data;
        }

        else if (id == pb.MessageId.Rep_QuoteQuery) {
            let Quotes = pb.Quotes;
            let data = Quotes.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Sync_S2C_GameProperty) {
            let GameProperties = pb.GameProperties;
            let decode = GameProperties.decode(new Uint8Array(buff));

            for (let i = 0; i < decode.items.length; i++) {
                GameData.properties[decode.items[i].id] = decode.items[i].newValue;
                console.log('id:' + decode.items[i].id + '   ' + 'value:' + decode.items[i].newValue);
            }
            console.log('更新属性:' + decode);

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

        else if (id == pb.MessageId.Rep_Game_Start
            || id == pb.MessageId.Rep_Game_Over
            || id == pb.MessageId.Rep_Game_EditNick
            || id == pb.MessageId.Rep_Game_UploadIcon
            || id == pb.MessageId.Rep_Game_SmxlReset
            || id == pb.MessageId.Rep_Hall_ResetGameCounter
            || id == pb.MessageId.Rep_Hall_GetItem
            || id == pb.MessageId.Rep_Game_CgsGetStageAward) {
            let ErrorInfo = pb.ErrorInfo;
            let data = ErrorInfo.decode(new Uint8Array(buff));
            return data;
        }

        else if (id == pb.MessageId.Rep_Game_QueryGameResult) {

            let data = this.onCmdQueryGameResultReplyConvertToData(buff);
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

        }
        else if (id == pb.MessageId.Rep_Game_GetGameOperation) {
            let data = this.onCmdGetGameOperationsReply(buff);
            return data;
        }

        //进入房间应答
        else if (id == pb.MessageId.Rep_Room_Enter) {
            let data = this.onRepRoomEnterMessage(buff);
            return data;
        }

        //自己进入房间（客户端收到自己进入房间的消息，将玩家拉入房间）
        else if (id == pb.MessageId.Sync_Room_Enter_Self) {
            let data = this.onSyncRoomEnterSelfMessage(buff);

            if (data.game == pb.GameType.JJ_PK || data.game == pb.GameType.JJ_DuoKong) {
                let message = this.onRoomGameDataMessage(data.data);
                console.log('自己进入房间' + JSON.stringify(message));
                //  GameCfg.RoomGameData = message;
                GameData.selfEnterRoomData = message;
                GlobalEvent.emit(EventCfg.RoomGameDataSelf, message);

            }
        }
        // 其他玩家进入房间：SyncRoomEnter
        else if (id == pb.MessageId.Sync_Room_Enter) {
            let SyncRoomEnter = pb.SyncRoomEnter;
            let data = SyncRoomEnter.decode(new Uint8Array(buff));
            console.log('其他玩家进入房间:' + JSON.stringify(data));
            GlobalEvent.emit(EventCfg.RoomGameDataOther, data);
        }
        //// 玩家离开房间
        else if (id == pb.MessageId.Sync_Room_Leave || id == pb.MessageId.Sync_Room_Leave_Self) {
            let SyncRoomLeave = pb.SyncRoomLeave;
            let data = SyncRoomLeave.decode(new Uint8Array(buff));
            console.log('玩家离开房间' + JSON.stringify(data));
            if (data.uid == GameData.userID) {
                GameData.RoomType = 0;
                GameData.selfEnterRoomData = null;
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

        //// 游戏操作
        else if (id == pb.MessageId.Sync_Room_GameOp) {
            let RoomGameOp = pb.RoomGameOp;
            let data = RoomGameOp.decode(new Uint8Array(buff));
            console.log('游戏操作' + JSON.stringify(data));
        }

        //// 游戏结果
        else if (id == pb.MessageId.Sync_Room_GameResult) {
            let RoomGameResult = pb.RoomGameResult;
            let data1 = RoomGameResult.decode(new Uint8Array(buff));

            let RoomGameData = pb.RoomGameData;

            let result = RoomGameData.decode(new Uint8Array(data1.result));

            console.log('游戏结果' + JSON.stringify(result));
            GameCfg.RoomGameData = result;

            setTimeout(() => { GlobalEvent.emit(EventCfg.GAMEOVEER, result); }, 1000);

        }

        //离开房间应答
        else if (id == pb.MessageId.Rep_Room_Leave) {
            let CmdRoomLeaveReply = pb.CmdRoomLeaveReply;
            let data = CmdRoomLeaveReply.decode(new Uint8Array(buff));
            console.log('离开房间应答' + JSON.stringify(data));
            return data;
        }

        //// 同步房间游戏操作
        else if (id == pb.MessageId.Sync_Room_GameOp) {
            let RoomGameOp = pb.RoomGameOp;
            let data = RoomGameOp.decode(new Uint8Array(buff));
            console.log('同步房间游戏操作' + JSON.stringify(data));
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
            //  console.log('同步闯关赛游戏数据' + JSON.stringify(data));
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
            if (data.type == pb.MessageType.RoomInvite) {
                GlobalEvent.emit(EventCfg.INVITEMESSAGE, data);
            }

        }
        // 准备就绪应答（无）
        else if (id == pb.MessageId.Rep_Room_Ready) {

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
            return data;
        }

    }
}

module.exports = PBHelper;
