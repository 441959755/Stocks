import GameCfg from "./GameCfg";
import ActionUtils from "../Utils/ActionUtils";

import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameData from "../GameData";
import GameCfgText from '../GameText';
import ComUtils from '../Utils/ComUtils';

import { pb } from '../../protos/proto';

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

    // @property(cc.Label)
    // zijin: cc.Label = null;

    // @property(cc.Label)
    // yingZiJin: cc.Label = null;

    // @property(cc.Label)
    // AllZiJin: cc.Label = null;

    @property(cc.Node)
    qhxl_kui: cc.Node = null;

    @property(cc.Node)
    qhxl_zhuan: cc.Node = null;

    protected onEnable() {
        ActionUtils.openLayer(this.node);


        let gpData = GameCfg.data[0].data;

        if (!gpData || gpData.length <= 0) { return }

        this.headImg.spriteFrame = GameData.headImg;
        this.levelLabel.string = 'LV:  ' + GameData.properties[2];

        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[2]].max_exp;

        this.expLabel.string = 'EXP:' + GameData.properties[1] + '/' + max_exp;

        this.userName.string = GameData.userName;



        this.nameLabel.string = GameCfg.data[0].name;

        let code = GameCfg.data[0].code;
        if (code.length >= 7 && GameCfg.GameType != pb.GameType.QiHuo) {
            code = code.slice(1);
        }
        this.maLabel.string = code;
        //时间
        // this.timeLabel.string = (gpData[0].day.replace(/-/g, '/')) + ' -- ' + (gpData[gpData.length - 1].day.replace(/-/g, '/'));
        ;
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
        console.log('all' + all);
        console.log('GameCfg.allRate' + GameCfg.allRate);
        this.AllRise.string = all + '%';

        if (parseFloat(all) > 0) {
            this.AllRise.node.color = cc.Color.RED;
        } else if (parseFloat(all) < 0) {
            this.AllRise.node.color = cc.Color.GREEN;
        } else {
            this.AllRise.node.color = cc.Color.WHITE;
        }

        this.yingCont.string = GameCfg.profitCount + '次';
        if (GameCfg.profitCount > 0) {
            this.yingCont.node.color = cc.Color.RED;
        } else {
            this.yingCont.node.color = cc.Color.WHITE;
        }

        this.kunCount.string = GameCfg.lossCount + '次';

        if (GameCfg.lossCount > 0) {
            this.kunCount.node.color = cc.Color.GREEN;
        } else {
            this.kunCount.node.color = cc.Color.WHITE;
        }

        // this.zijin.string = GameData.properties[3];
        // this.yingZiJin.string = parseInt((GameCfg.finalfund - GameCfg.ziChan) + '') + '';
        // this.AllZiJin.string = parseInt(GameCfg.finalfund + '') + '';

        if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.nameTipsLabel.string = '品种合约';
            this.maLabel.string = '';
            if (parseInt(all) > 0) {
                this.qhxl_zhuan.active = true;
            } else if (parseInt(all) < 0) {
                this.qhxl_kui.active = false;
            }
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
                stock_profit_rate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2),
                user_profit_rate: (GameCfg.allRate * 100).toFixed(2),
                user_capital: GameData.properties[3],
                user_profit: (GameCfg.finalfund - GameCfg.ziChan),
                ts: new Date().getTime() / 1000,
                rank: 0,
                ref_id: 0,
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

            socket.send(pb.MessageId.Req_Game_Over, PB.onCmdGameOverConvertToBuff(datas), (info) => {
                console.log('GameOverInfo' + JSON.stringify(info));
            })
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
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;
            //    GameCfg.GameType = null;

            GameCfg.GAMEFUPAN = false;
            // GameCfg.history.huizhidatas = 0;
            GameCfg.history.allRate = 0;
            GameCfg.history.deal = [];
            GameCfg.enterGameCache = null;
            //    GameCfg.ziChan = 100000;
            cc.director.loadScene('hall');
        }
        //再来一局
        else if (name == 'lx_jsbt_zlyj') {
            GameCfg.huizhidatas = GameData.huizhidatas;

            GameCfg.allRate = 0;
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;
            GameCfg.fill = [];
            GameCfg.mark = [];
            GameCfg.notice = [];
            GameCfg.GAMEFUPAN = false;
            //   GameCfg.history.huizhidatas = 0;
            GameCfg.history.allRate = 0;
            GameCfg.history.deal = [];
            //   GameCfg.ziChan = 100000;
            cc.director.loadScene('game');

            // GameCfg.GAMEFUPAN = false;
        }
        //复盘
        else if (name == 'lx_jsbt_qd') {
            this.node.active = false;
            GameCfg.GAMEFUPAN = true;
            GlobalEvent.emit(EventCfg.GAMEFUPAN);
        }
    }
}
