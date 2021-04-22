import GameCfg from "./GameCfg";
import ActionUtils from "../Utils/ActionUtils";
import Game = cc.Game;
import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameData from "../GameData";

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
        ActionUtils.openLayer(this.node);

        let gpData = GameCfg.data[0].data;

        if (!gpData || gpData.length <= 0) { return }

        this.headImg.spriteFrame = GameData.headImg;
        this.levelLabel.string = 'LV:  ' + GameData.properties[2];

        let max_exp = levelInfoCfg[GameData.properties[2]].max_exp;

        this.expLabel.string = GameData.properties[1] + '/' + max_exp;

        this.userName.string = GameData.userName;

        this.nameLabel.string = GameCfg.data[0].name;
        this.maLabel.string = GameCfg.data[0].code;
        //时间
        this.timeLabel.string = gpData[0].day + ' -- ' + gpData[gpData.length - 1].day;
        this.riseLabel.string = ((gpData[gpData.length - 1].close - gpData[0].close) / gpData[0].close).toFixed(2) + '%';

        this.AllRise.string = (GameCfg.allRate * 100).toFixed(2) + '%';
        this.yingCont.string = GameCfg.profitCount + '次';
        this.kunCount.string = GameCfg.lossCount + '次';

        this.zijin.string = GameData.properties[3];
        this.yingZiJin.string = parseInt((GameCfg.finalfund - 100000) + '') + '';
        this.AllZiJin.string = parseInt(GameCfg.finalfund + '') + '';

        //复盘中不保存记录
        if (!GameCfg.GAMEFUPAN) {
            let datas = {
                uid: GameData.userID,
                g_type: GameCfg.GameType,
                quotes_code: GameCfg.data[0].code,
                k_type: GameCfg.data[0].ktype,
                k_from: parseInt(gpData[0].day.replace(/-/g, '')),
                k_to: parseInt(gpData[gpData.length - 1].day.replace(/-/g, '')),
                stock_profit_rate: ((gpData[gpData.length - 1].close - gpData[0].close) / gpData[0].close).toFixed(2),
                user_profit_rate: (GameCfg.allRate * 100).toFixed(2),
                user_capital: GameData.properties[3],
                user_profit: (GameCfg.finalfund - GameData.properties[3]),
                ts: new Date().getTime() / 1000,
                rank: 0,
                ref_id: 0,
            }
            //  if (GameCfg.GameType < 4) {
            datas.rank = datas.user_profit_rate >= datas.stock_profit_rate ? 1 : 2;
            //  if (GameCfg.GameType == 1) {
            datas.ref_id = 0;
            // }
            //  }

            this.saveHoistoryInfo(datas.ts);

            socket.send(4005, PB.onCmdGameOverConvertToBuff(datas), (info) => {
                console.log('GameOverInfo' + JSON.stringify(info));
            })
        }

    }

    saveHoistoryInfo(ts) {
        GameCfg.TIMETEMP.push(ts);
        cc.sys.localStorage.setItem('TIMETEMP', JSON.stringify(GameCfg.TIMETEMP));
        cc.sys.localStorage.setItem(ts, JSON.stringify(GameCfg.history));
        cc.sys.localStorage.setItem(ts + 'set', JSON.stringify(GameCfg.GameSet));
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            GameCfg.huizhidatas = 0;

            GameCfg.allRate = 0;
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;
            GameCfg.GameType = null;

            GameCfg.GAMEFUPAN = false;

            cc.director.loadScene('hall');
        }
        //再来一局
        else if (name == 'lx_jsbt_zlyj') {
            GameCfg.huizhidatas = 0;

            GameCfg.allRate = 0;
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;

            GameCfg.GAMEFUPAN = false;

            cc.director.loadScene('game');

            // GameCfg.GAMEFUPAN = false;
        }
        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }
    }
}
