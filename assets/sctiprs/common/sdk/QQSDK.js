import LLWConfig from "../config/LLWConfig";
import HttpUtil from "../net/HttpUtil";
import NetworkMgr from "../net/NetworkMgr";
import BaseSDK from "./BaseSDK"
import LLWLog from "../utils/LLWLog"
import ADIDDefine from "../define/ADIDDefine";
/**
 * @desc QQ渠道SDK
 */
export default class QQSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new QQSDK();
        }
        return this._instance;
    }

    init(){
        this.onShow();
        this.onHide();
        this.onNetStateChange();
        this.showShareMenu();
    }

    /**
     * @desc 登录
     */
    login(callback) {
        this.onShow();
        this.onHide();
        var self = this;
        var httpUtil = new HttpUtil();
        qq.login({
            success: function (res) {
                if (res.code) {
                    // 发起网络请求
                    var url = "https://www.i66wan.com/qq/jscode2session?gameId=" + LLWConfig.GAMEID + "&jscode="
                        + res.code + "&channelId=" + LLWConfig.CHANNELID + "&version=" + LLWConfig.VERSION;

                        httpUtil.httpUtilGet(url, function (res) {
                        var data = new Object();
                        data = JSON.parse(res);
                        LLWLog.log("ricardo jscode2session data ", data);
                        const openid = (data).openid;
                        LLWLog.log("ricardo openid " + openid);

                        if (openid) {
                            self.checkAuth(function (ret) {
                                if (ret) {
                                    self.getUserInfo(function (res) {
                                        NetworkMgr.getInstance().loginWeb(openid, res.userInfo.nickName, res.userInfo.avatarUrl, callback);
                                    });
                                } else {
                                    NetworkMgr.getInstance().loginWeb(openid, "", "", callback);
                                }
                            });
                        }
                    }, null, null);
                } else {
                    LLWLog.log('登录失败！' + res.errMsg);
                }
            },
            fail: function () {
                LLWLog.log('wx.login 失败')
            }
        })
    }

    createLoginBtn(callback) {
        const res = qq.getSystemInfoSync();
        var gameH = res.screenHeight;
        var gameW = res.screenWidth;
        if (this._wxBtn) {
            this._wxBtn.destroy();
            this._wxBtn = null;
        }
        this._wxBtn = qq.createUserInfoButton({
            type: 'image',
            text: '登录',
            image: 'https://game.i66wan.com/h5resource/tttyt/logingame.png',
            style: {
                left: gameW / 2 - 299 * 0.5 / 2,
                top: gameH / 1.5 - 103 * 0.5 / 2,
                width: 299 * 0.5,
                height: 103 * 0.5,
                lineHeight: 50,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        var self = this;
        this._wxBtn.onTap((res) => {
            LLWLog.log(res)
            if (res.userInfo) {
                self._wxBtn.hide();
                self._wxBtn.destroy();
                self._wxBtn = null;
                callback(res);
            }
        })
    }

    /**
     * @desc 根据jscode获取openid
     * @param jscode 
     * @param success 
     */
    getOpenid(jscode, success) {
        qq.request({
            url: 'https://www.i66wan.com/qq/jscode2session',
            dataType: 'json',
            data: {
                "gameId": LLWConfig.GAMEID,
                "jscode": jscode,
                "channelId": LLWConfig.CHANNELID,
                "version": LLWConfig.VERSION
            },
            success: function (res) {
                LLWLog.log('web -> weixin/jscode2session 成功')
                LLWLog.log(res);
                NetworkMgr.getInstance().loginWeb((res).data.openid, "", "", function () { });
            },
            fail: function () {
                LLWLog.log('web -> weixin/jscode2session 失败')
            }
        })
    }

    /**
     * @desc  群分享
     * @param title 
     * @param callback 
     * @param query 
     */
    shareToFriend(title, callback, query = null) {
        var shareTemp;
        let shareTitle;
        shareTemp = NetworkMgr.getInstance()._config;
        var rd = Math.floor(Math.random() * 100);
        var index = rd % shareTemp.length;
        shareTitle = (shareTemp[index]).title;
        qq.shareAppMessage({
            "title": shareTitle,
            "query": query,
            "imageUrl": (shareTemp[index]).img,
            "success": function (res) {

            },
            "fail": function (err) {
                LLWLog.log("onShareAppMessage fail " + err)
            },
            "complete": function () {
                LLWLog.log("onShareAppMessage complete");
            }
        });
    }

    /**
     * @desc 主动分享转发
     * @param callback 
     */
    onShareAppMessage(callback = null) {
        var shareTemp;
        let shareTitle;
        shareTemp = NetworkMgr.getInstance()._config;
        var rd = Math.floor(Math.random() * 100);
        var index = rd % shareTemp.length;
        shareTitle = (shareTemp[index]).title;
        qq.onShareAppMessage(() => ({
            title: shareTitle,
            imageUrl: (shareTemp[index]).img,
            query: "",
            "success": function (res) {
                LLWLog.log("Amumu QQMgr onShareAppMessage success data" + res);
            },
            "fail": function (err) {
                LLWLog.log("Amumu QQMgr onShareAppMessage fail err" + err);
            },
            "complete": function () {
                LLWLog.log("Amumu QQMgr onShareAppMessage complete");
            }
        }));
    }

    /**
     * @desc 显示分享当前页面分享按钮
     */
    showShareMenu() {
        qq.showShareMenu({
            showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
            "success": function (res) {
                LLWLog.log("Amumu QQMgr showShareMenu success");
            },
            "fail": function (err) {
                LLWLog.log("Amumu QQMgr showShareMenu fail err" + err);
            },
            "complete": function () {
                LLWLog.log("Amumu QQMgr showShareMenu complete");
            }
        });
    }

    shareBack() {
        if (QQMgr._shareCallback) {
            let ret = 0;
            var self = this;

        }
    }

    /**
     * @desc  跳转其他小游戏
     * @param appId 
     * @param pos 
     * @param callback 
     */
    naviToGame(appId, pos, callback = null) {
        var userId = 0;
        if (NetworkMgr.getInstance()._userId) {
            userId = NetworkMgr.getInstance()._userId;
        }
        try {
            qq.navigateToMiniProgram({
                "appId": appId,
                "path": '',
                "extraData": {
                    gameId: LLWConfig.GAMEID,
                    userId: userId,
                    channelId: LLWConfig.CHANNELID,
                    version: LLWConfig.VERSION,
                    position: pos
                },
                "envVersion": 'release',
                "success": function (res) {
                    LLWLog.log("Amumu WXMgr naviGame 打开成功");
                    if (callback) callback();
                },
                "fail": function (err) {
                    LLWLog.log("Amumu WXMgr naviGame fail", err);
                }, "complele": function (complete) {
                    LLWLog.log("Amumu WXMgr naviGame complete", complete);
                }
            });
        } catch (err) {
            LLWLog.log("Amumu WXMgr navi error", err);
        }
    }

    /**
     * @desc 程序前台显示 
     */
    onShow() {
        this._gameTime = Math.floor(new Date().getTime() / 1000);
        qq.onShow(function (res) {
            //跳转其他小游戏时间
        });
    }

    /**
     * @desc 进入程序
     */
    onEnterQuery() {

    }

    /**
     * @desc 程序进入后台，不显示
     */
    onHide() {
        qq.onHide(function () {
        });
    }

    /**
     * @param 检查是否初次登录
     * @param callback 
     */
    checkAuth(callback = null) {
        qq.getSetting({
            success(res) {
                if (res.authSetting["scope.userInfo"]) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
    }

    /**
     * @desc  获取用户信息
     * @param callback 
     */
    getUserInfo(callback = null) {
        qq.getUserInfo({
            withCredentials: true,
            success: function (res) {
                LLWLog.log("Amumu getuserinfo success ", res)
                callback(res);
            },
            fail: function (res) {
                LLWLog.log("Amumu getuserinfo fail ", res)
            },
            complete: function () {
                LLWLog.log("Amumu getuserinfo complete");
            }
        });
    }

    onNetStateChange() {
        qq.onNetworkStatusChange(function (res) {
            LLWLog.log("ricardo onnetchanged ", res.isConnected);

        })
    }

    showVideo(id, callback, pos) {
        var self = this;
     
        this._videoAd = qq.createRewardedVideoAd({
            adUnitId: id
        });
        
        this._videoAd.offClose();

        this._videoAd.load().then(() => self._videoAd.show().then(() => {
            LLWLog.log('激励视频 广告显示');
        }));

        this._videoAd.onLoad(function () {
            LLWLog.log('激励视频 广告加载成功');
        });
        
        this._videoAd.onClose(function (res) {
            var now = new Date().getTime();
            var watchDuration = Math.floor((now - self.time) / 1000);
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                if (callback) callback(1);
                LLWLog.log("ricardo 正常结束");
            }
            else {
                // 播放中途退出，不下发游戏奖励
                LLWLog.log("ricardo 中途退出");
                if (callback) callback(-1);
            }
        });
         
        this._videoAd.onError(err => {
            LLWLog.log("Amumu QQMgr showVideo onError", err);
        });
    }

    showBanner(id) {
        var self = this;

        var windowWidth = qq.getSystemInfoSync().windowWidth;
		var windowHeight = qq.getSystemInfoSync().windowHeight;
        LLWLog.log("Amumu windowWidth = " + windowWidth + " windowHeight = " +  windowHeight);

        if (self._bannerAd) {
            self._bannerAd.show();
            return;
        }
        self._bannerAd = qq.createBannerAd({
            adUnitId: id,
            style: {
                left: 0,
                top: windowHeight - (windowWidth / 30 * 9),
                width: windowWidth
            }
        });

        self._bannerAd.show().then(function () {
            LLWLog.log("Amumu QQSDK Banner show");
        }).catch(function (err) {
            LLWLog.log("Amumu QQSDK show error", err);
        });
        const res = qq.getSystemInfoSync();
        self._bannerAd.onResize(function (size) {
            self._bannerAd.style.top = res.screenHeight - size.height;
            self._bannerAd.style.left = (res.screenWidth - size.width) / 2;
        });

        self._bannerAd.onError(function (err) {
            LLWLog.log("monlen banner err :", err);
            var errCode = err.errCode;
            if (errCode == "" || errCode == null || errCode == undefined) {
                errCode = 0;
            }
            LLWLog.log("monlen banner err :" + errCode);
        });

        self._bannerAd.onLoad(function (err) {
        });
    }

    hideBanner() {
        if (this._bannerAd) {
            this._bannerAd.hide();
        }
    }

}

