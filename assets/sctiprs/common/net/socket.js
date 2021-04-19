import GameCfg from '../../game/GameCfg';
import { pb } from '../../../protos/proto';
let MessageHead = pb.MessageHead;

Socket.prototype = {
    connected(event) {
        let self = this;
        console.log('connected');
        self.heartbeat && (clearInterval(self.heartbeat))
        self.heartbeat = null;
        socket.send(4001, PB.onCmdGameLoginConvertToBuff(), (info) => {

            console.log(JSON.stringify(info));
            if (info && info.data) {
                gameData.userID = info.data.uid;
                gameData.userName = info.data.nickname;
                // if (!cc.ext.gameData.headimgurl) {
                //     cc.ext.gameData.headimgurl = info.data.icon;
                // }
                // cc.ext.gameData.gold = info.data.properties[0];
                // cc.ext.gameData.exp = info.data.properties[1];
                // (cc.ext.gameData.level = info.da)ta.properties[2];
                // cc.ext.gameData.ShuangMang_Gold = info.data.properties[3];
                gameData.properties = info.data.properties;
                cc.ext.gameData.maxExp = levelInfoCfg[gameData.properties[2]].max_exp;

                if (cc.director.getScene().name == 'Login') {
                    cc.director.loadScene('hall');
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
    },

    reconnect() {
        let self = this;
        if (!this.heartbeat) {
            this.heartbeat = setInterval(() => {
                self.ws = new WebSocket(self.host);
                self.ws.binaryType = 'arraybuffer';
                self.ws.onmessage = self.message.bind(self);
                self.ws.onopen = self.connected.bind(self);
                self.ws.onerror = function (event) {
                    console.log('ws onerror');
                }
                self.ws.onclose = self.onclose.bind(self);
                console.log('reconnect');
            }, 3000);

        }

    }
}

function Socket(host) {
    this.sequence = 0;
    this.queue = {};
    //  if (!host) { host = 'ws://3000' }
    this.host = host;
    this.ws = new WebSocket(host);
    this.ws.binaryType = 'arraybuffer';
    //this.ws.responseType = "arraybuffer"
    this.ws.onmessage = this.message.bind(this);
    this.ws.onopen = this.connected.bind(this);
    this.ws.onerror = function (event) {
        console.log('ws onerror');
    }
    this.ws.onclose = this.onclose.bind(this);

    this.heartbeat = null;
    //  this.notification = new cc.EventTarget();
}

var socket = null;

module.exports = function (host) {
    if (!socket) {
        socket = new Socket(host);
    }
    return socket;
}