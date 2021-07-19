import { pb } from "../../protos/proto";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import GlobalHandle from "../global/GlobalHandle";
import UpGameOpt from "../global/UpGameOpt";
import ComUtils from "../Utils/ComUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import GameCfg from "./GameCfg";
import StrategyAIData from "./StrategyAIData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player1: cc.Node = null;

    @property(cc.Node)
    player2: cc.Node = null;

    @property([cc.Label])
    selfResultLabel: cc.Label[] = [];

    @property([cc.Label])
    otherResultLabel: cc.Label[] = [];

    @property(cc.Label)
    codeLabel: cc.Label = null;

    @property(cc.Label)
    codeTimeLabel: cc.Label = null;

    @property(cc.Label)
    HasRisen: cc.Label = null;    //同期涨幅

    EnterGameLayer: cc.Node = null;

    selfRank = 0;

    onLoad() {
        GlobalEvent.on(EventCfg.LEVELCHANGE, () => {
            let userLevel = this.player1.getChildByName('userLevel').getComponent(cc.Label);
            userLevel.string = 'LV: ' + GameData.properties[pb.GamePropertyId.Level];
        }, this);
        GlobalEvent.on(EventCfg.EXPCHANGE, () => {
            let userExp = this.player1.getChildByName('userExp').getComponent(cc.Label);
            userExp.string = 'EXP: ' + GameData.properties[pb.GamePropertyId.Exp] + '/' + GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];
        }, this);
    }

    onEnable() {
        if (GameCfg.GAMEFUPAN) {
            return;
        }

        GlobalEvent.emit(EventCfg.CLEARINTERVAL);

        let player = GameCfg.RoomGameData.players[0];
        GameCfg.RoomGameData.players.unshift(JSON.parse(JSON.stringify(player)));

        let gpData = GameCfg.data[0].data;
        this.codeLabel.string = '股票名称：' + GameCfg.data[0].name + '    ' + GameCfg.data[0].code;
        this.codeTimeLabel.string = '训练时段：' + ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);
        GameCfg.allRate = (GameCfg.allRate * 100);
        let rate = ComUtils.changeTwoDecimal((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100)

        this.HasRisen && (this.HasRisen.string = rate + '%')

        if (parseInt(rate) < 0) {
            this.HasRisen.node.color = cc.Color.GREEN;
        } else {
            this.HasRisen.node.color = cc.Color.RED;
        }

        {
            let userName = this.player1.getChildByName('username').getComponent(cc.Label);
            let userLevel = this.player1.getChildByName('userLevel').getComponent(cc.Label);
            let userExp = this.player1.getChildByName('userExp').getComponent(cc.Label);
            let userHead = this.player1.getChildByName('userHead').getComponent(cc.Sprite);
            let winSp = this.player1.getChildByName('jj_js_win');
            let loseSp = this.player1.getChildByName('jj_js_lose');

            let xj = this.player1.getChildByName('jj_xj');
            let taopao = this.player1.getChildByName('jj_toapao');

            userName.string = GameData.userName;
            userLevel.string = 'LV: ' + GameData.properties[pb.GamePropertyId.Level];
            userExp.string = 'EXP: ' + GameData.properties[pb.GamePropertyId.Exp] + '/' + GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];

            userHead.spriteFrame = GameData.headImg;

            if (GameCfg.allRate == 0 && UpGameOpt.arrOpt.length == 0) {
                this.selfRank = 2;
                xj.active = true;
                loseSp.active = true;
            }
            else if (GameCfg.allRate < GameCfg.RoomGameData.players[1].result.userProfitRate) {
                this.selfRank = 2;
                loseSp.active = true;
            }
            else if (GameCfg.allRate > GameCfg.RoomGameData.players[1].result.userProfitRate) {
                this.selfRank = 1;
                winSp.active = true;
            }
        }

        {
            let userName = this.player2.getChildByName('username').getComponent(cc.Label);
            let userLevel = this.player2.getChildByName('userLevel').getComponent(cc.Label);
            let userExp = this.player2.getChildByName('userExp').getComponent(cc.Label);
            let userHead = this.player2.getChildByName('userHead').getComponent(cc.Sprite);
            let winSp = this.player2.getChildByName('jj_js_win');
            let loseSp = this.player2.getChildByName('jj_js_lose');

            let xj = this.player2.getChildByName('jj_xj');
            let taopao = this.player2.getChildByName('jj_toapao');

            userName.string = GameCfg.RoomGameData.players[1].gd.nickname;
            userLevel.string = 'LV: ' + GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level];
            userExp.string = 'EXP: ' + GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Exp] + '/' + GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]]

            if (GameData.Players[1].icon) {
                userHead.spriteFrame = GameData.Players[1].icon;
            }
            let ex;
            let stages = JSON.parse(GameData.CGSConfData.conf);
            if (this.selfRank == 1) {
                loseSp.active = true;
                ex = GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Exp] + stages.Win[1].v;
            }
            else if (this.selfRank == 2) {
                winSp.active = true;
                ex = (GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Exp] + stages.Lose[1].v);
            }

            if (ex >= GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]]) {
                ex -= GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]];
                userExp.string = 'EXP: ' + ex + '/' + GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level] + 1]
                userLevel.string = 'LV: ' + (GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level] + 1);
            } else {
                userExp.string = 'EXP: ' + ex + '/' + GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]]
            }
        }

        this.onShowResult();

        let datas = {
            uid: GameData.userID,
            gType: GameCfg.GameType,
            quotesCode: GameCfg.data[0].code,
            kType: GameCfg.data[0].ktype,
            kFrom: parseInt(ComUtils.fromatTime1(gpData[GameData.huizhidatas - 1].day)),
            kTo: parseInt(ComUtils.fromatTime1(gpData[GameCfg.huizhidatas - 1].day)),
            stockProfitRate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100),
            userProfitRate: (GameCfg.allRate),
            ts: parseInt(new Date().getTime() / 1000 + ''),
            rank: this.selfRank,
            refId: 0,
            kStartup: GameData.huizhidatas - 1,
            kStop: GameCfg.huizhidatas - 1,

        }
        let CmdGameOver = {
            result: datas,
            operations: UpGameOpt.arrOpt,
        }
        GlobalHandle.onCmdGameOverReq(CmdGameOver);

        GameCfg.RoomGameData.players[0].result.kFrom = datas.kFrom;
        GameCfg.RoomGameData.players[0].result.kTo = datas.kTo;
        GameCfg.RoomGameData.players[0].result.stockProfitRate = datas.stockProfitRate;
    }

    onShowResult() {

        let stages = JSON.parse(GameData.CGSConfData.conf);
        console.log(JSON.stringify(stages));
        if (this.selfRank == 1) {
            this.selfResultLabel[0].string = '+' + stages.Win[0].v;
            this.selfResultLabel[1].string = '+' + stages.Win[1].v;
            this.selfResultLabel[2].string = '+' + stages.Win[2].v;
            this.selfResultLabel[3].string = '+' + 1;
            this.selfResultLabel[4].string = "+" + 0;
            this.selfResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.allRate) + '%';

            this.selfResultLabel[2].node.color = cc.Color.RED;
            this.selfResultLabel[3].node.color = cc.Color.RED;
            this.selfResultLabel[4].node.color = cc.Color.RED;

            this.otherResultLabel[2].node.color = cc.Color.GREEN;
            this.otherResultLabel[3].node.color = cc.Color.GREEN;
            this.otherResultLabel[4].node.color = cc.Color.GREEN;

            this.otherResultLabel[0].string = '-' + stages.Lose[0].v;
            this.otherResultLabel[1].string = '+' + stages.Lose[1].v;
            this.otherResultLabel[2].string = '' + stages.Lose[2].v;
            this.otherResultLabel[3].string = '-' + 1;
            this.otherResultLabel[4].string = "-" + 1;
            this.otherResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.RoomGameData.players[1].result.userProfitRate) + '%'

        } else {
            this.selfResultLabel[0].string = '-' + stages.Lose[0].v;
            this.selfResultLabel[1].string = '+' + stages.Lose[1].v;
            this.selfResultLabel[2].string = '' + stages.Lose[2].v;
            this.selfResultLabel[3].string = '-' + 1;
            this.selfResultLabel[4].string = "-" + 1;
            this.selfResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.allRate) + '%';

            this.otherResultLabel[0].string = '+' + stages.Win[0].v;
            this.otherResultLabel[1].string = '+' + stages.Win[1].v;
            this.otherResultLabel[2].string = '+' + stages.Win[2].v;
            this.otherResultLabel[3].string = '+' + 1;
            this.otherResultLabel[4].string = "+" + 0;
            this.otherResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.RoomGameData.players[1].result.userProfitRate) + '%'

            this.selfResultLabel[2].node.color = cc.Color.GREEN;
            this.selfResultLabel[3].node.color = cc.Color.GREEN;
            this.selfResultLabel[4].node.color = cc.Color.GREEN;

            this.otherResultLabel[2].node.color = cc.Color.RED;
            this.otherResultLabel[3].node.color = cc.Color.RED;
            this.otherResultLabel[4].node.color = cc.Color.RED;
        }

        if (GameCfg.allRate > 0) {
            this.selfResultLabel[5].node.color = cc.Color.RED;
        } else {
            this.selfResultLabel[5].node.color = cc.Color.GREEN;
        }

        if (GameCfg.RoomGameData.players[1].result.userProfitRate > 0) {
            this.otherResultLabel[5].node.color = cc.Color.RED;
        }
        else {
            this.otherResultLabel[5].node.color = cc.Color.GREEN;
        }

        GameCfg.RoomGameData.players[0].result.userProfitRate = GameCfg.allRate;
        GameCfg.RoomGameData.players[0].result.rank = this.selfRank;
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            this.onQuitGame();
        }

        //再来一局
        else if (name == 'pk_jsbt_zlyj') {
            this.onQuitGame();
        }

        //复盘
        else if (name == 'pk_jsbt_qd') {
            GameCfg.fill = [];
            GameCfg.fill.length = 0;
            GameCfg.allRate = 0;
            GlobalEvent.emit(EventCfg.FILLNODEISSHOW, false);

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 1);
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, UpGameOpt.arrOpt)

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 2);
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, GameCfg.RoomGameData.players[1].ops.items)

            this.node.active = false;
            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 3);
        }
        //训练该股
        else if (name == 'pk_jsbt_xl') {
            if (!this.EnterGameLayer) {
                GlobalEvent.emit(EventCfg.LOADINGSHOW);
                LoadUtils.loadRes('Prefabs/enterXLGame', (pre) => {
                    this.EnterGameLayer = cc.instantiate(pre);
                    this.node.addChild(this.EnterGameLayer);
                    GlobalEvent.emit(EventCfg.LOADINGHIDE);
                })
            }
            else {
                this.EnterGameLayer.active = true;
            }
        }
        //zj复盘
        else if (name == 'Btn_fupan_self') {
            GameCfg.fill = [];
            GameCfg.fill.length = 0;
            GameCfg.allRate = 0;

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, -1);
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;

            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, UpGameOpt.arrOpt)
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            //  GlobalEvent.emit(EventCfg.PKFUPAN, 1);
        }
        //tr复盘
        else if (name == 'Btn_fupan_other') {
            GameCfg.fill = [];
            GameCfg.fill.length = 0;
            GameCfg.allRate = 0;

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, -2);
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;

            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, GameCfg.RoomGameData.players[1].ops.items)
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            //   GlobalEvent.emit(EventCfg.PKFUPAN, 2);
        }
        else if (name == 'otheruserInfo') {
            GlobalEvent.emit(EventCfg.OPENOTHERINFOBOX);
        }
    }

    onQuitGame() {
        GameCfg.data[0].data = [];
        GameCfg.huizhidatas = 0;
        GameCfg.allRate = 0;
        GameCfg.finalfund = 0;
        GameCfg.GAMEFUPAN = false;
        GameCfg.history.allRate = 0;
        StrategyAIData.onClearData();
        GameCfg.enterGameCache = null;
        GameCfg.RoomGameData = null;
        cc.director.loadScene('hall');
    }

    onDestroy() {
        UpGameOpt.clearGameOpt();
        LoadUtils.releaseRes('Prefabs/enterXLGame');
        GlobalEvent.off(EventCfg.LEVELCHANGE);
        GlobalEvent.off(EventCfg.EXPCHANGE);
    }

}
