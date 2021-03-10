import BaseSDK from "./BaseSDK";
import NetWorkMgr from "../net/NetworkMgr";
import Utils from "../utils/LLWUtils";

export default class H54399SDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new H54399SDK();
        }
        return this._instance;
    }

    init() {
    }

    login(callback) {
        let self = this;
        // window.h5api.login(function (data) {
        //     /* data = {
        //         uId: 1234567, // 用户编号
        //         userName: '昵称', // 用户昵称
        //     } */
        //     NetWorkMgr.getInstance().loginWeb(data.uId, data.userName, "", callback);
        //     self.canPlayAd();
        // })
        let netWorkMgr = new NetWorkMgr();
        let utils = new Utils();
        let uuid = utils.getUUID();
        netWorkMgr.loginWeb(uuid, "", "", callback);
    }

    canPlayAd() {
        var self = this;
        if (window.h5api != undefined) {
            console.log(" wlPlayAD(success,error){");
            window.h5api.canPlayAd(function (data) {
                self.remain = data.remain;
                self.canPlay = data.canPlayAd;
                console.log("是否可播放广告", data.canPlayAd, "剩余次数", data.remain);
            })
        } 
        return self.canPlay;
    }

    showVideo(id, callback, pos) {
        if (!this.canPlayAd()) {
            callback(0);
            return;
        }
        let self = this;
        window.h5api.playAd(function (obj) {
            console.log('代码:' + obj.code + ',消息:' + obj.message)
            if (obj.code === 10000) {
                console.log('开始播放')
            } else if (obj.code === 10001) {
                //播放结束
                if (callback) {
                    callback(1);
                }
            } else {
                //广告异常
                if (callback) {
                    callback(-1);
                }
            }
            self.canPlayAd();
        })
    }

}