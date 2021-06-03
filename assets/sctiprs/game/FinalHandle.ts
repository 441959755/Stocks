import GameCfg from "./GameCfg";
import ActionUtils from "../Utils/ActionUtils";

import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameData from "../GameData";
import GameCfgText from '../GameText';
import ComUtils from '../Utils/ComUtils';

import { pb } from '../../protos/proto';
import GlobalHandle from "../global/GlobalHandle";

import StrategyAIData from "./StrategyAIData";
import DrawData from "./DrawData";

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

    protected onEnable() {
        ActionUtils.openLayer(this.node);


        let gpData = GameCfg.data[0].data;

        if (!gpData || gpData.length <= 0) { return }

        this.DXXLGG.active = false;
        if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.DXXLGG.active = true;
        }

        //用户信息
        this.headImg.spriteFrame = GameData.headImg;
        this.levelLabel.string = 'LV:  ' + GameData.properties[2];
        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[2]].max_exp;
        this.expLabel.string = 'EXP:' + GameData.properties[1] + '/' + max_exp;
        this.userName.string = GameData.userName;

        this.contentZB.active = false;
        this.content.active = false;
        //对局数据
        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.contentZB.active = true;
            this.showContentZB();
        } else {
            this.content.active = true;
            this.showContent();
        }

        //复盘中不保存记录
        if (!GameCfg.GAMEFUPAN) {
            let datas = {
                uid: GameData.userID,
                g_type: GameCfg.GameType,
                quotes_code: GameCfg.data[0].code,
                k_type: GameCfg.data[0].ktype,
                k_from: parseInt(ComUtils.fromatTime1(gpData[GameData.huizhidatas - 1].day)),

                k_to: parseInt(ComUtils.fromatTime1(gpData[GameCfg.huizhidatas - 1].day)),
                //  k_to: parseInt(gpData[gpData.length - 1].day.replace(///g,'')),
                stock_profit_rate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100),
                user_profit_rate: (GameCfg.allRate * 100),
                user_capital: GameData.SmxlState.gold,
                user_profit: (GameCfg.finalfund - GameCfg.ziChan),
                ts: new Date().getTime() / 1000,
                rank: 0,
                ref_id: 0,
                k_startup: GameData.huizhidatas - 1,
                k_stop: GameCfg.huizhidatas - 1,
            }
            if (GameCfg.GameType == pb.GameType.ShuangMang) {
                datas.user_capital = GameData.SmxlState.gold;
            } else {
                datas.user_capital = GameCfg.ziChan;
            }
            console.log('GameCfg.finalfund' + GameCfg.finalfund + '-' + 'GameCfg.ziChan' + GameCfg.ziChan + '=' + (GameCfg.finalfund - GameCfg.ziChan));
            //  if (GameCfg.GameType < 4) {
            datas.rank = datas.user_profit_rate >= datas.stock_profit_rate ? 1 : 2;
            //  if (GameCfg.GameType == 1) {
            datas.ref_id = 0;
            // }
            //  }
            if (GameCfg.GameType != pb.GameType.ShuangMang) {
                this.saveHoistoryInfo(parseInt(datas.ts + ''));
            }

            GlobalHandle.onCmdGameOverReq(datas);
        }
    }

    showContentZB() {
        let gpData = GameCfg.data[0].data;
        let boxs = this.contentZB.children;
        {
            let la = boxs[0].getChildByName('label1').getComponent(cc.Label);
            la && (la.string = GameCfg.data[0].name)

            let la1 = boxs[0].getChildByName('label2').getComponent(cc.Label);
            let code = GameCfg.data[0].code;
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
            la && (la.string = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2))
        }

        {
            let la = boxs[3].getChildByName('richText').getComponent(cc.Label);
            la && (la.string = GameCfg.GameSet.select + '/' + GameCfg.GameSet.strategy)
        }

        {
            //策略信号次数   相似度次数
            let la = boxs[4].getChildByName('richText').getComponent(cc.Label);

            la.string = StrategyAIData.AICount + '';


            let la1 = boxs[4].getChildByName('richText1').getComponent(cc.Label);

        }

        {
            //策略信号收益    相似度次数
            let la = boxs[5].getChildByName('richText').getComponent(cc.Label);

            let la1 = boxs[5].getChildByName('richText1').getComponent(cc.Label);
        }

        { //你的训练收益    相似度次数
            let la = boxs[6].getChildByName('richText').getComponent(cc.Label);

            let la1 = boxs[6].getChildByName('richText1').getComponent(cc.Label);
        }

        {
            //综合相似度
            let la = boxs[7].getChildByName('richText').getComponent(cc.Label);
        }
    }

    showContent() {
        let gpData = GameCfg.data[0].data;
        this.nameLabel.string = GameCfg.data[0].name;
        let code = GameCfg.data[0].code;
        if (code.length >= 7 && GameCfg.GameType != pb.GameType.QiHuo) {
            code = code.slice(1);
        }
        this.maLabel.string = code;

        this.timeLabel.string = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        //同期涨幅
        let tq = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);


        this.riseLabel.string = tq + '%';
        if (parseFloat(tq) > 0) {
            this.riseLabel.node.color = cc.Color.RED;
        } else if (parseFloat(tq) < 0) {
            this.riseLabel.node.color = cc.Color.GREEN;
        } else {
            this.riseLabel.node.color = cc.Color.WHITE;
        }

        //总盈利率
        let all = (GameCfg.allRate * 100).toFixed(2);

        this.AllRise.string = all + '%';

        if (parseFloat(all) > 0) {
            this.AllRise.node.color = cc.Color.RED;
        } else if (parseFloat(all) < 0) {
            this.AllRise.node.color = cc.Color.GREEN;
        } else {
            this.AllRise.node.color = cc.Color.WHITE;
        }

        let info = DrawData.getBukoCount();

        this.yingCont.string = info.yCount + '次';
        if (info.yCount > 0) {
            this.yingCont.node.color = cc.Color.RED;
        } else {
            this.yingCont.node.color = cc.Color.WHITE;
        }

        this.kunCount.string = info.sCount + '次';

        if (info.sCount > 0) {
            this.kunCount.node.color = cc.Color.GREEN;
        } else {
            this.kunCount.node.color = cc.Color.WHITE;
        }
        if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.nameTipsLabel.string = '品种合约';
            this.maLabel.string = '';
            if (parseInt(all) > 0) {
                this.qhxl_zhuan.active = true;
            } else if (parseInt(all) < 0) {
                this.qhxl_kui.active = false;
            }
        }
    }

    saveHoistoryInfo(ts) {
        //  console.log('GameCfg.history' + JSON.stringify(GameCfg.history));
        GameCfg.TIMETEMP.push(ts);
        // GameCfg.history.huizhidatas = parseInt(JSON.stringify(GameCfg.huizhidatas));
        GameCfg.history.huizhidatas = GameCfg.huizhidatas;
        GameCfg.history.allRate = GameCfg.allRate;
        cc.sys.localStorage.setItem('TIMETEMP', JSON.stringify(GameCfg.TIMETEMP));
        cc.sys.localStorage.setItem(ts + 'ts', JSON.stringify(GameCfg.history));
        cc.sys.localStorage.setItem(ts + 'mark', JSON.stringify(GameCfg.mark));
        cc.sys.localStorage.setItem(ts + 'notice', JSON.stringify(GameCfg.notice));
        cc.sys.localStorage.setItem(ts + 'fill', JSON.stringify(GameCfg.fill));
        cc.sys.localStorage.setItem(ts + 'set', JSON.stringify(GameCfg.GameSet));
        cc.sys.localStorage.setItem(ts + 'cache', JSON.stringify(GameCfg.enterGameCache));
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //返回大厅
        if (name == 'closeBtn') {
            GameCfg.data[0].data = [];
            GameCfg.huizhidatas = 0;

            GameCfg.allRate = 0;

            GameCfg.finalfund = 0;
            //    GameCfg.GameType = null;

            GameCfg.GAMEFUPAN = false;
            // GameCfg.history.huizhidatas = 0;
            GameCfg.history.allRate = 0;

            GameCfg.enterGameCache = null;
            //    GameCfg.ziChan = 100000;
            cc.director.loadScene('hall');
        }
        //再来一局
        else if (name == 'lx_jsbt_zlyj') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let data = null;

            if (GameCfg.GameType == pb.GameType.ShuangMang) {
                data = GameCfgText.getGPSMByRandom();
            }
            else if (GameCfg.GameType == pb.GameType.DingXiang) {
                data = GameCfgText.getGPDXByRandom();
            }
            else if (GameCfg.GameType == pb.GameType.QiHuo) {
                data = GameCfgText.getQHQHByRandom();
            }
            if (data) {
                let cb = () => {
                    GameCfg.huizhidatas = GameData.huizhidatas;

                    GameCfg.allRate = 0;

                    GameCfg.finalfund = 0;
                    GameCfg.fill = [];
                    GameCfg.mark = [];
                    GameCfg.notice = [];
                    GameCfg.GAMEFUPAN = false;
                    //   GameCfg.history.huizhidatas = 0;
                    GameCfg.history.allRate = 0;

                    //   GameCfg.ziChan = 100000;
                    GlobalEvent.emit(EventCfg.LEVELCHANGE);
                    cc.director.loadScene('game');

                    // GameCfg.GAMEFUPAN = false;
                }

                GlobalHandle.onCmdGameStartReq(() => {
                    if (GameCfg.GameType == pb.GameType.ShuangMang || GameCfg.GameType == pb.GameType.DingXiang) {
                        GlobalHandle.onCmdGameStartQuoteQuery(data, cb)
                    }
                    else if (GameCfg.GameType == pb.GameType.QiHuo) {
                        GlobalHandle.onCmdGameStartQuoteQueryQH(data, cb);
                    }

                })
            }
        }
        else if (name == 'lx_jsbt_xl') {
            GameCfg.huizhidatas = GameData.huizhidatas;

            GameCfg.allRate = 0;

            GameCfg.finalfund = 0;
            GameCfg.fill = [];
            GameCfg.mark = [];
            GameCfg.notice = [];
            GameCfg.GAMEFUPAN = false;
            //   GameCfg.history.huizhidatas = 0;
            GameCfg.history.allRate = 0;

            //   GameCfg.ziChan = 100000;
            GlobalEvent.emit(EventCfg.LEVELCHANGE);
            cc.director.loadScene('game');
        }
        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }
    }
}
