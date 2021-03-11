import HttpUtil from "../net/HttpUtil"
import LLWConfig from "../config/LLWConfig"
import LLWLog from "../utils/LlwLog";
import SwitchConfig from "../config/SwitchConfig"
import LLWSDK from "../sdk/LLWSDK"

var httpUtil = new HttpUtil();

var BASE_URL_GAME = "https://www.i66wan.com/game";
var URL_LOGIN = BASE_URL_GAME + "/login";
var URL_CONFIG = BASE_URL_GAME + "/config";
var URL_SHAREID = BASE_URL_GAME + "/share/id";
var URL_SHARELOGIN = BASE_URL_GAME + "/share/logined";
var URL_VIDEO = BASE_URL_GAME + "/ad/click";
var URL_VIDEO_CLOSE = BASE_URL_GAME + "/ad/close";
var URL_REDIRECT = BASE_URL_GAME + "/redirect/click";
var URL_REDIRECT_LOGIN = BASE_URL_GAME + "/redirect/logined";
var URL_GAME_START = BASE_URL_GAME + "/start";
var URL_GAME_END = BASE_URL_GAME + "/end";
var URL_STEP_REPORT = BASE_URL_GAME + "/stepReport";
var URL_SCENE_ENTER = BASE_URL_GAME + "/scene/enter";
var URL_SCENE_LEAVE = BASE_URL_GAME + "/scene/leave";
var URL_CLICK_REPORT = BASE_URL_GAME + "/clickReport";
var URL_REPORT = BASE_URL_GAME + "/report";
var _userId = 0;
export default class NetWorkMgr {
    static getInstance() {
        if (!this._instance) {
            this._instance = new NetWorkMgr();
        }
        return this._instance;
    }
    get _userId(){
        return _userId;
    }
    append(url, key, value) {
        url = url + "&" + key + "=" + value;
        return url;
    }

    appendCommon(url) {
        url = url + "?gameId=" + LLWConfig.GAMEID;
        url = this.append(url, "channelId", LLWConfig.CHANNELID);
        url = this.append(url, "version", LLWConfig.VERSION);
        return url;
    }

    /**
     * 登录web
     * @param {*} openId 
     * @param {*} name 
     * @param {*} avator 
     * @param {*} callback 
     */
    loginWeb(openId, name = "", avator = "", callback = null) {
         var url = URL_LOGIN;
        // url = this.appendCommon(url);
        // url = this.append(url, "platType", LLWConfig.PLATTYPE);
        // url = this.append(url, "platId", openId);
        // url = this.append(url, "nickName", name);
        // url = this.append(url, "avator", avator);
        // let llwSDK = LLWSDK.getSDK();
        // if(llwSDK.getIDFA() != null){
        //     url = this.append(url, "idfa", llwSDK.getIDFA());
        // }

        var self = this;

         url= "https://stock.chaogugame.com/weixingame/api.php?api=Reg3&openid="+openId+"&name="+name;
        LLWLog.log("ricardo login " + url);
        httpUtil.httpUtilGet(url, function (data) {
            var jsonObj = new Object();
            jsonObj = JSON.parse(data);
           // _userId = jsonObj.userId;
            callback(jsonObj);
            LLWLog.log("ricardo logindata", jsonObj);
        }, function (err) {
            LLWLog.log("ricardo loginWeb err " + err);
        }, function (process) { });
    }

    /**
     * 获取股票配置信息
     * @param callback 
     */
    getGuPiaoData(call){
        let url;
        url="https://stock.chaogugame.com/weixingame/data/stockdata.txt";

        httpUtil.httpUtilGet(url,(data)=>{
            call&&call(data);
        })
    }


   //获取双盲股票信息
    getSMGuPiaoData(call){
        let url;
        let nums=255;
        url="https://stock.chaogugame.com/fenshipk/wxgetgeguk.php?id=&type=k&num="+nums+"&start=&end="
        httpUtil.httpUtilGet(url,(data)=>{
            call&&call(data);
        })
    }

