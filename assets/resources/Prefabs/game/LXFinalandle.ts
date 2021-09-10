
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import StrategyAIData from "../../../sctiprs/game/StrategyAIData";
import GameData from "../../../sctiprs/GameData";
import UpGameOpt from "../../../sctiprs/global/UpGameOpt";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

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

    onShow() {
        if (GameCfg.GAMEFUPAN) {
            return;
        }

        GlobalEvent.emit(EventCfg.CLEARINTERVAL);

        let gpData = GameCfg.data[0].data;
        this.codeLabel.string = '股票名称：' + GameCfg.data[0].name + '    ' + GameCfg.data[0].code;
        this.codeTimeLabel.string = '训练时段：' + ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        GameCfg.allRate = (GameCfg.allRate * 100);
        GameCfg.RoomGameData.players[0].result = { userProfitRate: GameCfg.allRate };

        let rate = ComUtils.changeTwoDecimal((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100)

        this.HasRisen && (this.HasRisen.string = rate + '%')

        if (parseInt(rate) < 0) {
            this.HasRisen.node.color = cc.Color.GREEN;
        } else {
            this.HasRisen.node.color = cc.Color.RED;
        }

        {
            let userName = this.player1.getChildByName('username').getComponent(cc.Label);

            let userHead = this.player1.getChildByName('userHead').getComponent(cc.Sprite);
            let winSp = this.player1.getChildByName('jj_js_win');
            let loseSp = this.player1.getChildByName('jj_js_lose');

            userName.string = GameData.userName;

            userHead.spriteFrame = GameData.headImg;

            if (GameCfg.allRate == 0 && UpGameOpt.arrOpt.length == 0) {
                this.selfRank = 2;
                //  xj.active = true;
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

            let userHead = this.player2.getChildByName('userHead').getComponent(cc.Sprite);
            let winSp = this.player2.getChildByName('jj_js_win');
            let loseSp = this.player2.getChildByName('jj_js_lose');

            if (GameData.Players[1].nickname || GameData.Players[1].nick) {
                userName.string = GameData.Players[1].nickname || GameData.Players[1].nick;
            }

            if (GameData.Players[1].icon) {
                userHead.spriteFrame = GameData.Players[1].icon;
            }

            if (this.selfRank == 1) {
                loseSp.active = true;
            }

            else if (this.selfRank == 2) {

                winSp.active = true;
            }
        }

        this.onShowResult();

    }

    onShowResult() {
        let info = DrawData.getBukoCount();
        this.selfResultLabel[0].string = info.yCount + '次';
        this.selfResultLabel[1].string = info.sCount + '次';
        this.selfResultLabel[2].string = ComUtils.changeTwoDecimal(GameCfg.allRate) + '%';

        if (info.sCount > 0) {
            this.selfResultLabel[1].node.color = cc.Color.GREEN;
        } else {
            this.selfResultLabel[1].node.color = cc.Color.WHITE;
        }

        if (info.yCount > 0) {
            this.selfResultLabel[0].node.color = cc.Color.RED;
        } else {
            this.selfResultLabel[0].node.color = cc.Color.WHITE;
        }

        if (GameCfg.allRate > 0) {
            this.selfResultLabel[2].node.color = cc.Color.RED;
        } else {
            this.selfResultLabel[2].node.color = cc.Color.GREEN;
        }

        let info1 = DrawData.getWinLosCountByOps(UpGameOpt.player1Opt);

        this.otherResultLabel[0].string = info1.yCount + '次';
        this.otherResultLabel[1].string = info1.sCount + '次';
        this.otherResultLabel[2].string = ComUtils.changeTwoDecimal(GameCfg.RoomGameData.players[1].result.userProfitRate) + '%';

        if (info1.sCount > 0) {
            this.otherResultLabel[1].node.color = cc.Color.GREEN;
        } else {
            this.otherResultLabel[1].node.color = cc.Color.WHITE;
        }

        if (info1.yCount > 0) {
            this.otherResultLabel[0].node.color = cc.Color.RED;
        } else {
            this.otherResultLabel[0].node.color = cc.Color.WHITE;
        }

        if (GameCfg.RoomGameData.players[1].result.userProfitRate > 0) {
            this.otherResultLabel[2].node.color = cc.Color.RED;
        } else {
            this.otherResultLabel[2].node.color = cc.Color.GREEN;
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
            GameCfg.GAMEFUPAN = false;
            GameCfg.history.allRate = 0;
            StrategyAIData.onClearData();
            GameCfg.allRate = 0;
            GameCfg.finalfund = 0;
            GameCfg.fill = [];
            GameCfg.blockHistoy = [];
            GameCfg.mark = [];
            GameCfg.notice = [];

            GameCfg.huizhidatas = GameData.huizhidatas

            cc.director.loadScene('game');
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
            GlobalEvent.emit(EventCfg.GAMEFUPANOPT, UpGameOpt.player1Opt)

            this.node.active = false;
            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, 3);
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


}
