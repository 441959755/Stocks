import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    onShow(data) {
        let code = data.code + '';
        let items = GameCfgText.getGPPKItemInfo(code);

        if (items) {
            this.labels[0] && (this.labels[0].string = items[1]);
        }
        this.labels[1] && (this.labels[1].string = code);

        let time = data.from * 1000;
        let ts = ComUtils.getYMDHMS(time);

        this.labels[2] && (this.labels[2].string = data.input + '');
        this.labels[3] && (this.labels[3].string = ts.year + '/' + ts.month + '/' + ts.date)
        this.labels[4] && (this.labels[4].string = ts.hours + ':' + ts.minute + ':' + ts.second);

        let end = ComUtils.getYMDHMS(data.end * 1000);

        this.labels[5] && (this.labels[5].string = end.year + '/' + end.month + '/' + end.date)
        this.labels[6] && (this.labels[6].string = end.hours + ':' + end.minute + ':' + end.second);

        let dri = data.end - data.from;
        this.labels[7] && (this.labels[7].string = Math.ceil(dri / 24 / 60 / 60) + '天');

        let pro = data.askPrice - data.bidPrice;

        if (pro > 0) {
            this.labels[8].node.color = new cc.Color().fromHEX('#e94343');
        }
        else if (pro < 0) {
            this.labels[8].node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.labels[8].node.color = cc.Color.WHITE;
        }

        this.labels[8].string = ComUtils.changeTwoDecimal(pro);

        let rate = pro / data.bidPrice;

        if (rate > 0) {
            this.labels[9].node.color = new cc.Color().fromHEX('#e94343');
        }
        else if (rate < 0) {
            this.labels[9].node.color = new cc.Color().fromHEX('#31a633');
        } else {

            this.labels[9].node.color = cc.Color.WHITE;
        }

        this.labels[9].string = ComUtils.changeTwoDecimal(rate * 100) + '%';

    }
}
