import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import { pb } from '../../protos/proto';

import GameCfgText from '../GameText';
import GlobalHandle from "../global/GlobalHandle";

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
            //是否重置
            this.CZBtn.active = false;
            if (GameData.SmxlState.gold <= GameCfgText.smxlCfg.capital_min.value) {
                this.CZBtn.active = true;
            } else if (GameData.SmxlState.gold >= GameCfgText.smxlCfg.capital_max.value) {
                this.CZBtn.active = true;
            }
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
        if (GameData.SmxlState.gold <= GameCfgText.smxlCfg.capital_min.value) {
            this.CZBtn.active = true;
        } else if (GameData.SmxlState.gold >= GameCfgText.smxlCfg.capital_max.value) {
            this.CZBtn.active = true;
        }
    }

    onClick(event, curstData) {
        let name = event.target.name;
        //点击双盲训练
        if (name == 'startSMBtn') {
            if (GameData.SmxlState.gold <= GameCfgText.smxlCfg.capital_min.value || GameData.SmxlState.gold >= GameCfgText.smxlCfg.capital_max.value) {
                if (GameData.ShuangMangCount <= 0) {
                    GlobalEvent.emit(EventCfg.OPENSMRESETMONEYLAYER);
                    return;
                } else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的金币不足，请点击重置，免费重置金币！');
                    return;
                }
            }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GameCfg.GAMEFUPAN = false;
            GameCfg.GameType = pb.GameType.ShuangMang;
            GameCfg.GameSet = GameData.SMSet;
            GameCfg.ziChan = GameData.SmxlState.gold;

            this.smStartGameSet();

        }
        //点击训练设置
        else if (name == 'setSMBtn') {

            GlobalEvent.emit(EventCfg.OPENSETLAYER);
        }
        //点击历史记录
        else if (name == 'historySMBtn') {

            GlobalEvent.emit(EventCfg.OPENHISTORYLAYER);
        }
        //点击月报
        else if (name == 'ypSMBtn') {
            GlobalEvent.emit(EventCfg.OPENMONTHLAYER);
        }
        //点击收益曲线
        else if (name == 'xlSMBtn') {
            GlobalEvent.emit(EventCfg.OPENYIELDLAYER);
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
        let data = GameCfgText.getGPSMByRandom()
        console.log('给的数据:' + JSON.stringify(data));
        if (data) {
            GameCfg.enterGameCache = data;

            GlobalEvent.emit(EventCfg.onCmdQuoteQuery, data);
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.SMINITFUND);
    }

    //点击广告重置
    onGameResetCount(info) {
        GlobalHandle.onGameResetSMCapital();
    }
}
