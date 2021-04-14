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

    @property(cc.Graphics)
    draw1: cc.Graphics = null;

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

    daysData = null;
    // LIFE-CYCLE CALLBACKS:

    @property([cc.Node])
    QXNodes: cc.Node[] = [];

    @property(cc.Node)
    tipsNode: cc.Node = null;

    pos = null;

    @property([cc.Label])
    dayLabel: cc.Label[] = [];



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

            let pos1;

            if (this.vertical1.x > (this.daysData.length - 1) * w) {
                this.vertical1.x = (this.daysData.length - 1) * w;
                pos1 = this.daysData.length - 1;
            } else {
                pos1 = parseInt(this.vertical1.x / w + '');
                this.vertical1.x = (pos1) * w;
            }

            if (this.pos != pos1) {

                //this.daysData[pos1]
                this.tipsNode.active = true;
                if (pos1 <= 10 || pos1 >= 25) {
                    this.tipsNode.x = 1;
                    this.tipsNode.children[0].x = 1;
                } else {
                    this.tipsNode.x = -1;
                    this.tipsNode.children[0].x = -1;
                }

                this.tipsNode.setPosition(localPos);

                let las = this.tipsNode.children[0].children;
                las[0].getComponent(cc.Label).string = '时    间:' + this.daysData[pos1].time;
                las[1].getComponent(cc.Label).string = '练习次数:' + this.daysData[pos1].count;
                las[2].getComponent(cc.Label).string = '初始资金:' + this.daysData[pos1].user_capital;
                las[3].getComponent(cc.Label).string = '最终资金:' + this.daysData[pos1].endMoney;
                las[4].getComponent(cc.Label).string = '收    益:' + this.daysData[pos1].rate;
                this.pos = pos1;

            }

        }, this);

    }

    start() {

    }

    protected onEnable() {
        this.Horizontal1.active = false;
        this.vertical1.active = false;
        this.tipsNode.active = false;

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

        let xlCount = [], xlcvs = [];    //月的训练次数 收益曲线
        let currCount = 0, currCvs = 0;    //这天的训练次数 收益曲线

        for (let i = 0; i < datas.length; i++) {
            zongjinge += datas[i].user_profit;
            zonglilv += datas[i].user_profit_rate;

            let data1 = new Date(datas[i].ts);

            let day1 = data1.getDate();

            xlCount[day1]++;

            if (xlcvs[day1]) {
                xlcvs[day1] += datas[i].user_profit;
            } else {
                xlcvs[day1] += (datas[i].user_profit + datas[i].user_capital);
            }

            //时间、次数、初始资金、最终资金、收益
            for (let t = 0; t < day; t++) {
                if (day1 == t + 1) {
                    if (this.daysData[t]) {
                        this.daysData[t].count++;
                        this.daysData[t].endMoney += datas[i].user_profit;
                        this.daysData[t].rate += datas[i].user_profit_rate;
                    } else {
                        let info = {
                            time: year + '.' + month + '.' + day1,
                            count: 1,
                            user_capital: datas[i].user_capital,
                            endMoney: (datas[i].user_profit + datas[i].user_capital),
                            rate: datas[i].user_profit_rate
                        };
                        this.daysData[t] = info;
                    }
                }
            }


        }

        this.draw_line_month(xlCount, xlcvs);

        this.draw_line_day();

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

    draw_line_day() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.dayLabel[0].string = this.daysData[day].count;
        this.dayLabel[1].string = this.daysData[day].endMoney - this.daysData[day].user_capital + '';
        this.timeLabel.string = '统计时段:' + year + '.' + month + '.' + day;
        let datas = this.yieldInfo.results;
        if (datas.length <= 0) {
            return;
        }

        let curDay = [];
        for (let i = 0; i < datas.length; i++) {
            let data1 = new Date(datas[i].ts);

            let day1 = data1.getDate();
            if (day1 == day) {
                curDay.push(datas[i]);
            }
        }

        curDay.sort((e, t) => {
            return e.ts - t.ts;
        })

        let w = this.draw.node.width / 20;
        //   let h = this.draw.node.height / 5;
        let dots = [];

        let dot = cc.instantiate(this.dot2);
        this.QXNodes[1].addChild(dot);
        let y = (curDay[0].user_capital - 5000) * (100000 / this.QXNodes[1].height);
        if (y < 0) { y = 0 }
        dot.setPosition(0, y);
        dots.push(dot);

        curDay.forEach((el, index) => {
            let node = cc.instantiate(this.dot2);
            this.QXNodes[1].addChild(node);
            let y1 = (el.user_capital + el.user_profit - 5000) * (100000 / this.QXNodes[1].height);
            if (y1 < 0) {
                y1 = 0;
            }
            let x = (index + 1) * w;
            node.setPosition(x, y1);
            dots.push(node);

            this.draw1.lineWidth = 2;
            this.draw1.strokeColor = new cc.Color().fromHEX('#DB9B2A');

            DrawUtils.drawLine(this.draw1, dots[index].x, dots[index].y, dots[index + 1].x, dots[index + 1].y);
        })


    }


    onBthClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        } else if (name == 'lx_smxl_ysyqxxxsj') {
            GlobalEvent.emit('OPENHISTORYLAYER', 'SM', this.yieldInfo);
        }
    }

    onToggleClick(event, data) {
        if (data == 1) {
            this.QXNodes[0].active = true;
            this.QXNodes[1].active = false;
        } else {
            this.QXNodes[0].active = false;
            this.QXNodes[1].active = true;
        }

    }
}
