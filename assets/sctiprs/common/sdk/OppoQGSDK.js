import NetworkMgr from "../net/NetworkMgr";
import BaseSDK from "./BaseSDK"
import LLWLog from "../utils/LLWLog"
import ADIDDefine from "../define/ADIDDefine"
export default class OppoQGSDK extends BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new OppoQGSDK();
        }
        return this._instance;
    }

    init(){
        let self = this;
        self.platformVersion = 1031;
        qg.getSystemInfo({
            success: function(res) {
                self.platformVersion = res.platformVersion;
            },
            fail: function(err) {},
            complete: function(res) {}
        })
        this.initAd();
    }

    login(callback) {
        // this.initAd();
        qg.login({
            success: function (res) {
                LLWLog.log("ricardo qglogin success res " + res);
                let userInfo = res;
                LLWLog.log("ricardo userinfo uid:" + userInfo.uid + " nickname:" + userInfo.nickName + " avatar:" + userInfo.avatar);
                // callback(userInfo);
                NetworkMgr.getInstance().loginWeb(userInfo.uid, userInfo.nickName, userInfo.avatar, callback);
            },
            fail: function () {
                LLWLog.log("ricardo qglogin fail");
            },
            complete: function () {

            },
            pkgName: ADIDDefine.ID_OPPO_PACKAGE
        });
    }

    setLoadingProgress(progress) {
        qg.setLoadingProgress({
            progress: progress
        });
    }

    loadingComplete() {
        qg.loadingComplete({
            complete: function (res) { }
        });
    }

    /**
     * 广告初始化
     */
    initAd() {
        try {
            qg.initAdService({
                appId: ADIDDefine.ID_OPPO_APPID,
                success: function (res) {
                    LLWLog.log("success");
                },
                fail: function (res) {
                    LLWLog.log("fail:" + res.code + res.msg);
                },
                complete: function (res) {
                    LLWLog.log("complete");
                }
            })
        } catch (error) {
            LLWLog.error("ricardo ", error);
        }
        
    }

    /**
     * banner广告
     */
    showBanner(id) {
        try {
            this.bannerAd = qg.createBannerAd({
                posId: id
            })
            this.bannerAd.show();
            this.bannerAd.onError(function (err) {
                LLWLog.log(err);
            })
            this.bannerAd.onHide(function () {
                LLWLog.log("banner 广告隐藏");
            })
            this.bannerAd.onShow(function () {
                LLWLog.log("banner 广告显示");
            })
        } catch (error) {
            LLWLog.error("ricardo ", error);
        }
        
    }

    hideBanner(){
        if(this.bannerAd){
            this.bannerAd.hide();
        }
    }

    /**
     * 插屏广告
     */
    showInter(id) {
        try {
            NetworkMgr.getInstance().adClick(id, 1);
            var insertAd = qg.createInsertAd({
                posId: id
            })
            insertAd.load();
            insertAd.onLoad(function () {
                insertAd.show();
                LLWLog.log("插屏广告加载");
            })
            insertAd.onShow(function () {
                LLWLog.log("插屏广告展示");
            })
            insertAd.onError(function (err) {
                LLWLog.log("插屏广告加载失败: " + err.code + " " + err.msg);
            })
        } catch (error) {
            LLWLog.error("ricardo ", error);
        }
        
    }

    /**
     * 激励视频广告
     */
    showVideo(id, callback, pos) {
        try {
            NetworkMgr.getInstance().adClick(id, 1);
            var videoAd = qg.createRewardedVideoAd({
                posId: id
            })
            videoAd.load();
            videoAd.onLoad(function () {
                LLWLog.log("激励视频加载成功");
                videoAd.show();
            })
            videoAd.onVideoStart(function () {
                LLWLog.log("激励视频 开始播放");
            })
            let ad = videoAd;
            ad.offClose();
            ad.onClose((res) => {
                if (res.isEnded) {
                    LLWLog.log('激励视频广告完成，发放奖励')
                    callback(1);
                } else {
                    callback(-1)
                    LLWLog.log('激励视频广告取消关闭，不发放奖励')
                }
            })
            videoAd.onError(function (err) {
                LLWLog.log(err);
            })
        } catch (error) {
            LLWLog.error("ricardo ", error);
        }
        
    }

    /**
     * 原生广告
     */
    showNative(id, imgOppoAd, labTitle, labDesc, imgIcon, labBtnTxt) {
        try {
            NetworkMgr.getInstance().adClick(id, 1);
            var nativeAd = qg.createNativeAd({
                posId: id
            })
            nativeAd.load();
            let ad = nativeAd;
            ad.onLoad(function (res) {
                LLWLog.log("插屏广告加载", res.adList)
                LLWLog.log("ricardo creativetype " + res.adList[0].creativeType + " " + res.adList.length);
                ad.reportAdShow({
                    adId: res.adList[0].adId
                })
                let adContent = res.adList[0];
                imgOppoAd.visible = true;
                if (labTitle) {
                    labTitle.text = res.adList[0].title;
                }
                if (labDesc) {
                    labDesc.text = res.adList[0].desc;
                }
                if (imgIcon) {
                    imgIcon.skin = res.adList[0].iconUrlList[0];
                }
                if (labBtnTxt) {
                    labBtnTxt.text = res.adList[0].clickBtnTxt;
                }
                imgOppoAd.on(Laya.Event.CLICK, this, function () {
                    NetworkMgr.instance().adClose(id, 1, 0);
                    ad.reportAdClick({
                        adId: res.adList[0].adId
                    })
                });

            })
        } catch (error) {
            LLWLog.error("ricardo ", error);
        }
        
    }

    hasShortcutInstalled(){
        if(this.platformVersion){
            return true;
        }
        qg.hasShortcutInstalled({
            success: function(res) {
                // 判断图标未存在时，创建图标
                // if(res == false){
                return res;
                // }
            },
            fail: function(err) {
                return true;
            },
            complete: function() {}
        })
    }

    installShortcut(callback){
        try {
            qg.hasShortcutInstalled({
                success: function(res) {
                    // 判断图标未存在时，创建图标
                    if(res == false){
                        qg.installShortcut({
                            success: function() {
                                // 执行用户创建图标奖励
                                callback(1);
                            },
                            fail: function(err) {
                                callback(-1);
                            },
                            complete: function() {}
                        })
                    }
                },
                fail: function(err) {},
                complete: function() {}
            })
        } catch (error) {
            LLWLog.error("ricardo ", error);
        }
        
    }

    naviToGame(appId, pos, callback = null){
        qg.navigateToMiniGame({
            pkgName: appId,
            path: '',
            extraData: {
                from: ''
            },
            success: function(){
            },
            fail: function(res){
                LLWLog.log("ricardo navitogame", JSON.stringify(res));
            }
        });
    }

    showNaviToGame(){
        if(this.platformVersion >= 1050){
            return true;
        }else{
            return false;
        }
    }

}