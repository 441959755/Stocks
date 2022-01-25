import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/GameCfg";
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

    playeInfo = null;

    onHisItemRate(flag) {
        this.recLabel.string = '****';
        flag && (this.recLabel.string = (this.itemData.userProfitRate).toFixed(2) + '%')
        this.flag = flag;
    }

    onShow(playeInfo?) {

        playeInfo && (this.playeInfo = playeInfo);

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

            GameData.Players[1] = this.playeInfo;

            GameCfg.GameSet = JSON.parse(JSON.stringify(GameData.JJPKSet));

            let ts = this.itemData.ts;

            GameCfg.GAMEFUPAN = true;

            GameCfg.GameType = this.itemData.gType;

            GameCfg.GAMEFUPANDATA = this.itemData;

            GameCfg.huizhidatas = this.itemData.kStop + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;

            let info = {
                uid: this.playeInfo.uid || GameData.Players[1].uid,
                ts: ts,
            }

            GlobalHandle.GetGameOperations(info, (junXian) => {
                console.log(JSON.stringify(junXian));

                if (GameCfg.GameType != pb.GameType.JJ_ChuangGuan) {
                    UpGameOpt.ChanagekOffset(UpGameOpt.player1Opt);
                }

                GameCfg.GameSet.isMA1 = !!junXian[0];
                GameCfg.GameSet.MA1Date = junXian[0];

                GameCfg.GameSet.isMA2 = !!junXian[1];
                GameCfg.GameSet.MA2Date = junXian[1];

                GameCfg.GameSet.isMA3 = !!junXian[2];
                GameCfg.GameSet.MA3Date = junXian[2];

                GameCfg.GameSet.isMA4 = !!junXian[3];
                GameCfg.GameSet.MA4Date = junXian[3];

                GameCfg.GameSet.isMA5 = !!junXian[4];
                GameCfg.GameSet.MA5Date = junXian[4];

                GameCfg.GameSet.isMA6 = !!junXian[5];
                GameCfg.GameSet.MA6Date = junXian[5];


                this.onGamenterStart();
            });

        }

        else if (name == 'btn_xl') {

            let gameCount = EnterGameControl.onCurIsEnterGame();

            if (gameCount.status == 3) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
                return;
            }

            GameCfg.GameType = pb.GameType.DingXiang;
            GameCfg.GameSet = JSON.parse(JSON.stringify(GameData.DXSet));
            //  GameCfg.GameSet = GameData.DXSet;
            GameCfg.GAMEFUPAN = false;

            GameCfg.huizhidatas = this.itemData.kStartup + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;

            GameCfg.GameSet.year = (this.itemData.kFrom + '').slice(0, 4);

            GameCfg.GameSet.search = this.itemData.quotesCode;

            this.onGamenterStart();
        }

        else if (name == 'btn_tz') {

            GameData.Players[1] = this.playeInfo;

            GameCfg.JJ_XUNLIAN = true;

            GameCfg.GameType = pb.GameType.JJ_ChuangGuan;
            GameCfg.GameSet = JSON.parse(JSON.stringify(GameData.JJPKSet));
            // GameCfg.GameSet = GameData.JJPKSet;

            GameCfg.huizhidatas = this.itemData.kStartup + 1;
            GameData.huizhidatas = this.itemData.kStartup + 1;

            GameCfg.GAMEFUPAN = false;

            GameCfg.GameSet.year = (this.itemData.kFrom + '').slice(0, 4);

            GameCfg.GameSet.search = this.itemData.quotesCode;

            GameCfg.GAMEFUPANDATA = this.itemData;

            let ts = this.itemData.ts;

            let info = {
                uid: this.playeInfo.uid || GameData.Players[1].uid,
                ts: ts,
            }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            GlobalHandle.GetGameOperations(info, (junXian) => {

                GameCfg.RoomGameData = {
                    players: [
                        { gd: {} },
                        {
                            gd: this.playeInfo || GameData.Players[1],
                            ops: { items: UpGameOpt.player1Opt },
                            result: this.itemData,
                            junXian: junXian,
                        }],
                }

                this.onGamenterStart();

            });
        }
    }

    onGamenterStart() {

        console.log('item data:' + JSON.stringify(this.itemData));

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
            code: data.code,
            from: this.itemData.kFrom,
            total: 256,
            reserve: 0,
        }

        console.log('进入数据：' + JSON.stringify(cache));

        GameCfg.enterGameCache = cache;

        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        GlobalHandle.onCmdGameStartQuoteQuery(cache, () => {
            GlobalEvent.emit('LOADGAME');
        })

    }

}
