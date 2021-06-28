import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import GameCfgText from "../../sctiprs/GameText";
import GlobalHandle from "../../sctiprs/global/GlobalHandle";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    itemData = null;

    itemIndex = 0;

    @property(cc.Label)
    indexLabel: cc.Label = null;

    @property(cc.Label)
    startLabel: cc.Label = null;

    @property(cc.Label)
    modeLabel: cc.Label = null;

    @property(cc.Label)
    rankLabel: cc.Label = null;

    @property(cc.Label)
    recLabel: cc.Label = null;


    onHisItemRate(flag) {
        this.recLabel.string = '****';
        flag && (this.recLabel.string = (this.itemData.userProfitRate).toFixed(2) + '%')
    }


    onShow() {
        this.indexLabel.string = this.itemIndex + '';
        this.startLabel.string = ComUtils.formatTime(this.itemData.ts);
        this.rankLabel.string = this.itemData.rank;
        // this.recLabel.string = this.itemData.userProfitRate + '%';
        this.recLabel.string = '****';
        if (this.itemData.gType == pb.GameType.ShuangMang) {
            this.modeLabel.string = '双盲训练';
        }
        else if (this.itemData.gType == pb.GameType.DingXiang) {
            this.modeLabel.string = '定向训练';
        }
        else if (this.itemData.gType == pb.GameType.FenShi) {
            this.modeLabel.string = '分时训练';
        }
        else if (this.itemData.gType == pb.GameType.ZhiBiao) {
            this.modeLabel.string = '指标训练';
        }
        else if (this.itemData.gType == pb.GameType.TiaoJianDan) {
            this.modeLabel.string = '条件单训练';
        }
        else if (this.itemData.gType == pb.GameType.QiHuo) {
            this.modeLabel.string = '期货训练';
        }
        else if (this.itemData.gType == pb.GameType.TiaoZhan) {
            this.modeLabel.string = '挑    战';
        }
        else if (this.itemData.gType == pb.GameType.JJ_PK) {
            this.modeLabel.string = 'P K 大战';
        }
        else if (this.itemData.gType == pb.GameType.JJ_DuoKong) {
            this.modeLabel.string = '多空大战';
        }
        else if (this.itemData.gType == pb.GameType.JJ_ChuangGuan) {
            this.modeLabel.string = '闯  关赛';
        }
        else if (this.itemData.gType == pb.GameType.JJ_QiHuo) {
            this.modeLabel.string = '期货大战';
        }
        else if (this.itemData.gType == pb.GameType.MoNiChaoGu) {
            this.modeLabel.string = '模拟炒股';
        }
        else if (this.itemData.gType == pb.GameType.ChaoGuDaSai) {
            this.modeLabel.string = '炒股大赛';
        }
        else if (this.itemData.gType == pb.GameType.GeGuJingChai) {
            this.modeLabel.string = '个股竞猜';
        }
        else if (this.itemData.gType == pb.GameType.DaPanJingChai) {
            this.modeLabel.string = '大盘竞猜';
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'cgs_fupan') {

            let ts = this.itemData.ts;
            GameCfg.GAMEFUPAN = true;
            GameCfg.huizhidatas = this.itemData.kStop + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;
            GlobalHandle.GetGameOperations(ts, () => {
                this.onGamenterStart();
            });

        }
        else if (name == 'btn_xl') {
            GameCfg.GAMEFUPAN = false;
            GameCfg.huizhidatas = this.itemData.kStartup + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;
            this.onGamenterStart();
        }
    }

    onGamenterStart() {
        let data = { code: this.itemData.quotesCode }
        let dex = -1, items;
        if (GameCfg.GameType == pb.GameType.QiHuo) {
            items = GameCfgText.getQHItemInfo(data.code);
        } else {
            items = GameCfgText.getGPItemInfo(data.code);
        }

        data.code = items[0];
        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].code = items[0];
        GameCfg.data[0].circulate = items[4];


        GameCfg.allRate = 0;

        // if (this.itemData.gType == pb.GameType.ShuangMang) {
        //     GameCfg.GameSet = GameData.SMSet;
        //     GameCfg.enterGameCache = {
        //         ktype: pb.KType.Day,
        //         kstyle: pb.KStyle.Random,
        //         code: items[0],
        //         from: this.itemData.kFrom,
        //         total: 150 + 1,
        //         to: 0,
        //     }
        // }
        // else if (this.itemData.gType == pb.GameType.DingXiang) {
        //     GameCfg.GameSet = GameData.DXSet;
        // }
        // else if (this.itemData.gType == pb.GameType.FenShi) {
        //     GameCfg.GameSet = GameData.DSSet;
        // }
        // else if (this.itemData.gType == pb.GameType.ZhiBiao) {
        //     GameCfg.GameSet = GameData.ZBSet;
        // }
        // else if (this.itemData.gType == pb.GameType.TiaoJianDan) {
        //     this.modeLabel.string = TJSet;
        // }
        // else if (this.itemData.gType == pb.GameType.QiHuo) {
        //     this.modeLabel.string = GameData.QHSet;
        // }
        let ts = this.itemData.ts;
        let cache = cc.sys.localStorage.getItem(ts + 'cache');
        if (!cache) {
            console.log('没有保存此记录');
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '本地记录的缓存已被您清除');
            return;
        }
        GameCfg.GameSet = JSON.parse(cc.sys.localStorage.getItem(ts + 'set'));

        console.log(JSON.parse(cache));
        GameCfg.enterGameCache = JSON.parse(cache);
        // GameCfg.historyType = this.itemData.gType;
        GameCfg.GameType = this.itemData.gType;
        if (GameCfg.GameType == pb.GameType.QiHuo) {
            GlobalEvent.emit(EventCfg.CmdQuoteQueryFuture, JSON.parse(cache));
        } else {
            GlobalEvent.emit(EventCfg.onCmdQuoteQuery, JSON.parse(cache));
        }
    }


}
