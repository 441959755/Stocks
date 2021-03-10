import BaseSDK from "./BaseSDK";
import LLWLog from "../utils/LLWLog"
import ADIDDefine from "../define/ADIDDefine";
import NetWorkMgr from "../net/NetWorkMgr"

export default class VivoSDK extends BaseSDK{
    static getInstance() {
        if (!this._instance) {
            this._instance = new VivoSDK();
        }
        return this._instance;
    }

    init(){
        this.loadVideo(ADIDDefine.ID_VIDEO);
        let self = this;
        this._version = 1031;
        qg.getSystemInfo({
            success: function (data) {
              console.log(`handling success， brand = ${data.brand}`)
              self._version = data.platformVersionCode
            }
          });
        this.onShow();
        this.onHide();
    }

    login(callback){
        qg.authorize({
            type: "token",
            success: function (obj) {
                LLWLog.log("Amumu VivoQgMgr login success obj", obj);

                qg.getProfile({
                    token: obj.accessToken,
                    success: function(data){
                        LLWLog.log("Amumu VivoQgMgr login success nickname", data.nickname);
                        // if(callback) callback();
                        NetWorkMgr.getInstance().loginWeb(data.openid, data.nickname, data.avatar, callback);
                    },
                    fail: function(code) {
                        LLWLog.log("Amumu VivoQgMgr getProfile fail code", code);
                    }
                });
            },
            fail: function (code) {
                LLWLog.log("Amumu VivoQgMgr authorize fail code", code);
            }
        });
    }

    showBanner(id){
        try {
            let windowWidth = qg.getSystemInfo().screenWidth;
            let windowHeight = qg.getSystemInfo().screenHeight;

            var self = this;
            if(!this.bannerAd){
                this.bannerAd = qg.createBannerAd({
                    posId: id,
                    style: {
                        width: windowWidth
                    }
                });
                LLWLog.log("Amumu VivoQGMgr createBanner 02=== bannerAd", this.bannerAd);
                this.bannerAd.onSize(function (size) {
                    LLWLog.log("Amumu createBanner size ", size);
                    // self.bannerAd.style.top = windowHeight - size.height;
                    // self.bannerAd.style.left = (windowWidth - size.width) / 2;
                });
                this.bannerAd.onError(function (err) {
                    LLWLog.log("Amumu bannererr error " + err.errCode + "msg = " + err.errMsg)
                });
                this.bannerAd.onLoad(function () {
                    LLWLog.log("Amumu 加载banner成功上报 ");
                }); 
            }
    
            this.bannerAd.show();  
        } catch (error) {
            
        }
        
    }

    hideBanner(){
        LLWLog.log("ricardo hidebanner");
        if(this.bannerAd){
            this.bannerAd.hide();
        }
    }

    showInter(id){
        try {
            this.interactionAd = qg.createInterstitialAd({
                posId: id
            });
    
            LLWLog.log("Amumu VivoQGMgr createInteraction ===interactionAd", this.interactionAd);
            this.interactionAd.onLoad(function() {
                LLWLog.log("Amumu VivoQgMgr createInteraction onLoad");
            });
    
            this.interactionAd.onClose(function() {
                LLWLog.log("Amumu VivoQgMgr createInteraction onClose");
            });
    
            this.interactionAd.onError(function(err) {
                LLWLog.log("Amumu VivoQgMgr createInteraction onError" + err.errCode + "msg = " + err.errMsg);
            });
    
            this.interactionAd.show().then(function() {
                NetworkMgr.adClick(id, 1);
                LLWLog.log("Amumu VivoQgMgr showInteraction success");
            }).catch(function(err) {
                LLWLog.log("Amumu VivoQgMgr showInteraction fail error = " + err.errCode + "msg = " + err.errMsg);
            });
        } catch (error) {
            
        }
        
    }

    loadVideo(id){
        try {
            var self = this;
            this.videoAd = qg.createRewardedVideoAd({
            posId: id
            });
            this.videoAd.onLoad(function() {
                self._onloaded = true;
                LLWLog.log("Amumu VivoQgMgr createVideo onLoad");
                if(self._showVideo){
                    self.videoAd.show().then(function() {
                        LLWLog.log('Amumu 激励视频 广告显示 02');
                        NetworkMgr.adClick(id, 1);
                    });
                    self._showVideo = false;
                }
            });

            this.videoAd.onClose(function (res) {
                self._onloaded = false;
                self._lastTime = new Date().getTime();
                if (res && res.isEnded) {
                    // 正常播放结束,可以下发游戏奖励
                    if(self.callback) self.callback(1);
                    LLWLog.log("Amumu 正常结束");
                }
                else {
                    // 播放中途退出,不下发游戏奖励
                    LLWLog.log("Amumu 中途退出");
                    if (self.callback) self.callback(-1);
                }
            });

            this.videoAd.onError(function(err){
                LLWLog.log("Amumu createRewardedVideoAd error = " + err.errCode + "msg = " + err.errMsg);
            });
        } catch (error) {
                
        }
    }

    showVideo(id, callback, pos){
        try {
            let version = this._version;
            console.log("ricardo version "+version);
            if(version <1041){
                qg.showToast({
                    message: '当前小游戏版本太低，请升级至最新版'
                });
                return;
            }
            var self = this;
            if(!this._lastTime){
                this._lastTime = -1;
            }
            this._time = new Date().getTime();
            if(this._time - this._lastTime < 60*1000){
                qg.showToast({
                    message: '观看视频太频繁，请稍后再试'
                })
                return;
            }
            this.callback = callback;

            if(self._onloaded){
                self.videoAd.show().then(function() {
                    LLWLog.log('Amumu 激励视频 广告显示 02');
                    NetworkMgr.adClick(id, 1);
                })
            }else{
                this._showVideo = true;
                var adload = this.videoAd.load();
                // 调用then和catch之前需要对load的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                adload && adload.then(() => {
                    console.log("激励视频广告加载成功");
                    self.videoAd.show().then(function() {
                        
                        LLWLog.log('Amumu 激励视频 广告显示 02');
                        NetworkMgr.adClick(id, 1);
                    })
                }).catch(err => {
                    console.log("激励视频广告加载失败"+ err.errCode + "msg = " + err.errMsg);
                });
            }
            LLWLog.log("Amumu VivoQGMgr createVideo ===videoAd", this.videoAd);
            this.videoAd.load(() => self.videoAd.show().then(function() {
                LLWLog.log('Amumu 激励视频 广告显示 02');
                NetworkMgr.adClick(id, 1);
            }));
        } catch (error) {
            
        }
        
    }

    onShow(){
        qg.onShow(function(){
            LLWLog.log("ricardo onshow");
        });
    }

    onHide(){
        qg.onHide(function(){
            LLWLog.log("ricardo onHide");
        });
    }

}