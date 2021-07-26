import { pb } from "../../../protos/proto";
import ComUtils from "../../../sctiprs/Utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    ktype = null;

    onLoad() {
        this.ktype = pb.KType.Min;
    }

    onShow(code) {
        let data = {
            kType: this.ktype,
            code: code,
            total: 250,
            to: ComUtils.fromatTime1(new Date().getTime() / 1000),
        }



    }

    onToggleClick(event, data) {
        let name = event.node.name;
    }


    onDisable() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        else if (name == '') {

        }

    }
}
