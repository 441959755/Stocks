import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = '';

    onShow() {
        this.label.string = this.text;
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'itemNotice') {
            let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

            GlobalEvent.emit('clickTipsInfoPos', { pos: pos, str: this.text });
        }
    }
}
