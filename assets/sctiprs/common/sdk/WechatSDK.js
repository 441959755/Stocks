/*
 * name;
 */
import NetworkMgr from "../net/NetworkMgr";
import LLWConfig from "../config/LLWConfig";
import BaseSDK from "./BaseSDK"
import LLWLog from "../utils/LlwLog";
import http from "../../Module/HttpMgr";
import LLWUtils from "../utils/LLWUtils";
import gameCfg from '../../Config/GameCfg';
import ReportMgr from '../../Module/ReportMgr';
export default class WechatSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new WechatSDK();
        }
        return this._instance;
    }

    init() {
        this.onShow();
        this.onHide();
        this.onNetStateChange();
        this.onKeepScreen();
    }

    onKeepScreen() {
        if (window.wx != undefined) {
            wx.setKeepScreenOn({
                keepScreenOn: true,
            })
        }
    }

    onEnterQuery() {
        if (wx && window.query) {
            LLWLog.log("ricardo query " + window.query);
            //进入房间
            if (window.query.type && (window.query.type == "5")) {
                //微信广告
                var sourceGameId = Browser.window.query.gameId;
                var sourceUserId = Browser.window.query.userId;
                var sourceChannelId = Browser.window.query.channelId;
                var sourceVersion = Browser.window.query.version;
                var sourceAppId = Browser.window.query.appId;
                var sourcePosition = Browser.window.query.position;
                NetworkMgr.instance().RedirectLoginedGame(sourceGameId, sourceUserId,
                    sourceChannelId, sourceVersion, sourceAppId, sourcePosition);
            }
        } else {
            LLWLog.log("================ window.wx is null.");
        }
        if (wx && window.referrerInfo) {
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
                    NetworkMgr.instance().redirectLogin(sourceGameId, sourceUserId,
                        sourceChannelId, sourceVersion, sourceAppId, sourcePosition);
                }
            }
        }
    }

    onHide(callback) {
        var self = this;
        wx.onHide(function (res) {
            LLWLog.log("ricardo wxmanager game hide")
            var duration = Math.floor(new Date().getTime()) - self._gameTime;

            self._duration = duration;
            self._hideTime = Math.floor(new Date().getTime());
            if (callback) {
                callback(duration);
            }
        });
    }

    onShow() {
        this._gameTime = Math.floor(new Date().getTime());
        var self = this;
        window.wx.onShow(function (res) {
            console.log("================= onInitShow");
            console.log(res);

            self.onInitAppScene(res);

            // android 手机在此处进行网络状况判断
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                console.log("Android newwork status change");
                cc.ext.gh.onShowNetworkStatusChange();
            }

            if (window.query && window.query.roomNumber) {
                //
                let scene = cc.director.getScene();
                if (scene.name == "HallScene") {
                    cc.ext.gh.onShowJoinRoomHandle();
                }

                //
                window.query.roomNumber = null;

                //
                return;
            }

            window.shareTicket = res.shareTicket;
            window.query = res.query;
            window.shareId = res.query.shareId;
            window.referrerInfo = res.referrerInfo;
            if (res.referrerInfo) {
                window.appId = window.referrerInfo.appId;
                window.extraData = res.referrerInfo.extraData;
            }

            var obj = wx.getLaunchOptionsSync();
            console.log("launch " + obj);

            //
            cc.ext.gh.onWxGameOnShowEvent();

            //
            cc.ext.wxSDKMgr.onShareCallBackHandle();
        })
    }


    //跳转其他小游戏
    naviToGame(appId, gameId, userId, channelId, version, pos, callback, cb) {
        console.log('ricardo redirect to miniprogram')

        if (window.wx != undefined) {
            window.wx.navigateToMiniProgram({

                appId: appId,

                envVersion: 'release',

                extraData: {

                    gameId: gameId,

                    userId: userId,

                    channelId: channelId,

                    version: version,

                    position: pos

                },

                success(res) {
                    if (callback) {
                        callback();
                    }
                    if (cb) {
                        cb()
                    };
                }
            });
        } else {
            console.log("onRedirectClick");
        }
    }

    checkAuth(callback) {
        this.onShow();
        this.onHide();
        wx.getSetting({
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

    onLoginCodeHttpRequest(_loginCode, callback) {
        let url='https://www.i66wan.com/weixin/jscode2session';
        let data={
            gameId:LLWConfig.GAMEID,
            jscode:_loginCode,
        };
        http.sendRequest(url,data,function(){

            if (res && res.data && res.data.ret == 1) {
                cc.ext.userData._openid = res.data.openid;
                cc.ext.userData.sessionKey = res.data.sessionKey;
                if (callback) {
                    callback(res.data.openid);
                }
            }
        })
    }

    getUserInfo(code, btn, callback) {
        let self = this;
        wx.getUserInfo({
            success: function (res) {
                const webUserInfo = res.userInfo;
                cc.ext.userData.nickName = webUserInfo.nickName;
                cc.ext.userData.sex = webUserInfo.gender;
                cc.ext.userData.headimgurl = webUserInfo.avatarUrl;
                self.onLoginCodeHttpRequest(code, callback);

                if (btn) {
                    btn.destroy();
                }
            }
        })
    }

    login(fc) {
        ReportMgr.onAuthoReport('WX_AUTHORIZE_GAME_STARTUP');
        const _this = this
        wx.login({
            success: function (res) {
                let code = res.code
                wx.getSetting({
                    success(res) {
                        if (res.authSetting['scope.userInfo']) {
                            console.log("已经授权下一步是wx.getuserinfo")
                            ReportMgr.onAuthoReport('WX_AUTHORIZE_OWN');
                            _this.getUserInfo(code, null, fc)

                        } else {
                            console.log("没有授权下一步是wx.createUserInfoButton")
                            let systemInfo = wx.getSystemInfoSync()
                            let button = wx.createUserInfoButton({
                                // type:'text',
                                type: "image",

                                image: "res/raw-assets/4e/4e27e0e4-0173-4cdf-bdad-37160844febd.12253.png",
                                style: {
                                    left: systemInfo.screenWidth * 0.5 - 88,
                                    top: systemInfo.screenHeight * 0.7,
                                    width: 176,
                                    height: 67,
                                    lineHeight: 40,
                                    color: '#000000',
                                    textAlign: 'center',
                                    fontSize: 20,
                                    margin: 0,
                                    padding: 0
                                },
                                text: "开始游戏"
                            })
                            button.onTap((res) => {
                                ReportMgr.onAuthoReport('WX_AUTHORIZE_SUCC');
                                _this.getUserInfo(code, button, fc)
                                // button.destroy()
                            })
                            button.offTap(()=>{
                                ReportMgr.onAuthoReport('WX_AUTHORIZE_FAIL');
                            })
                        }
                    }
                })
            }
        })
    }

    shareToFriend(TITLES, callback, query = null) {
        let self = this;

        if (window.wx != undefined) {

            let tmpFilePath = cc.game.canvas.toTempFilePathSync({
                destWidth: cc.view.getVisibleSize().width,
                destHeight: cc.view.getVisibleSize().height
            });
            console.log("tmpFilePath = ", tmpFilePath);

            let idx = Math.floor(Math.random() * cc.ext.gameData.shareConf.length);

            window.wx.updateShareMenu({

                withShareTicket: true,

                success: function () {

                    console.log("updateShareMenu success");

                    wx.shareAppMessage({

                        title: TITLES[idx],

                        imageUrl: tmpFilePath,

                        success: (res) => {
                            if (res.shareTickets == null || res.shareTickets == undefined || res.shareTickets == "") { //没有群信息，说明分享的是个人
                                console.log("排行榜res.shareTickets is null");

                            } else {
                                console.log("分享群成功");
                                console.log(res);

                                self.onShowGroupRank(res.shareTickets[0]);

                            }
                        },

                        fail: (err) => {
                            console.log("分享群失败");
                            console.log(err);
                        },

                        complete: () => {
                            console.log("分享群完成");
                        }

                    });

                }
            });

        } else {
            console.log("onShareGroup");
        }
    }

    showVideo(id, callback, pos) {
        NetworkMgr.getInstance().adClick(id, 1);
        const rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: id
        })
        rewardedVideoAd.onLoad(function () {
            LLWLog.log('激励视频 广告加载成功');
        });

        rewardedVideoAd.offClose();
        rewardedVideoAd.offError();
        rewardedVideoAd.load()
            .then(() => rewardedVideoAd.show())
            .catch(
                function (err) {
                    LLWLog.log("ricardo video err ", err);
                    callback(-1);
                }
            );

        rewardedVideoAd.onClose(function (res) {
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                callback(1);
                LLWLog.log("ricardo 正常结束");
            } else {
                // 播放中途退出，不下发游戏奖励
                LLWLog.log("ricardo 中途退出");
                callback(-1);
            }
        });
        rewardedVideoAd.onError(err => {
            LLWLog.error(err)
        })
    }

    //创建banner
    showBanner(id) {
        let visibleSize = cc.view.getVisibleSize();
        this._adaptActor = visibleSize.width / visibleSize.height;
        console.log("==================== this._adaptActor = ", this._adaptActor);

        const sysInfo = window.wx.getSystemInfoSync();
        this._bannerAd = window.wx.createBannerAd({
            adUnitId: id,
            style: {
                left: 100,

                top: sysInfo.screenHeight - 144,
            }
        });

        let self = this;
        this._bannerAd.onLoad(function () {
            console.log("-----加载bannerAd成功-----");

            //
            if (self._isBannerShow) {
                self._bannerAd.show();
            }
        });

        this._bannerAd.onError(function () {
            console.log("-----加载bannerAd失败-----");
        });

        this._bannerAd.onResize(function () {
            if (self._bannerOpt == 1) {
                let realWidth = self._bannerAd.style.realWidth;
                if (realWidth > 300) {
                    realWidth = 300;
                }

                self._bannerAd.style.width = realWidth;
                self._bannerAd.style.realWidth = realWidth;

                // self._bannerAd.style.height = realHeight;
                // self._bannerAd.style.realHeight = realHeight;

                if (self._adaptActor > 2) {
                    self._bannerAd.style.top = sysInfo.screenHeight - self._bannerAd.style.realHeight;
                } else {
                    self._bannerAd.style.top = sysInfo.screenHeight - self._bannerAd.style.realHeight;
                }
                self._bannerAd.style.left = (sysInfo.screenWidth - self._bannerAd.style.realWidth) / 2;
            }
            // self._bannerAd.style.top = sysInfo.screenHeight - self._bannerAd.style.realHeight;
            // self._bannerAd.style.left = (sysInfo.screenWidth - self._bannerAd.style.realWidth) / 2;
            console.log("-----bannerAd onResize-----");
        });
    }

    //关闭banner
    hideBanner() {
        if (this._bannerAd) {
            this._bannerAd.hide();
        }
    }
    //显示banner
    showBannerAd() {
        if (this._bannerAd) {
            this._bannerAd.show();
        }
    }

    onChangeBannerAD() {
        //  let self = this;
        // this.schedule(function () {
        //     if (self._isBannerShow) {
        //         self._bannerAd.destroy();
        //         self._bannerAd = null;

        //         self.onInitBannerAD();
        //     }
        // }, 30);
    }

    showInter(id) {
        if (window.wx) {
            let winSize = wx.getSystemInfoSync({
                success(res) {
                    console.log(res);
                }
            });

            if (!this._interstitialAd) {
                this._interstitialAd = wx.createInterstitialAd({
                    adUnitId: id,
                    style: {
                        left: winSize.windowWidth / 2 - 150,
                        top: winSize.windowHeight - 90,
                        width: 300,
                    }
                });

            }
            this._interstitialAd.show().catch((err) => {
                console.error(err);
            });

            this._interstitialAd.onLoad(() => {
                console.log("插屏广告加载成功");
            });

            this._interstitialAd.onError(err => {
                console.log(err);
            });

            this._interstitialAd.onClose(res => {
                console.log("插屏 广告关闭");
            });


        }
    }

    //小游戏设置屏幕常亮
    keepScreenOn() {
        wx.setKeepScreenOn({
            keepScreenOn: true
        })
    }

    //游戏圈
    showGameClub() {
        if (!this._gameClubBtn) {
            var res = wx.getSystemInfoSync();
            var width = res.windowWidth;
            var height = res.windowHeight;
            this._gameClubBtn = wx.createGameClubButton({
                icon: 'light',
                style: {
                    left: width / 2 - 80,
                    top: 2,
                    width: 30,
                    height: 30
                }
            })
        }
        this._gameClubBtn.show();
    }

    hideGameClub() {
        if (this._gameClubBtn) {
            this._gameClubBtn.hide();
        }
    }

    onShopBannerAdjust() {
        if (window.wx == undefined) {
            return;
        }

        this._bannerOpt = 0;

        const sysInfo = window.wx.getSystemInfoSync();

        this._bannerAd.style.width = 50;
        this._bannerAd.style.realWidth = 50;

        this._bannerAd.style.height = 120;
        this._bannerAd.style.realHeight = 120;

        console.log("Shop this._bannerAd.style.realHeight = ", this._bannerAd.style.realHeight);

        this._bannerAd.style.top = sysInfo.screenHeight - this._bannerAd.style.realHeight - 20;
        this._bannerAd.style.left = sysInfo.screenWidth / 2 + 10;
    }

    onBottomBannerAdjust() {
        if (window.wx == undefined) {
            return;
        }
        var self = this;

        this._bannerOpt = 1;

        const sysInfo = window.wx.getSystemInfoSync();



        this._bannerAd.style.width = sysInfo.screenWidth - 300;
        this._bannerAd.style.realWidth = sysInfo.screenWidth - 300;

        console.log("Bottom this._bannerAd.style.realHeight = ", this._bannerAd.style.realHeight);

        if (this._adaptActor > 2) {
            this._bannerAd.style.top = sysInfo.screenHeight - this._bannerAd.style.realHeight;
        } else {
            this._bannerAd.style.top = sysInfo.screenHeight - this._bannerAd.style.realHeight;
        }
        // this._bannerAd.style.left = 150;
        this._bannerAd.style.left = (sysInfo.screenWidth - 300) / 2;
    }

    onInitCfg() {
        if (window.wx != undefined) {

            window.wx.showShareMenu({
                withShareTicket: true
            });

            window.wx.onShareAppMessage(function () {

                let idx = Math.floor(Math.random() * cc.ext.gameData.shareConf.length);

                return {

                    title: cc.ext.gameData.shareConf[idx].title,

                    imageUrl: cc.ext.gameData.shareConf[idx].img,

                    success: function (res) {
                        console.log('拉起分享 成功');
                        console.log(res);
                    },

                    fail: function (res) {
                        console.log('拉起分享 失败');
                        console.log(res);
                    },
                };
            });
        } else {
            console.log("onInitCfg");
        }
    }

    onShareInvite(roomNumber) {
        let self = this;

        let query = "roomNumber=" + roomNumber;

        let idx = Math.floor(Math.random() * cc.ext.gameData.shareConf.length);

        if (window.wx != undefined) {

            window.wx.updateShareMenu({

                withShareTicket: true,

                success: function () {

                    console.log("updateShareMenu success");

                    wx.shareAppMessage({

                        title: "您的好友刚刚创建了房间，邀请您一起游戏",

                        imageUrl: cc.ext.gameData.shareConf[idx].img,

                        query: query,

                        success: (res) => {
                            console.log("分享邀请成功");
                            console.log(res);
                        },

                        fail: (err) => {
                            console.log("分享邀请失败");
                            console.log(err);
                        },

                        complete: () => {
                            console.log("分享邀请完成");
                        }

                    });

                }
            });

        } else {
            console.log("onShareInvite");
        }
    }

    shareInviteLeadReward(userID) {
        let self = this;
        invite = "userID=" + userID;

        let idx = Math.floor(Math.random() * cc.ext.gameData.shareConf.length);

        if (window.wx != undefined) {

            window.wx.updateShareMenu({

                withShareTicket: true,

                success: function () {

                    console.log("updateShareMenu success");

                    wx.shareAppMessage({

                        title: "您的好友刚刚邀请您一起游戏",

                        imageUrl: cc.ext.gameData.shareConf[idx].img,

                        invite: invite,

                        success: (res) => {
                            console.log("分享邀请成功");
                            console.log(res);
                        },

                        fail: (err) => {
                            console.log("分享邀请失败");
                            console.log(err);
                        },

                        complete: () => {
                            console.log("分享邀请完成");
                        }

                    });

                }
            });

        } else {
            console.log("shareInviteLeadReward");
        }
    }

    compareVersion(v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        const len = Math.max(v1.length, v2.length);

        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }

        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i]);
            const num2 = parseInt(v2[i]);

            if (num1 > num2) {
                return 1;
            } else if (num1 < num2) {
                return -1;
            }
        }

        return 0;
    }

    onInitAppScene(res) {
        const version = wx.getSystemInfoSync().SDKVersion;
        console.log("sdk version: ", version);

        if (this.compareVersion(version, '2.5.1') >= 0) {
            console.log("当前场景值：", res.scene);
            if (res.scene == 1069 || res.scene == 1036 || res.scene == 1089 || res.scene == 1090) {

            }
        } else {
            console.log('当前微信版本过低，无法使用跳转APP功能，请升级到最新微信版本后重试。');
        }
    }

}