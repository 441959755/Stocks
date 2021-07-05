import { pb } from "../../protos/proto";
import GameData from "../GameData";
import ComUtils from "../Utils/ComUtils";
import GameCfg from "./GameCfg";
import StrategyAIData from "./StrategyAIData";
import GameCfgText from "../GameText";
import UpGameOpt from "../global/UpGameOpt";
import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import LoadUtils from '../Utils/LoadUtils'

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    gameResult = null;

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


    @property(cc.Prefab)
    EnterGameBox: cc.Prefab = null;

    EnterGameLayer: cc.Node = null;

    onShow() {

        let gpData = GameCfg.data[0].data;
        this.codeLabel.string = '股票名称：' + GameCfg.data[0].name + '    ' + GameCfg.data[0].code;
        this.codeTimeLabel.string = '训练时段：' + ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        let rate = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2)
        this.HasRisen && (this.HasRisen.string = rate + '%')
        if (parseInt(rate) < 0) {
            this.HasRisen.node.color = cc.Color.GREEN;
        } else {
            this.HasRisen.node.color = cc.Color.RED;
        }

        //游戏结果 {"id":1278,"capital":500,"players":[{"gd":{"uid":1000952,"nickname":"156151","icon":"default.jpg","properties":["9500","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],"counters":[{},{},{},{"win":1},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],"smlxState":{"resetTs":"1624501946","lastMonthReportTs":"1624501946","goldInit":"100000","gold":"76986"},"today":"20210630","todayTimes":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"tasks":{"study":[{},{"taskId":1},{"taskId":2},{"taskId":3},{"taskId":4},{"taskId":5},{"taskId":6},{"taskId":7}],"daily":[{},{"taskId":1},{"taskId":2},{"taskId":3}]}},"ops":{},"result":{"uid":1000952,"gType":"JJ_PK","quotesCode":603316,"kType":"Day","kFrom":"20170619","kTo":"20180703","stockProfitRate":-36.36363636363636,"userCapital":"500","ts":"1625031004","rank":1,"refId":"1278"},"curPos":"105"},

        //   {"gd":{"uid":207361,"nickname":"新手","icon":"icon/default.jpg","properties":["0","0","0","0","4","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],"counters":[{"win":52,"lose":99},{"game":"JJ_PK","win":95,"lose":57},{"game":"JJ_DuoKong","win":68,"lose":94},{"game":"ShuangMang","win":80,"lose":32},{"game":"DingXiang","win":63,"lose":58},{"game":"FenShi","win":5,"lose":83},{"game":"QiHuo","win":27,"lose":19},{"game":"GeGuJingChai","win":11,"lose":6},{"game":"DaPanJingChai","win":14,"lose":41},{"game":"JJ_ChuangGuan","win":97,"lose":79},{"game":"MoNiChaoGu","win":74,"lose":39},{"game":"TiaoJianDan","win":59,"lose":2},{"game":"ChaoGuDaSai","win":65,"lose":3},{"win":52,"lose":74},{"win":59,"lose":63},{"game":"JJ_QiHuo","win":30,"lose":70},{"game":"TiaoZhan","win":83,"lose":9},{"game":"ZhiBiao","win":8,"lose":8},{"win":81,"lose":71},{"win":69,"lose":6},{"win":5,"lose":99},{"win":30,"lose":49},{"win":58,"lose":66},{"win":34,"lose":95},{"win":84,"lose":74},{"win":37,"lose":57},{"win":27,"lose":40},{"win":39,"lose":87},{"win":32,"lose":13},{"win":43,"lose":49}]},"ops":{"items":[{"opId":"Ask","kOffset":141},{"opId":"Bid","kOffset":247},{"opId":"Ask","kOffset":252},{"opId":"Bid","kOffset":253},{"opId":"Ask","kOffset":254},{"opId":"Bid_Force","kOffset":255}]},"result":{"uid":207361,"gType":"JJ_PK","quotesCode":603316,"kType":"Day","kFrom":"20170619","kTo":"20180703","stockProfitRate":-36.36363636363636,"userProfitRate":-29.923098190489473,"userCapital":"500","userProfit":"-149","ts":"1625031004","rank":2,"refId":"1278"},"curPos":"254"}]}

        let userProfitRate1 = this.gameResult.players[0].result.userProfitRate || 0;
        if (this.gameResult.players[0].giveup || userProfitRate1 == 0 && !this.gameResult.players[0].ops.itmes) {
            userProfitRate1 = -999;
        }
        let userProfitRate2 = this.gameResult.players[1].result.userProfitRate || 0;
        if (this.gameResult.players[1].giveup || userProfitRate2 == 0 && !this.gameResult.players[1].ops.itmes) {
            userProfitRate2 = -999;
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

            userName.string = this.gameResult.players[0].gd.uid;
            userLevel.string = 'LV: ' + this.gameResult.players[0].gd.properties[pb.GamePropertyId.Level];
            userExp.string = 'EXP: ' + this.gameResult.players[0].gd.properties[pb.GamePropertyId.Exp] + '/' + GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];

            userHead.spriteFrame = GameData.headImg;

            UpGameOpt.ChanagekOffset(this.gameResult.players[0].ops.items);
            UpGameOpt.ChanagekOffset(this.gameResult.players[1].ops.items);

            //消极
            if (userProfitRate1 == -999 && !this.gameResult.players[0].ops.items) {

                loseSp.active = true;
                winSp.active = false;
                xj.active = true;
                this.onResultAward(3, this.selfResultLabel, userProfitRate1);

            }
            //逃跑
            else if (this.gameResult.players[0].giveup) {

                loseSp.active = true;
                winSp.active = false;
                taopao.active = true;
                this.onResultAward(4, this.selfResultLabel, userProfitRate1);

            }
            else if (userProfitRate1 > userProfitRate2) {
                loseSp.active = false;
                winSp.active = true;
                this.onResultAward(1, this.selfResultLabel, userProfitRate1);

            }
            else if (userProfitRate1 < userProfitRate2) {
                loseSp.active = true;
                winSp.active = false;
                this.onResultAward(2, this.selfResultLabel, userProfitRate1);

            }
        }

        {
            let userName = this.player2.getChildByName('username').getComponent(cc.Label);
            let userLevel = this.player2.getChildByName('userLevel').getComponent(cc.Label);
            let userExp = this.player2.getChildByName('userExp').getComponent(cc.Label);
            let userHead = this.player2.getChildByName('userHead').getComponent(cc.Sprite);
            let winSp = this.player2.getChildByName('jj_js_win');
            let loseSp = this.player2.getChildByName('jj_js_lose');

            let xj = this.player1.getChildByName('jj_xj');
            let taopao = this.player1.getChildByName('jj_toapao');

            userName.string = this.gameResult.players[1].gd.uid;
            userLevel.string = 'LV: ' + this.gameResult.players[1].gd.properties[pb.GamePropertyId.Level];
            userExp.string = 'EXP: ' + this.gameResult.players[1].gd.properties[pb.GamePropertyId.Exp] + '/' + GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];

            //  userHead.spriteFrame = GameData.headImg;

            //消极
            if (userProfitRate2 == -999 && !this.gameResult.players[1].ops.items) {
                loseSp.active = true;
                winSp.active = false;
                xj.active = true;
                this.onResultAward(3, this.otherResultLabel, userProfitRate2)

            }
            //逃跑
            else if (this.gameResult.players[1].giveup) {
                loseSp.active = true;
                winSp.active = false;
                taopao.active = true;
                this.onResultAward(4, this.otherResultLabel, userProfitRate2)

            }
            else if (userProfitRate1 < userProfitRate2) {
                loseSp.active = false;
                winSp.active = true;
                this.onResultAward(1, this.otherResultLabel, userProfitRate2)

            }
            else if (userProfitRate1 > userProfitRate2) {
                loseSp.active = true;
                winSp.active = false;
                this.onResultAward(2, this.otherResultLabel, userProfitRate2)

            }
        }

    }

    onEnable() {
        GameCfg.GAMEFRTD = false;
        GlobalEvent.emit(EventCfg.FILLNODEISSHOW, true);
    }

    onResultAward(status, arr, Rate) {
        if (status == 1) {

            let ArrWin = GameCfgText.gameTextCfg.pk.win;
            ArrWin.forEach(e => {
                if (e.i == pb.GamePropertyId.Gold) {
                    arr[0].string = '+ ' + e.v;
                }
                else if (e.i == pb.GamePropertyId.Exp) {
                    arr[1].string = '+ ' + e.v;
                }
                else if (e.i == pb.GamePropertyId.Fame) {
                    arr[2].string = "+ " + e.v;
                    arr[2].node.color = cc.Color.RED;
                }

            });

        }
        else if (status == 2 || status == 3 || status == 4) {
            let Arrlose = GameCfgText.gameTextCfg.pk.lose;
            Arrlose.forEach(e => {
                if (e.i == pb.GamePropertyId.Gold) {
                    arr[0].string = '+ ' + e.v;
                }
                else if (e.i == pb.GamePropertyId.Exp) {
                    arr[1].string = '+ ' + e.v;
                }
                else if (e.i == pb.GamePropertyId.Fame) {
                    arr[2].string = "" + e.v;
                    arr[2].node.color = cc.Color.GREEN;
                }
            });
        }
        if (status == 2 || status == 1) {
            if (Rate > 0) {
                arr[3].node.color = cc.Color.RED;
            } else {
                arr[3].node.color = cc.Color.GREEN;
            }
            // arr[3].string = Rate.toFixed(2) + "%";

            arr[3].string = ComUtils.changeTwoDecimal(Rate) + '%';

        }
        else {
            arr[3].node.color = cc.Color.GREEN;
            if (status == 3) {
                arr[3].string = '消极';
            } else {
                arr[3].string = '逃跑';
            }
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            GameCfg.GameType = null;
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
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, this.gameResult.players[0].ops.items)

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 2);
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, this.gameResult.players[1].ops.items)

            this.node.active = false;
            GlobalEvent.emit(EventCfg.PKFUPAN, 3);
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

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN);
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, this.gameResult.players[0].ops.items)
            GlobalEvent.emit(EventCfg.PKFUPAN, 1);
        }
        //tr复盘
        else if (name == 'Btn_fupan_other') {
            GameCfg.fill = [];
            GameCfg.fill.length = 0;
            GameCfg.allRate = 0;

            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN);
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, this.gameResult.players[1].ops.items)

            GlobalEvent.emit(EventCfg.PKFUPAN, 2);
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

        cc.director.loadScene('hall');
    }

    onDestroy() {

        UpGameOpt.clearGameOpt();
        LoadUtils.releaseRes('Prefabs/enterXLGame');
    }

}
