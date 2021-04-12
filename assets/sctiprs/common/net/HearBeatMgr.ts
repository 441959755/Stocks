
import NetMsgMgr from "./NetMsgMgr";

export default class HearBeatMgr extends NetMsgMgr {

    _heartBeatCount = 0;

    _MAX_HEARTBEAT_COUNT = 3;

    _timer = null;

    constructor() {
        super();
    }

    onDestroy() {
        this.onReleaseProto();
        clearInterval(this._timer);
    }

    startHeartBeat() {
        this._timer = setInterval(() => {
            if (this._heartBeatCount < this._MAX_HEARTBEAT_COUNT) {
                this.sendHeartBeatMsg();
                this._heartBeatCount += 1;
            } else {
                clearInterval(this._timer);
                this.closeHeartBeat();
                this._heartBeatCount = 0;
            }

        }, 5000)
    }

    sendHeartBeatMsg() {
        let protoBuilf = this._protoBuild['TODO'];
        if (protoBuilf) {
            let info = new protoBuilf.EmptyBody();
            info.option = 0;
            let buffer = info.toArrayBuffer();

            this.sendMessage(buffer);
        }

    }
}