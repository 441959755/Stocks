import LLWConfig from "../config/LLWConfig";
import NetworkMgr from "../net/NetworkMgr";
import BaseSDK from "./BaseSDK"
import LLWLog from "../utils/LLWLog"
export default class BDSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new BDSDK();
        }
        return this._instance;
    }

    login(callback, errorCallback) {
        var me = this;
        Laya.Browser.window.swan.login({
            success: function (res) {
                Laya.Browser.window.swan.request({
                    url: 'https://www.i66wan.com/baidu/jscode2session',
                    data: {
                        jscode: res.code,
                        gameId: LLWConfig.GAMEID,
                        channelId: LLWConfig.CHANNELID
                    },
                    success(res) {
                        LLWLog.log(res);
                        const openid = res.data.openid;

                        if (openid) {
                            me.checkAuth(function (ret) {
                                if (ret) {
                                    me.getUserInfo(function (res) {
                                        NetworkMgr.instance().loginWeb(openid, res.userInfo.nickName, res.userInfo.avatarUrl, callback);
                                    });
                                } else {

                                }
                            });
                        }
                    }
                });
            },
            fail: function (err) {
                LLWLog.log('login fail', err);
            }
        });
    }

    getUserInfo(callback) {
        Laya.Browser.window.swan.getUserInfo({
            success: function (res) {
                LLWLog.log('用户名', res.userInfo.nickName);
                callback(res);
                // NetworkManager.instance().loginWeb(openid, res.userInfo.nickName, res.userInfo.avatarUrl, callback);
            }
        })
    }

    checkAuth(callback) {
        let self = this;
        Laya.Browser.window.swan.checkSession({
            success: function (res) {
                LLWLog.log('登录态有效');
                callback(true);
            },
            fail: function (err) {
                LLWLog.log('登录态无效');
                callback(false);
            }
        });
    }

    openShare(title, callback, query = null) {
        var shareTemp;
        let shareTitle;
        shareTemp = NetworkMgr.instance()._config;
        var rd = Math.floor(Math.random() * 100);
        var index = rd % shareTemp.length;
        shareTitle = (shareTemp[index]).title;
        Laya.Browser.window.swan.openShare({
            title: '智能小程序示例',
            content: '世界很复杂，百度更懂你',
            path: '/pages/openShare/openShare?key=value',
            imageUrl: 'https://smartprogram.baidu.com/docs/img/logo_new.png',
            success: function (res) {
                Laya.Browser.window.swan.showToast({
                    title: '分享成功'
                });
                LLWLog.log('openShare success', res);
            },
            fail: function (err) {
                LLWLog.log('openShare fail', err);
            }
        });
    }

    showVideoAd(callback, errCb) {
        let videoAd1 = Laya.Browser.window.swan.createRewardedVideoAd({ adUnitId: '6320525', appSid: 'fa30889f' });
        // videoAd1.show()
        // .then(() => LLWLog.log('播放成功')).catch(err => LLWLog.log(err))
        videoAd1.offClose();
        videoAd1.show().then(() => {
            LLWLog.log('播放成功')
            videoAd1.load();
        })
            .catch(err => {
                videoAd1.load()
                    .then(() => {
                        videoAd1.show();
                    })
            })
        videoAd1.onClose(res => {
            if (res.isEnded) {
                LLWLog.log('激励视频完整播放后关闭')
                callback();
            } else {
                LLWLog.log('激励视频中途被关闭')
                if (errCb) {
                    errCb();
                }
            }
        })

    }

}