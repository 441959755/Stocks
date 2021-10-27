import { pb } from "../../../protos/proto";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import ComUtils from "../../../sctiprs/Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    headSp: cc.Sprite = null;

    @property(cc.Label)
    nameLa: cc.Label = null;

    @property(cc.Label)
    levelLa: cc.Label = null;

    @property(cc.Label)
    expLa: cc.Label = null;
    //
    @property(cc.Label)
    gpName: cc.Label = null;

    @property(cc.Label)
    gpCode: cc.Label = null;

    @property(cc.Label)
    xlTime: cc.Label = null;

    @property(cc.Label)
    tqzf: cc.Label = null;

    //
    @property([cc.Label])
    labels: cc.Label[] = [];

    onShow(allLv) {

        let gpData = GameCfg.data[0].data;
        //用户信息
        this.headSp.spriteFrame = GameData.headImg;
        this.levelLa.string = 'LV:' + GameData.properties[pb.GamePropertyId.Level] || '1';
        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];
        this.expLa.string = 'EXP:' + GameData.properties[pb.GamePropertyId.Exp] + '/' + max_exp;
        this.nameLa.string = GameData.userName;

        //sys
        this.gpName.string = GameCfg.data[0].name;

        let code = GameCfg.data[0].code;
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this.gpCode.string = code;

        this.xlTime.string = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        let tqzf = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
        this.tqzf.string = tqzf + '%';

        if (parseFloat(tqzf) < 0) {
            this.tqzf.node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.tqzf.node.color = new cc.Color().fromHEX('#e94343');
        }

        //
        //总盈利率

        this.labels[0].string = allLv + '%';
        if (parseFloat(allLv) > 0) {
            this.labels[0].node.color = new cc.Color().fromHEX('#e94343');
        } else if (parseFloat(allLv) < 0) {
            this.labels[0].node.color = new cc.Color().fromHEX('#31a633');
        } else {
            this.labels[0].node.color = cc.Color.WHITE;
        }

        let info = DrawData.getBukoCount();
        this.labels[1].string = info.yCount + '次';

        if (info.yCount > 0) {
            this.labels[1].node.color = new cc.Color().fromHEX('#e94343');
        }
        else {
            this.labels[1].node.color = cc.Color.WHITE;
        }

        this.labels[2].string = info.sCount + '次';
        if (info.sCount > 0) {
            this.labels[2].node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.labels[2].node.color = cc.Color.WHITE;
        }

        if (!GameCfg.GAMEFUPAN) {

            let gpData = GameCfg.data[0].data;
            let datas = {
                uid: GameData.userID,
                gType: GameCfg.GameType,
                quotesCode: parseInt(GameCfg.data[0].code),
                kType: GameCfg.enterGameCache.ktype,
                kFrom: parseInt(ComUtils.fromatTime1(gpData[GameData.huizhidatas - 1].day)),

                kTo: parseInt(ComUtils.fromatTime1(gpData[GameCfg.huizhidatas - 1].day)),
                stockProfitRate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100),
                userProfitRate: (GameCfg.allRate * 100),
                userCapital: GameCfg.ziChan,
                userProfit: (GameCfg.finalfund - GameCfg.ziChan),
                ts: parseInt(new Date().getTime() / 1000 + ''),
                rank: 0,
                refId: 0,
                kStartup: GameData.huizhidatas - 1,
                kStop: GameCfg.huizhidatas - 1,
            }

            let CmdGameOver = {
                result: datas,
            }

            GlobalHandle.onCmdGameOverReq(CmdGameOver);
        }

    }

    onBtnClick(event, curdata) {

        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.parent.active = false;
        }

        // //复盘
        // else if (name == 'lx_jsbt_qd') {
        //     this.node.active = false;
        //     GameCfg.GAMEFUPAN = true;
        //     GlobalEvent.emit(EventCfg.GAMEFUPAN);

        // }

        //再来一局
        if (name == 'lx_jsbt_zlyj') {

            // if (GameData.properties[pb.GamePropertyId.Gold] < GameCfgText.gameTextCfg.tjdxl.cost[0].v) {
            //     GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
            //     return;
            // }
            // else if (this.curState == 3) {
            //     GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
            //     return;
            // }

            GameCfg.GAMEFUPAN = false;
            this.node.active = false;
            this.node.parent.parent.active = false;
            GlobalEvent.emit('TOAGAME');
        }

    }
}
