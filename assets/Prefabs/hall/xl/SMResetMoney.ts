import { pb } from '../../../protos/proto';
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    resetMoneyLa: cc.Label = null;

    @property(cc.Label)
    resetLa: cc.Label = null;


    onEnable() {
        this.resetMoneyLa.string = '1000';
        this.resetLa.string = '1000资金';
    }

    onBtnClick(event, target) {
        let name = event.target.name;

        //点击重置
        if (name == 'smxl_btn_cz') {
            socket.send(pb.MessageId.Req_Game_SmxlReset, null, (data) => {

                console.log(JSON.stringify(data));

                if (data && !data.code) {
                    this.node.active = false;
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '双盲本月当前金币重置成功。');

                } else {
                    console.log('重置失败' + JSON.stringify(data));
                }

            })
        } else if (name == 'closeSetBtn') {
            this.node.active = false;
        }
    }
}
