import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EnterGameControl from "../../../sctiprs/global/EnterGameControl";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    downBoxs: cc.Node[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property(cc.Label)
    tipsLabel1: cc.Label = null;

    @property(cc.Label)
    tipsLabel2: cc.Label = null;

    @property([cc.Node])
    boxs: cc.Node[] = [];

    curCount = 0;

    curState = 0;

    adSucceed = 0;

    @property(cc.Node)
    mfxlBtn: cc.Node = null;

    _type = 0;

    onLoad() {
        GlobalEvent.on(EventCfg.GMAECOUNTERSCHANGE, this.initCount.bind(this), this);
    }

    initCount() {

        let gameCount = EnterGameControl.onCurIsEnterGame();
        this.tipsLabel2.string = '训练费用：' + Math.abs(GameCfgText.gameConf.dxxl.cost[0].v) + '金币';
        this.mfxlBtn.active = true;
        if (gameCount.status == 0) {
            this.curState = 0;
            this.tipsLabel1.node.active = false;
            this.tipsLabel2.node.active = false;
            this.mfxlBtn.active = false;
        }

        else if (gameCount.status == 1) {
            this.tipsLabel1.node.active = true;
            this.tipsLabel2.node.active = true;
            this.tipsLabel1.string = '今日剩余次数：' + gameCount.count + '次';
            this.curState = 1;
        }

        else if (gameCount.status == 2) {
            this.tipsLabel1.node.active = true;
            this.tipsLabel2.node.active = true;

            let time = new Date().toLocaleDateString();
            let count = cc.sys.localStorage.getItem(time + 'ADSUCCEED' + GameCfg.GameType);
            if (count) {
                this.adSucceed = parseInt(count);
            }
            this.tipsLabel1.string = '今日剩余次数：' + this.adSucceed + '次';
            this.curState = 2;
        }

        else if (gameCount.status == 3) {
            this.tipsLabel1.node.active = true;
            this.tipsLabel2.node.active = true;
            this.tipsLabel1.string = '今日次数已用完';
            this.tipsLabel2.string = '开启VIP或解锁该功能取消次数限制';
            this.curState = 3;
        }
    }

    onEnable() {
        GlobalEvent.on('TOAGAME', this.TJDStartGameSet.bind(this), this);
        this.initCount();

        this.boxs[0].getComponentInChildren(cc.Label).string = GameData.TJDSet.line;
        this.boxs[1].getComponentInChildren(cc.Label).string = GameData.TJDSet.KLine;
        this.toggles.forEach(el => {
            el.isChecked = false;
        })
        if (GameData.TJDSet.KSpeed == 0.2) {
            this.toggles[0].isChecked = true;
        }
        else if (GameData.TJDSet.KSpeed == 0.5) {
            this.toggles[1].isChecked = true;
        }
        else if (GameData.TJDSet.KSpeed == 1) {
            this.toggles[2].isChecked = true;
        }
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
        }

        else if (name == 'sys_helpbig1') {
            PopupManager.openHelpLayer();
        }

        else if (name == 'setTJDBtn') {
            GlobalEvent.emit(EventCfg.OPENSETLAYER);
        }

        else if (name == 'historyTJDBtn') {
            GlobalEvent.emit(EventCfg.OPENHISTORYLAYER);
        }

        else if (name == 'selectBtn1') {
            let index = parseInt(curdata);
            this.downBoxs[index - 1].active = true;
            this._type = index - 1;
        }

        else if (name == 'DCnode') {
            this.downBoxs.forEach(el => {
                el.active = false;
            })
        }

        else if (name == 'item') {
            if (this._type == 0) {
                GameData.TJDSet.line = event.target.getComponent(cc.Label).string;
                this.boxs[this._type].getComponentInChildren(cc.Label).string = GameData.TJDSet.line;
            }
            else if (this._type == 1) {
                GameData.TJDSet.KLine = event.target.getComponent(cc.Label).string;
                this.boxs[this._type].getComponentInChildren(cc.Label).string = GameData.TJDSet.KLine;
            }

            this.downBoxs.forEach(el => {
                el.active = false;
            })
        }

        else if (name == 'startTJDBtn') {

            this.TJDStartGameSet();
        }

        // else if (name == 'mfxlBtn') {
        //     GlobalEvent.emit("OPENUNLOCKBOX", true);
        // }
    }

    onToggleClick(event, curdata) {

        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                if (index == 0) {
                    GameData.TJDSet.KSpeed = 0.2;
                }
                else if (index == 1) {
                    GameData.TJDSet.KSpeed = 0.5;
                }
                else if (index == 2) {
                    GameData.TJDSet.KSpeed = 1;
                }
            }
        })

        GameData.TJDSet = GameData.TJDSet;
    }

    TJDStartGameSet() {
        // if (GameData.properties[pb.GamePropertyId.Gold] < GameCfgText.gameConf.tjdxl.cost[0].v) {
        //     GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
        //     return;
        // }
        // else if ((this.curState == 2 || this.curState == 3) && !this.adSucceed) {
        //     // GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
        //     // return;
        //     GlobalEvent.emit("OPENUNLOCKBOX");
        //     return;
        // }

        let time = new Date().toLocaleDateString();
        cc.sys.localStorage.setItem(time + 'ADSUCCEED' + GameCfg.GameType, 0);

        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        GameCfg.GAMEFUPAN = false;
        GameCfg.GameSet = JSON.parse(JSON.stringify(GameData.TJDSet));
        // GameCfg.GameSet = GameData.TJDSet;

        GameCfg.ziChan = 100000;

        let data = {
            ktype: pb.KType.Day,
            kstyle: pb.KStyle.Random,
            code: null,
            from: null,
            total: parseInt(GameData.TJDSet.KLine) + 100,
            to: 0,
            reserve: 100,
        }

        let le = parseInt(Math.random() * GameCfgText.stockList.length + '');

        let items = GameCfgText.stockList[le].split('|');

        data.code = items[0];

        let start = items[2], end = items[3], sc;

        //随机不能超过结束的时间
        if (end == 0) {
            sc = new Date().getTime() - 24 * 60 * 60 * 1000 * data.total;
        }
        else {
            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);

            sc = d.getTime() - 24 * 60 * 60 * 1000 * data.total;
        }

        //随机不能早过的时间
        let year = start.slice(0, 4);
        let month = start.slice(4, 6);
        let day = start.slice(6);

        let d = new Date(year + '-' + month + '-' + day);

        let t = d.getTime() + 24 * 60 * 60 * 1000 * 100;

        //时间是否正常
        if (sc <= 0) {
            this.TJDStartGameSet();
            return;
        }
        else if (sc < t) {
            this.TJDStartGameSet();
            return;
        }

        else {
            //随机的时间戳
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

            GameCfg.enterGameConf = data;

            console.log('条件单：' + JSON.stringify(data));

            GlobalHandle.enterGameSetout(GameCfg.enterGameConf, () => {
                GameData.huizhidatas = 100;
                GameCfg.huizhidatas = 100;
                GlobalEvent.emit(EventCfg.OPENTJDGAME);
            })
        }

    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GMAECOUNTERSCHANGE);

    }

    onDisable() {
        GlobalEvent.off('TOAGAME');
    }

}
