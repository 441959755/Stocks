
//let WebSocket=WebSocket||window.WebSocket||window.MozWebSocket;

export default class WebSocketIOMgr{

    MAX_RECONNECT_COUNT=5;

    _reconnectCount=0;

    _url=null;

    _sio=null;

    _preData=null;

    _deleagte=null;

    constructor(){
      //  this.webSocket=WebSocket||window.WebSocket;
       // console.log(this.webSocket);
    }

    public setAddr(url,de){
        this._url=url;
        this._deleagte=de;
    }

    public connect(connectSucc,connectFail,flag?){
        if(connectSucc){
           console.log('connect connectSucc');
        }

        if(!this._url){
            console.log('connect error,this._url=',this._url);
            return;
        }

        this._sio=new WebSocket(this._url);
        this._sio.binaryType = "arraybuffer";

        this._sio.onopen=function(event){
            console.log('WebSocket onopen');
            this._reconnectCount=0;
            connectSucc&&(connectSucc())

        }

       this._sio.onmessage=function(event){
           this.recv(event.data);
       }

       this._sio.onerror=function(event){
           console.log('WebSocket onerror');
           connectFail&&(connectFail());
       }

       this._sio.onclose=function(event){
          console.log("WebSocket instance closed.");
          connectFail&&(connectFail());
          this.reconnect();
       }
    }

    send(data) {
        if (this._sio) {
            if (this._sio.readyState == WebSocket.OPEN) {
                this._sio.send(data);
            }
            else if (this._sio.readyState == WebSocket.CONNECTING) {
                console.log("send readyState WebSocket.CONNECTING");
                // this.close();
            }
            else {
                console.log("send error. readyState = ", this._sio.readyState);
            }
        }
        else {
            console.log("send error. this._sio = ", this._sio);
            if (this._reconnectCount >= this.MAX_RECONNECT_COUNT) {
                this._reconnectCount = 0;
            }
            this.reconnect();
 
            //
            this._preData = data;
        }
    }
 
    //接收到的消息
    recv(data) {
        this._deleagte.dispatchNetMsg(data);
    }
 
    close() {
        if (this._sio) {
            console.log("==================== customer close");
            this._sio.close();
            this._sio = null;
            this._reconnectCount = this.MAX_RECONNECT_COUNT;
        }
    }
 
    // 消息发送
    sendMsg(event) {
        // this.send(event.detail); 2.0.5 error
        this.send(event);
    }
 
    // 断线重连
    reconnect() {
        // this._msgMgr.dispatchModuleEvent(eventConf.GlobalEvent.RESTART_GAME_DIALOG);
        if (this._reconnectCount < this.MAX_RECONNECT_COUNT) {
            console.log("============== reconnect");
            this._reconnectCount += 1;
            this.connect(null, null, true);
        }
        else {
            console.log("reconnect beyond Max Count.");
        }
        
    }
 
    // 断线重连后发送上次网络错误后缓存的消息内容，在登录成功后调用
    reconnectSend() {
        if (this._preData) {
            console.log("reconnectSend succ");
            
            this.send(this._preData);
            this._preData = null;
        }
        else {
            console.log("reconnectSend this._preData is null.");
        }
    }
 
    onGetNetWorkReadyState() {
        if (this._sio) {
            if (this._sio.readyState == WebSocket.OPEN) {
                console.log("================= WebSocket.OPEN");
            }
            else if (this._sio.readyState == WebSocket.CONNECTING) {
                console.log("================= WebSocket.CONNECTING");
            }
            else if (this._sio.readyState == WebSocket.CLOSING) {
                console.log("================= WebSocket.CLOSING");
            }
            else if (this._sio.readyState == WebSocket.CLOSED) {
                console.log("================= WebSocket.CLOSED");
            }
            else {
                console.log("================= WebSocket.ERROR");
            }
        }
 
        if (this._sio && (this._sio.readyState == WebSocket.OPEN || this._sio.readyState == WebSocket.CONNECTING)) {
            return true;
        }
        else {
            return false;
        }
    }
 
    onIsNetWorkOpen() {
        if (this._sio) {
            if (this._sio.readyState == WebSocket.OPEN) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}