import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

import LoadUtils from "../Utils/LoadUtils";
import GameData from "../GameData";
import GameCfg from '../game/GameCfg';

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
            this.brick.string = GameData.properties[4];
        }, this);

        //金币
        GlobalEvent.on(EventCfg.GOLDCHANGE, () => {
            this.gold.string = GameData.properties[0];
        }, this);

        //等级
        GlobalEvent.on(EventCfg.LEVELCHANGE, () => {
            this.userLevel.string = GameData.properties[2];
        }, this);

        //经验
        GlobalEvent.on(EventCfg.EXPCHANGE, () => {
            this.userExp.string = GameData.properties[1] + '/' + GameData.maxExp;
            this.progr.progress = GameData.properties[1] / GameData.maxExp;
        }, this);

        GlobalEvent.on(EventCfg.SHOWOTHERNODE, (other) => {
            this.rightNode.active = true;
            this.otherSelf = other;
        }, this);

        GlobalEvent.on(EventCfg.NAMECHANGE, () => {
            this.UserName.string = GameData.userName;
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
        let headUrl = GameData.headimgurl;
        if (headUrl) {
            if (headUrl.indexOf('.jpg') != -1) {
                LoadUtils.load(headUrl, (texture) => {
                    let spriteFrame = new cc.SpriteFrame(texture);
                    this.userHead.spriteFrame = spriteFrame;
                    GameData.headImg = spriteFrame;
                })
            } else {

                LoadUtils.load({ url: headUrl, type: 'png' }, (texture) => {
                    let spriteFrame = new cc.SpriteFrame(texture);
                    this.userHead.spriteFrame = spriteFrame;
                    GameData.headImg = spriteFrame;
                })
            }
        }
    }

    setUserInfo() {
        this.userExp.string = GameData.properties[1] + '/' + GameData.maxExp;
        this.userLevel.string = 'LV:' + GameData.properties[2] || 0 + '';
        this.gold.string = GameData.properties[0] || 0 + '';
        this.brick.string = GameData.properties[4] || 0 + '';
        this.UserName.string = GameData.userName || GameData.userID;

        this.progr.progress = GameData.properties[1] / GameData.maxExp;

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
            GameCfg.GameType = null;
        }
        else if (name == 'sys_help') {
            GlobalEvent.emit('OPENHELPLAYER', 'SM');
        }
        //打开个人中心
        else if (name == 'playerSprite') {
            GlobalEvent.emit('OPENPLAYERINFO');

        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.BIRCKCHANGE);
        GlobalEvent.off(EventCfg.GOLDCHANGE);
        GlobalEvent.off(EventCfg.LEVELCHANGE);
        GlobalEvent.off(EventCfg.EXPCHANGE);
        GlobalEvent.off(EventCfg.SHOWOTHERNODE);
        GlobalEvent.off(EventCfg.NAMECHANGE);
    }

}
