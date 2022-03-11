import { pb } from "../../../protos/proto";
import LLWSDK from "../../../sctiprs/common/sdk/LLWSDK";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        // GlobalEvent.on('CmdGoldAwardPrompt', () => {
        //     if (this.node.active) {

        //         GlobalEvent.emit(EventCfg.LOADINGHIDE);
        //         GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '领取成功');
        //     }
        // }, this);
    }


    onClickBtn(event, curdata) {
        let name = event.target.name;

        if (name == 'sys_tck_qd') {

            LLWSDK.getSDK().showVideoAd((falg) => {
                GlobalEvent.emit(EventCfg.LOADINGSHOW);
                if (falg) {
                    socket.send(pb.MessageId.Req_Hall_GetBrokenAward, null, (res) => {

                    })
                    this.node.active = false;
                }
            });

        }

        else if (name == 'sys_close') {
            this.node.active = false;
        }
    }

    onDestroy() {
        GlobalEvent.off('CmdGoldAwardPrompt');
    }

}
