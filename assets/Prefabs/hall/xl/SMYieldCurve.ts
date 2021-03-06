//import ActionUtils from "../Utils/ActionUtils";
import GlobalEvent from '../../../sctiprs/Utils/GlobalEvent';
import EventCfg from '../../../sctiprs/Utils/EventCfg';

import DrawUtils from '../../../sctiprs/Utils/DrawUtils';
import GameData from '../../../sctiprs/GameData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    yieldInfo = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel1: cc.Label = null;

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

    daysData = [];
    // LIFE-CYCLE CALLBACKS:

    @property([cc.Node])
    QXNodes: cc.Node[] = [];

    @property(cc.Node)
    tipsNode: cc.Node = null;

    pos = null;

    @property([cc.Label])
    dayLabel: cc.Label[] = [];

    userCapital = 0;

    @property(cc.Node)
    countNode: cc.Node = null;     //次数label父节点

    @property(cc.Node)
    zhijinNode: cc.Node = null;    //资净Label父节点

    @property([cc.Toggle])
    typeToggle: cc.Toggle[] = [];

    @property([cc.Label])
    dayFundLa: cc.Label[] = [];

    cb = null;

    doty = [];

    onLoad() {
        this.monthBg.on('touchstart', (event) => {
            let datas = this.yieldInfo.results;
            if (datas.length <= 0) {
                return;
            }
            this.Horizontal1.active = true;
            this.vertical1.active = true;
            this.tipsBoxShow(event);
        }, this);

        this.monthBg.on('touchmove', (event) => {
            let datas = this.yieldInfo.results;
            if (datas.length <= 0) {
                return;
            }
            this.tipsBoxShow(event);
        }, this);

        this.monthBg.on('touchend', (event) => {
            this.Horizontal1.active = false;
            this.vertical1.active = false;

            if (this.cb) {
                clearTimeout(this.cb);
                this.cb = null;
            }
            this.cb = setTimeout(() => {
                this.tipsNode.active = false;
            }, 1500);

        }, this);


        this.monthBg.on('touchcancel', (event) => {
            //   this.tipsNode.active = false;
            this.Horizontal1.active = false;
            this.vertical1.active = false;

            if (this.cb) {
                clearTimeout(this.cb);
                this.cb = null;
            }
            this.cb = setTimeout(() => {
                this.tipsNode.active = false;
            }, 1500);

        }, this);

    }


    onDisable() {
        if (this.cb) {
            clearTimeout(this.cb);
            this.cb = null;
        }
    }

    tipsBoxShow(event) {
        let w = this.draw.node.width / 30;
        let h = this.draw.node.height / 5;
        let pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
        let localPos = this.draw.node.convertToNodeSpaceAR(pos);
        if (localPos.x < 0) { return }

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
        if (!this.daysData[pos1]) { return }

        if (this.pos != pos1) {
            this.tipsNode.active = true;
            if (pos1 <= 10 || pos1 >= 25) {
                this.tipsNode.scaleX = 1;
                this.tipsNode.children[0].scaleX = 1;
            } else {
                this.tipsNode.scaleX = -1;
                this.tipsNode.children[0].scaleX = -1;
            }
            this.tipsNode.setPosition(cc.v2(this.vertical1.x, this.doty[pos1]));
            let las = this.tipsNode.children[0].children;
            las[0].getComponent(cc.Label).string = '时    间:' + this.daysData[pos1].time;
            las[1].getComponent(cc.Label).string = '练习次数:' + this.daysData[pos1].count;
            las[2].getComponent(cc.Label).string = '初始资金:' + this.daysData[pos1].user_capital;
            las[3].getComponent(cc.Label).string = '最终资金:' + this.daysData[pos1].endMoney;
            las[4].getComponent(cc.Label).string = '收    益:' + ((this.daysData[pos1].endMoney - this.daysData[pos1].user_capital) / this.daysData[pos1].user_capital * 100).toFixed(2) + '%';

        }
        else {
            this.tipsNode.active = false;
            this.pos = pos1;
        }
    }

    protected onEnable() {
        this.Horizontal1.active = false;
        this.vertical1.active = false;
        this.tipsNode.active = false;
        this.tipsNode.zIndex = 99;

        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        //    ActionUtils.openLayer(this.node);

        this.typeToggle[0].node.children[1].active = true;
        this.typeToggle[1].node.children[1].active = false;
    }

    onShow() {
        let datas = this.yieldInfo.results;
        if (datas.length <= 0) {
            return;
        }
        this.QXNodes[0].active = true;
        this.QXNodes[1].active = false;
        this.userCapital = 0;
        this.daysData = [];
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        var d = new Date(year, month, 0).getDate();

        this.timeLabel.string = '统计时段:' + year + '/' + month + '/' + 1 + '--' + year + '/' + month + '/' + d;

        //  this.labels[0].string = datas[datas.length - 1].userCapital;



        let zongjinge = 0, zonglilv = 0;

        let xlCount = [], xlcvs = [];    //月的训练次数 收益曲线
        let currCount = 0, currCvs = 0;    //这天的训练次数 收益曲线

        for (let i = 0; i < datas.length; i++) {
            let data1 = new Date(datas[i].ts * 1000);
            let month1 = data1.getMonth() + 1;
            if (month1 != month) {
                continue;
            }

            zongjinge += datas[i].userProfit;
            zonglilv += datas[i].userProfitRate;

            let day1 = data1.getDate();
            if (!xlCount[day1]) {
                xlCount[day1] = 1;
            } else {
                xlCount[day1] += 1;
            }


            if (xlcvs[day1]) {
                xlcvs[day1] += datas[i].userProfit;
            } else {
                if (!datas[i].userProfit) {
                    xlcvs[day1] = xlcvs[day1 - 1];
                } else {
                    xlcvs[day1] = (datas[i].userProfit + datas[i].userCapital);
                }

                if (!this.userCapital) {
                    this.userCapital = datas[i].userCapital;
                }
            }

            //时间、次数、初始资金、最终资金、收益
            // for (let t = 1; t <= day; t++) {
            //     if (day1 == t) {
            if (this.daysData[day1 - 1]) {
                this.daysData[day1 - 1].count++;
                this.daysData[day1 - 1].endMoney += datas[i].userProfit;
                this.daysData[day1 - 1].rate += datas[i].userProfitRate;
            } else {
                let info = {
                    time: year + '.' + month + '.' + day1,
                    count: 1,
                    user_capital: datas[i].userCapital,
                    endMoney: (datas[i].userProfit + datas[i].userCapital),
                    rate: datas[i].userProfitRate
                };
                this.daysData[day1 - 1] = info;
            }

        }

        for (let j = 0; j < day; j++) {
            let info = {
                time: null,
                count: null,
                user_capital: null,
                endMoney: null,
                rate: null,
            }

            if (!this.daysData[j]) {
                info.time = year + '.' + month + '.' + (j + 1);
                info.rate = 0;
                info.count = 0;
                if (j == 0) {
                    info.user_capital = this.userCapital;
                } else {
                    info.user_capital = this.daysData[j - 1].endMoney;
                }
                info.endMoney = info.user_capital;
                this.daysData[j] = info;
            }
        }

        this.draw_line_month(xlCount, xlcvs);

        this.draw_line_day();

        this.labels[1].string = datas[0].userCapital;
        this.labels[3].string = zongjinge + '';
        if (zongjinge < 0) {
            this.labels[3].node.color = cc.Color.GREEN;
            this.labels[2].node.color = cc.Color.GREEN;
        } else if (zongjinge == 0) {
            this.labels[3].node.color = cc.Color.RED;
            this.labels[2].node.color = cc.Color.RED;
        }
        this.labels[2].string = (zongjinge / datas[0].userCapital * 100).toFixed(2) + '%';
        this.labels[0].string = GameData.SmxlState.gold;
    }

    draw_line_month(xlCount, xlcvs) {
        this.doty = [];
        if (xlCount.length <= 0) { return };
        let date = new Date();
        let day = date.getDate();

        let maxCount = 0;
        let maxMoney = 0;
        xlCount.forEach(el => {
            if (el) {
                maxCount = Math.max(el, maxCount);
            }
        });

        xlcvs.forEach(el => {
            if (el) {
                maxMoney = Math.max(el, maxMoney);
            }

        });

        if (maxMoney <= 150000) {
            maxMoney = 150000
        } else {
            maxMoney = Math.ceil((maxMoney - 50000) / 20000) * 20000 + 50000;
        }


        maxCount = Math.ceil(maxCount / 5) * 5;

        this.countNode.children.forEach((el, index) => {
            el.getComponent(cc.Label).string = maxCount - (maxCount / 5 * index) + '';
        })

        this.zhijinNode.children.forEach((el, index) => {
            el.getComponent(cc.Label).string = maxMoney - ((maxMoney - 50000) / 5) * index + '';
        })

        let w = this.draw.node.width / 30;
        let h = this.draw.node.height / maxCount;

        for (let i = 1; i <= day; i++) {

            let dot1 = cc.instantiate(this.dot1);
            this.draw.node.addChild(dot1);


            dot1.setPosition(cc.v2((i - 1) * w, xlCount[i] * h || 0));

            let dot2 = cc.instantiate(this.dot2);

            this.draw.node.addChild(dot2);
            dot2.zIndex = 6;
            if (!xlcvs[i]) {
                if (i == 0) {
                    xlcvs[i] = this.userCapital;
                } else {
                    xlcvs[i] = xlcvs[i - 1];
                }

            }
            let y;
            if (!xlcvs[i] || xlcvs[i] <= 50000) { y = 0 } else {
                let c = xlcvs[i] - 50000;
                y = c * (this.draw.node.height / (maxMoney - 50000));
            }

            dot2.setPosition(cc.v2((i - 1) * w, y));
            this.doty.push(y);

            if (i >= 2) {
                this.draw.lineWidth = 2;
                this.draw.strokeColor = new cc.Color().fromHEX('#3B95D1');
                DrawUtils.drawLine(this.draw, this.preDot1Pos.x, this.preDot1Pos.y, dot1.x, dot1.y);

                this.draw.strokeColor = new cc.Color().fromHEX('#DB5741');
                DrawUtils.drawLine(this.draw, this.preDot2Pos.x, this.preDot2Pos.y, dot2.x, dot2.y);
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

        if (!this.daysData[day - 1]) { return }

        this.dayLabel[0].string = this.daysData[day - 1].count;
        this.dayLabel[1].string = this.daysData[day - 1].endMoney - this.daysData[day - 1].user_capital + '';
        if (this.daysData[day - 1].endMoney - this.daysData[day - 1].user_capital < 0) {
            this.dayLabel[1].node.color = cc.Color.GREEN;
        } else {
            this.dayLabel[1].node.color = cc.Color.RED;
        }
        this.timeLabel1.string = '统计时段:' + year + '.' + month + '.' + day;
        let datas = this.yieldInfo.results;
        if (datas.length <= 0) {
            return;
        }

        let curDay = [];
        for (let i = 0; i < datas.length; i++) {
            let data1 = new Date(datas[i].ts * 1000);
            let day1 = data1.getDate();
            if (day1 == day) {
                curDay.push(datas[i]);
            }
        }

        curDay.sort((e, t) => {
            return e.ts - t.ts;
        })

        if (!curDay || curDay.length <= 0) { return }

        let maxValue = 0;
        curDay.forEach(el => {
            maxValue = Math.max((el.userCapital + el.userProfit), maxValue);
        })

        maxValue = Math.ceil((maxValue - 50000) / 20000) * 20000;
        if (maxValue < 0) {
            this.dayFundLa.forEach((el, index) => {
                el.string = 50000 + 10000 * index + '';
            })
            maxValue = 100000;
        } else {
            this.dayFundLa.forEach((el, index) => {
                el.string = 50000 + maxValue / 5 * index + '';
            })
        }




        let w = this.draw.node.width / 25;
        //   let h = this.draw.node.height / 5;
        let dots = [];

        let dot = cc.instantiate(this.dot2);

        this.draw1.node.addChild(dot);
        dot.zIndex = 6;
        let y = (curDay[0].userCapital - 50000) * (this.QXNodes[1].height / maxValue);
        if (y < 0) { y = 0 }
        dot.setPosition(0, y);
        dots.push(dot);

        curDay.forEach((el, index) => {
            let node = cc.instantiate(this.dot2);
            this.draw1.node.addChild(node);
            let y1 = (el.userCapital + el.userProfit - 50000) * (this.QXNodes[1].height / maxValue);
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

        //  acquireSMhistoryInfo{"results":[{"uid":1000105,"gType":"ShuangMang",
        //         "quotesCode": 1300752, "kType": "Day", "kFrom": "20190404", "kTo": "20190404",
        //             "ts": "1621782827", "rank": 1
        //     },{
        //         "uid": 1000105, "gType": "ShuangMang", "quotesCode": 1002839, "kType": "Day",
        //             "kFrom": "20180822", "kTo": "20181029", "stockProfitRate": 2.7899999618530273, "userProfitRate": 3.700000047683716, "userProfit": "3699", "ts": "1622445051", "rank": 1
        // }]}

    }


    onBthClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        } else if (name == 'lx_smxl_ysyqxxxsj') {
            GlobalEvent.emit(EventCfg.OPENHISTORYLAYER);
        }
    }

    onToggleClick(event, data) {
        if (data == 1) {
            this.QXNodes[0].active = true;
            this.QXNodes[1].active = false;
            //  event.target.children[0] = false;
            this.typeToggle[0].node.children[1].active = true;
            this.typeToggle[1].node.children[1].active = false;

        } else {
            this.QXNodes[0].active = false;
            this.QXNodes[1].active = true;
            this.typeToggle[0].node.children[1].active = false;
            this.typeToggle[1].node.children[1].active = true;
        }

    }
}
