
import LLWSDK from "../../sctiprs/common/sdk/LLWSDK";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'kf_lxkf') {
            LLWSDK.getSDK().openCustomerServiceConversation();
        }
        else if (name == 'closeBtn') {
            this.node.active = false;
        }
    }
}
