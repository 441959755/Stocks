
import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    _code = null;

    _curData = null;
    onLoad() {
        GlobalEvent.on('UPDATEITEMDATA', (info) => {
            if (this._code == info.code) {
                this.setLabel(info);
            }
        }, this);
    }

    setLabel(info) {
        if (this._code != info.code) { return };
        this.labels[2].string = ComUtils.changeTwoDecimal(info.price) + '';

        this.labels[3].string = ComUtils.changeTwoDecimal(this._curData.priceCost) + '';
        this.labels[4].string = this._curData.volume;

        let zd = info.price - this._curData.priceCost;
        if (zd < 0) {
            this.labels[5].node.color = cc.Color.GREEN;
            this.labels[6].node.color = cc.Color.GREEN;
        }
        else {
            this.labels[5].node.color = cc.Color.RED;
            this.labels[6].node.color = cc.Color.RED;
        }

        this.labels[5].string = ComUtils.changeTwoDecimal(zd) + '';
        let zdf = zd / this._curData.priceCost * 100;
        this.labels[6].string = ComUtils.changeTwoDecimal(zdf) + '%';

        this.labels[7].string = ComUtils.changeTwoDecimal(info.high) + '';
        this.labels[8].string = ComUtils.changeTwoDecimal(info.low) + '';
        let sy = (info.price - this._curData.priceCost) * this._curData.volume;
        if (sy > 0) {
            this.labels[9].node.color = cc.Color.RED;
        } else {
            this.labels[9].node.color = cc.Color.GREEN;
        }
        this.labels[9].string = ComUtils.changeTwoDecimal(sy) + '';
        //   GlobalEvent.emit(EventCfg.UPDATECCASSET, sy);
    }

    onShow(code, data: any) {

        if (!this._code || this._code != code) {

            this._code = code;
            this._curData = data;

            let items = GameCfgText.getGPPKItemInfo(this._code);
            if (items) {
                this.labels[1].string = items[1];
            }
            code = this._code + '';
            if (code.length >= 7) {
                code = code.slice(1);
            }
            this.labels[0].string = code;
        }
    }

    onDestroy() {
        GlobalEvent.off('UPDATEITEMDATA');
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //看信号买卖
        if (name == 'item1') {
            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._code);
        }
    }

}
