import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import GameCfgText from "../../sctiprs/GameText";
import EnterGameControl from "../../sctiprs/global/EnterGameControl";
import GlobalHandle from "../../sctiprs/global/GlobalHandle";
import UpGameOpt from "../../sctiprs/global/UpGameOpt";
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

    gameSet1 = null;
    flag = false;

    onHisItemRate(flag) {
        this.recLabel.string = '****';
        flag && (this.recLabel.string = (this.itemData.userProfitRate).toFixed(2) + '%')
        this.flag = flag;
    }

    onShow() {
        this.indexLabel.string = (this.itemIndex + 1) + '';
        this.startLabel.string = ComUtils.formatTime(this.itemData.ts);
        this.rankLabel.string = this.itemData.rank;
        // this.recLabel.string = this.itemData.userProfitRate + '%';
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
            this.modeLabel.string = '闯 关 赛';
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

        // if (GameData.Players[1].icon) {
        //     ComUtils.onLoadHead(GameData.Players[1].icon, (res) => {
        //         let texture = new cc.SpriteFrame(res);
        //         GameData.Players[1].icon = texture;
        //     })
        // }
        // GameData.Players[1].icon = null;
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'cgs_fupan') {

            GameCfg.GameSet = GameData.JJPKSet;
            let ts = this.itemData.ts;
            GameCfg.GAMEFUPAN = true;
            GameCfg.GameType = this.itemData.gType;
            GameCfg.huizhidatas = this.itemData.kStop;
            GameData.huizhidatas = this.itemData.kStartup;
            GameCfg.GAMEFUPANDATA = this.itemData;
            let info = {
                uid: GameData.Players[1].uid,
                ts: ts,
            }
            GlobalHandle.GetGameOperations(info, () => {
                UpGameOpt.ChanagekOffset(UpGameOpt.player1Opt);
                this.onGamenterStart(true);
            });

        }
        else if (name == 'btn_xl') {
            //   if (GameCfg.GameType == pb.GameType.JJ_PK) {
            let gameCount = EnterGameControl.onCurDXIsEnterGame();

            if (gameCount.status == 3) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
                return;
            }
            //   }
            GameCfg.GameType = pb.GameType.DingXiang;
            GameCfg.GameSet = GameData.DXSet;
            GameCfg.GAMEFUPAN = false;
            GameCfg.huizhidatas = this.itemData.kStartup;
            GameData.huizhidatas = this.itemData.kStartup;

            GameCfg.GameSet.year = (this.itemData.kFrom + '').slice(0, 4);

            GameCfg.GameSet.search = this.itemData.quotesCode;

            this.onGamenterStart();
        }

        else if (name == 'btn_tz') {
            GameCfg.JJ_XUNLIAN = true;
            GameCfg.GameType = pb.GameType.JJ_ChuangGuan;
            GameCfg.GameSet = GameData.JJPKSet;
            GameCfg.GAMEFUPAN = false;
            GameCfg.huizhidatas = this.itemData.kStartup;
            GameData.huizhidatas = this.itemData.kStartup;
            GameCfg.GameSet.year = (this.itemData.kFrom + '').slice(0, 4);
            GameCfg.GameSet.search = this.itemData.quotesCode;

            GameCfg.GAMEFUPANDATA = this.itemData;

            let ts = this.itemData.ts;
            let info = {
                uid: GameData.Players[1].uid,
                ts: ts,
            }
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GlobalHandle.GetGameOperations(info, () => {
                // UpGameOpt.ChanagekOffset(UpGameOpt.player1Opt);
                GameCfg.RoomGameData = {
                    players: [{ gd: {} }, {
                        gd: GameData.Players[1],
                        ops: { items: UpGameOpt.player1Opt },
                        result: this.itemData
                    }],
                }
                this.onGamenterStart(true);
            });
        }
    }

    onGamenterStart(flag?) {
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

        let ts = this.itemData.ts;

        let cache = {
            ktype: pb.KType.Day,
            kstyle: pb.KStyle.Random,
            code: this.itemData.quotesCode,
            from: this.itemData.kFrom,
            total: 150 + 1,
            to: 0,
        }

        GameCfg.enterGameCache = cache;
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        EnterGameControl.onClearPreGameDataEnter(cache, flag);
    }

}
