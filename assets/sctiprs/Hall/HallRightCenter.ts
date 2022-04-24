import { pb } from "../../protos/proto";
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import GlobalHandle from "../global/GlobalHandle";
import ActionUtils from "../Utils/ActionUtils";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallRightCenter extends cc.Component {

    @property(cc.Node)
    rewardCenterBtn: cc.Node = null;

    @property(cc.Node)
    xsBtn: cc.Node = null;

    @property(cc.Node)
    cgdsBtn: cc.Node = null;

    @property(cc.Node)
    cgsBtn: cc.Node = null;

    @property(cc.Node)
    vip7Btn: cc.Node = null;

    @property(cc.Node)
    otherBtn: cc.Node = null;

    rewardCenterData = null;

    rewardCenterNode = null;

    onLoad() {

        this.rewardCenterBtn.active = false;

        //获取是否有奖励
        GlobalEvent.on('getRewardCenter', this.getRewardCenter.bind(this), this);

        //是否领取完
        GlobalEvent.on('REWARDITEM', (count) => {
            console.log(count);
            if (count > 0) {
                this.rewardCenterBtn.active = true;
            }
            else {
                this.rewardCenterBtn.active = false;
            }
        }, this);

        GlobalEvent.on('setXSBtnShowOrHide', this.setXSBtnShowOrHide.bind(this), this);

        GlobalEvent.on('setVip7BtnShowOrHide', this.setVip7BtnShowOrHide.bind(this), this);
    }

    start() {
        if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
            return;
        }

        else {
            setTimeout(() => {
                //炒股大赛
                this.setCgdsBtnShowOrHide();
                //新手礼包
                this.setXSBtnShowOrHide();
                //7天VIP
                this.setVip7BtnShowOrHide();
                //闯关赛
                this.setCgsBtnShowOrHide();
                //其他
                this.setOtherBtnShowOrHide();
            }, 200);
        }

        this.getRewardCenter();
    }

    setXSBtnShowOrHide() {
        //参与过的
        if (GlobalHandle.Activitys.indexOf(GameCfgText.appConf.pop[4].activity_id) >= 0) {
            this.xsBtn.active = false;
        }
        //没
        else {
            let flag = false;
            GameData.ActivityConf.forEach(el => {
                if (el.id == GameCfgText.appConf.pop[4].activity_id) {
                    let curTime = new Date().getTime() / 1000;
                    if (curTime < el.to && curTime >= el.from) {
                        this.xsBtn.active = true;
                        flag = true;
                    }
                    else {
                        this.xsBtn.active = false;
                    }
                }
            });
            this.xsBtn.active = flag;
        }
    }

    setVip7BtnShowOrHide() {
        //参与过的
        if (GlobalHandle.Activitys.indexOf(GameCfgText.appConf.pop[5].activity_id) >= 0) {
            this.vip7Btn.active = false;
            return;
        }
        //没
        else {
            let flag = false;
            GameData.ActivityConf.forEach(el => {
                if (el.id == GameCfgText.appConf.pop[5].activity_id) {
                    let curTime = new Date().getTime() / 1000;
                    if (curTime < el.to && curTime >= el.from) {
                        this.vip7Btn.active = true;
                        flag = true;
                    }
                    else {
                        this.vip7Btn.active = false;
                    }
                }
            });
            this.vip7Btn.active = flag;
        }
    }

    setCgdsBtnShowOrHide() {
        let flag = false;
        GameData.ActivityConf.forEach(el => {
            if (el.title == GameCfgText.appConf.pop[2].name) {
                let curTime = new Date().getTime() / 1000;
                if (curTime < el.to && curTime >= el.from) {
                    let iconUrl = LLWConfig.LoginURL + '/img/activity/cgds_icon.png';
                    LoadUtils.load(iconUrl, (sp) => {
                        if (sp) {
                            this.cgdsBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                            this.cgdsBtn.active = true;
                            flag = true;
                        }
                        else {
                            this.cgdsBtn.active = false;
                        }
                    })
                }
                else {
                    this.cgdsBtn.active = false;
                }
            }
        });
        this.cgdsBtn.active = flag;
    }

    setCgsBtnShowOrHide() {
        let flag = false;
        GameData.ActivityConf.forEach(el => {
            if (el.title == GameCfgText.appConf.pop[3].name) {
                let curTime = new Date().getTime() / 1000;
                if (curTime < el.to && curTime >= el.from) {
                    let iconUrl = LLWConfig.LoginURL + '/img/activity/cgs_icon.png';
                    LoadUtils.load(iconUrl, (sp) => {
                        if (sp) {
                            this.cgsBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                            this.cgsBtn.active = true;
                            flag = true;
                        }
                        else {
                            this.cgsBtn.active = false;
                            flag = false;
                        }
                    })

                }
                else {
                    this.cgsBtn.active = false;
                }
            }
        });
        this.cgsBtn.active = flag;
    }

    setOtherBtnShowOrHide() {
        let flag = false;
        let arrstr = ['炒股大赛', '闯关赛', '首充', '7天VIP活动', '7天VIP'];
        GameData.ActivityConf.forEach(el => {

            if (arrstr.indexOf(el.title) < 0) {

                let curTime = new Date().getTime() / 1000;

                if (GlobalHandle.Activitys.indexOf(el.id) >= 0) {
                    this.otherBtn.active = false;
                }
                else if (curTime < el.to && curTime >= el.from) {
                    let iconUrl = LLWConfig.LoginURL + '/img/activity/' + el.id + '_icon.png';
                    LoadUtils.load(iconUrl, (sp) => {
                        if (sp) {
                            this.otherBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                            this.otherBtn.active = true;
                            flag = true;
                        }
                        else {
                            this.otherBtn.active = false;
                            flag = false;
                        }
                    })
                }
                else {
                    this.otherBtn.active = false;
                }
            }
        });
        this.otherBtn.active = flag;
    }

    getRewardCenter(call?) {
        socket.send(pb.MessageId.Req_Hall_BackBag, null, (info) => {
            console.log('getRewardCenter:' + JSON.stringify(info));
            if (info && info.grids.length > 0) {
                this.rewardCenterBtn.active = true;
            }
            else {
                this.rewardCenterBtn.active = false;
            }
            this.rewardCenterData = info.grids || [];
            call && (call);
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'rewardCentertBtn') {
            PopupManager.openNode(cc.find('Canvas'), this.rewardCenterNode, 'Prefabs/RewardCenter/rewardCenter', 12, (node) => {
                ActionUtils.openBox(node);
                this.rewardCenterNode = node;
                let handle = this.rewardCenterNode.getComponent('RewardCenter');
                if (handle) {
                    handle.rewardData = this.rewardCenterData;
                    handle.onShow();
                }
            })
        }

        else if (name == 'main_banner_sclb') {
            PopupManager.openNewPackage();
        }

        else if (name == 'main_banner_cgds') {
            PopupManager.openCgdsNotice();
        }

        else if (name == 'main_banner_viptyk') {
            PopupManager.open7DayVIP();
        }

        else if (name == 'main_banner_cgs') {
            PopupManager.openCgsNotice();
        }

        else if (name == 'main_banner_other') {
            PopupManager.openactiveTheme();
        }
    }

    onDestroy() {
        GlobalEvent.off('getRewardCenter');
        GlobalEvent.off('REWARDITEM');
        GlobalEvent.off('setXSBtnShowOrHide');
        GlobalEvent.off('setVip7BtnShowOrHide');
    }

}
