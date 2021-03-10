import BaseSDK from "./BaseSDK";
import NetWorkMgr from "../net/NetWorkMgr"
import Utils from "../utils/LLWUtils"

export default class WeiliSDK extends BaseSDK{
    static getInstance() {
        if (!this._instance) {
            this._instance = new WeiliSDK();
        }
        return this._instance;
    }

    init(){
        this.initAd();
    }
    login(callback){
        let utils = new Utils();
        let uuid = utils.getUUID();
        window.wlGameBridge.ready = function (userInfo) {
            /* config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。*/
            console.log(userInfo);
            if (!userInfo) {
                // NetWorkMgr.getInstance().loginWeb(uuid, "", "", callback);
    
            }else {
                if(!userInfo.openid){userInfo.openid=uuid}
                // NetWorkMgr.getInstance().loginWeb(userInfo.openid, userInfo.nickName, userInfo.avatar, callback);
            }
        };
        let time = new Date().getTime();
        window.wlGameBridge.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            app_key: '04bc771e88034737baf3956dc18613ff', // 必填，app唯一标识
            app_secret: '21325680839818aa', // 必填，密钥
            timestamp: time, // 必填，时间戳
        });
        window.wlGameBridge.error = function (res) {
            // config信息验证失败会执行error函数，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看。
            console.log("weili error",error);
        };
        NetWorkMgr.getInstance().loginWeb(uuid, "", "", callback);
    }

    initAd(){
        // 监听广告播放结果
        window.addEventListener('adPlaySuccess', (e) => {
            if(e){
                // 广告成功播放，游戏内逻辑自选，可以解锁关卡，奖励生命，获得道具等等。
                if(this.callback)this.callback(1);
            }
        });
        window.addEventListener('adPlayError', (e) => {
            if(e){
                // 用户没有正常看完激励视频广告，游戏内逻辑自选
                if(this.callback)this.callback(-1);
            }
        });
    }

    showVideo(id, callback, pos){
        // 播放激励视频广告
        this.callback = callback;
        wlGameBridge.playAd({
            customParams: '' // 游戏自主选择上报广告播放的参数，用于后台统计时候的筛选和分析，bridge不做处理，直接上报。
        });
    }
}