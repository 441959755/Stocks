
import { pb } from "../../../protos/proto";
import GameData from '../../GameData';
import GlobalEvent from "../../Utils/GlobalEvent";
import EventCfg from "../../Utils/EventCfg";

let MessageHead = pb.MessageHead;

export default class Socket {

    ws = null;

    flag = false;

    host = '';

    queue = [];

    reconnectBeat = null;  //断线重连

    reconnectCount = 0;

    _preData = null;

    heartbeat = null;  //心跳

    constructor(host) {
        this.flag = false;
        this.host = host;
        this.reconnectCount = 0;
        this.init();
    }

    init() {
        this.ws = new WebSocket(this.host);
        this.ws.binaryType = 'arraybuffer';
        this.ws.onmessage = this.message.bind(this);
        this.ws.onopen = this.connected.bind(this);
        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = this.onclose.bind(this);
    }

    message(event) {

        let decode = new Uint8Array(event.data);

        let offect = 10, handleBuf, badBuf;

        if (decode.length >= offect) {
            handleBuf = decode.slice(0, 10);
            badBuf = decode.slice(10);
        }

        let decoded = MessageHead.decode(new Uint8Array(handleBuf));

        let info = PB.selectBlackData(decoded.messageId, badBuf);

        let callback = this.queue[decoded.messageId];

        callback && (callback(info));
    }

    connected(event) {

        this.reconnectBeat && (clearInterval(this.reconnectBeat));
        this.reconnectBeat = null;
        this.reconnectCount = 0;

        let CmdGameLogin = pb.CmdGameLogin;
        let message = CmdGameLogin.create({
            uid: GameData.userID,
            token: GameData.token,
        })

        let buff = CmdGameLogin.encode(message).finish();

        this.send(pb.MessageId.Req_Game_Login, buff, (info) => {
            console.log('登入成功：' + JSON.stringify(info));
            if (info && info.data) {

                GameData.userID = info.data.uid;

                //  GameData.userName = info.data.nickname || info.data.uid;

                GameData.gender = info.data.gender || 0;

                GameData.properties = info.data.properties;

                GameData.SmxlState = info.data.smlxState;

                GameData.cgState = info.data.cgState;

                // GameCfgText.levelInfoCfg && (GameData.maxExp = GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]])

                GameData.location = info.data.location || '中国';

                GameData.GameCounters = info.data.counters;

                GameData.todayGameCount = info.data.todayTimes;

                info.data.aiStockList && (GameData.AIStockList = info.data.aiStockList);
                info.data.stockList && (GameData.selfStockList = info.data.stockList);
                info.data.cgdsStockList && (GameData.cgdsStockList = info.data.cgdsStockList);
                info.data.tasks && (GameData.TaskStudy = info.data.tasks.study || []);
                info.data.tasks && (GameData.TaskDaily = info.data.tasks.daily || [])

                GameData.gameData = info.data;

                if (cc.director.getScene().name == 'Login') {

                    // if (!GameData.headImg) {
                    //     ComUtils.onLoadHead(info.data.icon, (texture) => {
                    //         GameData.imgs[info.data.icon.icon + ''] = new cc.SpriteFrame(texture);
                    //         GameData.headImg = GameData.imgs[info.data.icon.icon + ''];
                    //     })
                    // }

                    cc.director.loadScene('hall');
                }

                //心跳
                if (!this.heartbeat) {
                    this.heartbeat = setInterval(() => {
                        this.send(pb.MessageId.Sync_C2S_GameHeart, null, null);
                    }, 5000);
                }

                //上个没有发送的消息
                if (this._preData) {
                    this.send(this._preData.actionCode, this._preData.proto, this._preData.callback);
                    this._preData = null;
                }
            }
        })

    }

    send(actionCode, proto, callback) {

        if (this.ws && this.ws.readyState == WebSocket.OPEN) {

            let le = proto ? proto.length : 0;

            let message = MessageHead.create({
                messageId: actionCode,
                messageLen: le + 10,
            })

            this.queue[++actionCode] = callback;

            let buff = MessageHead.encode(message).finish();

            buff && (this.ws.send(buff.buffer.slice(buff.byteOffset, buff.byteLength + buff.byteOffset)));

            proto && (this.ws.send(proto.buffer.slice(proto.byteOffset, proto.byteLength + proto.byteOffset)))
        }
        else {
            console.log("send error. readyState ");
            this._preData = {
                actionCode: actionCode,
                proto: proto,
                callback: callback,
            }
        }

    }

    onerror() {
        this.onShowTips();
    }

    onclose() {
        console.log('连接断开');

        this.heartbeat && (clearInterval(this.heartbeat))
        this.heartbeat = null;

        this.reconnectBeat && (clearInterval(this.reconnectBeat))
        this.reconnectBeat = null;

        this.ws = null;

        if (!this.flag) {
            this.reconnect();
        }
    }

    reconnect() {

        if (!this.reconnectBeat) {
            this.reconnectBeat = setInterval(() => {
                console.log('断线连接中...');

                this.init();

                if (this.reconnectCount >= 2) {
                    this.onShowTips();
                }

                this.reconnectCount++;
            }, 3000);
        }
    }

    onShowTips() {
        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '网络连接错误，请检查网络是否正常连接。');
    }

}
