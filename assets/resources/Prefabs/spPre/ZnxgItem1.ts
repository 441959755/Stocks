// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    label: cc.Label[] = [];

    _curData = null;

    onShow(data, index) {
        this._curData = data;
        index += 1;
        this.label[0].string = index;
        this.label[1].string = data.code;
        this.label[2].string = data.name;
        this.label[3].string = data.lastAskPrice;
        this.label[4].string = data.lastBidPrice;
        this.label[5].string = data.profitRate + '%';
        if (data.lastBidPrice > 0) {
            this.label[4].node.color = cc.Color.RED;
        }

        if (data.profitRate > 0) {
            this.label[5].node.color = cc.Color.RED;
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'item1') {

            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._curData.code);
        }

    }
}
