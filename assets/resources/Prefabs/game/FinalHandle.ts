
import { pb } from "../../../protos/proto";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import StrategyAIData from "../../../sctiprs/game/StrategyAIData";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EnterGameControl from "../../../sctiprs/global/EnterGameControl";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import UpGameOpt from "../../../sctiprs/global/UpGameOpt";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameTipsLabel: cc.Label = null;

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

    @property(cc.Label)
    AllRise: cc.Label = null;

    @property(cc.Label)
    yingCont: cc.Label = null;

    @property(cc.Label)
    kunCount: cc.Label = null;

    @property(cc.Node)
    qhxl_kui: cc.Node = null;

    @property(cc.Node)
    qhxl_zhuan: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    contentZB: cc.Node = null;

    @property(cc.Node)
    DXXLGG: cc.Node = null;

    @property([cc.Node])
    boxs: cc.Node[] = [];

    @property(cc.Node)
    vipNode: cc.Node = null;

    protected onShow() {

        let gpData = GameCfg.data[0].data;

        if (!gpData || gpData.length <= 0) { return }

        this.DXXLGG.active = false;
        if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.DXXLGG.active = true;
        }

        //用户信息
        this.headImg.spriteFrame = GameData.headImg;
        this.levelLabel.string = 'LV:  ' + GameData.properties[pb.GamePropertyId.Level] || '1';
        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];
        this.expLabel.string = 'EXP:' + GameData.properties[pb.GamePropertyId.Exp] + '/' + max_exp;
        this.userName.string = GameData.userName;

        if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
            this.vipNode.active = true;
        }
        else {
            this.vipNode.active = false;
        }

        this.contentZB.active = false;
        this.content.active = false;
        //对局数据
        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.contentZB.active = true;
            this.showContentZB();
        } else {
            this.content.active = true;
            this.showContent();

            if (GameCfg.GameType == pb.GameType.ShuangMang) {
                this.boxs[0].active = true;
                this.boxs[1].active = true;
                this.boxs[2].active = true;

                this.boxs[0].children[1].getComponent(cc.Label).string = GameData.SmxlState.gold;
                this.boxs[1].children[1].getComponent(cc.Label).string = parseInt((GameCfg.finalfund - GameCfg.ziChan) + '') + ''
                this.boxs[2].children[1].getComponent(cc.Label).string = parseInt(GameCfg.finalfund + '') + '';
            }
            else {
                this.boxs[0].active = false;
                this.boxs[1].active = false;
                this.boxs[2].active = false;
            }
        }

        //复盘中不保存记录
        if (!GameCfg.GAMEFUPAN) {
            let datas = {
                uid: GameData.userID,
                gType: GameCfg.GameType,
                quotesCode: gpData[0].code || parseInt(GameCfg.data[0].code),
                kType: GameCfg.enterGameCache.ktype,
                kFrom: parseInt(ComUtils.fromatTime1(gpData[GameData.huizhidatas - 1].day)),

                kTo: parseInt(ComUtils.fromatTime1(gpData[GameCfg.huizhidatas - 1].day)),
                stockProfitRate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100),
                userProfitRate: (GameCfg.allRate * 100),
                userCapital: GameData.SmxlState.gold,
                userProfit: (GameCfg.finalfund - GameCfg.ziChan),
                ts: parseInt(new Date().getTime() / 1000 + ''),
                rank: 0,
                refId: 0,
                kStartup: GameData.huizhidatas - 1,
                kStop: GameCfg.huizhidatas - 1,
            }
            if (GameCfg.GameType == pb.GameType.ShuangMang) {
                datas.userCapital = GameData.SmxlState.gold;
            } else {
                datas.userCapital = GameCfg.ziChan;
            }

            datas.rank = datas.userProfitRate >= datas.stockProfitRate ? 1 : 2;

            datas.refId = 0;

            let CmdGameOver;

            this.saveHoistoryInfo(datas.ts);

            if (GameCfg.GameType != pb.GameType.ShuangMang) {
                CmdGameOver = {
                    result: datas,
                    operations: {
                        items: UpGameOpt.arrOpt,
                    }
                }
            } else {
                CmdGameOver = {
                    result: datas,
                }

            }
            GlobalHandle.onCmdGameOverReq(CmdGameOver);
        }
    }

    showContentZB() {
        let info = StrategyAIData.onCompareReult();
        let gpData = GameCfg.data[0].data;
        let boxs = this.contentZB.children;
        {
            let la = boxs[0].getChildByName('label1').getComponent(cc.Label);
            la && (la.string = GameCfg.data[0].name)

            let la1 = boxs[0].getChildByName('label2').getComponent(cc.Label);
            let code = GameCfg.data[0].code + '';
            if (code.length >= 7) {
                code = code.slice(1);
            }
            la1 && (la1.string = code);
        }

        {
            let la = boxs[1].getChildByName('label1').getComponent(cc.Label);
            la && (la.string = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day))
        }

        {
            let la = boxs[2].getChildByName('label1').getComponent(cc.Label);
            let rate = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2)
            la && (la.string = rate + '%')
            if (parseInt(rate) < 0) {
                la.node.color = new cc.Color().fromHEX('#31a633');
            } else {
                la.node.color = new cc.Color().fromHEX('#e94343');
            }

        }

        {
            let la = boxs[3].getChildByName('richText').getComponent(cc.Label);
            la && (la.string = GameCfg.GameSet.select + '/' + GameCfg.GameSet.strategy)
        }

        {
            //策略信号次数   相似度次数
            let la = boxs[4].getChildByName('richText').getComponent(cc.Label);

            la.string = StrategyAIData.buyCount + '';


            let la1 = boxs[4].getChildByName('richText1').getComponent(cc.Label);

            la1.string = info.high.length + '';

        }

        {
            //策略信号收益    相似度次数
            let la = boxs[5].getChildByName('richText').getComponent(cc.Label);
            la.string = (StrategyAIData.profitrate * 100).toFixed(2) + '%';

            if (StrategyAIData.profitrate < 0) {
                la.node.color = new cc.Color().fromHEX('#31a633');
            } else {
                la.node.color = new cc.Color().fromHEX('#e94343');
            }

            let la1 = boxs[5].getChildByName('richText1').getComponent(cc.Label);
            la1.string = info.middle.length + '';
        }

        { //你的训练收益    相似度次数
            let la = boxs[6].getChildByName('richText').getComponent(cc.Label);
            la.string = (GameCfg.allRate * 100).toFixed(2) + '%';
            if (GameCfg.allRate < 0) {
                la.node.color = new cc.Color().fromHEX('#31a633');
            } else {
                la.node.color = new cc.Color().fromHEX('#e94343');
            }

            let la1 = boxs[6].getChildByName('richText1').getComponent(cc.Label);
            la1.string = info.low.length + '';
        }

        {
            //综合相似度
            let la = boxs[7].getChildByName('richText').getComponent(cc.Label);

            let point = (3 * info.high.length + info.middle.length) / (3 * info.high.length + info.middle.length + 2 * info.low.length) * 100;
            if ((3 * info.high.length + info.middle.length + 2 * info.low.length) == 0) {
                point = 0;
            }

            la.string = (point).toFixed(2) + '%';
            let node1 = boxs[7].getChildByName('node1');
            let node2 = boxs[7].getChildByName('node2');
            let node3 = boxs[7].getChildByName('node3');

            node1.active = false;
            node2.active = false;
            node3.active = false;
            if (point >= 85) {
                node1.active = true;
            }
            else if (point >= 60) {
                node2.active = true;
            }
            else {
                node3.active = true;
            }
        }
    }

    showContent() {

        let gpData = GameCfg.data[0].data;
        this.nameLabel.string = GameCfg.data[0].name;
        let code = GameCfg.data[0].code + '';

        if (code.length >= 7 && GameCfg.GameType != pb.GameType.QiHuo) {
            code = code.slice(1);
        }

        this.maLabel.string = code;

        this.timeLabel.string = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        //同期涨幅
        let tq = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);

        this.riseLabel.string = tq + '%';
        if (parseFloat(tq) > 0) {
            this.riseLabel.node.color = new cc.Color().fromHEX('#e94343');
        } else if (parseFloat(tq) < 0) {
            this.riseLabel.node.color = new cc.Color().fromHEX('#31a633');
        } else {
            this.riseLabel.node.color = cc.Color.WHITE;
        }

        //总盈利率
        let all = (GameCfg.allRate * 100).toFixed(2);

        this.AllRise.string = all + '%';

        if (parseFloat(all) > 0) {
            this.AllRise.node.color = new cc.Color().fromHEX('#e94343');
        } else if (parseFloat(all) < 0) {
            this.AllRise.node.color = new cc.Color().fromHEX('#31a633');
        } else {
            this.AllRise.node.color = cc.Color.WHITE;
        }

        let info = DrawData.getBukoCount();

        this.yingCont.string = info.yCount + '次';

        if (info.yCount > 0) {
            this.yingCont.node.color = new cc.Color().fromHEX('#e94343');
        } else {
            this.yingCont.node.color = cc.Color.WHITE;
        }

        this.kunCount.string = info.sCount + '次';

        if (info.sCount > 0) {
            this.kunCount.node.color = new cc.Color().fromHEX('#31a633');
        } else {
            this.kunCount.node.color = cc.Color.WHITE;
        }
        if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.nameTipsLabel.string = '品种合约';
            this.maLabel.string = '';
            if (parseFloat(all) > 0) {
                this.qhxl_zhuan.active = true;
            } else if (parseFloat(all) < 0) {
                this.qhxl_kui.active = true;
            }
        }
    }

    saveHoistoryInfo(ts) {

        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            cc.sys.localStorage.setItem(ts + 'set', JSON.stringify(GameCfg.GameSet));
            let AiRate = StrategyAIData.profitrate * 100;
            cc.sys.localStorage.setItem(ts + 'AIRATE', AiRate);
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            GlobalEvent.emit(EventCfg.LEAVEGAME);
        }
        //再来一局
        else if (name == 'lx_jsbt_zlyj') {

            GlobalEvent.emit(EventCfg.LEAVEGAME);

            if (!this.gotoGame()) {
                return;
            }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            if (GameCfg.GameType == pb.GameType.ShuangMang) {
                GameCfgText.getGPSMByRandom();
            }

            else if (GameCfg.GameType == pb.GameType.DingXiang) {
                GameCfgText.getGPDXByRandom();
            }

            else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                GameCfgText.getGPZBByRandom();
            }

            else if (GameCfg.GameType == pb.GameType.QiHuo) {
                GameCfgText.getQHQHByRandom();
            }

            GlobalHandle.enterGameSetout(GameCfg.enterGameCache, () => {

                GameData.huizhidatas = GameCfg.data[0].data.length - (GameCfg.data[0].data.length - 100);
                GameCfg.huizhidatas = GameCfg.data[0].data.length - (GameCfg.data[0].data.length - 100);

                if (GameCfg.data[0].data.length - GameData.huizhidatas < 100) {
                    GameData.huizhidatas = GameCfg.data[0].data.length - 100;
                    GameCfg.huizhidatas = GameCfg.data[0].data.length - 100;
                }

                GlobalEvent.emit('LOADGAME');
            });
        }

        else if (name == 'lx_jsbt_xl') {
            GlobalEvent.emit(EventCfg.LEVELCHANGE);

            GlobalEvent.emit(EventCfg.LEAVEGAME);

            if (!this.gotoGame()) {
                return;
            }

            GlobalHandle.onCmdGameStartReq(() => {
                GameData.huizhidatas = GameCfg.data[0].data.length - (GameCfg.data[0].data.length - 100);
                GameCfg.huizhidatas = GameCfg.data[0].data.length - (GameCfg.data[0].data.length - 100);
                let gpData = GameCfg.data[0].data;
                GameCfg.GameSet.search = GameCfg.data[0].code;
                GameCfg.GameSet.year = gpData[GameData.huizhidatas - 1].day;
                GlobalEvent.emit('LOADGAME');
            });
        }
        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }
    }


    onDisable() {
        this.qhxl_zhuan.active = false;
        this.qhxl_kui.active = false;
        GameCfg.allRate = 0;
        GameCfg.finalfund = 0;
        //  GameCfg.GAMEFUPAN = false;
        GameCfg.history.allRate = 0;
        StrategyAIData.onClearData();
        GameCfg.RoomGameData = null;
    }

    gotoGame() {

        if (GameData.properties[pb.GamePropertyId.Gold] < 500) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
            return false;
        }

        let gameCount = EnterGameControl.onCurDXIsEnterGame();

        let curState, adSucceed;
        if (gameCount.status == 0) {
            curState = 0;
        }
        else if (gameCount.status == 1) {
            curState = 1;
        }
        else if (gameCount.status == 2) {
            let count = cc.sys.localStorage.getItem('ADSUCCEED' + GameCfg.GameType);
            if (count) {
                adSucceed = parseInt(count);
            }
            curState = 2;
        }
        else {
            curState = 3;
        }

        if ((curState == 2 || curState == 3) && !adSucceed) {
            GlobalEvent.emit("OPENUNLOCKBOX");
            return false;
        }

        return true;
    }

}
