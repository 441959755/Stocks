import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

import LoadUtils from "../Utils/LoadUtils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    UserName: cc.Label = null;

    @property(cc.Label)
    userLevel: cc.Label = null;

    @property(cc.Label)
    userExp: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Label)
    brick: cc.Label = null;

    @property(cc.Sprite)
    userHead: cc.Sprite = null;

    @property(cc.Node)
    rightNode: cc.Node = null;

    @property(cc.ProgressBar)
    progr: cc.ProgressBar = null;

    otherSelf = null;

    onLoad() {
        //砖石
        GlobalEvent.on(EventCfg.BIRCKCHANGE, () => {
            this.brick.string = cc.ext.gameData.brick;
        }, this);

        //金币
        GlobalEvent.on(EventCfg.GOLDCHANGE, () => {
            this.gold.string = gameData.properties[0];
        }, this);

        //等级
        GlobalEvent.on(EventCfg.LEVELCHANGE, () => {
            this.userLevel.string = cc.ext.gameData.level;
        }, this);

        //经验
        GlobalEvent.on(EventCfg.EXPCHANGE, () => {
            this.userExp.string = cc.ext.gameData.exp + '/' + cc.ext.gameData.maxExp;
            this.progr.progress = cc.ext.gameData.exp / cc.ext.gameData.maxExp;
        }, this);

        GlobalEvent.on(EventCfg.SHOWOTHERNODE, (other) => {
            this.rightNode.active = true;
            this.otherSelf = other;
        }, this);

        this.rightNode.active = false;
    }

    protected onEnable() {
        //设置用户信息
        this.setUserInfo();
        //设置用户头像
        this.setHeadImg();
    }

    setHeadImg() {
        let headUrl = cc.ext.gameData.headimgurl;
        if (headUrl) {
            if (headUrl.indexOf('.jpg') != -1) {
                LoadUtils.load(headUrl, (texture) => {
                    let spriteFrame = new cc.SpriteFrame(texture);
                    this.userHead.spriteFrame = spriteFrame;
                    cc.ext.gameData.headImg = spriteFrame;
                })
            } else {
                LoadUtils.load({ url: headUrl, type: 'png' }, (texture) => {
                    let spriteFrame = new cc.SpriteFrame(texture);
                    this.userHead.spriteFrame = spriteFrame;
                    cc.ext.gameData.headImg = spriteFrame;
                })
            }
        }
    }

    setUserInfo() {
        this.userExp.string = cc.ext.gameData.exp + '/' + cc.ext.gameData.maxExp;
        this.userLevel.string = 'LV:' + cc.ext.gameData.level || 0 + '';
        this.gold.string = gameData.properties[0] || 0 + '';
        this.brick.string = cc.ext.gameData.brick || 0 + '';
        this.UserName.string = cc.ext.gameData.userName || cc.ext.gameData.userID;

        this.progr.progress = cc.ext.gameData.exp / cc.ext.gameData.maxExp;

    }

    onClick(event, data) {
        let name = event.target.name;
        //点击加金币
        if (name == 'addGoldBtn') {

        }
        //点击加砖石
        else if (name == 'addBrickBtn') {

        }
        else if (name == 'sys_back') {
            this.rightNode.active = false;
            this.otherSelf.node.active = false;
        }
        else if (name == 'sys_help') {
            GlobalEvent.emit('OPENHELPLAYER', 'SM');
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.BIRCKCHANGE);
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.LEVELCHANGE);
        GlobalEvent.off(EventCfg.EXPCHANGE);
        GlobalEvent.off(EventCfg.SHOWOTHERNODE);
    }

}
