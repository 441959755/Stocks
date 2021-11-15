
import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
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

    gameSet1 = null;

    flag = false;


    onHisItemRate(flag) {
        this.flag = flag;
        this.recLabel.string = '****';
        flag && (this.recLabel.string = (this.itemData.userProfitRate).toFixed(2) + '%')
    }

    onShow() {
        this.indexLabel.string = this.itemIndex + '';
        this.startLabel.string = ComUtils.formatTime(this.itemData.ts);
        this.rankLabel.string = this.itemData.rank;

        this.recLabel.string = '****';
        this.flag && (this.recLabel.string = (this.itemData.userProfitRate).toFixed(2) + '%')

        if (this.itemData.gType == pb.GameType.ShuangMang) {
            this.modeLabel.string = '双盲训练';
            this.gameSet1 = GameData.SMSet;
            this.node.active = false;
        }
        else if (this.itemData.gType == pb.GameType.DingXiang) {
            this.modeLabel.string = '定向训练';
            this.gameSet1 = GameData.DXSet;
            this.node.active = false;
        }
        else if (this.itemData.gType == pb.GameType.FenShi) {
            this.modeLabel.string = '分时训练';
            //  this.gameSet1 = GameData.SHSet;
            this.node.active = false;
        }
        else if (this.itemData.gType == pb.GameType.ZhiBiao) {
            this.modeLabel.string = '指标训练';
            this.gameSet1 = GameData.ZBSet;
            this.node.active = false;
        }
        else if (this.itemData.gType == pb.GameType.TiaoJianDan) {
            this.modeLabel.string = '条件单训练';
            this.node.active = false;
        }
        else if (this.itemData.gType == pb.GameType.QiHuo) {
            this.modeLabel.string = '期货训练';
            this.gameSet1 = GameData.QHSet;
            this.node.active = false;
        }
        else if (this.itemData.gType == pb.GameType.TiaoZhan) {
            this.modeLabel.string = '挑    战';

        }
        else if (this.itemData.gType == pb.GameType.JJ_PK) {
            this.modeLabel.string = 'P K 大战';
            this.gameSet1 = GameData.JJPKSet;
        }
        else if (this.itemData.gType == pb.GameType.JJ_DuoKong) {
            this.modeLabel.string = '多空大战';
            this.gameSet1 = GameData.JJPKSet;
        }
        else if (this.itemData.gType == pb.GameType.JJ_ChuangGuan) {
            this.modeLabel.string = '闯  关赛';
            this.gameSet1 = GameData.JJPKSet;
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
            GameCfg.GameSet = GameData.JJPKSet;
            GameCfg.GameSet = this.gameSet1;
            let ts = this.itemData.ts;
            GameCfg.GAMEFUPAN = true;
            GameCfg.GameType = this.itemData.gType;
            GameCfg.huizhidatas = this.itemData.kStop + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;
            GameCfg.GAMEFUPANDATA = this.itemData;

            let info = {
                uid: GameData.userID,
                ts: ts,
            }

            GlobalHandle.GetGameOperations(info, () => {

                if (GameCfg.GameType != pb.GameType.JJ_ChuangGuan) {
                    UpGameOpt.ChanagekOffset(UpGameOpt.player1Opt);
                }

                this.onGamenterStart(true);
            });

        }
        else if (name == 'btn_xl') {

            let gameCount = EnterGameControl.onCurDXIsEnterGame();

            if (gameCount.status == 3) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
                return;
            }

            GameCfg.GameType = pb.GameType.DingXiang;
            GameCfg.GameSet = JSON.parse(JSON.stringify(GameData.DXSet));
            GameCfg.GAMEFUPAN = false;

            GameCfg.huizhidatas = this.itemData.kStartup + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;

            GameCfg.GameSet.year = (this.itemData.kFrom + '').slice(0, 4);

            GameCfg.GameSet.search = this.itemData.quotesCode;

            this.onGamenterStart();
        }
    }

    onGamenterStart(flag?) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let data = { code: this.itemData.quotesCode }
        let items;
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

        let cache = {
            ktype: pb.KType.Day,
            kstyle: pb.KStyle.Random,
            code: this.itemData.quotesCode,
            from: this.itemData.kFrom,
            total: this.itemData.kStop + 1,
            reserve: this.itemData.kStartup + 1,
        }

        GameCfg.enterGameCache = cache;

        // EnterGameControl.onClearPreGameDataEnter(cache, flag);
        GlobalHandle.enterGameSetout(GameCfg.enterGameCache, () => {
            GlobalEvent.emit('LOADGAME');
        }, flag);
    }

}
