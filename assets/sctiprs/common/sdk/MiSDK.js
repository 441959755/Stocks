import BaseSDK from "./BaseSDK"
import HttpUtils from "../net/HttpUtil";
import NetWorkMgr from "../net/NetworkMgr";
import LLWConfig from "../config/LLWConfig";

export default class MiSDK extends BaseSDK{
    static getInstance() {
        if (!this._instance) {
            this._instance = new MiSDK();
        }
        return this._instance;
    }

    init(){

    }

    login(callback){
        qg.login({
        success: function(res) {
            //appAccountId session
            let appAccountId = res.appAccountId;
            let session = res.session;
            let url = "https://www.i66wan.com/weixin/jscode2session";
            url = url + "?gameId="+LLWConfig.GAMEID + "&channelId="+LLWConfig.CHANNELID + "&session="+session
                    + "&uid="+appAccountId;
            HttpUtils.getInstance().httpUtilGet(url, function(res){
                NetWorkMgr.getInstance().loginWeb("")
            }, null, null);
        },
        fail: function(res){}
        });
    }

    showVideo(id, callback, pos){
        this.callback = callback;
        let self = this;
        if(!rewardedVideoAd){
            var rewardedVideoAd = qg.createRewardedVideoAd({
                adUnitId: id
            });
            rewardedVideoAd.onLoad(() => {
                console.log('load success');
                rewardedVideoAd.show();
            })
            rewardedVideoAd.onError( data => {
                console.log('error: errorMsg: ${data.errMsg}, erroCode: ${data.errCode}')
                self.callback(-1);
            })
            rewardedVideoAd.onClose( data => {
                console.log('close ad: ${data.isEnded}')
                if(data.isEnded){
                    self.callback(1);
                }else{
                    self.callback(-1);
                }
            })
        }
        rewardedVideoAd.load();
    }

    showInter(id){
        var interstitialAd = qg.createInterstitialAd({
            adUnitId: id
        });
        interstitialAd.onLoad(() => {
            console.log('load success')
            interstitialAd.show();
        });
        interstitialAd.load();
    }

    showBanner(id){
        
    }
}