
//let WebSocket=WebSocket||window.WebSocket||window.MozWebSocket;

export default class WebSocket{

    webSocket:any=null;

    MAX_RECONNECT_COUNT=5;

    reconnectCount=0;

    _url=null;

    constructor(){
        this.webSocket=WebSocket||window.WebSocket;
        console.log(this.webSocket);
    }

    public setAddr(url){
        this._url=url;
    }

    public connect(connectSucc,connectFail,flag){
        if(connectSucc){
           // this.
        }

    }


}