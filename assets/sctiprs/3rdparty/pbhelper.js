
import { pb } from '../../protos/proto';
import GameData from '../GameData';

let Login = pb.CmdLogin;

let CmdLoginReply = pb.CmdLoginReply;

let CmdGameLogin = pb.CmdGameLogin;

let CmdGameLoginReply = pb.CmdGameLoginReply;

let CmdQuoteQuery = pb.CmdQuoteQuery;

let Quotes = pb.Quotes;

let GameProperties = pb.GameProperties;

let CmdGameStart = pb.CmdGameStart;

let CmdGameOver = pb.CmdGameOver;

let ErrorInfo = pb.ErrorInfo;

let CmdQueryGameResult = pb.CmdQueryGameResult;

let CmdQueryGameResultReply = pb.CmdQueryGameResultReply;

let CmdGetSmxlReportReply = pb.CmdGetSmxlReportReply;

let CmdEditNick = pb.CmdEditNick;

let CmdUploadIcon = pb.CmdUploadIcon;

let AdClicked = pb.AdClicked;

let CmdQuoteQueryFuture = pb.CmdQuoteQueryFuture;

let QuotesFuture = pb.QuotesFuture;


function PBHelper() {

}

//let window = global || window;

PBHelper.prototype = {

    //登入信息转BUff
    onCmdLoginConvertToBuff(data) {
        console.log('message' + JSON.stringify(data));
        let message = Login.create({ account: data.account, type: data.type, from: data.from, pwd: data.pwd });

        let buff = Login.encode(message).finish();

        return buff;
    },

    //登人返回信息
    onCmdLoginConvertToData(buff) {

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
        let decoded = CmdGameLoginReply.decode(new Uint8Array(buff));
        console.log(' onCmdGameLoginReplyConvertToData:' + JSON.stringify(decoded));
        return decoded;
    },

    //游戏开始
    onCmdGameStartConvertToBuff(data) {
        let message = CmdGameStart.create({
            game: data.game,
        })
        let buff = CmdGameStart.encode(message).finish();
        return buff;
    },

    //查询行情
    onCmdQuoteQueryConvertToBuff(data) {
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
    onCmdGameOverConvertToBuff(data) {
        let message = CmdGameOver.create({
            result: {
                uid: data.uid,
                gType: data.g_type,
                // g_type: data.g_type,
                //   quotes_code: data.quotes_code,
                quotesCode: data.quotes_code,
                //   k_type: data.k_type,

                kType: data.k_type,
                // k_from: data.k_from,

                kFrom: data.k_from,
                //  k_to: data.k_to,

                kTo: data.k_to,
                //   stock_profit_rate: data.stock_profit_rate,
                stockProfitRate: data.stock_profit_rate,
                userProfitRate: data.user_profit_rate,
                // user_profit_rate: data.user_profit_rate,
                // user_capital: data.user_capital,
                // user_profit: data.user_profit,
                userCapital: data.user_capital,
                userProfit: data.user_profit,
                ts: data.ts,
                rank: data.rank,
                refId: data.ref_id,
            }
        })

        let buff = CmdGameOver.encode(message).finish();
        return buff;
    },

    //查询游戏结果
    onCmdQueryGameResultConvertToBuff(data) {
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
        let decode = CmdQueryGameResultReply.decode(new Uint8Array(buff));
        console.log('查询游戏结果应答' + JSON.stringify(decode));
        return decode;
    },

    onCmdEditNickConvertToBuff(data) {
        let message = CmdEditNick.create({
            uid: data.uid,
            nick: data.nick,
        })

        let buff = CmdEditNick.encode(message).finish();
        return buff;
    },

    onCmdUploadIconConvertToBuff(data) {
        let message = CmdUploadIcon.create({
            uid: data.uid,
            icon: data.icon,
        })
        let buff = CmdUploadIcon.encode(message).finish();
        return buff;
    },

    onAdClickedConvertTpBuff(data) {
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

    selectBlackData(id, buff) {
        let data;
        console.log('id:' + id + '跟新数据');
        if (id == pb.MessageId.Rep_Game_Login) {
            data = this.onCmdGameLoginReplyConvertToData(buff);
            return data;
        } else if (id == pb.MessageId.Rep_QuoteQuery) {
            data = Quotes.decode(new Uint8Array(buff));
            return data;
        } else if (id == pb.MessageId.Sync_S2C_GameProperty) {
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
            data = ErrorInfo.decode(new Uint8Array(buff));
            return data;
        } else if (id == pb.MessageId.Rep_Game_QueryGameResult) {
            data = this.onCmdQueryGameResultReplyConvertToData(buff);
            return data;
        } else if (id == pb.MessageId.Rep_Game_SmxlReport) {
            data = CmdGetSmxlReportReply.decode(new Uint8Array(buff));
            return data;
        }
        //期货行情
        else if (id == pb.MessageId.Rep_QuoteQueryFuture) {
            data = QuotesFuture.decode(new Uint8Array(buff));
            return data;
        }

    }

}

module.exports = PBHelper;