//import ActionUtils from "../Utils/ActionUtils";
import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GlobalEvent from '../../../sctiprs/Utils/GlobalEvent';
import EventCfg from '../../../sctiprs/Utils/EventCfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    monthlyInfo = null;

    @property([cc.Label])
    labels: cc.Label[] = [];



    start() {

    }

    protected onEnable() {
        ActionUtils.openLayer(this.node);
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
    }

    onShow() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        //    let day = date.getDate();
        if (month == 0) {
            year -= 1;
            month = 12;
        }
        this.labels[0].string = gameData.userName;
        this.labels[1].string = '的训练记录(' + year + '年' + month + '月)';
        this.labels[2].string = this.monthlyInfo.capital_init;
        this.labels[3].string = this.monthlyInfo.capital_final;
        this.labels[4].string = this.monthlyInfo.profit_rate;
        this.labels[5].string = this.monthlyInfo.count;
        this.labels[6].string = this.monthlyInfo.win_count;
        this.labels[7].string = this.monthlyInfo.win_code;
        this.labels[8].string = this.monthlyInfo.win_rate;
        this.labels[9].string = this.monthlyInfo.lose_count;
        this.labels[10].string = this.monthlyInfo.lose_code;
        this.labels[11].string = this.monthlyInfo.lose_rate;

        this.labels[13].string = (this.monthlyInfo.rank_captial + this.monthlyInfo.rank_rate) / 2 + '%';
        this.labels[13].string = this.monthlyInfo.rank_captial + '%';
        this.labels[14].string = this.monthlyInfo.rank_rate + '%';
    }


    onBthClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
    }

}
