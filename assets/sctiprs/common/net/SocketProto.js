// import '../proto/person'
// import LLWLog from "../utils/LLWLog"
// export default class SocketProto {

//     connect(url, callback) {
//         var self = this;
//         this.ws = new WebSocket("wss://xiaoyouxi.game.i66wan.com/slm/ws");
//         this.ws.binaryType = "arraybuffer";

//         this.ws.onmessage = function (message) {
//             LLWLog.log("ricardo onmessage ", message.data);
//             self.domsg(message);
//         };
//         this.ws.onclose = function () {
//             LLWLog.log("ricardo onclose");
//         };
//         this.ws.onerror = function (error) {
//             LLWLog.log("ricardo onerror", error);
//         };

//         this.ws.onopen = function () {
//             LLWLog.log("ricardo onopen");

//             var p = new proto.LoginReq();
//             p.setNickname("12345678");
//             p.setUserid(12345678);
//             p.setAvatar("avatar");
//             p.setGender(1);
//             self.send(1002, p);
//         };
//     }

//     send(proto, buf) {
//         var msgByte = buf.serializeBinary();
//         let buffer = new ArrayBuffer(msgByte.length + 16);
//         let dataview = new DataView(buffer);
//         dataview.setInt32(0, msgByte.length + 16);
//         dataview.setInt32(4, proto);
//         let offset = 16
//         let data = new Int8Array(msgByte)
//         for (let i = 0; i < data.length; i++) {
//             dataview.setInt8(offset++, data[i])
//         }
//         this.ws.send(dataview.buffer);
//     }

//     domsg(message) {
//         let dataview = new DataView(message);
//         let len = dataview.getInt32(0);
//         let proto = dataview.getInt32(4);
//         let offset = 0;
//         let buf = new Uint8Array(len - 16);
//         for (let i = 16; i < len; i++) {
//             buf[offset++] = dataview.getUint8(i);
//         }
//         var msg = proto.LoginRsp.deserializeBinary(buf);
//         var name = msg.getNickname();
//         var age = msg.getUserid();
//     }

// }