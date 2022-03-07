
import { pb } from "../../../protos/proto";
import LLWSDK from "../../../sctiprs/common/sdk/LLWSDK";
import GameCfg from "../../../sctiprs/game/GameCfg";
import StrategyAIData from "../../../sctiprs/game/StrategyAIData";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import UpGameOpt from "../../../sctiprs/global/UpGameOpt";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import LoadUtils from "../../../sctiprs/Utils/LoadUtils";


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

    flag = false;

    @property(cc.Node)
    vipNode: cc.Node = null;

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

    onShow() {

        if (GameCfg.GAMEFUPAN || this.flag) {
            return;
        }

        this.flag = true;

        GlobalEvent.emit(EventCfg.CLEARINTERVAL);

        let player = JSON.parse(ComUtils.stringify(GameCfg.RoomGameData.players[0]));

        console.log(player);

        GameCfg.RoomGameData.players[1] = player;

        let gpData = GameCfg.data[0].data;


        let code = GameCfg.data[0].code;
        if (code.length >= 7) {
            code = code.slice(1);
        }

        this.codeLabel.string = '股票名称：' + GameCfg.data[0].name + '    ' + code;

        this.codeTimeLabel.string = '比赛时段：' + ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        //   GameCfg.allRate = (GameCfg.allRate * 100);

        let rate = ComUtils.changeTwoDecimal((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100)

        this.HasRisen && (this.HasRisen.string = rate + '%')

        if (parseInt(rate + '') < 0) {
            this.HasRisen.node.color = new cc.Color().fromHEX('#31a633');
        } else {
            this.HasRisen.node.color = new cc.Color().fromHEX('#e94343');
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

            loseSp.active = false;
            winSp.active = false;

            // if (GameCfg.allRate == 0 && UpGameOpt.arrOpt.length == 0) {
            //     this.selfRank = 2;
            //     //    xj.active = true;
            //     loseSp.active = true;
            // }
            // else
            if (GameCfg.allRate * 100 <= GameCfg.RoomGameData.players[1].result.userProfitRate) {
                this.selfRank = 2;
                loseSp.active = true;
            }
            else if (GameCfg.allRate * 100 > GameCfg.RoomGameData.players[1].result.userProfitRate) {
                this.selfRank = 1;
                winSp.active = true;
            }

            if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
                this.vipNode.active = true;
            }
            else {
                this.vipNode.active = false;
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
            loseSp.active = false;
            winSp.active = false;

            let ex;

            let stages = JSON.parse(GameData.CGSConfData.conf);

            if (this.selfRank == 1) {
                loseSp.active = true;
                ex = parseInt(GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Exp]) + stages.Win[1].v;
            }
            else if (this.selfRank == 2) {
                winSp.active = true;
                ex = (parseInt(GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Exp]) + stages.Lose[1].v);
            }

            if (ex >= GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]]) {
                ex -= GameCfgText.levelInfoCfg[GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]];
                userExp.string = 'EXP: ' + ex + '/' + GameCfgText.levelInfoCfg[
                    parseInt(GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]) + 1]
                userLevel.string = 'LV: ' + (parseInt(GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level]) + 1);
            } else {
                userExp.string = 'EXP: ' + ex + '/' + GameCfgText.levelInfoCfg[
                    parseInt(GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level])]
            }
        }

        this.onShowResult();

        let datas = {
            uid: GameData.userID,
            gType: GameCfg.GameType,
            quotesCode: GameCfg.data[0].code,
            kType: GameCfg.data[0].ktype,
            kFrom: parseInt(ComUtils.fromatTime1(gpData[0].day)),
            kTo: parseInt(ComUtils.fromatTime1(gpData[GameCfg.huizhidatas - 1].day)),
            stockProfitRate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100),
            userProfitRate: (GameCfg.allRate * 100),
            ts: parseInt(new Date().getTime() / 1000 + ''),
            rank: this.selfRank,
            refId: 0,
            kStartup: GameData.huizhidatas - 1,
            kStop: GameCfg.huizhidatas - 1,
        }

        let arr = ComUtils.getJJXunXian();

        let CmdGameOver = {
            result: datas,
            operations: {
                items: UpGameOpt.arrOpt,
                junXian: arr,
            }
        }

        GlobalHandle.onCmdGameOverReq(CmdGameOver, null);

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
            this.selfResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.allRate * 100) + '%';

            this.selfResultLabel[2].node.color = new cc.Color().fromHEX('#e94343');
            this.selfResultLabel[3].node.color = new cc.Color().fromHEX('#e94343');
            this.selfResultLabel[4].node.color = new cc.Color().fromHEX('#e94343');

            this.otherResultLabel[2].node.color = new cc.Color().fromHEX('#31a633');
            this.otherResultLabel[3].node.color = new cc.Color().fromHEX('#31a633');
            this.otherResultLabel[4].node.color = new cc.Color().fromHEX('#31a633');

            this.otherResultLabel[0].string = '-' + stages.Lose[0].v;
            this.otherResultLabel[1].string = '+' + stages.Lose[1].v;
            this.otherResultLabel[2].string = '' + stages.Lose[2].v;
            this.otherResultLabel[3].string = '-' + 1;
            this.otherResultLabel[4].string = "-" + 1;
            this.otherResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.RoomGameData.players[1].result.userProfitRate) + '%'

            GameCfg.RoomGameData.players[0].result.userProfitRate = GameCfg.allRate * 100;
            GameCfg.RoomGameData.players[0].result.rank = 1;
            GameCfg.RoomGameData.players[1].result.rank = 2;

        } else {
            this.selfResultLabel[0].string = '-' + stages.Lose[0].v;
            this.selfResultLabel[1].string = '+' + stages.Lose[1].v;
            this.selfResultLabel[2].string = '' + stages.Lose[2].v;
            this.selfResultLabel[3].string = '-' + 1;
            this.selfResultLabel[4].string = "-" + 1;
            this.selfResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.allRate * 100) + '%';

            this.otherResultLabel[0].string = '+' + stages.Win[0].v;
            this.otherResultLabel[1].string = '+' + stages.Win[1].v;
            this.otherResultLabel[2].string = '+' + stages.Win[2].v;
            this.otherResultLabel[3].string = '+' + 1;
            this.otherResultLabel[4].string = "+" + 0;
            this.otherResultLabel[5].string = ComUtils.changeTwoDecimal(GameCfg.RoomGameData.players[1].result.userProfitRate) + '%'

            this.selfResultLabel[2].node.color = new cc.Color().fromHEX('#31a633');
            this.selfResultLabel[3].node.color = new cc.Color().fromHEX('#31a633');
            this.selfResultLabel[4].node.color = new cc.Color().fromHEX('#31a633');

            this.otherResultLabel[2].node.color = new cc.Color().fromHEX('#e94343');
            this.otherResultLabel[3].node.color = new cc.Color().fromHEX('#e94343');
            this.otherResultLabel[4].node.color = new cc.Color().fromHEX('#e94343');

            GameCfg.RoomGameData.players[0].result.userProfitRate = GameCfg.allRate * 100;
            GameCfg.RoomGameData.players[1].result.rank = 1;
            GameCfg.RoomGameData.players[0].result.rank = 2;
        }

        if (GameCfg.allRate > 0) {
            this.selfResultLabel[5].node.color = new cc.Color().fromHEX('#e94343');
        } else {
            this.selfResultLabel[5].node.color = new cc.Color().fromHEX('#31a633');
        }

        if (GameCfg.RoomGameData.players[1].result.userProfitRate > 0) {
            this.otherResultLabel[5].node.color = new cc.Color().fromHEX('#e94343');
        }
        else {
            this.otherResultLabel[5].node.color = new cc.Color().fromHEX('#31a633');
        }


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
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
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

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 3);
            this.node.active = false;
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }
        //训练该股
        else if (name == 'pk_jsbt_xl') {
            if (!this.EnterGameLayer) {
                GlobalEvent.emit(EventCfg.LOADINGSHOW);
                LoadUtils.loadRes('Prefabs/enterXLGame', (pre) => {
                    this.flag = false;
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
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GameCfg.fill = [];
            GameCfg.fill.length = 0;
            GameCfg.allRate = 0;

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 1);
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;

            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, UpGameOpt.arrOpt)
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            //  GlobalEvent.emit(EventCfg.PKFUPAN, 1);
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }
        //tr复盘
        else if (name == 'Btn_fupan_other') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GameCfg.fill = [];
            GameCfg.fill.length = 0;
            GameCfg.allRate = 0;

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 2);
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;

            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, GameCfg.RoomGameData.players[1].ops.items)
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }

        else if (name == 'lx_fx') {
            LLWSDK.getSDK().shareAppMessage();
        }

    }

    onQuitGame() {
        this.flag = false;
        GameCfg.data[0].data = [];
        GameCfg.huizhidatas = 0;
        GameCfg.allRate = 0;
        GameCfg.finalfund = 0;
        GameCfg.GAMEFUPAN = false;
        GameCfg.history.allRate = 0;
        StrategyAIData.onClearData();
        GameCfg.enterGameConf = null;
        GameCfg.RoomGameData = null;
        GlobalEvent.emit(EventCfg.LEAVEGAME);
    }

    onDestroy() {
        LoadUtils.releaseRes('Prefabs/enterXLGame');
        GlobalEvent.off(EventCfg.LEVELCHANGE);
        GlobalEvent.off(EventCfg.EXPCHANGE);
    }

}
