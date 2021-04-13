//import ActionUtils from "../Utils/ActionUtils";
import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GlobalEvent from '../../../sctiprs/Utils/GlobalEvent';
import EventCfg from '../../../sctiprs/Utils/EventCfg';

import DrawUtils from '../../../sctiprs/Utils/DrawUtils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    yieldInfo = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property([cc.Label])
    labels: cc.Label[] = [];

    @property(cc.Graphics)
    draw: cc.Graphics = null;

    @property(cc.Node)
    dot1: cc.Node = null;

    @property(cc.Node)
    dot2: cc.Node = null;

    @property(cc.Node)
    Horizontal1: cc.Node = null;

    @property(cc.Node)
    vertical1: cc.Node = null;

    preDot1Pos = null;

    preDot2Pos = null;

    @property(cc.Node)
    monthBg: cc.Node = null;

    xlCount = [];
    xlcvs = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let w = this.draw.node.width / 31;
        let h = this.draw.node.height / 5;
        this.monthBg.on('touchstart', (event) => {
            this.Horizontal1.active = true;
            this.vertical1.active = true;
        }, this);

        this.monthBg.on('touchmove', (event) => {
            let pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
            let localPos = this.monthBg.convertToNodeSpaceAR(pos);

            this.Horizontal1.y = localPos.y;
            this.vertical1.x = localPos.x;

            if (this.vertical1.x > this.xlCount.length * w) {
                this.vertical1.x = this.xlCount.length * w;
            }





        }, this);

    }

    start() {

    }

    protected onEnable() {
        this.Horizontal1.active = false;
        this.vertical1.active = false;

        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        ActionUtils.openLayer(this.node);
    }

    onShow() {
        let datas = this.yieldInfo.results;
        if (datas.length <= 0) {
            return;
        }

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        this.timeLabel.string = '统计时段:' + year + '.' + month + '.' + 1 + '--' + year + '.' + month + '.' + day;

        this.labels[0].string = datas[datas.length - 1].user_capital;
        this.labels[1].string = datas[0].user_capital;

        let zongjinge, zonglilv;

        this.xlCount = [], this.xlcvs = [];    //月的训练次数 收益曲线
        let currCount = 0, currCvs = 0;    //这天的训练次数 收益曲线

        for (let i = 0; i < datas.length; i++) {
            zongjinge += datas[i].user_profit;
            zonglilv += datas[i].user_profit_rate;

            let data1 = new Date(datas[i].ts);

            let day1 = data1.getDate();

            this.xlCount[day1]++;

            if (this.xlcvs[day1]) {
                this.xlcvs[day1] += datas[i].user_profit;
            } else {
                this.xlcvs[day1] += (datas[i].user_profit + datas[i].user_capital);
            }

        }

        this.draw_line_month(this.xlCount, this.xlcvs);

        this.labels[2].string = zongjinge;
        this.labels[3].string = zonglilv;
    }

    draw_line_month(xlCount, xlcvs) {
        if (xlCount.length <= 0) { return };
        let date = new Date();
        let day = date.getDate();

        let w = this.draw.node.width / 31;
        let h = this.draw.node.height / 5;

        for (let i = 0; i <= day; i++) {

            let dot1 = cc.instantiate(this.dot1);
            this.draw.node.addChild(dot1);

            dot1.setPosition(cc.v2(i * w, xlCount[i] * h));

            let dot2 = cc.instantiate(this.dot2);
            this.draw.node.addChild(dot2);

            let y;
            if (xlcvs[i] <= 100000) { y = 0 } else {
                let c = xlcvs[i] - 100000;
                y = c * (50000 / this.draw.node.height);
            }

            dot2.setPosition(cc.v2(i * w, y));

            if (i >= 1) {
                this.draw.lineWidth = 2;
                this.draw.strokeColor = new cc.Color().fromHEX('#3B95D1');
                DrawUtils.drawLine(this.draw, this.preDot1Pos.x, this.preDot1Pos.y, this.dot1.x, this.dot1.y);

                this.draw.strokeColor = new cc.Color().fromHEX('#DB9B2A');
                DrawUtils.drawLine(this.draw, this.preDot2Pos.x, this.preDot2Pos.y, this.dot2.x, this.dot2.y);
            }

            this.preDot1Pos = dot1.position;
            this.preDot2Pos = dot2.position;


        }



    }


    onBthClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        } else if (name == 'lx_smxl_ysyqxxxsj') {
            GlobalEvent.emit('OPENHISTORYLAYER', 'SM', this.yieldInfo);
        }
    }
}
