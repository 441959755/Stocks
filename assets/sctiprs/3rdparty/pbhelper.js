
import pb from '../../protos/proto';
import GameCfg from '../game/GameCfg';

let Login = pb.pb.CmdLogin;

let CmdLoginReply = pb.pb.CmdLoginReply;

let CmdGameLogin = pb.pb.CmdGameLogin;

let CmdGameLoginReply = pb.pb.CmdGameLoginReply;

let CmdQuoteQuery = pb.pb.CmdQuoteQuery;

let Quotes = pb.pb.Quotes;

let GameProperties = pb.pb.GameProperties;

let CmdGameStart = pb.pb.CmdGameStart;

let CmdGameOver = pb.pb.CmdGameOver;

let ErrorInfo = pb.pb.ErrorInfo;

let CmdQueryGameResult = pb.pb.CmdQueryGameResult;

let CmdQueryGameResultReply = pb.pb.CmdQueryGameResultReply;

let CmdGetSmxlReportReply = pb.pb.CmdGetSmxlReportReply;
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
            uid: cc.ext.gameData.userID,
            token: cc.ext.gameData.token,
        })
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
                g_type: data.g_type,
                quotes_code: data.quotesCode,
                k_type: data.k_type,
                k_from: data.k_from,
                k_to: data.k_to,
                stock_profit_rate: data.stock_profit_rate,
                user_profit_rate: data.user_profit_rate,
                user_capital: data.user_capital,
                user_profit: data.user_profit,
                ts: data.ts,
                rank: data.rank,
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

    selectBlackData(id, buff) {
        let data;
        if (id == 4002) {
            data = this.onCmdGameLoginReplyConvertToData(buff);
            return data;
        } else if (id == 2004) {
            data = Quotes.decode(new Uint8Array(buff));
            return data;
        } else if (id == 1002) {
            let decode = GameProperties.decode(new Uint8Array(buff));

            gameData[decode.id] = decode.new_value;
            gameData = gameData;

            console.log('id:' + id + '跟新数据');
        } else if (id == 4004 || id == 4006) {
            data = ErrorInfo.decode(new Uint8Array(buff));
            return data;
        } else if (id == 4008) {
            data = this.onCmdQueryGameResultReplyConvertToData(buff);
            return data;
        } else if (id == 4010) {
            data = CmdGetSmxlReportReply.decode(new Uint8Array(buff));
            return data;
        }

    }

}

module.exports = PBHelper;