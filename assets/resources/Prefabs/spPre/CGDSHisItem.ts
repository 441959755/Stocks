import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property([cc.Label])
    labels: cc.Label[] = [];

    onShow(dataObj) {

        let codename = GameCfgText.getGPItemInfo(dataObj.item.code)[1];

        this.labels[0] && (this.labels[0].string = codename);
        this.labels[1] && (this.labels[1].string = dataObj.item.code);
        this.labels[2] && (this.labels[2].string = dataObj.item.volume);
        this.labels[3] && (this.labels[3].string = ComUtils.changeTwoDecimal(dataObj.item.volume * dataObj.price));
        this.labels[4] && (this.labels[4].string = ComUtils.changeTwoDecimal(dataObj.item.priceCost));

        if (dataObj.price) {
            this.labels[5] && (this.labels[5].string = ComUtils.changeTwoDecimal(dataObj.price));
            let rate = parseFloat(ComUtils.changeTwoDecimal((dataObj.price - dataObj.item.priceCost) / dataObj.item.priceCost * 100));
            this.labels[6] && (this.labels[6].string = rate + '%');
            if (rate > 0) {
                this.labels[6].node.color = new cc.Color().fromHEX('#e94343');
            }
            else {
                this.labels[6].node.color = new cc.Color().fromHEX('#31a633');

            }
        }
        else {
            this.labels[5] && (this.labels[5].string = '0.00');
            this.labels[6] && (this.labels[6].string = '0.00');
        }

    }

}
