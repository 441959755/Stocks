import GlobalEvent from "../../Utils/GlobalEvent";
import LoadUtils from "../../Utils/LoadUtils";
let protoBuf =require('../../3rdparty/protobuf');
import WebSocketIOMgr from "./WebSocketIOMgr";

export  default class  NetMsgMgr{

    _protoBuild={};

    sioMgr=null;

    constructor() {
        let connectSucc=(flag)=>{
            this.startHeartBeat();
            //TODO登入请求
           // this.onLoginMsgReq();
        }

        let connectFail=()=>{
            this.closeHeartBeat();
        }
        this.sioMgr=new WebSocketIOMgr();
        this.sioMgr.setAddr('' ,this);
        this.sioMgr.connect(connectSucc,connectFail);


    }

    startHeartBeat(){

    }

    closeHeartBeat(){

    }

    onInitProto(fileName,packageName,callback){

        LoadUtils.loadRes(fileName,(protoString)=>{
            let Builder=protoBuf.protoFromString(protoString);

            let protoBuild=Builder.build(packageName);

            this._protoBuild[fileName+'/'+packageName]=protoBuild;
            callback&&(callback())
        })

    }

    onReleaseProto(){
        this._protoBuild&&(this._protoBuild=null)
    }

    dispatchNetMsg(data){

    }

    sendMessage(data){

    }



}