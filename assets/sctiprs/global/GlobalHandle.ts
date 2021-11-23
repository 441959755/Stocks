import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameData from "../GameData";
import LLWConfig from "../common/config/LLWConfig";
import DrawData from "../game/DrawData";
import UpGameOpt from "./UpGameOpt";
import GameCfgText from "../GameText";
import ComUtils from "../Utils/ComUtils";

export default class GlobalHandle {

    // private static curTotal = 0;

    public static enterGameSetout(data, call, flag?) {
        GameCfg.data[0].data = [];

        if (!flag) {
            //游戏开始
            this.onCmdGameStartReq(() => {

                if (GameCfg.GameType == pb.GameType.QiHuo) {
                    this.onCmdGameStartQuoteQueryQH(data, call)
                }
                else {
                    //游戏行情获取
                    this.onCmdGameStartQuoteQuery(data, call)
                }

            });
        }
        else {
            //游戏行情获取
            this.onCmdGameStartQuoteQuery(data, call)
        }

    }

    //游戏开始发送游戏类型
    public static onCmdGameStartReq(cb?) {

        let info = {
            game: GameCfg.GameType,
            isJunxian: false,
        }

        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            if (GameCfg.GameSet.select == '均线') {
                info.isJunxian = true;
            }
        }

        socket.send(pb.MessageId.Req_Game_Start, PB.onCmdGameStartConvertToBuff(info), res => {

            console.log(JSON.stringify(res));

            if (res.err) {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err);
                return;
            }

            cb && (cb(res));
        })

    }

    //游戏结束
    public static onCmdGameOverReq(datas) {

        console.log('上传游戏数据' + JSON.stringify(datas));
        socket.send(pb.MessageId.Req_Game_Over, PB.onCmdGameOverConvertToBuff(datas), (info) => {
            console.log('GameOverInfo' + JSON.stringify(info));
        })

    }

    //获取行情
    public static onCmdGameStartQuoteQuery(info1, cb) {

        socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1), info => {

            if (!info.items || info.items.length <= 0) {

                console.log('获取的行情为空');

                GameCfg.GAMEFUPAN = false;

                GlobalEvent.emit(EventCfg.LOADINGHIDE);

                return;
            }

            info.items[0].code && (GameCfg.data[0].code = info.items[0].code,
                info.items[0].name = GameCfgText.getGPItemInfo(info.items[0].code)[1]);


            info.items.forEach((el, index) => {

                let ye = (el.timestamp + '').slice(0, 4);
                let mon = (el.timestamp + '').slice(4, 6);
                let da = (el.timestamp + '').slice(6);
                let fromDate = ye + '-' + mon + '-' + da;

                let data = {
                    day: fromDate || 0,
                    open: el.open || 0,
                    close: el.price || 0,
                    high: el.high || 0,
                    low: el.low || 0,
                    price: el.amount || 0,
                    value: el.volume || 0,
                    Rate: (el.volume / GameCfg.data[0].circulate) * 100
                };

                if (GameCfg.data[0].circulate == 0) {
                    data.Rate = 1;
                }

                GameCfg.data[0].data.push(data);

            });


            console.log('获取的行情' + JSON.stringify(info));
            console.log(info.items.length);

            cb && (cb());
        });

    }

    public static onCmdGameStartQuoteQueryQH(da, cb?) {

        let data = JSON.parse(JSON.stringify(da));

        if (data.ktype == pb.KType.Min60) {
            data.total *= 12;
            data.ktype = pb.KType.Min5;
            data.from = ComUtils.getTimestamp(data.from);
        } else if (data.ktype == pb.KType.Min30) {
            data.total *= 6;
            data.ktype = pb.KType.Min5;
            data.from = ComUtils.getTimestamp(data.from);
        } else if (data.ktype == pb.KType.Min15) {
            data.total *= 3;
            data.ktype = pb.KType.Min5;
            data.from = ComUtils.getTimestamp(data.from);
        }

        let count = data.total;

        if (data.total > 2000) {
            data.total = 2000;
        }

        socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(data), info => {

            if (!info.items || info.items.length <= 0) {
                console.log('获取的行情为空');
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空' + JSON.stringify(data));
                GameCfg.GAMEFUPAN = false;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                return;
            }

            info.items.forEach((el) => {

                let data1 = {
                    day: el.timestamp + '',
                    open: el.open || 0,
                    close: el.close || 0,
                    high: el.high || 0,
                    low: el.low || 0,
                    value: el.volume || 0,
                    ccl_hold: el.cclHold || 0,
                };
                GameCfg.data[0].data.push(data1);
            });

            if (GameCfg.data[0].data.length < count) {
                let data1 = data;
                data1.reserve = 0;
                data1.from = GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day;

                this.getRemainData(count - 2000, data1, cb, da.ktype);
            }
            else {
                let qhHQ = GameCfg.data[0].data;
                if (da.ktype == pb.KType.Min5) {
                    DrawData.arrMin5 = qhHQ;
                } else if (da.ktype == pb.KType.Day) {
                    DrawData.arrDay = qhHQ;
                }
                else {
                    let t
                    if (da.ktype == pb.KType.Min15) {
                        t = 3;
                        DrawData.arrMin5 = qhHQ;
                    } else if (da.ktype == pb.KType.Min30) {
                        t = 6;
                        DrawData.arrMin5 = qhHQ;
                    } else if (da.ktype == pb.KType.Min60) {
                        t = 12;
                        DrawData.arrMin5 = qhHQ;
                    }
                    qhHQ = DrawData.dataChange(qhHQ[qhHQ.length - 1].day, t, qhHQ);
                }

                GameCfg.data[0].data = qhHQ;
                console.log(JSON.stringify('期货' + JSON.stringify(qhHQ)));
                console.log(qhHQ.length);

                cb && (cb());
            }
        })
    }



    public static getRemainData(count, data1, cb, type) {

        if (count > 2000) {
            data1.total = 2000;
        }
        else {
            data1.total = count + 1;
        }
        socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(data1), info => {

            if (!info.items || info.items.length <= 0) {
                console.log('获取的行情为空');
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空' + JSON.stringify(data1));
                GameCfg.GAMEFUPAN = false;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                return;
            }

            info.items.forEach((el, index) => {
                if (index != 0) {
                    let data1 = {
                        day: el.timestamp + '',
                        open: el.open || 0,
                        close: el.close || 0,
                        high: el.high || 0,
                        low: el.low || 0,
                        value: el.volume || 0,
                        ccl_hold: el.cclHold || 0,
                    };
                    GameCfg.data[0].data.push(data1);
                }

            });

            if (GameCfg.data[0].data.length < count) {

                let data = data1;

                data.from = GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day;

                this.getRemainData(count - 2000, data, cb, type);
            }
            else {

                if (GameCfg.data[0].data.length <= 0) {
                    return;
                }

                let qhHQ = GameCfg.data[0].data;
                if (type == pb.KType.Min5) {
                    DrawData.arrMin5 = qhHQ;
                } else if (type == pb.KType.Day) {
                    DrawData.arrDay = qhHQ;
                }
                else {
                    let t
                    if (type == pb.KType.Min15) {
                        t = 3;
                        DrawData.arrMin5 = qhHQ;
                    } else if (type == pb.KType.Min30) {
                        t = 6;
                        DrawData.arrMin5 = qhHQ;
                    } else if (type == pb.KType.Min60) {
                        t = 12;
                        DrawData.arrMin5 = qhHQ;
                    }
                    qhHQ = DrawData.dataChange(qhHQ[qhHQ.length - 1].day, t, qhHQ);
                }

                GameCfg.data[0].data = qhHQ;
                console.log(JSON.stringify('期货' + JSON.stringify(qhHQ)));
                console.log(qhHQ.length);

                cb && (cb());
            }
        })
    }

    public static onGameResetSMCapital() {

        let messageId;
        //if (GameCfg.GameType == pb.GameType.ShuangMang) {
        messageId = pb.MessageId.Req_Game_SmxlReport;
        // } else if (GameCfg.GameType == pb.GameType.DingXiang) {

        // }
        let data = {
            uid: GameData.userID,
            pos: pb.GameType.ShuangMang,
            url: '123',
            from: LLWConfig.PLATTYPE,
        }

        socket.send(messageId, PB.onAdClickedConvertTpBuff(data), (info) => {
            console.log('onGameResetCount' + JSON.stringify(info));

            // callBack && (callBack(info));
        });

    }

    // 查询游戏操作步骤
    public static GetGameOperations(data, cb?) {

        socket.send(pb.MessageId.Req_Game_GetGameOperation, PB.onCmdGetGameOperations(data), (info) => {
            console.log('操作步骤' + JSON.stringify(info));

            if (!info.err) {
                if (info && info.items) {

                    UpGameOpt.player1Opt = info.items;

                    if (cb) {
                        cb(info.junXian);
                    }
                }
            }
        })
    }


    //离开房间：CmdRoomLeave
    public static onReqRoomLeave(call?) {

        if (GameData.userID) {
            let data = {
                id: GameData.roomId,
                uid: GameData.userID,
            }
            let CmdRoomLeave = pb.CmdRoomLeave;
            let message = CmdRoomLeave.create(data);
            let bufff = CmdRoomLeave.encode(message).finish();

            socket.send(pb.MessageId.Req_Room_Leave, bufff, (res) => {
                console.log('离开房间：' + JSON.stringify(res));
                call && call(res);
            })

            GameData.Players = [];
            GameData.Players.length = 0;
            GameData.RoomType = 0;
            GameData.roomId = 0;
        }

        else {
            console.log('err: GameData userID is null');
            call && call();
        }

    }

    //上传房间游戏操作
    public static onUpRoomGameOp(ops) {

        if (!ops) { return }

        let GameOperations = pb.GameOperations;
        let data1 = GameOperations.create(ops);
        let buff1 = GameOperations.encode(data1).finish();

        let data = {
            id: GameData.roomId,
            uid: GameData.userID,
            ops: buff1,
        }

        let RoomGameOp = pb.RoomGameOp;
        let message = RoomGameOp.create(data);
        let buff = RoomGameOp.encode(message).finish();

        socket.send(pb.MessageId.Sync_Room_GameOp, buff, (res) => {
            console.log('上传房间游戏操作' + JSON.stringify(res));
        })

    }

    /**
     * 
     * @param code 错误码
     * @returns 错误提示
     */
    public static getErrorCodeByCode(code) {
        let str = '';
        switch (code) {
            case pb.ErrorCode.CS_OK:

                break;
            case pb.ErrorCode.CS_UNKNOW:
                str = '未知错误'
                break;

            case pb.ErrorCode.CS_SERVER_ERROR:
                str = '服务器内部错误'
                break;

            case pb.ErrorCode.CS_INVALID_PARAMETER:
                str = '无效参数'
                break;

            case pb.ErrorCode.CS_INVALID_ACCOUNT:
                str = '无效账号'
                break;

            case pb.ErrorCode.CS_INVALID_PASSWORD:
                str = '无效密码'
                break;

            case pb.ErrorCode.CS_TIMEOUT:
                str = '执行超时'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE:
                str = '条件检查失败'
                break;
            case pb.ErrorCode.CS_CHECK_FAILURE_CAPITAL:
                str = '资金账户检查失败'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_STOCK:
                str = '股票账户检查失败'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_ORDER:
                str = '无效的订单号'
                break;

            case pb.ErrorCode.CS_NO_TRADING_TIME:
                str = '非交易时间'
                break;

            case pb.ErrorCode.CS_NO_REGISTRY_TIME:
                str = '非报名时间'
                break;

            case pb.ErrorCode.CS_NO_REGISTRY:
                str = '没有报名'
                break;

            case pb.ErrorCode.CS_ALREADY_REGISTRY:
                str = '已经报名'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_CGDS_ID:
                str = '无效的炒股大赛ID'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_TIME:
                str = '在比赛时间范围外'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_PROPERTY:
                str = '玩家属性检查失败'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_TOKEN:
                str = '无效的token'
                break;

            case pb.ErrorCode.CS_ALREADY_UNLOCK:
                str = '已经解锁'
                break;

            case pb.ErrorCode.CS_CHECK_PHONE_UNREGISTRY:
                str = '手机号未注册'
                break;

            case pb.ErrorCode.CS_CHECK_PHONE_UNBOUND:
                str = '手机号未绑定'
                break;

            case pb.ErrorCode.CS_CHECK_ACCOUNT_FORBIDDEN:
                str = '账号已被禁用'
                break;

            case pb.ErrorCode.CS_INVALID_SMSCODE:
                str = '无效的短信验证码'
                break;

            case pb.ErrorCode.CS_CHECK_FAILURE_ONCE:
                str = '已经参加过活动'
                break;

            case pb.ErrorCode.CS_PAYMENT_FAILURE:
                str = '支付失败'
                break;

            case pb.ErrorCode.CS_ROOM_INVALID:
                str = '无效的房间ID'
                break;

            case pb.ErrorCode.CS_ROOM_FULL:
                str = '房间已满'
                break;

            case pb.ErrorCode.CS_ROOM_FAIL_CHECKIN:
                str = '进入房间条件不满足'
                break;

            case pb.ErrorCode.CS_ROOM_NOT_READY:
                str = '玩家没有准备好'
                break;
        }

        return str;
    }

    //在线邀请
    public static onLineInvite() {
        let str;
        if (GameCfg.GameType == pb.GameType.JJ_PK) {
            str = 'PK大战';
        } else if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
            str = '多空大战';
        }
        let info = {
            sender: GameData.userID,
            receiver: GameData.roomId,
            type: pb.MessageType.RoomInvite,
            text: GameData.userName + ',' + str + ',' + GameData.roomId + ',' + GameData.JJCapital,
            ts: parseInt(new Date().getTime() / 1000 + ''),
        }

        let Notice = pb.Notice;
        let message = Notice.create(info);
        let buff = Notice.encode(message).finish();

        socket.send(pb.MessageId.Sync_C2S_Message, buff, (res) => {
            console.log('在线邀请：' + JSON.stringify(res));
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

}
