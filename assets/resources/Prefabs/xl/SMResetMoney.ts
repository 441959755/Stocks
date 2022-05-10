import { pb } from '../../../protos/proto';
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GameData from '../../../sctiprs/GameData';
import GameCfgText from '../../../sctiprs/GameText';
import LLWSDK from '../../../sctiprs/common/sdk/LLWSDK';
const { ccclass, property } = cc._decorator;

@ccclass
export default class SMResrtMoney extends cc.Component {

    @property(cc.Label)
    resetMoneyLa: cc.Label = null;

    @property(cc.Label)
    resetLa: cc.Label = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    diamond = 0;

    gold = 0;

    protected onEnable(): void {
        if (GameData.vipStatus) {
            if (GameData.SmxlState.gold < 10000) {
                this.tipsLabel.string = '您的当前资金不足1万，无法开启训练，重置获赠5万资金';
            }
            else if (GameData.SmxlState.gold > 1000000000) {
                this.tipsLabel.string = '您的资金已经太多了，重置回到初始状态';
            }
        }
        else {
            if (GameData.SmxlState.gold < 10000) {
                this.tipsLabel.string = '您的当前资金不足1万，无法开启训练，观看视频获赠5万资金';
            }
            else if (GameData.SmxlState.gold > 1000000000) {
                this.tipsLabel.string = '您的资金已经太多了，是否消耗1000金币重置到初始状态';
            }
        }

    }

    onBtnClick(event, target) {
        let name = event.target.name;

        //点击重置
        if (name == 'smxl_btn_cz') {
            // if (this.diamond && GameData.properties[pb.GamePropertyId.Diamond] < this.diamond) {
            //     GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '钻石不足');
            //     return;
            // }
            // else if (this.gold && GameData.properties[pb.GamePropertyId.Gold] < this.gold) {
            //     GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
            //     return;
            // }
            let self = this;
            if (GameData.vipStatus) {
                this.sendSmxlReset();
            }
            else {
                if (GameData.SmxlState.gold < 10000) {
                    LLWSDK.getSDK().showVideoAd((flag) => {
                        if (flag) {
                            this.sendSmxlReset();
                        }
                        else {
                            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '观看完整视频才可以重置成功');
                        }
                    })
                }
                else if (GameData.SmxlState.gold > 1000000000) {
                    if (GameData.properties[pb.GamePropertyId.Gold] < 1000) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
                        return;
                    }
                    this.sendSmxlReset();
                }
            }
        }

        else if (name == 'closeSetBtn') {
            this.node.active = false;
        }
    }

    sendSmxlReset() {
        let self = this;

        socket.send(pb.MessageId.Req_Game_SmxlReset, null, (data) => {
            console.log('重置' + JSON.stringify(data));
            if (data && !data.code) {
                self.node.active = false;
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '双盲本月当前金币重置成功。');

            } else {
                console.log('重置失败:' + JSON.stringify(data));
            }
        })
    }
}
