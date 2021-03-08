
//let WebSocket=WebSocket||window.WebSocket||window.MozWebSocket;

export default class WebSocketIOMgr{

    webSocket:any=null;

    MAX_RECONNECT_COUNT=5;

    reconnectCount=0;

    _url=null;

    _sio=null;

    constructor(){
      //  this.webSocket=WebSocket||window.WebSocket;
       // console.log(this.webSocket);
    }

    public setAddr(url){
        this._url=url;
    }

    public connect(connectSucc,connectFail,flag){
        if(connectSucc){
           // this.
        }

        if(!this._url){
            console.log('connect error,this._url=',this._url);
            return;
        }

        this._sio=new WebSocket(this._url);
        this._sio.binaryType='arrayBuffer';

        this._sio.onopen=function(event){
            
        }



    }


}