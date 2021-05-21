import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import { pb } from '../../protos/proto';

import GameCfgText from '../GameText';

import LLWConfig from '../common/config/LLWConfig';

import ComUtils from '../Utils/ComUtils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.Label)
    initLa: cc.Label = null;

    @property(cc.Label)
    curla: cc.Label = null;

    @property(cc.Node)
    CZBtn: cc.Node = null;

    onLoad() {
        //更新当前金币属性
        GlobalEvent.on(EventCfg.SMINITFUND, () => {
            this.curla.string = GameData.SmxlState.gold;
            this.initLa.string = GameData.SmxlState.goldInit;
        }, this);
    }

    protected onEnable() {
        //  GlobalEvent.emit(EventCfg.SHOWOTHERNODE, this);
        GlobalEvent.emit(EventCfg.LOADINGHIDE);

        this.toggle1.isChecked = GameData.SMSet.isFC;

        this.initLa.string = GameData.SmxlState.goldInit;

        this.curla.string = GameData.SmxlState.gold;

        //是否重置
        this.CZBtn.active = false;
        if (GameData.ShuangMangCount <= 0) {
            this.CZBtn.active = true;
        }
    }

    onClick(event, curstData) {
        let name = event.target.name;
        //点击双盲训练
        if (name == 'startSMBtn') {
            // if (GameData.properties[3] < 10000) {
            //     if (GameData.ShuangMangCount <= 0) {
            //         GlobalEvent.emit(EventCfg.OPENSMRESETMONEYLAYER);
            //     } else {
            //         GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的金币不足，请点击重置，免费重置金币！');
            //     }
            // }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GameCfg.GAMEFUPAN = false;
            GameCfg.GameType = pb.GameType.ShuangMang;
            GameCfg.GameSet = GameData.SMSet;
            GameCfg.ziChan = GameData.SmxlState.gold;

            this.smStartGameSet();

        }
        //点击训练设置
        else if (name == 'setSMBtn') {

            GlobalEvent.emit('OPENSETLAYER', 'SM');
        }
        //点击历史记录
        else if (name == 'historySMBtn') {
            GameCfg.GameType = pb.GameType.ShuangMang;
            GlobalEvent.emit('OPENHISTORYLAYER', 'SM');
        }
        //点击月报
        else if (name == 'ypSMBtn') {
            GlobalEvent.emit('OPENMONTHLAYER', 'SM');
        }
        //点击收益曲线
        else if (name == 'xlSMBtn') {
            GlobalEvent.emit('OPENYIELDLAYER', 'SM');
        }
        else if (name == 'blackbtn') {
            GameCfg.GameType = null;
            this.node.active = false;
        }

        else if (name == 'smxl_btn_czbig') {
            GlobalEvent.emit(EventCfg.OPENSMRESETMONEYLAYER);
        }

        //点击帮助
        else if (name == 'sys_helpbig1') {
            GlobalEvent.emit(EventCfg.OPENHELPLAYER);
        }


    }

    onToggleClick(event, data) {
        // console.log(event);
        let name = event.node._name;
        if (name == 'toggle1') {
            let data = GameData.SMSet;
            data.isFC = this.toggle1.isChecked;
            GameData.SMSet = data;
        }
    }

    smStartGameSet() {
        let data = {
            ktype: pb.KType.Day,
            kstyle: pb.KStyle.Random,
            code: null,
            from: null,
            total: 150,
            to: 0,
        }

        let le = parseInt(Math.random() * GameCfgText.stockList.length + '');
        let items = GameCfgText.stockList[le].split('|');
        data.code = items[0];


        let start = items[2], end = items[3], sc;
        if (end == 0) {
            sc = new Date().getTime() - 24 * 60 * 60 * 1000 * 300;
        } else {
            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);

            sc = d.getTime() - 24 * 60 * 60 * 1000 * data.total;
        }


        let year = start.slice(0, 4);
        let month = start.slice(4, 6);
        let day = start.slice(6);

        //开始的时间戳
        let d = new Date(year + '-' + month + '-' + day);
        ///console.log(d); 
        let t = d.getTime() + 24 * 60 * 60 * 1000 * 100;

        if (sc <= 0) {
            this.smStartGameSet();
            return;
        }

        if (sc < t) {
            this.smStartGameSet();
            return;
        }

        //随机的时间戳

        let s = Math.random() * (sc - t) + t;

        let f = new Date(s);
        // if (f.getTime() / 1000 - ComUtils.getTimestamp(start) <= 150 * 24 * 60 * 60) {
        //     let miao = f.getTime() / 1000 - ComUtils.getTimestamp(start);
        //     f = new Date((ComUtils.getTimestamp(start) + miao) * 1000);
        // }
        {
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

            data.from = ye + '' + mon + '' + da;
            console.log(data.from);

        }
        //  data.from = ComUtils.fromatTime1(f);

        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].code = items[0];
        GameCfg.data[0].circulate = items[4];
        GameCfg.data[0].ktype = data.ktype;
        console.log('给的数据:' + JSON.stringify(data));

        GameCfg.enterGameCache = data;

        GlobalEvent.emit('onCmdQuoteQuery', data);

    }

    onDestroy() {
        GlobalEvent.off(EventCfg.SMINITFUND);
    }

    //点击广告重置
    onGameResetCount(info) {
        let messageId;
        //if (GameCfg.GameType == pb.GameType.ShuangMang) {
        messageId = pb.MessageId.Req_Game_SmxlReport;
        // } else if (GameCfg.GameType == pb.GameType.DingXiang) {

        // }
        let data = {
            uid: GameData.userID,
            pos: pb.GameType.ShuangMang,
            url: '123',
            from: LLWConfig.PLATTYPE,
        }

        socket.send(messageId, PB.onAdClickedConvertTpBuff(data), (info) => {
            console.log('onGameResetCount' + JSON.stringify(info));

            // callBack && (callBack(info));
        });

    }
}
