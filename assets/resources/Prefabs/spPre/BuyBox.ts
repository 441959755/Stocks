import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    codeLabel: cc.Label = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    @property(cc.Label)
    mrslLabel: cc.Label = null;

    @property(cc.Label)
    kmgsLabel: cc.Label = null;

    _curData = null;

    onShow(data) {

    }

    onBtnClick(event) {
        let name = event.target.name;

    }

    onToggleClick(event) {
        let name = event.node.name;
    }

    // update (dt) {}
}
