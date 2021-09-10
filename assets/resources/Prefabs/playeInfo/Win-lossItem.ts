import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    @property(cc.Button)
    resetBtn: cc.Button = null;

    winNum = 0;
    loseNum = 0;
    nameStr = '';
    GameType = 0;

    onShow() {
        this.label2.string = this.winNum + '  胜               ' + this.loseNum + '  负';
        this.label1.string = this.nameStr;

        if (this.winNum == 0 && this.loseNum == 0) {
            this.resetBtn.enableAutoGrayEffect = true;
            this.resetBtn.interactable = false;
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'playerInfo_btn_cz') {
            let cost;
            if (GameCfgText.gameTextCfg.counter_reset_cost) {
                cost = Math.abs(GameCfgText.gameTextCfg.counter_reset_cost[0].v);
            }
            let diamond = cost || 50;

            if (GameData.properties[pb.GamePropertyId.Vip] || GameData.properties[pb.GamePropertyId.Diamond] >= diamond) {
                GlobalEvent.emit(EventCfg.LOADINGSHOW);
                let data = {
                    game: this.GameType,
                }

                socket.send(pb.MessageId.Req_Hall_ResetGameCounter, PB.onResetGameCounter(data), (info) => {
                    console.log('onCmdEditInfoConvertToBuff:' + JSON.stringify(info));
                    if (!info.code) {
                        this.label2.string = 0 + '  胜              ' + 0 + '  负';
                        this.resetBtn.enableAutoGrayEffect = true;
                        this.resetBtn.interactable = false;
                    } else {
                        console.log('图片有误!:' + info.code + info.err);
                    }
                    GlobalEvent.emit(EventCfg.LOADINGHIDE);
                })
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, 'VIP用户或钻石大于' + diamond + '才能重置');
            }
        }
    }
}
