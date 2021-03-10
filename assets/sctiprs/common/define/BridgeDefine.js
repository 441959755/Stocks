//通知客户端
var DOGAMEREADY = 1;                   //游戏启动成功
var DOSHOWVIDEO = 2;                   //显示激励视频广告
var DOSHOWINTER = 3;                   //显示插屏广告
var DOSHOWFULLSCREEN = 4;              //显示全屏广告
var DOSHOWBANNER = 5;                  //显示横幅广告
var DOHIDEBANNER = 6;                  //隐藏横幅广告
var DOPAY = 7;                       //开始支付
var DOGETIDFA = 11;                      //请求获取IDFA信息
//接收客户端消息
var ONVIDEORET = 1;
var ONFULLSCREENRET = 2;
var ONPAYRET = 3;
var ONNETCHANGE = 4;
var ONDEVICEINFO = 5;
var ONIDFAINFO = 11;//接收IDFA信息
export default class BridgeDefine {
    //通知客户端
    static get DOGAMEREADY() { return DOGAMEREADY; }
    static get DOSHOWVIDEO() { return DOSHOWVIDEO; }
    static get DOSHOWINTER() { return DOSHOWINTER; }
    static get DOSHOWFULLSCREEN() { return DOSHOWFULLSCREEN; }
    static get DOSHOWBANNER() { return DOSHOWBANNER; }
    static get DOHIDEBANNER() { return DOHIDEBANNER; }
    static get DOPAY() { return DOPAY; }
    static get DOGETIDFA() { return DOGETIDFA; }


    //接收客户端消息
    static get ONVIDEORET() { return ONVIDEORET; }
    static get ONFULLSCREENRET() { return ONFULLSCREENRET; }
    static get ONPAYRET() { return ONPAYRET; }
    static get ONNETCHANGE() { return ONNETCHANGE; }
    static get ONDEVICEINFO() { return ONDEVICEINFO; }
    static get ONIDFAINFO() { return ONIDFAINFO; }
}