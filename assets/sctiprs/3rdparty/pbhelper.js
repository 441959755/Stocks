
import { pb } from '../../protos/proto';
import GameData from '../GameData';

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
        let message = CmdGameStart.create({
            game: data.game,
        })
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
        let data = datas.result;

        let message = CmdGameOver.create({
            result: {
                uid: data.uid,
                gType: data.g_type,
                quotesCode: data.quotes_code,
                kType: data.k_type,
                kFrom: data.k_from,
                kTo: data.k_to,
                stockProfitRate: data.stock_profit_rate,
                userProfitRate: data.user_profit_rate,
                userCapital: data.user_capital,
                userProfit: data.user_profit,
                ts: data.ts,
                rank: data.rank,
                refId: data.ref_id,
                kStartup: data.k_startup,
                kStop: data.k_stop,
            },
            operations: {
                items: datas.operations,
                junXian: [],
            }
        })

        let buff = CmdGameOver.encode(message).finish();

        // let decode = CmdGameOver.decode(new Uint8Array(buff));

        return buff;
    },

    //查询游戏结果
    onCmdQueryGameResultConvertToBuff(data) {
        let CmdQueryGameResult = pb.CmdQueryGameResult;
        let message = CmdQueryGameResult.create({
            gType: data.g_type,
            from: data.from,
            to: data.to,
            pageSize: data.page_size,
        })

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

    onCmdEditNickConvertToBuff(data) {
        let CmdEditNick = pb.CmdEditNick;
        let message = CmdEditNick.create({
            uid: data.uid,
            nick: data.nick,
        })

        let buff = CmdEditNick.encode(message).finish();
        return buff;
    },

    onCmdUploadIconConvertToBuff(data) {
        let CmdUploadIcon = pb.CmdUploadIcon;
        let message = CmdUploadIcon.create({
            uid: data.uid,
            icon: data.icon,
        })
        let buff = CmdUploadIcon.encode(message).finish();
        return buff;
    },

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

    selectBlackData(id, buff) {
        let data;
        console.log('id:' + id + '跟新数据');
        if (id == pb.MessageId.Rep_Game_Login) {
            data = this.onCmdGameLoginReplyConvertToData(buff);
            return data;
        } else if (id == pb.MessageId.Rep_QuoteQuery) {
            let Quotes = pb.Quotes;
            data = Quotes.decode(new Uint8Array(buff));
            return data;
        } else if (id == pb.MessageId.Sync_S2C_GameProperty) {
            let GameProperties = pb.GameProperties;
            let decode = GameProperties.decode(new Uint8Array(buff));

            // items: Array(1)
            // 0: GamePropertyItem {id: 3, oldValue: 100000, newValue: 100000}
            // length: 1

            for (let i = 0; i < decode.items.length; i++) {
                GameData.properties[decode.items[i].id] = decode.items[i].newValue;
                console.log('id:' + decode.items[i].id + '   ' + 'value:' + decode.items[i].newValue);
            }

            GameData.properties = GameData.properties;


        } else if (id == pb.MessageId.Rep_Game_Start
            || id == pb.MessageId.Rep_Game_Over
            || id == pb.MessageId.Rep_Game_EditNick
            || id == pb.MessageId.Rep_Game_UploadIcon
            || id == pb.MessageId.Rep_Game_SmxlReset) {
            let ErrorInfo = pb.ErrorInfo;
            data = ErrorInfo.decode(new Uint8Array(buff));
            return data;
        } else if (id == pb.MessageId.Rep_Game_QueryGameResult) {
            data = this.onCmdQueryGameResultReplyConvertToData(buff);
            return data;
        } else if (id == pb.MessageId.Rep_Game_SmxlReport) {
            let CmdGetSmxlReportReply = pb.CmdGetSmxlReportReply;
            data = CmdGetSmxlReportReply.decode(new Uint8Array(buff));
            return data;
        }
        //期货行情
        else if (id == pb.MessageId.Rep_QuoteQueryFuture) {
            let QuotesFuture = pb.QuotesFuture;
            data = QuotesFuture.decode(new Uint8Array(buff));
            return data;
        }
        //// 同步双盲训练状态
        else if (id == pb.MessageId.Sync_S2C_GameSmxl) {
            let SmxlState = pb.SmxlState;
            data = SmxlState.decode(new Uint8Array(buff));
            console.log('同步双盲训练状态' + JSON.stringify(data));
            GameData.SmxlState = data;

        }
        //同步当日游戏次数数据
        else if (id == pb.MessageId.Sync_S2C_GameTimes) {
            // 当日游戏次数计数器
            let TodayGameTimes = pb.TodayGameTimes;
            data = TodayGameTimes.decode(new Uint8Array(buff));
            console.log('当日游戏次数计数器:' + JSON.stringify(data));

        }
        else if (id == pb.MessageId.Rep_Game_GetGameOperation) {
            let data = this.onCmdGetGameOperationsReply(buff);
            return data;
        }

    }

}

module.exports = PBHelper;
