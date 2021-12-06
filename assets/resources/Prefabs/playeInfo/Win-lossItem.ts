import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

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
        this.label1.string = this.nameStr + ':';

        if (this.winNum == 0 && this.loseNum == 0) {
            this.resetBtn.enableAutoGrayEffect = true;
            this.resetBtn.interactable = false;
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'playerInfo_btn_cz') {
            let cost;
            if (GameCfgText.gameConf.counter_reset_cost) {
                cost = Math.abs(GameCfgText.gameConf.counter_reset_cost[0].v);
            }

            let diamond = cost || 50;

            if (new Date().getTime() / 1000 < GameData.properties[pb.GamePropertyId.VipExpiration] || GameData.properties[pb.GamePropertyId.Diamond] >= diamond) {

                PopupManager.LoadTipsBox('tipsBox', '重置 ' + this.nameStr + ' 战绩,\n 战绩将清零,重新开始统计', () => {
                    GlobalEvent.emit(EventCfg.LOADINGSHOW);
                    let data = {
                        game: this.GameType,
                    }

                    let CmdResetGameCounter = pb.CmdResetGameCounter;
                    let message = CmdResetGameCounter.create(data);
                    let buff = CmdResetGameCounter.encode(message).finish();

                    socket.send(pb.MessageId.Req_Hall_ResetGameCounter, buff, (info) => {
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
                })

            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, 'VIP用户或钻石大于' + diamond + '才能重置');
            }
        }
    }
}
