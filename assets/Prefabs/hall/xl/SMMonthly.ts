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

        //  {"capitalInit":"100000","capitalFinal":"80000",
        // "profitRate":0.800000011920929,"winCount":3,
        // "winCode":600000,"winRate":0.699999988079071,
        // "loseCount":2,"loseCode":600001,"loseRate":-0.7599999904632568,
        // "count":5,"rankCaptial":0.20999999344348907,"rankRate":0.550000011920929}
        this.labels[0].string = gameData.userName;
        this.labels[1].string = '的训练记录(' + year + '年' + month + '月)';
        this.labels[2].string = this.monthlyInfo.capitalInit || 0;
        this.labels[3].string = this.monthlyInfo.capitalFinal || 0;
        this.labels[4].string = this.monthlyInfo.profitRate.toFixed(2) || 0;
        this.labels[5].string = this.monthlyInfo.count || 0;
        this.labels[6].string = this.monthlyInfo.winCount || 0;
        this.labels[7].string = this.monthlyInfo.winCode || 0;
        this.labels[8].string = this.monthlyInfo.winRate.toFixed(2) || 0;
        this.labels[9].string = this.monthlyInfo.loseCount || 0;
        this.labels[10].string = this.monthlyInfo.loseCode || 0;
        this.labels[11].string = (this.monthlyInfo.loseRate).toFixed(2) || 0;

        this.labels[13].string = (((this.monthlyInfo.rankCaptial) + (this.monthlyInfo.rankRate)) / 2).toFixed(2) + '%';
        this.labels[13].string = (this.monthlyInfo.rankCaptial).toFixed(2) || 0 + '%';
        this.labels[14].string = (this.monthlyInfo.rankRate).toFixed(2) || 0 + '%';
    }


    onBthClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
    }

}
