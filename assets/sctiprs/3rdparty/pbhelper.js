
import pb from '../../protos/proto';

let Login = pb.pb.CmdLogin;

let CmdLoginReply = pb.pb.CmdLoginReply;

let CmdGameLogin = pb.pb.CmdGameLogin;

let CmdGameLoginReply = pb.pb.CmdGameLoginReply;

let CmdQuoteQuery = pb.pb.CmdQuoteQuery;

let Quotes = pb.pb.Quotes;

function PBHelper() {

}

//let window = global || window;

PBHelper.prototype = {

    //登入信息转BUff
    onCmdLoginConvertToBuff(data) {
        let message = Login.create({ account: data.account, type: data.type, from: data.from, pwd: data.pwd });
        let buff = Login.encode(message).finish();
        return buff;

    },

    //登人返回信息
    onCmdLoginConvertToData(buff) {

        let decoded = CmdLoginReply.decode(new Uint8Array(buff));

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

        return buff;
    },

    //游戏登入返回信息
    onCmdGameLoginReplyConvertToData(buff) {
        let decoded = CmdGameLoginReply.decode(new Uint8Array(buff));
        console.log(' onCmdGameLoginReplyConvertToData:' + JSON.stringify(decoded));
        return decoded;
    },


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

    selectBlackData(id, buff) {
        let data
        if (id == 4002) {
            data = this.onCmdGameLoginReplyConvertToData(buff);
            return data;
        } else if (id == 2004) {
            data = Quotes.decode(new Uint8Array(buff));
            return data;
        }

        console.log(id + ':' + data);

    }



}

module.exports = PBHelper;