    // getConfig(callback) {
    //     var url = URL_CONFIG;
    //     url = this.appendCommon(url);
    //
    //     var self = this;
    //     LLWLog.log("ricardo getConfig url " + url);
    //     httpUtil.httpUtilGet(url, function (data) {
    //         LLWLog.log("ricardo getConfig data " + data);
    //         var res = new Object();
    //         res = JSON.parse(data);
    //         self._config = res.data;
    //         let config = res.data.config;
    //         SwitchConfig.CONFIG = config;
    //         SwitchConfig.AUDIT = config.audit;
    //         SwitchConfig.LIKESWITCH = config.switch.like;
    //         SwitchConfig.DEFAULTSWITCH = config.switch.default;
    //         SwitchConfig.MORESWITCH = config.switch.more;
    //         SwitchConfig.LIKE = config.like;
    //         SwitchConfig.MORE = config.more;
    //         SwitchConfig.DEFAULT = config.default;
    //         SwitchConfig.SHARETEMP = config.shareTemp;
    //         SwitchConfig.INTERCOUNT = config.interactionCount;
    //         SwitchConfig.INTERSWITCH = config.switch.inter;
    //         SwitchConfig.REVIVESWITCH = config.switch.revive;
    //         SwitchConfig.AGAINSWITCH = config.switch.again;
    //         if(callback){
    //             callback(res);
    //         }
    //     }, function (err) {
    //         LLWLog.log("ricardo getConfig err " + err);
    //     }, function (process) { });
    // }

