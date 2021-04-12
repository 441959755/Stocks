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
        this.expLabel.string = gameData.properties[1];
        this.levelLabel.string = gameData.properties[2];
        this.userName.string = cc.ext.gameData.userName;

        this.nameLabel.string = GameCfg.data[0].name;
        this.maLabel.string = GameCfg.data[0].code;
        //时间
        this.timeLabel.string = gpData[0].day + ' -- ' + gpData[gpData.length - 1].day;
        this.riseLabel.string = ((gpData[gpData.length - 1].close - gpData[0].close) / gpData[0].close).toFixed(2) + '%';

        this.AllRise.string = '总盈利:' + (GameCfg.allRate * 100).toFixed(2) + '%';
        this.yingCont.string = '盈  利:' + GameCfg.profitCount + '次';
        this.kunCount.string = '亏 损:' + GameCfg.lossCount + '次';

        this.zijin.string = '原有资金:' + 100000;
        this.yingZiJin.string = '本轮盈利:' + parseInt((GameCfg.finalfund - 100000) + '');
        this.AllZiJin.string = '最终资金:' + parseInt(GameCfg.finalfund + '');

        ActionUtils.openLayer(this.node);

        let datas = {
            uid: gameData.userID,
            g_type: GameCfg.GameType,
            quotes_code: GameCfg.data[0].code,
            k_type: GameCfg.data[0].ktype,
            k_from: gpData[0].timestamp,
            k_to: gpData[gpData.length - 1].timestamp,
            stock_profit_rate: ((gpData[gpData.length - 1].close - gpData[0].close) / gpData[0].close).toFixed(2) + '%',
            user_profit_rate: (GameCfg.allRate * 100).toFixed(2),
            user_capital: 100000,
            user_profit: (GameCfg.finalfund - 100000),
            ts: new Date().getTime(),
            rank: 0,
        }

        socket.send(4005, PB.onCmdGameOverConvertToBuff(datas), (info) => {

        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            GameCfg.huizhidatas = 0;
            GameCfg.eachRate = [];
            GameCfg.allRate = 0;
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;
            cc.director.loadScene('hall');
        }
        //再来一局
        else if (name == 'lx_jsbt_zlyj') {
            GameCfg.huizhidatas = 0;
            GameCfg.eachRate = [];
            GameCfg.allRate = 0;
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;
            cc.director.loadScene('game');
        }
        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }

    }


}
