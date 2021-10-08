import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    infoData = null;

    onShow(info) {
        this.infoData = info;
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        //点击复盘
        if (name == 'btnFuPan') {

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            let ts = parseInt(this.infoData.ts);

            let info = {
                uid: GameData.userID,
                ts: ts,
            }

            GlobalHandle.GetGameOperations(info, () => {

                let data = {
                    code: this.infoData.quotesCode,
                }

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
                GameCfg.GAMEFUPAN = true;
                GameCfg.allRate = 0;

                GameCfg.huizhidatas = this.infoData.kStop + 1;
                GameData.huizhidatas = this.infoData.kStartup + 1;

                GameCfg.historyType = GameCfg.GameType;


                if (this.infoData.gType == pb.GameType.ShuangMang) {
                    GameCfg.GameSet = GameData.SMSet;
                }
                else if (this.infoData.gType == pb.GameType.ZhiBiao) {
                    GameCfg.GameSet = GameData.ZBSet;
                }
                else if (this.infoData.gType == pb.GameType.QiHuo) {
                    GameCfg.GameSet = GameData.QHSet;
                }
                else if (this.infoData.gType == pb.GameType.DingXiang) {
                    GameCfg.GameSet = GameData.DXSet;
                }

                GameCfg.enterGameCache = {
                    ktype: this.infoData.kType,
                    kstyle: pb.KStyle.Random,
                    code: this.infoData.quotesCode,
                    from: this.infoData.kFrom + '',
                    total: this.infoData.kStop - this.infoData.kStartup + 100,
                    //   to: this.infoData.kTo + '',
                    reserve: 100,
                };

                GameCfg.historyType = GameCfg.GameType;

                if (GameCfg.GameType == pb.GameType.QiHuo) {
                    GlobalHandle.onCmdGameStartQuoteQueryQH(GameCfg.enterGameCache, () => {
                        GlobalEvent.emit('LOADGAME');
                    });
                } else {
                    GlobalHandle.onCmdGameStartQuoteQuery(GameCfg.enterGameCache, () => {
                        GlobalEvent.emit('LOADGAME');
                    })
                }
            });

        }
    }
}
