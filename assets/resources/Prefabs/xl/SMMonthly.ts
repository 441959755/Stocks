import { pb } from "../../../protos/proto";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    monthlyInfo = null;

    @property([cc.Label])
    labels: cc.Label[] = [];

    @property(cc.Node)
    logo: cc.Node = null;


    start() {
        //请求获取跟新数据
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_Game_SmxlReport, null, info => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            console.log('月报数据：' + JSON.stringify(info));
            this.monthlyInfo = info;
            this.onShow();
        });
    }


    onShow() {
        if (!this.monthlyInfo) {
            console.log('this.monthlyInfo is null' + this.monthlyInfo);
            return;
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();

        if (month == 0) {
            year -= 1;
            month = 12;
        }

        this.monthlyInfo.capitalInit && (this.labels[2].string = this.monthlyInfo.capitalInit);
        this.monthlyInfo.capitalFinal && (this.labels[3].string = this.monthlyInfo.capitalFinal);
        if (this.monthlyInfo.profitRate) {
            this.labels[4].string = ((this.monthlyInfo.capitalFinal - this.monthlyInfo.capitalInit) / this.monthlyInfo.capitalInit * 100).toFixed(2) + '%';
            if ((this.monthlyInfo.capitalFinal - this.monthlyInfo.capitalInit) / this.monthlyInfo.capitalInit > 0) {
                this.labels[4].node.color = new cc.Color().fromHEX('#e94343');
            } else {
                this.labels[4].node.color = new cc.Color().fromHEX('#31a633');
            }
        }

        this.monthlyInfo.count && (this.labels[5].string = this.monthlyInfo.count);
        this.monthlyInfo.winCount && (this.labels[6].string = this.monthlyInfo.winCount);
        this.monthlyInfo.winCode += '';
        if (this.monthlyInfo.winCode.length >= 7) {
            this.monthlyInfo.winCode = this.monthlyInfo.winCode.slice(1);
        }

        this.monthlyInfo.winCode && (this.labels[7].string = this.monthlyInfo.winCode);

        if (this.monthlyInfo.winRate) {
            this.labels[8].string = this.monthlyInfo.winRate.toFixed(2) + '%';
            if (this.monthlyInfo.winRate > 0) {
                this.labels[8].node.color = new cc.Color().fromHEX('#e94343');
            } else {
                this.labels[8].node.color = new cc.Color().fromHEX('#31a633');
            }

        }

        this.monthlyInfo.loseCount && (this.labels[9].string = this.monthlyInfo.loseCount);

        this.monthlyInfo.loseCode += '';
        if (this.monthlyInfo.loseCode.length >= 7) {
            this.monthlyInfo.loseCode = this.monthlyInfo.loseCode.slice(1);
        }
        this.monthlyInfo.loseCode && (this.labels[10].string = this.monthlyInfo.loseCode);

        if (this.monthlyInfo.loseRate) {
            this.labels[11].string = (this.monthlyInfo.loseRate).toFixed(2) + '%';
            if (this.monthlyInfo.loseRate > 0) {
                this.labels[11].node.color = new cc.Color().fromHEX('#e94343');
            } else {
                this.labels[11].node.color = new cc.Color().fromHEX('#31a633');
            }
        }

        this.labels[12].string = (((this.monthlyInfo.rankCaptial * 100) + (this.monthlyInfo.rankRate * 100)) / 2).toFixed(2) + '%';
        this.labels[13].string = ((this.monthlyInfo.rankCaptial * 100).toFixed(2) || 0) + '%';
        this.labels[14].string = ((this.monthlyInfo.rankRate * 100).toFixed(2) || 0) + '%';


        //90%≤股市之神
        // 80%≤高阶股民＜90%
        // 60%≤初级股民＜80%
        // 股市韭菜＜60%
        let nodes = this.logo.children;
        nodes.forEach(el => {
            el.active = false;
        })

        let percent = parseFloat((((this.monthlyInfo.rankCaptial * 100) + (this.monthlyInfo.rankRate * 100)) / 2).toFixed(2));
        if (percent >= 90) {
            nodes[0].active = true;
        }
        else if (percent >= 80 && percent < 90) {
            nodes[1].active = true;
        }
        else if (percent >= 60 && percent < 80) {
            nodes[2].active = true;
        }
        else {
            nodes[3].active = true;
        }

    }


    onBthClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
    }

}