    /**
     * 获取分享ID,每次分享前需调用此接口获得分享ID用于统计分享数据
     * @param position 
     * @param callback 
     */
    shareId(position, callback) {
        var url = URL_SHAREID;
        url = this.appendCommon(url);
        url = this.append(url, "position", position);
        url = this.append(url, "userId", this._userId);

        LLWLog.log("ricardo shareId url " + url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo shareId data " + data);
            var res = new Object();
            res = JSON.parse(data);
            callback(res);
        }, function (err) {
            LLWLog.log("ricardo shareId err " + err);
        }, function (process) { });
    }

    /**
     * 从分享处登录
     * @param id 
     * @param position 
     */
    shareLogin(id, position) {
        var url = URL_SHARELOGIN;
        url = this.appendCommon(url);
        url = this.append(url, "position", position);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "id", id);

        LLWLog.log("ricardo shareLogin url " + url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo shareLogin data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo shareLogin err " + err);
        }, function (process) { });
    }

    /**
     * 点击获取视频广告
     * @param adunit 
     * @param status 广告调起状态 -1调起失败，1单次尝试调起成功，2多次尝试调起成功
     */
    adClick(adunit, status) {
        var url = URL_VIDEO;
        url = this.appendCommon(url);
        url = this.append(url, "userId", _userId);
        url = this.append(url, "adunit", adunit);
        url = this.append(url, "status", status);

        LLWLog.log("ricardo adClick url " + url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo adClick data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo adClick err " + err);
        }, function (process) { });
    }

    /**
     * 广告关闭上报
     * @param adunit 
     * @param finished 广告是否正常观看完成。-1否，1是
     * @param duration 
     */
    adClose(adunit, finished, duration) {
        var url = URL_VIDEO_CLOSE;
        url = this.appendCommon(url);
        url = this.append(url, "adunit", adunit);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "finished", finished);
        url = this.append(url, "duration", duration);

        LLWLog.log("ricardo adClick url " + url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo adClick data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo adClick err " + err);
        }, function (process) { });
    }

    /**
     * 点击跳转小游戏
     * @param appId 
     * @param position 
     */
    redirectClick(appId, position) {
        var url = URL_REDIRECT;
        url = this.appendCommon(url);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "targetAppId", appId);
        url = this.append(url, "position", position);

        LLWLog.log("ricardo redirectClick url " + url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo redirectClick data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo redirectClick err " + err);
        }, function (process) { });
    }

    /**
     * 从其他小游戏跳转过来上报
     * @param srcGameid 
     * @param srcUserid 
     * @param srcChannelId 
     * @param srcVersion 
     * @param srcAppid 
     * @param srcPosition 
     */
    redirectLogin(srcGameid, srcUserid, srcChannelId, srcVersion, srcAppid, srcPosition) {
        var url = URL_REDIRECT_LOGIN;
        url = this.appendCommon(url);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "sourceGameId", srcGameid);
        url = this.append(url, "sourceUserId", srcUserid);
        url = this.append(url, "sourceChannelId", srcChannelId);
        url = this.append(url, "sourceVersion", srcVersion);
        url = this.append(url, "sourceAppId", srcAppid);
        url = this.append(url, "sourcePosition", srcPosition);

        LLWLog.log("ricardo redirectLogin url " + url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo redirectLogin data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo redirectLogin err " + err);
        }, function (process) { });
    }

    /**
     * 开始游戏上报
     */
    gameStart(sessionName) {
        var self = this;
        if (this._userId) {
            var url = URL_GAME_START;
            url = this.appendCommon(url);
            url = this.append(url, "userId", this._userId);
            url = this.append(url, "sessionName", sessionName);

            url = encodeURI(url);
            httpUtil.httpUtilGet(url, function (data) {
                var jsonObj = new Object();
                jsonObj = JSON.parse(data);
                self._battleId = jsonObj.data.battleId;
                self._startTs = Math.floor(new Date().getTime() / 1000);
            }, function (err) {
                LLWLog.log("ricardo loginWeb err " + err);
            }, function (process) { });
        }
    }

    /**
     * 结束游戏上报
     * @param {*} score 
     * @param {*} winlose 输赢结果（0输，1赢，2平）
     * @param {*} mode 对局模式。0其他，1无尽，2关卡
     * @param {*} level 关卡数，关卡模式必填
     * @param {*} sessionName 场次名
     */
    gameEnd(score, winlose, mode = 1, level = 0, sessionName = "") {
        var duration = Math.floor(new Date().getTime() / 1000) - this._startTs
        if (duration / 60 / 60 > 24 || duration < 0) {
            duration = 0
        }
        if (this._userId) {
            var url = URL_GAME_END;
            url = this.appendCommon(url);
            url = this.append(url, "userId", this._userId);
            url = this.append(url, "battleId", this._battleId);
            url = this.append(url, "duration", duration);
            url = this.append(url, "score", score);
            url = this.append(url, "winlose", winlose);
            url = this.append(url, "mode", mode);
            url = this.append(url, "level", level);
            url = this.append(url, "sessionName", sessionName);

            url = encodeURI(url);
            httpUtil.httpUtilGet(url, function (data) {
            }, function (err) {
                LLWLog.log("ricardo gameEnd err " + err);
            }, function (process) { });
        }
    }

    /**
     * 进入页面
     * @param sceneName 
     */
    sceneEnter(sceneName) {
        this._sceneTs = Math.floor(new Date().getTime() / 1000);
        if (this._userId) {
            var url = URL_SCENE_ENTER;
            url = this.appendCommon(url);
            url = this.append(url, "userId", this._userId);
            url = this.append(url, "sceneName", sceneName);

            httpUtil.httpUtilGet(url, function (data) {
            }, function (err) {
                LLWLog.log("ricardo sceneEnter err " + err);
            }, function (process) { });
        }
    }

    /**
     * 离开页面
     * @param sceneName 
     */
    sceneLeave(sceneName, dur = 0) {
        var duration = 0;
        if (dur == 0) {
            duration = Math.floor(new Date().getTime() / 1000) - this._sceneTs;
            if (duration / 60 / 60 > 24 || duration < 0) {
                duration = 0
            }
        } else {
            duration = dur;
        }
        if (this._userId) {
            var url = URL_SCENE_LEAVE;
            url = this.appendCommon(url);
            url = this.append(url, "userId", this._userId);
            url = this.append(url, "sceneName", sceneName);
            url = this.append(url, "duration", duration);

            httpUtil.httpUtilGet(url, function (data) {
            }, function (err) {
                LLWLog.log("ricardo sceneLeave err " + err);
            }, function (process) { });
        }
    }

    /**
     * 用户点击事件上报
     * @param event 
     */
    clickReport(event) {
        var timeStamp = Math.floor(new Date().getTime() / 1000);
        var url = URL_CLICK_REPORT;
        url = this.appendCommon(url);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "event", event);

        url = encodeURI(url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo clickReport data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo clickReport err " + err);
        }, function (process) { });
    }

    /**
     * 上报事件
     * @param event 
     */
    report(event) {
        var timeStamp = Math.floor(new Date().getTime() / 1000);

        var url = URL_REPORT;
        url = this.appendCommon(url);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "reportId", event);
        url = this.append(url, "data", Util.getUUID() + "|" + timeStamp);
        url = this.append(url, "event", event);

        LLWLog.log("ricardo report url " + url);
        url = encodeURI(url);
        httpUtil.httpUtilGet(url, function (data) {
            LLWLog.log("ricardo report data " + data);
            var res = new Object();
            res = JSON.parse(data);
        }, function (err) {
            LLWLog.log("ricardo report err " + err);
        }, function (process) { });
    }

    /**
     * 步骤上报,比如进入大厅，进入游戏
     * @param stepName 
     */
    stepReport(stepName) {
        var url = URL_STEP_REPORT;
        url = this.appendCommon(url);
        url = this.append(url, "userId", this._userId);
        url = this.append(url, "sessionId", "");
        url = this.append(url, "stepName", stepName);

        httpUtil.httpUtilGet(url, function (data) {
        }, function (err) {
            LLWLog.log("ricardo stepReport err " + err);
        }, function (process) { });
    }

}