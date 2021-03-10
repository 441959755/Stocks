
import NetworkMgr from "../net/NetworkMgr";
import LLWConfig from "../config/LLWConfig";
import BaseSDK from "./BaseSDK"
import LLWLog from "../utils/LLWLog"
export default class TTSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new TTSDK();
        }
        return this._instance;
    }

    init(){
        this.onShow();
        this.onHide();
        this.onNetStateChange();
    }

    getAuth() {
        if (!Browser.onMiniGame) {
            return true;
        } else {
            return this._authed;
        }
    }

    onEnterQuery() {
        if (Browser.window.tt && Browser.window.query) {
            LLWLog.log("ricardo query " + Browser.window.query);
            //进入房间
            if (Browser.window.query.type && (Browser.window.query.type == "5"))  {//微信广告
                var sourceGameId = Browser.window.query.gameId;
                var sourceUserId = Browser.window.query.userId;
                var sourceChannelId = Browser.window.query.channelId;
                var sourceVersion = Browser.window.query.version;
                var sourceAppId = Browser.window.query.appId;
                var sourcePosition = Browser.window.query.position;
                NetworkMgr.getInstance().RedirectLoginedGame(sourceGameId, sourceUserId,
                    sourceChannelId, sourceVersion, sourceAppId, sourcePosition);
            }
        }
        else {
            LLWLog.log("================ window.tt is null.");
        }
        if (Browser.window.tt && Browser.window.referrerInfo) {
            var referrerInfo = Browser.window.referrerInfo;
            var extraData = Browser.window.extraData;
            if (extraData) {
                var sourceGameId = extraData.gameId;
                var sourceUserId = extraData.userId;
                var sourceChannelId = extraData.channelId;
                var sourceVersion = extraData.version;
                var sourceAppId = Browser.window.appId;
                var sourcePosition = extraData.position;
                if (sourceGameId && sourceUserId >= 0 && sourceChannelId && sourceVersion && sourceAppId && sourcePosition) {
                    NetworkMgr.getInstance().redirectLogin(sourceGameId, sourceUserId,
                        sourceChannelId, sourceVersion, sourceAppId, sourcePosition);
                }
            }
        }
    }

    onHide() {
        tt.onHide(function (res) {
            LLWLog.log("ricardo wxmanager game hide")
        });
    }

    onShow() {
        LLWLog.log("ricardo onshow ");
        tt.onShow(function (res) {
            //跳转其他小游戏时间

        });
    }

    //跳转其他小游戏
    naviToGame(pos, appId, callback) {
        let self = this;
        tt.navigateToMiniProgram({
            appId: appId,
            path: '',
            extraData: {
                gameId: LLWConfig.GAMEID,
                userId: NetworkMgr.getInstance()._userId,
                channelId: LLWConfig.CHANNELID,
                version: LLWConfig.VERSION,
                position: pos
            },
            envVersion: 'release',
            success(res) {
                // 打开成功
                callback();
                self._appId = appId;
            }
        })
    }

    checkAuth(callback) {
        getSetting({
            success(res) {

                if (res.authSetting["scope.userInfo"]) {
                    callback(true);
                } else {
                    this._authed = false;
                    callback(false);
                }
            }
        })
    }

    createLoginBtn(callback) {
        tt.authorize({
            scope: "scope.userInfo",
            success: function (res) {
                LLWLog.log("ricardo auth success ", res);
                tt.getUserInfo({
                    success(res) {
                        LLWLog.log(`getUserInfo调用成功${res.userInfo}`);
                        callback(res);
                    },
                    fail(res) {
                        LLWLog.log(`getUserInfo调用失败`);
                    }
                });
            },
            fail: function (res) {
                LLWLog.log("ricardo auth fail ", res);
            }
        });

    }

    destroyWxBtn() {
        if (this._wxBtn) {
            this._wxBtn.destroy();
            this._wxBtn = null;
        }
    }

    getUserInfo(callback) {
        tt.getUserInfo({
            withCredentials: true,
            success: function (res) {
                LLWLog.log("ricardo getuserinfo success " + res)
                callback(res);
            },
            fail: function (res) {

            }
        })
    }

    login(callback) {
        var me = this;
        tt.login({
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    LLWLog.log("ricardo wxlogin " + res.code + " ", res);
                    tt.request({
                        url: 'https://www.i66wan.com/toutiao/jscode2session',
                        dataType: 'json',
                        data: {
                            gameId: LLWConfig.GAMEID,
                            jscode: res.code,
                            channelId: LLWConfig.CHANNELID,
                        },
                        success(res) {
                            LLWLog.log(res);
                            const openid = res.data.openid;

                            if (openid) {
                                me.checkAuth(function (ret) {
                                    if (ret) {
                                        me.getUserInfo(function (res) {
                                            NetworkMgr.getInstance().loginWeb(openid, res.userInfo.nickName, res.userInfo.avatarUrl, callback);
                                        });
                                    } else {
                                        callback(-1);
                                    }
                                });
                            }
                        }
                    })
                } else {
                    LLWLog.log('登录失败！' + res.errMsg)
                }
            }
        });

    }

    shareToFriend(title, callback, query = null) {
        var shareTemp;
        let shareTitle;
        shareTemp = NetworkMgr.getInstance()._config;
        var rd = Math.floor(Math.random() * 100);
        var index = rd % shareTemp.length;
        shareTitle = (shareTemp[index]).title;

        tt.updateShareMenu({
            "withShareTicket": true,
            "success": function () {
                tt.shareAppMessage({
                    "title": shareTitle,
                    "imageUrl": (shareTemp[index]).img,
                    "query": query,
                    "success": function (res) {
                    },
                    "fail": function (err) {
                        LLWLog.log("onShareAppMessage fail " + err)
                    },
                    "complete": function () {
                        LLWLog.log("onShareAppMessage complete");
                    }
                })
            }
        });
    }

    showVideo(id, callback, pos) {
        var time = new Date().getTime();
        this._videoClickTime = time;
        NetworkMgr.getInstance().adClick(id, 1);
        const rewardedVideoAd = tt.createRewardedVideoAd({ adUnitId: id })
        rewardedVideoAd.onLoad(function () {
            LLWLog.log('激励视频 广告加载成功');
        });

        rewardedVideoAd.show();

        rewardedVideoAd.onClose(function (res) {
            var now = new Date().getTime();
            var watchDuration = Math.floor((now - time) / 1000);
            LLWLog.log("ricardo onclose res  ", res);
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                callback(1);
                LLWLog.log("ricardo 正常结束");
            } else {
                // 播放中途退出，不下发游戏奖励
                LLWLog.log("ricardo 中途退出");
                if (callback) {
                    callback(-1);
                }
            }
        });
        rewardedVideoAd.onError(err => {
            LLWLog.log(err)
        })
    }

    showBanner(id) {
        var self = this;
        if (this._bannerAd) {

        } else {
            this._bannerAd = tt.createBannerAd({
                adUnitId: id,
                style: {
                    width: 200,
                }
            });
            const res = tt.getSystemInfoSync();
            var model = res.model;
            var index = model.indexOf("iPhone X");
            LLWLog.log("ricardo systeminfo ", res, index);
            this._bannerAd.onResize(function (size) {
                self._bannerAd.style.left = (res.screenWidth - size.width) / 2;
                self._bannerAd.style.top = res.screenHeight - size.height;
            });
            this._bannerAd.onError(err => {
                LLWLog.log("ricardo bannererr ", err)
            })
        }

        this._bannerAd.show();
    }

    hideBanner() {
        if (this._bannerAd) {
            this._bannerAd.hide();
        }
    }

    showInter(id){

    }

    //小游戏设置屏幕常亮
    keepScreenOn() {
        Ltt.setKeepScreenOn({
            keepScreenOn: true
        })
    }

    //游戏圈
    showGameClub() {
    }

    hideGameClub() {
        if (this._gameClubBtn) {
            this._gameClubBtn.hide();
        }
    }
}