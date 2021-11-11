import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import GameCfgText from "../../sctiprs/GameText";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    lockBtn: cc.Button = null;

    @property(cc.Button)
    vipBtn: cc.Button = null;

    @property(cc.Button)
    addCountBtn: cc.Button = null;

    @property(cc.Label)
    content2: cc.Label = null;

    @property(cc.Label)
    tips: cc.Label = null;

    @property(cc.Node)
    unlock: cc.Node = null;

    @property(cc.Node)
    ad: cc.Node = null;

    lockPrice = 0;

    adCount = 0;

    onEnable() {

        if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.lockPrice = Math.abs(GameCfgText.gameConf.dxxl.unlock[0].v);
        }

        else if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.lockPrice = Math.abs(GameCfgText.gameConf.qhxl.unlock[0].v);
        }

        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.lockPrice = Math.abs(GameCfgText.gameConf.qhxl.unlock[0].v);
        }

        this.content2.string = this.lockPrice + '钻石可解锁30天免费不限次数训练（VIP用户可以直接解锁）';

        this.tips.string = '-' + this.lockPrice;

        this.unlock.active = true;
        this.ad.active = false;
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'sys_close') {
            this.node.active = false;
        }
        //解锁
        else if (name == 'sys_tck_js') {
            if (GameData.properties[pb.GamePropertyId.Diamond] >= this.lockPrice) {

                let obj = {
                    gType: GameCfg.GameType,
                }

                let CmdUnlockGame = pb.CmdUnlockGame;
                let message = CmdUnlockGame.create(obj);
                let buff = CmdUnlockGame.encode(message).finish();

                socket.send(pb.MessageId.Req_Hall_UnlockGame, buff, (res) => {

                    console.log('解锁' + JSON.stringify(res));

                });


            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '钻石不足');
            }

        }

        //开通vip
        else if (name == 'sys_tck_ktvip') {

            this.node.active = false;

            PopupManager.loadVipExplain();
        }

        else if (name == 'sys_tck_zjcs') {
            this.ad.active = true;
            this.unlock.active = false;
            this.adShow();
        }

    }

    adShow() {

    }

}
