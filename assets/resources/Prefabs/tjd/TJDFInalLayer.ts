import { pb } from "../../../protos/proto";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import UpGameOpt from "../../../sctiprs/global/UpGameOpt";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


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

    @property(cc.Node)
    vipNode: cc.Node = null;

    onShow(all, zhichan) {
        let gpData = GameCfg.data[0].data;
        //用户信息
        this.headSp.spriteFrame = GameData.headImg;
        this.levelLa.string = 'LV:' + GameData.properties[pb.GamePropertyId.Level] || '1';
        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];
        this.expLa.string = 'EXP:' + GameData.properties[pb.GamePropertyId.Exp] + '/' + max_exp;
        this.nameLa.string = GameData.userName;

        if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
            this.vipNode.active = true;
        }
        else {
            this.vipNode.active = false;
        }

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

        // //总盈利率
        // let all = ((zhichan - 100000) / 100000 * 100).toFixed(2);

        this.labels[0].string = all + '%';
        if (parseFloat(all) > 0) {
            this.labels[0].node.color = new cc.Color().fromHEX('#e94343');
        } else if (parseFloat(all) < 0) {
            this.labels[0].node.color = new cc.Color().fromHEX('#31a633');
        } else {
            this.labels[0].node.color = cc.Color.WHITE;
        }

        let info = DrawData.getBukoCount();

        this.labels[1].string = info.yCount + '次';

        if (info.yCount > 0) {
            this.labels[1].node.color = new cc.Color().fromHEX('#e94343');
            this.labels[4].string = info.maxRate.toFixed(2) + '%';
        }
        else {
            this.labels[1].node.color = cc.Color.WHITE;
            this.labels[4].string = 0.00 + '%';
        }

        this.labels[2].string = info.sCount + '次';
        if (info.sCount > 0) {
            this.labels[2].node.color = new cc.Color().fromHEX('#31a633');
            this.labels[5].string = info.minRate.toFixed(2) + '%';
        }
        else {
            this.labels[2].node.color = cc.Color.WHITE;
            this.labels[5].string = 0.00 + '%';
        }

        this.labels[3].string = zhichan + '';

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
                userProfitRate: parseFloat(all),
                userCapital: zhichan,
                userProfit: (zhichan - 100000),
                ts: parseInt(new Date().getTime() / 1000 + ''),
                rank: 0,
                refId: 0,
                kStartup: GameData.huizhidatas - 1,
                kStop: GameCfg.huizhidatas - 1,
            }

            let CmdGameOver = {
                result: datas,
                operations: {
                    items: UpGameOpt.arrOpt,
                }
            }

            GlobalHandle.onCmdGameOverReq(CmdGameOver, null);
        }
    }


    onBtnClick(event, curdata) {

        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.parent.parent.active = false;
            UpGameOpt.clearGameOpt();
        }

        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }

        //再来一局
        else if (name == 'lx_jsbt_zlyj') {
            GameCfg.GAMEFUPAN = false;
            this.node.active = false;
            this.node.parent.parent.active = false;
            UpGameOpt.clearGameOpt();
            GlobalEvent.emit('TOAGAME');

        }

    }

}
