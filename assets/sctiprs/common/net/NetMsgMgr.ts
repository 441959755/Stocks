import GlobalEvent from "../../Utils/GlobalEvent";
import LoadUtils from "../../Utils/LoadUtils";

import WebSocketIOMgr from "./WebSocketIOMgr";

export default class NetMsgMgr {

    _protoBuild = {};

    sioMgr = null;

    _pb = 'protos/quote/pb';


    constructor() {

        let connectSucc = (flag) => {
            this.startHeartBeat();
            //TODO登入请求
            // this.onLoginMsgReq();

        }

        let connectFail = () => {
            this.closeHeartBeat();
        }
        this.sioMgr = new WebSocketIOMgr();
        let url = 'ws://192.168.100.198:888/ws';
        this.sioMgr.setAddr(url, this);
        this.sioMgr.connect(connectSucc, connectFail);
    }

    startHeartBeat() {
        console.log('连接成功');

    }

    closeHeartBeat() {
        console.log('连接失败');

    }

    onInitProto(fileName, packageName, callback?) {

        LoadUtils.loadRes(fileName, (protoString) => {

            let Builder = protoBuf.protoFromString(protoString);

            let protoBuild = Builder.build(packageName);

            this._protoBuild[fileName + '/' + packageName] = protoBuild;
            callback && (callback())
        })
    }

    onReleaseProto() {
        this._protoBuild && (this._protoBuild = null)
    }

    dispatchNetMsg(data) {
        if (data instanceof ArrayBuffer) {
            let dv = new DataView(data);

            let offset = 0;

            let length = dv.getInt32(offset);
            offset += 6;
            let cmdID = dv.getInt32(offset);
            offset += 6;

            let protoBUffer = data.slice(offset);

            console.log(protoBUffer);
        }

    }

    sendMessage(data) {
        console.log(data);
        this.sioMgr.send(data);

    }

}