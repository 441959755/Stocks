import GlobalEvent from "../../Utils/GlobalEvent";
import LoadUtils from "../../Utils/LoadUtils";

let protoBuf = require('protobuf');

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
            console.log(protoBuf);
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

    sendTestMsgReq(data) {

        let protoBuild = this._protoBuild[this._pb];
        console.log(protoBuild);
        if (protoBuild) {
            let info = new protoBuild.CmdQuoteQuery();
            console.log(info);
            info.ktype = 10;

            let le = Math.random() * cc.ext.stocklist.length;
            let datas = cc.ext.stocklist[le].split('|');
            let code = data[0];

            let start=data[2], end;
            if (datas[3] == 0) {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let mo;
                mo = month < 10 ? '0' + month : month;
                let da;
                let day = date.getDate();
                da = day < 10 ? '0' + day : day;
                end = year + '' + mo + '' + da;
            }else{
                end=data[3];
            }
            let time=Math.random()*start+(end-start);
            info.code=code;
            info.from=start;
            info.total=300;
            info.to=end;
            info.kstyle=0;
            let buffer=info.toArrayBuffer();
            console.log(buffer);
             this.sendMessage(buffer);
        }
    }


}