import { pb } from "../../protos/proto";
import UpGameOpt from "../global/UpGameOpt";
import ComUtils from "../Utils/ComUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import GameCfg from "./GameCfg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    cutNode: cc.Node = null;

    status = 0;

    cb1 = null;

    bself = null;

    @property([cc.Node])
    mzStatusNode: cc.Node[] = [];

    @property([cc.Node])
    mdStatusNode: cc.Node[] = [];

    @property(cc.Button)
    gwBtn: cc.Button = null;

    @property(cc.Button)
    cyBtn: cc.Button = null;

    onLoad() {
        GlobalEvent.on(EventCfg.CUTGAMEFUPAN, (status) => {
            if (status) {
                this.cutNode.active = true;
                this.status = status;
            }
        }, this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onGameFUPANSHOW.bind(this), this);

    }

    onDestroy() {
        this.cb1 && (clearInterval(this.cb1));
        this.cb1 = null;
        GlobalEvent.off(EventCfg.CUTGAMEFUPAN);
    }


    onGameFUPANSHOW() {
        if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {

            let pkNode = this.node.getChildByName('pk');
            pkNode.active = true;
            pkNode.getChildByName('timeLabel').active = false;
            let pkFP = pkNode.getChildByName('FUPAN');
            pkFP.active = true;
            pkFP.children[0].getComponent(cc.Label).string = GameCfg.data[0].name + '    ' + GameCfg.data[0].code;

            let kFrom = GameCfg.RoomGameData.players[0].result.kFrom;
            let kTo = GameCfg.RoomGameData.players[0].result.kTo;
            pkFP.children[1].getComponent(cc.Label).string = ComUtils.formatTime(kFrom) + '--' + ComUtils.formatTime(kTo)
            let tq = GameCfg.RoomGameData.players[0].result.stockProfitRate.toFixed(2);
            pkFP.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';
        }
    }

    start() {
        if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {
            this.node.getChildByName('JJ_DuoKong').active = true;
            this.node.getChildByName('isFC').active = false;

            this.node.getChildByName('label1').active = true;
            this.node.getChildByName('label2').active = false;

            let pkNode = this.node.getChildByName('pk');
            pkNode.active = true;
            let timeLabel = pkNode.getChildByName('timeLabel').getComponent(cc.Label);
            timeLabel.node.active = true;
            if (GameCfg.data[0].tsGameFrom && GameCfg.data[0].tsGameCur) {
                let num = GameCfg.data[0].tsGameCur - GameCfg.data[0].tsGameFrom;
                num = 3 * 60 - num;
                this.cb1 = setInterval(() => {
                    if (num <= 0) {
                        clearInterval(this.cb1);
                    }
                    timeLabel.string = '倒计时：' + ComUtils.onNumChangeTime(num);
                    num--;

                }, 1000)
            }
            else {
                let num = 3 * 60 + 3;
                this.cb1 = setInterval(() => {
                    if (num <= 0) {
                        clearInterval(this.cb1);
                    }
                    timeLabel.string = '倒计时：' + ComUtils.onNumChangeTime(num);
                    num--;
                }, 1000)
            }
        }

        if (GameCfg.GAMEFUPAN) {
            this.onGameFUPANSHOW();
        }

        this.bself = this.node.getComponent('BottomHandle');
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        //切换标签
        if (name == 'btn_cut') {
            this.status++;

            if (this.status > 4) {
                this.status = 1;
            }
            GlobalEvent.emit(EventCfg.CUTGAMEFUPAN, this.status);
        }
        else if (name == 'mzBtn') {
            this.mzStatusNode[0].active = false;
            this.mzStatusNode[1].active = true;
            this.mzStatusNode[2].active = false;

            this.gwBtn.node.active = false;
            this.cyBtn.node.active = true;

            this.mdStatusNode[2].active = true;
            this.bself.curMrCount.push(1);
            if (this.bself.roundNumber > 0) {
                let item = {
                    opId: pb.GameOperationId.Ask,
                    volume: 1,
                    kOffset: GameCfg.huizhidatas,

                }
                UpGameOpt.addOpt(item);
            }

            this.bself.setRoundNumber('mrBtn')
        }
        else if (name == 'mdBtn') {
            this.mdStatusNode[0].active = false;
            this.mdStatusNode[1].active = true;
            this.mdStatusNode[2].active = false;

            this.gwBtn.node.active = false;
            this.cyBtn.node.active = true;

            this.mzStatusNode[2].active = true;
            this.bself.curMrCount.push(1);
            this.bself._KKCount = 1;
            if (this.bself.roundNumber > 0) {
                let item = {
                    opId: pb.GameOperationId.Long,
                    volume: 1,
                    kOffset: GameCfg.huizhidatas,

                }
                UpGameOpt.addOpt(item);
            }

            this.bself.setRoundNumber('mrBtn1')
        }
        else if (name == 'pcBtn1') {
            this.mdStatusNode[1].active = false;
            this.mdStatusNode[0].active = true;
            this.mdStatusNode[2].active = false;

            this.mzStatusNode[1].active = false;
            this.mzStatusNode[0].active = true;
            this.mzStatusNode[2].active = false;

            this.gwBtn.node.active = true;
            this.cyBtn.node.active = false;

            this.bself._KKCount = 0;

            if (this.bself.roundNumber > 0) {
                let item = {
                    opId: pb.GameOperationId.Short,
                    volume: 1,
                    kOffset: GameCfg.huizhidatas,

                }
                UpGameOpt.addOpt(item);
            }
            this.bself.setRoundNumber('mcBtn1')
        }
        else if (name == 'pcBtn') {
            this.mdStatusNode[1].active = false;
            this.mdStatusNode[0].active = true;
            this.mdStatusNode[2].active = false;

            this.mzStatusNode[1].active = false;
            this.mzStatusNode[0].active = true;
            this.mzStatusNode[2].active = false;

            this.gwBtn.node.active = true;
            this.cyBtn.node.active = false;

            if (this.bself.roundNumber > 0) {
                let item = {
                    opId: pb.GameOperationId.Bid,
                    volume: 1,
                    kOffset: GameCfg.huizhidatas,

                }
                UpGameOpt.addOpt(item);
            }
            this.bself.setRoundNumber('mcBtn')
        }

    }


}
