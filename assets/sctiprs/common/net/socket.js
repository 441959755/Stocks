//import GameCfg from '../../game/GameCfg';
import { pb } from '../../../protos/proto';
import GameData from '../../GameData';
import GameCfgText from '../../GameText';
let MessageHead = pb.MessageHead;

Socket.prototype = {
    connected(event) {
        let self = this;
        console.log('connected');
        self.reconnectBeat && (clearInterval(self.reconnectBeat))
        self.reconnectBeat = null;
        socket.send(pb.MessageId.Req_Game_Login, PB.onCmdGameLoginConvertToBuff(), (info) => {
            console.log(JSON.stringify(info));

            if (info && info.data) {
                GameData.userID = info.data.uid;
                GameData.userName = info.data.nickname;
                // if (!cc.ext.gameData.headimgurl) {
                //     cc.ext.gameData.headimgurl = info.data.icon;
                // }
                // cc.ext.gameData.gold = info.data.properties[0];
                // cc.ext.gameData.exp = info.data.properties[1];
                // (cc.ext.gameData.level = info.da)ta.properties[2];
                // cc.ext.gameData.ShuangMang_Gold = info.data.properties[3];
                GameData.properties = info.data.properties;
                GameData.maxExp = GameCfgText.levelInfoCfg[GameData.properties[2]].max_exp;

                if (cc.director.getScene().name == 'Login') {
                    cc.director.loadScene('hall');
                }

                if (!this.heartbeat) {
                    this.heartbeat = setInterval(() => {
                        socket.send(pb.MessageId.Sync_C2S_GameHeart, null, null);
                    }, 5000);
                }

            }
        });
    },

    message(event) {
        let decode = new Uint8Array(event.data);
        let offect = 10, handleBuf, badBuf;
        if (decode.length >= offect) {
            handleBuf = decode.slice(0, 10);
            badBuf = decode.slice(10);
        }

        let decoded = MessageHead.decode(new Uint8Array(handleBuf));

        console.log(decoded);

        let info = PB.selectBlackData(decoded.messageId, badBuf);

        var callback = this.queue[decoded.messageId];

        delete this.queue[decoded.messageId];

        // try {
        if (callback) {
            callback(info);
        }
        //   this.notification.emit(pbMessage.actionCode.toString(), pbMessage.data);
        // } catch (e) {
        //     cc.log(e);
        // }
    },

    // on(actionCode, cb) {
    //     this.notification.on(actionCode.toString(), (event) => {
    //         if (cb) {
    //             cb(event.detail);
    //         }
    //     })
    // },

    send(actionCode, proto, callback) {
        if (this.ws.readyState == WebSocket.OPEN) {

            let le = proto ? proto.length : 0;

            let message = MessageHead.create({
                messageId: actionCode,
                messageLen: le + 10,
            })
            this.queue[++actionCode] = callback;
            // message.buff;
            let buff = MessageHead.encode(message).finish();

            // let Uint8ArrayToString = function (fileData) {
            //     var dataString = "";
            //     for (var i = 0; i < fileData.length; i++) {
            //         dataString += String.fromCharCode(fileData[i]);
            //     }
            //     return dataString
            // }
            // let arrBuffer = new ArrayBuffer(10);
            // let dataView = new DataView(arrBuffer);
            // for (let i = 0; i < buff.byteLength; i++) {
            //     dataView.setInt8(i, buff[i]);
            // }
            //发送包头

            buff && (this.ws.send(buff.buffer.slice(buff.byteOffset, buff.byteLength + buff.byteOffset)));

            //发送包体
            proto && (this.ws.send(proto.buffer.slice(proto.byteOffset, proto.byteLength + proto.byteOffset)));

        } else {
            console.log("send error. readyState = ", this.ws.readyState);
            // setTimeout(() => {
            //     this.send(actionCode, proto, callback);
            // }, 1000);
            // callback(GameCfg.datas);
        }
    },

    onclose() {
        console.log('连接断开');
        this.reconnect();
        this.heartbeat && (clearInterval(this.heartbeat))
        this.heartbeat = null;
    },

    reconnect() {
        let self = this;
        if (!this.reconnectBeat) {
            this.reconnectBeat = setInterval(() => {
                console.log('断线连接中...');
                self.initSocket();
            }, 5000);
        }

    },


    initSocket() {
        //  if (!host) { host = 'ws://3000' }
        this.ws = new WebSocket(this.host);
        this.ws.binaryType = 'arraybuffer';
        //this.ws.responseType = "arraybuffer"
        this.ws.onmessage = this.message.bind(this);
        this.ws.onopen = this.connected.bind(this);
        this.ws.onerror = function (event) {
            console.log('ws onerror');
        }
        this.ws.onclose = this.onclose.bind(this);

        this.reconnectBeat = null;

        this.heartbeat = null;
    }
}

function Socket(host) {
    this.sequence = 0;
    this.queue = {};
    this.host = host;
    this.initSocket();
    //  this.notification = new cc.EventTarget();
}

var socket = null;

module.exports = function (host) {
    if (!socket) {
        socket = new Socket(host);
    }
    return socket;
}