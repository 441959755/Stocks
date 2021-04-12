import GameCfg from '../../game/GameCfg';
import pb from '../../../protos/proto';
let MessageHead = pb.pb.MessageHead;

Socket.prototype = {
    connected(event) {

    },

    message(event) {
        let decode = new Uint8Array(event.data);
        let offect = 10, handleBuf;
        if (decode.length >= offect) {
            handleBuf = decode.slice(0, 10);
            badBuf = decode.slice(10);
        }

        let decoded = MessageHead.decode(new Uint8Array(handleBuf));

        console.log(decoded);

        let info = PB.selectBlackData(decoded.messageId, badBuf);

        var callback = this.queue[decoded.messageId];

        delete this.queue[decoded.messageId];

        try {
            if (callback) {
                callback(info);
            }
            //   this.notification.emit(pbMessage.actionCode.toString(), pbMessage.data);
        } catch (e) {
            cc.log(e);
        }
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

            let message = MessageHead.create({
                messageId: actionCode,
                messageLen: proto.length + 10,
            })
            this.queue[++actionCode] = callback;
            // message.buff;
            let buff = MessageHead.encode(message).finish();
            //发送包头
            buff && (this.ws.send(buff));
            //发送包体
            proto && (this.ws.send(proto));
        } else {
            console.log("send error. readyState = ", this.ws.readyState);
            setTimeout(() => {
                this.send(actionCode, proto, callback);
            }, 1000);
            // callback(GameCfg.datas);
        }
    },

    onclose() {
        console.log('连接断开');
    }
}

function Socket(host) {
    this.sequence = 0;
    this.queue = {};
    //  if (!host) { host = 'ws://3000' }
    this.ws = new WebSocket(host);
    this.ws.binaryType = 'arraybuffer';
    this.ws.onmessage = this.message.bind(this);
    this.ws.onopen = function (event) {
        console.log('connected');
    }
    this.ws.onerror = function (event) {
        console.log('ws onerror');
    }
    this.ws.onclose = this.onclose.bind(this);
    //  this.notification = new cc.EventTarget();
}

var socket = null;

module.exports = function (host) {
    if (!socket) {
        socket = new Socket(host);
    }
    return socket;
}