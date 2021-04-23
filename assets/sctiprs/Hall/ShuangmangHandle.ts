import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import { pb } from '../../protos/proto';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.Label)
    initLa: cc.Label = null;

    @property(cc.Label)
    curla: cc.Label = null;

    protected onEnable() {
        //  GlobalEvent.emit(EventCfg.SHOWOTHERNODE, this);
        this.toggle1.isChecked = GameData.SMSet.isFC;

        this.initLa.string = smxlCfg.capital_init;
        this.curla.string = GameData.properties[3];
    }

    onClick(event, curstData) {
        let name = event.target.name;
        //点击双盲训练
        if (name == 'startSMBtn') {
            GameCfg.GAMEFUPAN = false;
            GameCfg.GameType = pb.GameType.ShuangMang;
            GameCfg.GameSet = GameData.SMSet;

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
            total: 300,
            to: 0,
        }

        let le = parseInt(Math.random() * stocklist.length);
        let items = stocklist[le].split('|');
        data.code = items[0];
        // if (data.code < 600000) {
        //     this.smStartGameSet();
        //     return;
        // }

        let start = items[2], end = items[3], sc;
        if (end == 0) {
            sc = new Date().getTime() - 24 * 60 * 60 * 1000 * 300;
        } else {
            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);

            sc = d.getTime() - 24 * 60 * 60 * 1000 * 300;
        }


        let year = start.slice(0, 4);
        let month = start.slice(4, 6);
        let day = start.slice(6);

        let d = new Date(year + '-' + month + '-' + day);
        ///console.log(d); 
        let t = d.getTime();
        if (sc <= 0) {
            this.smStartGameSet();
            return;
        }

        let s = Math.random() * (sc - t) + t;

        let f = new Date(s);

        {
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

            data.from = ye + '' + mon + '' + da;
        }
        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].code = items[0];
        GameCfg.data[0].circulate = items[4];
        GameCfg.data[0].ktype = data.ktype;

        GlobalEvent.emit('onCmdQuoteQuery', data);

    }

}
