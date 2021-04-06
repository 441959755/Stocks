
export default class SockectIoMgr {

    sioClient = null;

    tag = null;

    _reconnectCount = 0;

    public connectSocket() {
        if (typeof io == 'undefined') {
            console.log('you should imort the socket.io.js as a plugin!');
        }

        // let url = 'http://localhost:80';
          let url='wss://192.168.100.198:888'

        this.sioClient = io.connect(url, { "force new connection": true })

        this.tag = this.sioClient.tag = 'Test Client';

        this.sioClient.on("connect", () => {
            let msg = this.sioClient.tag + 'Connected!';

            console.log(msg);

          //  this.sioClient.send('Hello Scoket.IO!');
        })

        this.sioClient.on('message', this.message.bind(this));

        this.sioClient.on('echotest', (data) => {
            console.log('echotest on callback fired!');

            let msg = this.tag + 'says echotest with data:' + data;

            console.log('msg:' + msg);
        });


        this.sioClient.on('testevent', this.testevent.bind(this));

        this.sioClient.on('disconnect', this.disconnection.bind(this));

        this.sioClient.on('reconnecting', this.reconnecting.bind(this));

    }

    message(data) {
        let msg = this.tag + 'received message:' + data;

        console.log(msg);
    }

    disconnection() {

        console.log(this.tag + 'disconnected!');
        // this._reconnectCount++;

        // console.log('is reconnecting:' + this._reconnectCount);

    }

    reconnecting() {
        this._reconnectCount++;
        console.log(this.tag + 'isreconnecting:' + this._reconnectCount);
        this.sioClient.close();
    }

    testevent(data) {

        let msg = this.tag + " says 'testevent' with data: " + data;
        console.log('testevent:' + msg);

    }


}





// export  default class SockectIoMgr{

//         ip:'ws://192.168.100.198:888';

//         sio:null;

//         isPinging:false;

//         fnDisconnect:null;

//         handlers:{};

//         addHandler(event,fn){
//             if(this.handlers[event]){
//                 console.log("event:" + event + "' handler has been registered.");
//                 return;
//             }



//             var handler = function(data){
//                 //console.log(event + "(" + typeof(data) + "):" + (data? data.toString():"null"));

//                 if(event != "disconnect" && typeof(data) == "string"){
//                     data = JSON.parse(data);
//                 }
//                 fn(data);

//             };



//             this.handlers[event] = handler;

//             if(this.sio){
//                 console.log("register:function " + event);
//                 this.sio.on(event,handler);
//             }

//         };



//         clearAllHandler() {
//             this.handlers = {};
//         }



//         connect(fnConnect,fnError) {

//             var opts = {
//                 'reconnection':false,

//                 'force new connection': true,

//                 'transports':['websocket', 'polling']
//             }

//             this.sio = io.connect(this.ip,opts);

//             this.sio.on('reconnect',function(){
//                 console.log('reconnection');

//             });

//             this.sio.on('connect',function(data){
//                 self.sio.connected = true;

//                 fnConnect(data);

//             });



//             this.sio.on('disconnect',function(data){
//                 console.log("disconnect");

//                 self.sio.connected = false;

//                 self.close();

//             });



//             this.sio.on('connect_failed',function (){
//                 console.log('connect_failed');

//             });



//             for(var key in this.handlers){
//                 var value = this.handlers[key];

//                 if(typeof(value) == "function"){
//                     if(key == 'disconnect'){
//                         this.fnDisconnect = value;

//                     }

//                     else{
//                         console.log("register:function " + key);

//                         this.sio.on(key,value);

//                     }

//                 }

//             }



//             this.startHearbeat();

//         }



//         startHearbeat(){
//             this.sio.on('game_pong',function(){
//                 // console.log('game_pong');

//                 self.lastRecieveTime = Date.now();

//             });

//             this.lastRecieveTime = Date.now();

//             var self = this;

//             console.log(1);

//             if(!self.isPinging){
//                 console.log(1);

//                 self.isPinging = true;

//                 self.sh = setInterval(function(){
//                     if(self.sio){
//                         if(Date.now() - self.lastRecieveTime > 10000){
//                             console.log("超时需要断开网络1");

//                             self.close();

//                             self.isPinging = false;

//                             clearInterval(self.sh);

//                         }

//                         else{
//                             self.ping();

//                         }

//                     }

//                 },5000);

//             }

//         };

//         send(event,data){
//             if (this.sio == null) {
//                 return;

//             }

//             if(this.sio.connected){
//                 if(data != null && (typeof(data) == "object")){
//                     data = JSON.stringify(data);

//                     //console.log(data);

//                 }

//                 this.sio.emit(event,data);

//             }

//         }



//         ping(){
//             this.send('game_ping');

//         }



//         close(){
//             console.log('close');

//             if(this.sio && this.sio.connected){
//                 this.sio.connected = false;

//                 this.sio.disconnect();

//             }

//             console.log("测试 网络断开 close 2");

//             this.sio = null;

//             if(this.fnDisconnect){
//                 console.log("网络调用毁掉 close 3");

//                 this.fnDisconnect();

//                 this.fnDisconnect = null;

//             }else{
//                 /**怎么了*/

//             }



//     }

// }