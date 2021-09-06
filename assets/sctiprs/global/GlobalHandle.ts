import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameData from "../GameData";
import LLWConfig from "../common/config/LLWConfig";
import DrawData from "../game/DrawData";
import UpGameOpt from "./UpGameOpt";

export default class GlobalHandle {

    private static curTotal = 0;

    //游戏开始发送游戏类型
    public static onCmdGameStartReq(cb?) {

        let info = {
            game: GameCfg.GameType,
        }
        socket.send(pb.MessageId.Req_Game_Start, PB.onCmdGameStartConvertToBuff(info), res => {

            console.log(JSON.stringify(res));

            if (res.err) {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                //  let err = GlobalHandle.getErrorCodeByCode(res.code);
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
        let infoPre = {
            ktype: info1.ktype,
            kstyle: info1.kstyle,
            code: info1.code,
            form: 0,
            total: 100 + 6,
            to: info1.from,
        }
        socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(infoPre), info => {
            if (!info.items || info.items.length <= 0) {
                console.log('获取的行情为空');
                // console.log(JSON.stringify(GameCfg.data));
                GameCfg.GAMEFUPAN = false;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                return;
            }
            info.items.forEach(el => {
                //  let date = new Date(el.timestamp);
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

            if (info1.kstyle == pb.KStyle.Wave || info1.kstyle == pb.KStyle.Up || info1.kstyle == pb.KStyle.Down) {
                cb && (cb());
                if (!GameCfg.GAMEFUPAN) {
                    GameCfg.huizhidatas = info.items.length - 100;
                }
                GameData.huizhidatas = info.items.length - 100;
                return;
            }

            if (!GameCfg.GAMEFUPAN) {
                GameCfg.huizhidatas = info.items.length;
            }
            // if (GameCfg.GameType != pb.GameType.JJ_DuoKong && GameCfg.GameType != pb.GameType.JJ_DuoKong) {
            GameData.huizhidatas = info.items.length;
            //   }

            info1.kstyle = pb.KStyle.Random;

            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1), info => {
                //   console.log('onCmdQuoteQuery' + JSON.stringify(info));
                if (!info.items || info.items.length <= 0) {
                    console.log('获取的行情为空');
                    // console.log(JSON.stringify(GameCfg.data));
                    GameCfg.GAMEFUPAN = false;
                    GlobalEvent.emit(EventCfg.LOADINGHIDE);
                    return;
                }

                //  let d = GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day;
                info.items.forEach((el, index) => {
                    if (index != 0) {
                        //  let date = new Date(el.timestamp);
                        let ye = (el.timestamp + '').slice(0, 4);
                        let mon = (el.timestamp + '').slice(4, 6);
                        let da = (el.timestamp + '').slice(6);
                        let fromDate = ye + '-' + mon + '-' + da;
                        //  if (fromDate != d) {
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
                    }
                });
                // console.log(JSON.stringify(GameCfg.data[0].data));
                // console.log(JSON.stringify(GameCfg.data[0].data.length));
                cb && (cb());
            });

        });
    }

    public static onCmdGameStartQuoteQueryQH(data, cb?) {
        let maxLength = 2000;
        this.curTotal = 0;
        //先获取前面的
        let preData = {
            ktype: data.ktype,
            code: data.code,
            from: 0,
            total: 50,
            to: data.from,
        }
        if (!GameCfg.GAMEFUPAN) {
            GameCfg.huizhidatas = preData.total;
        }
        GameData.huizhidatas = preData.total;

        //	GameData.huizhidatas = preData.total - 1;
        if (GameData.QHSet.ZLine == '15分钟K') {
            preData.total *= 3;
        } else if (GameData.QHSet.ZLine == '30分钟K') {
            preData.total *= 6;
        } else if (GameData.QHSet.ZLine == '60分钟K') {
            preData.total *= 12;
        }

        //	data.total -= 50;
        socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(preData), info => {
            //console.log(JSON.stringify(info));
            if (!info.items || info.items.length <= 0) {
                console.log('获取的行情为空');
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空' + JSON.stringify(preData));
                GameCfg.GAMEFUPAN = false;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                return;
            }
            //	if (GameData.QHSet.ZLine == '日线' || GameData.QHSet.ZLine == '5分钟K') {
            info.items.forEach((el) => {
                // {"code":2000042,"ktype":"Day","timestamp":"1577235900","open":3112,"close":3116,"high":3120,"low":3112,"volume":"15032"},
                //[{"code":2000113,"ktype":"Day","timestamp":"20171103","open":610.2,"close":607.4,"high":610.6,"low":606.6,"volume":"178060","cclHold":"442454"},
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

            if (data.total > maxLength) {
                this.curTotal = data.total - maxLength;
                data.total = maxLength;
            }
            this.getQHHangQing(data, cb);
        })
    }

    public static getQHHangQing(data, cb?) {
        let qhHQ = GameCfg.data[0].data;
        socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(data), info => {
            //console.log(JSON.stringify(info));
            if (!info.items || info.items.length <= 0) {
                console.log('获取的行情为空');
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空' + JSON.stringify(data));
                GameCfg.GAMEFUPAN = false;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                return;
            }
            info.items.forEach((el, index) => {
                // {"code":2000042,"ktype":"Day","timestamp":"1577235900","open":3112,"close":3116,"high":3120,"low":3112,"volume":"15032"},
                //[{"code":2000113,"ktype":"Day","timestamp":"20171103","open":610.2,"close":607.4,"high":610.6,"low":606.6,"volume":"178060","cclHold":"442454"},
                //	if (el.timestamp != GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day) {
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
                    qhHQ.push(data1);
                }

                //	}
            });
            // console.log(JSON.stringify(GameCfg.data[0].data.length));
            // console.log(JSON.stringify(GameCfg.data[0].data));

            if (this.curTotal > 0) {
                if (this.curTotal >= 2000) {
                    this.curTotal -= 2000;
                    data.total = 2000;
                } else {
                    data.total = this.curTotal;
                    this.curTotal = 0;
                }
                GameCfg.data[0].data = qhHQ;
                data.from = qhHQ[qhHQ.length - 1].day;
                this.getQHHangQing(data);
            } else {
                if (GameData.QHSet.ZLine == '5分钟K') {
                    DrawData.arrMin5 = qhHQ;
                } else if (GameData.QHSet.ZLine == '日线') {
                    DrawData.arrDay = qhHQ;
                }
                else {
                    let t
                    if (GameData.QHSet.ZLine == '15分钟K') {
                        t = 3;
                        DrawData.arrMin5 = qhHQ;
                    } else if (GameData.QHSet.ZLine == '30分钟K') {
                        t = 6;
                        DrawData.arrMin5 = qhHQ;
                    } else if (GameData.QHSet.ZLine == '60分钟K') {
                        t = 12;
                        DrawData.arrMin5 = qhHQ;
                    }
                    qhHQ = DrawData.dataChange(qhHQ[qhHQ.length - 1].day, t, qhHQ);
                }
                GameCfg.data[0].data = qhHQ;
                //	GameCfg.enterGameCache.from1 = GameCfg.data[0].data[0].day;
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
            console.log(JSON.stringify(info));

            if (!info.err) {
                if (info && info.items) {

                    UpGameOpt.player1Opt = info.items;

                    if (cb) {
                        cb();
                    }
                }
            }
        })
    }

    //进入房间：CmdRoomEnter

    public static onReqRoomEnter(arr, call?) {
        let data = {
            game: GameCfg.GameType,
            uid: GameData.userID,
            junXian: arr,
        }
        socket.send(pb.MessageId.Req_Room_Enter, PB.onReqRoomEnterBuff(data), (res) => {
            console.log(JSON.stringify(res));
            if (res.err) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err.err);
                call && (call());
            } else {
                GameData.roomId = res.id;
                call && call(1);
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
                console.log('onReqRoomLeave' + JSON.stringify(res));
                call && call(res);
            })
        }

        else {
            console.log('err: GameData userID is null');
            call && call();
        }

    }

    //上传房间游戏操作
    public static onUpRoomGameOp(ops) {

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
            console.log(JSON.stringify(res));
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

}
