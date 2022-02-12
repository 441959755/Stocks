
import LLWSDK from "../../sctiprs/common/sdk/LLWSDK";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    lockBtn: cc.Button = null;

    @property(cc.Button)
    vipBtn: cc.Button = null;

    @property(cc.Button)
    addCountBtn: cc.Button = null;

    @property(cc.Label)
    content1: cc.Label = null;

    @property(cc.Label)
    content2: cc.Label = null;

    @property(cc.Label)
    tips: cc.Label = null;

    @property(cc.Node)
    unlock: cc.Node = null;

    @property(cc.Node)
    ad: cc.Node = null;

    @property(cc.Label)
    adLabel: cc.Label = null;

    @property(cc.Button)
    adButton: cc.Button = null;

    lockPrice = 0;

    adCount = null;


    callback = null;

    // oninit(falg) {
    //     if (falg) {
    //         this.addCountBtn.node.active = false;
    //         this.content1.node.active = false;
    //     }
    // }

    // onEnable() {
    //     this.addCountBtn.node.active = true;
    //     this.content1.node.active = true;

    //     if (GameCfg.GameType == pb.GameType.DingXiang) {
    //         this.lockPrice = Math.abs(GameCfgText.gameConf.dxxl.unlock[0].v);
    //     }

    //     else if (GameCfg.GameType == pb.GameType.QiHuo) {
    //         this.lockPrice = Math.abs(GameCfgText.gameConf.qhxl.unlock[0].v);
    //     }

    //     else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
    //         this.lockPrice = Math.abs(GameCfgText.gameConf.qhxl.unlock[0].v);
    //         this.addCountBtn.node.active = false;
    //         this.content1.node.active = false;
    //     }

    //     else if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
    //         this.lockPrice = Math.abs(GameCfgText.gameConf.tjdxl.unlock[0].v);
    //     }

    //     if (GameCfg.GameType == pb.GameType.ZhiBiao) {
    //         this.content2.string = '您尚未解锁“指标训练”所有指标的训练权限，' + this.lockPrice + '钻石可解锁30天免费不限次数训练（VIP用户可以直接解锁）';
    //     }
    //     else {
    //         this.content2.string = this.lockPrice + '钻石可解锁30天免费不限次数训练（VIP用户可以直接解锁）';
    //     }

    //     this.tips.string = '-' + this.lockPrice;

    //     this.unlock.active = true;

    //     this.ad.active = false;

    //     this.adCount = EnterGameControl.onCurIsEnterGame();
    // }


    onBtnClick(event, curdata) {

        let name = event.target.name;

        if (name == 'sys_close') {
            this.node.active = false;
        }

        // //解锁
        // else if (name == 'sys_tck_js') {

        //     if (GameCfg.GameType == pb.GameType.DingXiang) {
        //         if (GameData.properties[pb.GamePropertyId.UnlockDxxl]) {
        //             GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已经解锁!')
        //             return;
        //         }
        //     }

        //     else if (GameCfg.GameType == pb.GameType.QiHuo) {
        //         if (GameData.properties[pb.GamePropertyId.UnlockQhxl]) {
        //             GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已经解锁!')
        //             return;
        //         }
        //     }

        //     else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
        //         if (GameData.properties[pb.GamePropertyId.UnlockZbxl]) {
        //             GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '已经解锁!')
        //             return;
        //         }
        //     }

        //     if (GameData.properties[pb.GamePropertyId.Diamond] >= this.lockPrice) {

        //         let obj = {
        //             gType: GameCfg.GameType,
        //         }

        //         let CmdUnlockGame = pb.CmdUnlockGame;
        //         let message = CmdUnlockGame.create(obj);
        //         let buff = CmdUnlockGame.encode(message).finish();

        //         socket.send(pb.MessageId.Req_Hall_UnlockGame, buff, (res) => {
        //             console.log('解锁' + JSON.stringify(res));
        //             this.node.active = false;
        //             GlobalEvent.emit(EventCfg.GMAECOUNTERSCHANGE);
        //             GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '解锁成功');
        //         });
        //     }
        //     else {
        //         GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '钻石不足');
        //     }
        // }

        // //开通vip
        // else if (name == 'sys_tck_ktvip') {

        //     this.node.active = false;

        //     PopupManager.loadVipExplain();
        // }

        //增加次数
        else if (name == 'sys_tck_zjcs') {
            // this.ad.active = true;
            // this.unlock.active = false;
            // this.adShow();
            LLWSDK.getSDK().showVideoAd((flag) => {
                if (flag) {
                    GameData.adSucceed += 1;
                    this.callback && this.callback();
                    this.node.active = false;
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '观看完整视频才有奖励哦！');
                }
            })
        }

        // else if (name == 'sys_tck_spzjcs') {
        //     this.node.active = false;
        //     this.ADSucceed();
        // }
    }

    adShow() {
        if (this.adCount.status == 2) {
            this.adButton.interactable = true;
            this.adButton.enableAutoGrayEffect = false;
            this.adLabel.string = '今天剩余可领取的额外次数：' + this.adCount.count;
        }
        else {
            this.adButton.interactable = false;
            this.adButton.enableAutoGrayEffect = true;
            this.adLabel.string = '今天剩余可领取的额外次数：' + 0;
        }
    }

    ADSucceed() {
        let time = new Date().toLocaleDateString();
        cc.sys.localStorage.setItem(time + 'ADSUCCEED' + GameCfg.GameType, 1);
        GlobalEvent.emit(EventCfg.GMAECOUNTERSCHANGE);
    }

}
