import BaseSDK from "./BaseSDK";
import LLWLog from "../utils/LlwLog";
import HttpUtil from "../net/HttpUtil";
import LLWConfig from "../config/LLWConfig";

var URL_GETUSERINFO = "https:www.i66wan.com/qtt/getUserInfo";
var info = { platform: "", ticket: "" };
var httpUtil = new HttpUtil();
var videoOptions = {
    gametype: 1,
    rewardtype: 1,
    data: {
        title: "刷新道具",
        url: "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png"
    }
};
var HDADOptions = {
    gametype: 1,
    rewardtype: 1,
    data: {
        title: "刷新道具",
        url: "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png"
    },
    callback: function (res) {
        if (res == 1) {
            if (QTTSDK.getInstance().HDADcallback) QTTMgr.instance().HDADcallback();
        } else {
            if (QTTSDK.getInstance().HDADfailcallback) QTTMgr.instance().HDADfailcallback();
        }
    }
};
var HDRewardOptions = {
    rewardtype: 1,
};
export default class QTTSDK extends BaseSDK{
    static getInstance() {
        if (!this._instance) {
            this._instance = new QTTSDK();
        }
        return this._instance;
    }

    getUrlParam() {
        var q = document.location.search || document.location.hash;
        if (q) {
            var pairs = q.substring(1).split("&");
            var obj = {};
            for (var i = 0; i < pairs.length; i++) {
                obj[pairs[i].split("=")[0]] = pairs[i].split("=")[1];
            }
            LLWLog.log("AMumu QTTmgr obj", obj);
            if (obj["ticket"] != null) {
                LLWLog.log("ricardo debug true ticket", obj["ticket"]);
                info.ticket = obj["ticket"];
            }

            if (obj["platform"] != null) {
                LLWLog.log("ricardo debug true platform", obj["platform"]);
                info.platform = obj["platform"];
            }
        }

    }

    login(callback){
        this.getDebugStat();
        var url = URL_GETUSERINFO + "?gameId=" + LLWConfig.GAMEID + "&platform="
            + info.platform + "&ticket=" + info.ticket
            + "&channelId="+AeroGameConfig.CHANNEL_ID;
            LLWLog.log("Amumu TTmgr getOpenId url ->" + url);

        httpUtil.httpUtilGet(url, function (res) {
            var data = new Object();
            data = JSON.parse(res);
            LLWLog.log("Amumu data print", data);
            const openid = data.data.open_id;
            LLWLog.log("Amumu openid " + openid);

            if (openid) {
                NetworkManager.instance().loginWeb(openid, data.data.nickname, data.data.avatar, callback);
            } else {
                if (callback) callback(-1);
            }
        }, null, null);
    }

    showBanner(){
        window.qttGame.showBanner();
    }

    hideBanner(){
        window.qttGame.hideBanner();
    }

    showVideo(callback, options = videoOptions) {
        LLWLog.log("Amumu QTTMgr showVideo");

        let self = this;
        window.qttGame.showVideo((res) => {
            if (res == 1) {
                if (callback) callback();
            } else {
                self.showHDAD(callback);
            }
        }, options);
    }

    /**
     * @desc 显示互动广告
     * @param options 
     */
    showHDAD(callback, failCallback = null, options = this.HDADOptions) {
        LLWLog.log("Amumu QTTMgr showHDAD");

        this.HDADcallback = callback;
        this.HDADfailcallback = failCallback;
        window.qttGame.showHDAD(options);
    }

    /**
     * @desc 显示直弹互动广告
     * @param options 
     */
    showHDReward(options = HDRewardOptions) {
        LLWLog.log("Amumu QTTMgr showHDReward");

        window.qttGame.showHDReward(options);
    }
}