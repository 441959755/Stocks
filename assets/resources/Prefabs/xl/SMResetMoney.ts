import { pb } from '../../../protos/proto';
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GameData from '../../../sctiprs/GameData';
import GameCfgText from '../../../sctiprs/GameText';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    resetMoneyLa: cc.Label = null;

    @property(cc.Label)
    resetLa: cc.Label = null;

    diamond = 0;
    gold = 0;


    onEnable() {
        if (GameData.SmxlState.gold <= GameCfgText.smxlCfg.capital_min.value) {
            this.diamond = Math.abs(GameCfgText.smxlCfg.capital_min.cost[0].v);
            this.resetMoneyLa.string = this.diamond + '钻石';
            this.resetLa.string = this.diamond + '钻石';
        }
        else if (GameData.SmxlState.gold >= GameCfgText.smxlCfg.capital_max.value) {
            this.gold = Math.abs(GameCfgText.smxlCfg.capital_max.cost[0].v);
            this.resetMoneyLa.string = this.gold + '金币';
            this.resetLa.string = this.gold + '金币';
        }
    }

    onBtnClick(event, target) {
        let name = event.target.name;

        //点击重置
        if (name == 'smxl_btn_cz') {
            if (this.diamond && GameData.properties[pb.GamePropertyId.Diamond] < this.diamond) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '钻石不足');
                return;
            }
            else if (this.gold && GameData.properties[pb.GamePropertyId.Gold] < this.gold) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
                return;
            }

            socket.send(pb.MessageId.Req_Game_SmxlReset, null, (data) => {

                console.log('重置' + JSON.stringify(data));

                if (data && !data.code) {
                    this.node.active = false;
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '双盲本月当前金币重置成功。');

                } else {
                    console.log('重置失败:' + JSON.stringify(data));
                }

            })
        } else if (name == 'closeSetBtn') {
            this.node.active = false;
        }
    }
}
