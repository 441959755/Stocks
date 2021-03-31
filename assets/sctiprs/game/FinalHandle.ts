import GameCfg from "./GameCfg";
import ActionUtils from "../Utils/ActionUtils";
import Game = cc.Game;
import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    maLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    riseLabel: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.Label)
    expLabel: cc.Label = null;

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.RichText)
    AllRise: cc.RichText = null;

    @property(cc.RichText)
    yingCont: cc.RichText = null;

    @property(cc.RichText)
    kunCount: cc.RichText = null;

    @property(cc.RichText)
    zijin: cc.RichText = null;

    @property(cc.RichText)
    yingZiJin: cc.RichText = null;

    @property(cc.RichText)
    AllZiJin: cc.RichText = null;

    protected onEnable() {
        let gpData = GameCfg.data[0].data;

        this.headImg.spriteFrame = cc.ext.gameData.headImg;
        this.expLabel.string = cc.ext.gameData.exp;
        this.levelLabel.string = cc.ext.gameData.level;
        this.userName.string = cc.ext.gameData.userName;

        this.nameLabel.string = GameCfg.data[0].name;
        this.maLabel.string = GameCfg.data[0].code;

        this.timeLabel.string = gpData[0].day + ' -- ' + gpData[gpData.length - 1].day;
        this.riseLabel.string = null;

        this.AllRise.string = '总盈利:' + (GameCfg.allRate*100).toFixed(2) + '%';
        this.yingCont.string = '盈  利:' + GameCfg.profitCount + '次';
        this.kunCount.string = '亏 损:' + GameCfg.lossCount + '次';

        this.zijin.string = '原有资金:' + 100000;
        this.yingZiJin.string = '本轮盈利:' +parseInt((GameCfg.finalfund - 100000)+'');
        this.AllZiJin.string = '最终资金:' +parseInt(GameCfg.finalfund+'');

        ActionUtils.openLayer(this.node);
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            GameCfg.huizhidatas=0;
            GameCfg.eachRate=[];
            GameCfg.allRate=0;
            GameCfg.profitCount=0;
            GameCfg.lossCount=0;
            GameCfg.finalfund=0;
            cc.director.loadScene('hall');
        }
        //再来一局
        else if (name == 'lx_jsbt_zlyj') {
            GameCfg.huizhidatas=0;
            GameCfg.eachRate=[];
            GameCfg.allRate=0;
            GameCfg.profitCount=0;
            GameCfg.lossCount=0;
            GameCfg.finalfund=0;
            cc.director.loadScene('game');
        }
        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }

    }


}
