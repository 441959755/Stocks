import { pb } from "../../protos/proto";
import GameData from "../GameData";

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

    @property(cc.Node)
    mzb: cc.Node = null;

    @property(cc.Node)
    mdb: cc.Node = null;

    @property(cc.Node)
    pcb: cc.Node = null;

    @property(cc.Node)
    pcb1: cc.Node = null;

    @property(cc.Node)
    wait: cc.Node = null;

    @property(cc.Label)
    waitName: cc.Label = null;

    @property(cc.Label)
    waitCodeTime: cc.Label = null;

    @property(cc.Label)
    waitTime: cc.Label = null;

    @property(cc.Label)
    waitLabel: cc.Label = null;

    onLoad() {
        GlobalEvent.on(EventCfg.CUTGAMEFUPAN, (status) => {
            this.wait.active = false;
            if (status) {
                this.cutNode.active = true;
                this.status = status;
                if (status == 3) {
                    this.node.getChildByName('fupan1').active = false;
                }
            }
        }, this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onGameFUPANSHOW.bind(this), this);
        this.bself = this.node.getComponent('BottomHandle');

        GlobalEvent.on(EventCfg.RAISINGLIMIT, this.getRaisingLimit.bind(this), this);

        GlobalEvent.on(EventCfg.CLEARINTERVAL, () => {
            this.cb1 && (clearInterval(this.cb1));
            this.cb1 = null;
        }, this);

        GlobalEvent.on(EventCfg.GAMEWAIT, this.onGameWaitShow.bind(this), this);

        GlobalEvent.on(EventCfg.GAMEOVEER, () => {
            if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
                let le = UpGameOpt.player1Opt.length;
                if (le > 0) {
                    if (UpGameOpt.player1Opt[le - 1].opId == pb.GameOperationId.Ask) {
                        let item = {
                            opId: pb.GameOperationId.Bid,
                            volume: 1,
                            kOffset: GameCfg.huizhidatas,
                        }
                        UpGameOpt.addOpt(item);
                    } else if (UpGameOpt.player1Opt[le - 1].opId == pb.GameOperationId.Short) {
                        let item = {
                            opId: pb.GameOperationId.Long,
                            volume: 1,
                            kOffset: GameCfg.huizhidatas,
                        }
                        UpGameOpt.addOpt(item);
                    }
                    UpGameOpt.UpGameOpt(1);
                }
            }
        }, this);

    }

    onGameWaitShow() {
        this.wait.active = true;

        this.waitName.string = GameCfg.data[0].name + '  ' + GameCfg.data[0].code;

        let gpData = GameCfg.data[0].data;

        let kFrom = gpData[GameData.huizhidatas - 1].day;

        let kTo = gpData[GameCfg.huizhidatas - 1].day;

        this.waitCodeTime.string = ComUtils.formatTime(kFrom) + '--' + ComUtils.formatTime(kTo);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.CUTGAMEFUPAN);
        GlobalEvent.off(EventCfg.GAMEFUPAN);
        GlobalEvent.off(EventCfg.RAISINGLIMIT);
        GlobalEvent.off(EventCfg.CLEARINTERVAL);
    }

    onGameFUPANSHOW() {
        let pkNode = this.node.getChildByName('pk');

        if (GameCfg.GameType == pb.GameType.JJ_PK ||
            GameCfg.GameType == pb.GameType.JJ_DuoKong ||
            GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
            pkNode.active = true;
            pkNode.getChildByName('timeLabel').active = false;
            let pkFP = pkNode.getChildByName('FUPAN');
            pkFP.active = true;
            pkFP.children[0].getComponent(cc.Label).string = GameCfg.data[0].name + '    ' + GameCfg.data[0].code;

            let gpData = GameCfg.data[0].data;
            pkFP.children[1].getComponent(cc.Label).string = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

            let tq = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);

            pkFP.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';
        } else {
            pkNode.active = false;
        }
    }

    onEnable() {
        if (GameCfg.GameType == pb.GameType.JJ_PK ||
            GameCfg.GameType == pb.GameType.JJ_DuoKong ||
            GameCfg.GameType == pb.GameType.JJ_ChuangGuan || GameCfg.JJ_XUNLIAN) {
            if (GameCfg.GAMEFUPAN) {
                this.onGameFUPANSHOW();
            } else {

                this.node.getChildByName('isFC').active = false;

                if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
                    this.node.getChildByName('JJ_DuoKong').active = true;
                } else if (GameCfg.GameType == pb.GameType.JJ_PK
                    || GameCfg.GameType == pb.GameType.JJ_ChuangGuan || GameCfg.JJ_XUNLIAN) {
                    this.node.getChildByName('isFC').active = true;
                }

                this.node.getChildByName('label1').active = true;
                this.node.getChildByName('label2').active = false;

                let pkNode = this.node.getChildByName('pk');
                pkNode.active = true;

                let timeLabel = pkNode.getChildByName('timeLabel').getComponent(cc.Label);
                timeLabel.node.active = true;
                timeLabel.string = '';
                this.waitTime.string = '';
                if (GameCfg.data[0].tsGameFrom && GameCfg.data[0].tsGameCur) {
                    let num = GameCfg.data[0].tsGameCur - GameCfg.data[0].tsGameFrom;
                    let curTimes = parseInt(new Date().getTime() / 1000 + '');
                    let endTiems = 3 * 60 - num - 8 + curTimes;
                    this.cb1 = setInterval(() => {
                        let num = endTiems - parseInt(new Date().getTime() / 1000 + '');
                        if (num <= 0) {
                            clearInterval(this.cb1);
                        }
                        if (num <= 180) {
                            timeLabel.string = '倒计时：' + ComUtils.onNumChangeTime(num);
                            this.waitTime.string = '倒计时：' + ComUtils.onNumChangeTime(num);
                        }

                        num--;

                    }, 1000)
                } else {
                    let curTimes = parseInt(new Date().getTime() / 1000 + '');
                    let endTiems = 3 * 60 + 2 + curTimes;
                    this.cb1 = setInterval(() => {
                        let num = endTiems - parseInt(new Date().getTime() / 1000 + '');
                        if (num <= 0) {
                            if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan || GameCfg.JJ_XUNLIAN) {
                                GlobalEvent.emit(EventCfg.GAMEOVEER);
                            }
                            clearInterval(this.cb1);
                        }
                        timeLabel.string = '倒计时：' + ComUtils.onNumChangeTime(num);
                        this.waitTime.string = '倒计时：' + ComUtils.onNumChangeTime(num);
                        num--;
                    }, 1000)
                }
            }
        }
    }

    onBtnClick(event, data) {

        let name = event.target.name;

        //切换标签
        if (name == 'btn_cut') {
            this.status++;
            if (this.status > 4) {
                this.status = 1;
            }
            GlobalEvent.emit(EventCfg.PKFUPAN, this.status);
        } else if (name == 'mzBtn') {
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
        } else if (name == 'mdBtn') {
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
                    opId: pb.GameOperationId.Short,
                    volume: 1,
                    kOffset: GameCfg.huizhidatas,

                }
                UpGameOpt.addOpt(item);
            }
            this.bself.setRoundNumber('mrBtn1')
        } else if (name == 'pcBtn1') {
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
                    opId: pb.GameOperationId.Long,
                    volume: 1,
                    kOffset: GameCfg.huizhidatas,
                }
                UpGameOpt.addOpt(item);
            }
            this.bself.setRoundNumber('mcBtn1', 1)
        } else if (name == 'pcBtn') {
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
            this.bself.setRoundNumber('mcBtn', 1)
        } else if (name == 'dkdz_mz2') {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '涨停板不能买涨！')
        } else if (name == 'dkdz_md2') {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '跌停板不能买跌！')
        } else if (name == 'dkdz_pc1') {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '涨停板不能买跌中平仓!')
        } else if (name == 'dkdz_pc2') {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '跌停板不能买涨中平仓！')
        }

    }

    //获取涨停板
    getRaisingLimit(limitUP) {

        if (GameCfg.GameType == pb.GameType.JJ_PK ||
            GameCfg.GameType == pb.GameType.JJ_DuoKong ||
            GameCfg.GameType == pb.GameType.JJ_ChuangGuan || GameCfg.JJ_XUNLIAN) {

            this.mzb.active = false;
            this.mdb.active = false;
            this.pcb.active = false;
            this.pcb1.active = false;
            //涨
            if (limitUP == 1) {
                this.mzb.active = true;
                if (this.bself._KKCount) {
                    // this.pcb.active = true;
                    this.pcb1.active = true;
                }
            }
            //跌
            else if (limitUP == 2) {
                this.mdb.active = true;
                if (this.bself._KKCount) {

                } else {
                    this.pcb.active = true;
                    //  this.pcb1.active = true;
                }
            }
        }

    }

    onDisable() {
        this.node.getChildByName('pk').getChildByName('FUPAN').active = false;
        this.cb1 && (clearInterval(this.cb1));
        this.cb1 = null;
        this.gwBtn.node.active = true;
        this.cyBtn.node.active = false;
        this.mzStatusNode[0].active = true;
        this.mzStatusNode[0].children[0].active = false;
        this.mzStatusNode[1].active = false;
        this.mzStatusNode[2].active = false;
        this.mzStatusNode[2].children[0].active = false;
        this.mdStatusNode[0].active = true;
        this.mdStatusNode[0].children[0].active = false;
        this.mdStatusNode[1].active = false;
        this.mdStatusNode[2].active = false;
        this.mdStatusNode[2].children[0].active = false;

        this.mzb.active = false;
        this.mdb.active = false;
        this.pcb.active = false;
        this.pcb1.active = false;
    }

}
