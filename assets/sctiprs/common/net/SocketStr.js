import LLWLog from "../utils/LLWLog"
export default class SocketStr {
    connect(url, callback) {
        this.ws = new WebSocket("wss://xiaoyouxi.game.i66wan.com/feixingqi_ios");
        this.ws.onopen = function () {
            LLWLog.log("ricardo onopen");
        };
        this.ws.onmessage = function (message) {
            LLWLog.log("ricardo onmessage ", message.data);
        };
        this.ws.onclose = function () {
            LLWLog.log("ricardo onclose");
        };
        this.ws.onerror = function (error) {
            LLWLog.log("ricardo onerror", error);
        };
    }

    sendMessage(message) {
        let jsonstr = JSON.stringify(message);
        this.ws.send(jsonstr);
    }
    receiveMessage(message) {
        LLWLog.log("ricardo receivemessage ", message);
    }
}