import { pb } from "../../protos/proto";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import DrawData from "./DrawData";
import GameCfg from "./GameCfg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    itemNotice: cc.Prefab = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    timeCall = null;

    gpData = null;

    maList = null;

    difList = null;

    deaList = null;

    macdList = null;

    JXState = 0;

    MACDState = 0;

    MACDMIN = 0;

    MACDMAX = 0;

    KList = null;
    DList = null;
    JList = null;

    BollList = null;

    disMin = 0;
    disMax = 0;

    BollState = 0;

    EXPMA1 = null;
    EXPMA2 = null;

    RSI1 = null;
    RSI2 = null;
    RSI3 = null;

    RSIState = 0;

    VOlList = null;

    onLoad() {
        GlobalEvent.on(EventCfg.SLGEVENTNOTICE, () => {
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                if (GameCfg.GameSet.select == '均线') {
                    this.testMaEvent();
                } else if (GameCfg.GameSet.select == 'MACD') {
                    this.testMACDEvent();
                } else if (GameCfg.GameSet.select == 'KDJ') {
                    this.testKDJEvent();
                }
                else if (GameCfg.GameSet.select == 'BOLL') {
                    this.testBOLLEvent();
                }
                else if (GameCfg.GameSet.select == 'EXPMA') {
                    this.testEXPMAEvent();
                }

                else if (GameCfg.GameSet.select == 'RSI') {
                    this.testRSIEvent();
                }
                else if (GameCfg.GameSet.select == '成交量') {
                    this.testVOLEvetnt();
                }
            }
        })

        GlobalEvent.on('clickTipsInfoPos', (data) => {
            if (GameCfg.GameType != pb.GameType.ZhiBiao) {
                return
            }
            let locPos = this.content.parent.parent.convertToNodeSpaceAR(data.pos);
            this.tipsLabel.node.parent.y = locPos.y;
            this.tipsLabel.string = data.str;
            this.tipsLabel.node.parent.active = true;
            if (this.timeCall) {
                clearTimeout(this.timeCall);
            }
            this.timeCall = setTimeout(() => {
                this.tipsLabel.node.parent.active = false;
                clearTimeout(this.timeCall);
                this.timeCall = null;
            }, 3000);

        }, this);
    }

    initData() {
        this.gpData = GameCfg.data[0].data;
        this.maList = DrawData.MaList;

        this.difList = DrawData.DIFList;
        this.deaList = DrawData.DEAList;
        this.macdList = DrawData.MACDList;

        this.KList = DrawData.Klist;
        this.DList = DrawData.Dlist;
        this.JList = DrawData.jList;

        this.BollList = DrawData.BollList;

        this.EXPMA1 = DrawData.EXPMA1;
        this.EXPMA2 = DrawData.EXPMA2;

        this.RSI1 = DrawData.Rs6;
        this.RSI2 = DrawData.Rs12;
        this.RSI3 = DrawData.Rs24;

        this.VOlList = DrawData.VolList;
    }


    testMaEvent() {
        let index = GameCfg.huizhidatas - 1;
        let c = 0, j = 0, z = 1;

        if (GameCfg.GameSet.strategy == '组合训练') {
            let arr = JSON.parse(JSON.stringify(GameCfg.MAs));
            c = arr.indexOf(GameCfg.GameSet.MA[0]);
            if (arr.length == 3) {
                if (c == 0) {
                    j = 1; z = 2;
                } else if (c == 1) {
                    j = 0; z = 2;
                } else if (c == 2) {
                    j = 0; z = 1;
                }
            }
            //短线转向买点
            if (this.maList[j][index] > this.maList[z][index]) {
                if (this.maList[j][index] > this.maList[z][index - 1]) {
                    if (this.gpData[index].close > this.maList[j][index]) {
                        let max = Math.max(this.gpData[index - 1].close.this.gpData[index - 1].open);
                        if (this.gpData[index].close > max) {
                            //B
                        }
                    }
                }
            }

            //短线转向卖点
            if (this.maList[j][index] <= this.maList[j][index - 1]) {
                if (this.gpData[index].close < this.maList[j][index]) {
                    let max = Math.max(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close < max) {
                        //S

                    }
                }
            }

            //乖离过大买点
            if (this.maList[j][index] < this.maList[z][index]) {
                if ((this.maList[j][index] - this.gpData[index].close) / this.maList[index] >= -0.1) {
                    let min = Math.min(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close > min) {
                        if (this.gpData[index].low > this.gpData[index - 1].low) {
                            //B
                        }
                    }
                }
            }

            //乖离过大卖点
            if (this.maList[j][index] > this.maList[z][index]) {
                if (((this.gpData[index].close - this.maList[j][index]) / this.maList[j][index]) >= 0.1) {
                    let min = Math.min(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close < min) {
                        //s
                    }
                }
            }


        }
        if (GameCfg.GameSet.strategy == '股价穿越均线' || GameCfg.GameSet.strategy == '组合训练') {
            let str;

            //1)股价上穿均线
            if (this.gpData[index].close > this.maList[c][index]) {
                if (this.maList[index] > this.maList[index - 1]) {
                    let b = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].open);
                    if (this.gpData[index] > b) {
                        //
                        str = '上穿' + GameCfg.MAs[c] + '均线';
                        //B
                    }
                }
            }

            //2)股价下穿均线
            if (this.gpData[index - 1].close > this.maList[c][index - 1]) {
                if (this.gpData[index].close < this.maList[c][index]) {
                    str = '下穿' + GameCfg.MAs[c] + '均线';
                    //S

                }
            }

        }
        else if (GameCfg.GameSet.strategy == '均线交叉' || GameCfg.GameSet.strategy == '组合训练') {

            //3）均线金叉
            if (this.maList[j][index] > this.maList[z][index] && this.gpData[index].close > this.maList[z][index]) {
                if (this.maList[j][index] >= this.maList[j][index - 1] && this.maList[z][index] >= this.maList[z][index - 1]) {
                    if (this.JXState == 0) {
                        this.JXState = 1;
                        //B
                    } else {
                        if (this.JXState == 2) {
                            let max = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].open);
                            if (this.gpData[index].close > max) {
                                this.JXState = 1;
                                //B
                            }
                        }
                    }

                }

            }
            //4）均线死叉
            if (this.maList[j][index - 1] > this.maList[z][index - 1]) {
                if (this.maList[j][index] < this.maList[z][index]) {
                    this.JXState = 2;
                    //S
                }
            }

        }


    }

    testMACDEvent() {
        //1) MACD 金叉
        let index = GameCfg.huizhidatas - 1;
        if (this.difList[index - 1] <= this.deaList[index - 1]) {
            if (this.difList[index] > this.deaList[index]) {

            }
        }

        //2) MACD 死叉
        if (this.difList[index - 1] >= this.deaList[index - 1]) {
            if (this.difList[index] < this.deaList[index]) {

            }
        }

        //3）DIF向上穿越0轴
        if (this.difList[index - 1] < 0) {
            if (this.difList[index] > 0) {

            }
        }

        //4）DIF向下穿越0轴
        if (this.difList[index - 1] > 0) {
            if (this.difList[index] < 0) {

            }
        }

        //5）MACD底背离
        //TODO

        //6）MACD顶背离
        //TODO

        //7）绿柱最低值转向
        if (this.gpData[index - 1].close < this.gpData[index - 2].close) {
            if (this.macdList[index] < 0) {
                if (this.macdList[index] > this.macdList[index - 1]) {
                    this.MACDMIN = this.macdList[index - 1];
                    if (this.macdList[index] >= this.difList[index] || this.difList[index] > 0) {
                        if (this.difList[index] > this.difList[index - 1]) {
                            //B
                            this.MACDState = 1;
                        }
                    }
                }
            }
        }

        if (this.MACDState == 1 && this.macdList[index] < this.MACDMIN) {
            if (Math.abs(this.macdList[index]) >= 0.04) {
                //s
                this.MACDState = 2;
            }
        }

        if (this.MACDState == 0) {
            if (this.macdList[index - 1] < 0) {
                if (this.macdList[index] > 0) {
                    this.MACDState = 1;
                    //B
                }
            }
        }
        //8）红柱最高值转向

        if (this.gpData[index - 1].close > this.gpData[index - 2].close) {
            if (this.macdList[index] > 0) {
                if (this.macdList[index] < this.macdList[index - 1]) {
                    this.MACDMAX = this.macdList[index - 1];
                    if (this.difList[index] < this.difList[index - 1]) {
                        if (this.deaList[index] > 0) {
                            if (this.macdList[index] <= this.difList[index]) {
                                //s
                                this.MACDState = 2;
                            }
                        } else if (this.deaList[index] <= 0) {
                            if (this.macdList[index] < this.macdList[index - 1]) {
                                this.MACDState = 2;
                            }
                        }
                    }
                }
            }
        }

        if (this.MACDState == 2 && this.MACDState[index] > 0) {
            if (this.macdList[index] > this.macdList[index - 1]) {
                if (this.deaList[index] > this.deaList[index - 1]) {
                    let max = Math.max(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close >= max) {
                        if (this.macdList[index] >= 0.04) {
                            // this.MACDState = 1;
                            //B
                        }
                    }
                }
            }
        }

        if (this.MACDState == 0) {
            if (this.macdList[index - 1] > 0) {
                if (this.macdList[index] < 0) {
                    this.MACDState = 2;
                    //s
                }
            }
        }

    }

    testKDJEvent() {
        let index = GameCfg.huizhidatas - 1;
        //１） KDJ 金叉
        if (this.KList[index - 1] < this.DList[index - 1]) {
            if (this.KList[index] > this.DList[index]) {
                if (this.DList[index] < this.DList[index + 1]) {

                    if (this.KList[index] > this.DList[index]) {
                        //2）KDJ低位金叉
                        if (this.KList < 30) {

                        }
                        //3）KDJ中位金叉
                        else if (this.KList <= 70 && this.KList >= 30) {

                        }
                        //4）KDJ高位金叉
                        else if (this.KList[index] > 70) {

                        }
                    }
                }
            }
        }

        //2）KDJ死叉
        if (this.KList[index - 1] > this.DList[index - 1]) {
            if (this.KList[index] < this.DList[index]) {
                //2）KDJ高位死叉
                if (this.KList[index] < this.DList[index]) {
                    if (this.KList[index] >= 70) {

                    }
                    //3）KDJ中位死叉
                    else if (this.KList[index] <= 70 && this.KList[index] > 30) {

                    }
                    //4) KDJ低位死叉
                    else if (this.KList[index] <= 30) {

                    }
                }
            }
        }

        // 3）KDJ超买
        if (this.JList[index - 2] >= 100 && this.JList[index - 1] >= 100 && this.JList[index] >= 100) {
            let max = Math.max(this.gpData[index - 1].close.this.gpData[index - 1].open);
            if (this.gpData[index].close < max && this.gpData[index].high <= this.gpData[index - 1].high) {
                //s
            }
        }

        // 4）KDJ超卖
        if (this.JList[index - 2] <= 0 && this.JList[index - 1] <= 0 && this.JList[index] <= 0) {
            let min = Math.min(this.gpData[index - 1].close.this.gpData[index - 1].open);
            if (this.gpData[index].close > min && this.gpData[index].low >= this.gpData[index - 1].low) {
                //B
            }
        }

        //5）KDJ顶背离



        //6）KDJ底背离


    }

    testBOLLEvent() {
        let index = GameCfg.huizhidatas - 1;

        let dis = this.BollList[index][1] - this.BollList[index][2];
        if (!this.disMin) {
            this.disMin = dis;
        }
        this.disMax = Math.max(dis, this.disMax);
        this.disMin = Math.min(dis, this.disMin);
        if (dis > 1.5 * this.disMin) {
            this.BollState = 1;
        } else if (dis <= this.disMax * 2 / 3) {
            this.BollState = 2;
        }


        //1) 股价突破中轨
        if (this.gpData[index - 1].low <= this.BollList[index - 1][0] && this.gpData[index - 1].close > this.BollList[index - 1][0]) {
            if (this.BollList[index][0] >= this.BollList[index - 1][0]) {
                if (this.BollList[index][1] >= this.BollList[index - 1][1]) {
                    if (this.gpData[index].close > this.BollList[index][0]) {
                        let preMax = Math.max(this.gpData[index - 1].open, this.gpData[index - 1].close);
                        if (this.gpData[index].close > preMax) {
                            if (this.gpData[index].low > this.gpData[index - 1].low) {
                                //B
                            }
                        }
                    }
                }
            }
        }

        //2)股价跌破中轨
        if (this.gpData[index - 1].close >= this.BollList[index - 1][0]) {
            if (this.gpData[index].close < this.BollList[index][0]) {
                //s
            }
        }

        //3）股价触碰上轨
        if (this.gpData[index].high >= this.BollList[index][1]) {
            if (this.gpData[index].close < this.BollList[index][1]) {

                if (this.BollList[index][0] <= this.BollList[index - 1][0]) {
                    //s
                }
                else if (this.BollList[index][0] > this.BollList[index - 1][0]) {
                    if (this.BollList[index][1] <= this.BollList[index - 1][1] || this.BollList[index][2] <= this.BollList[index - 1][2]) {
                        //s
                    }
                }

            }
        }

        //4）股价突破上轨
        if (this.BollState == 1) {
            if (this.gpData[index].close > this.BollState[index][1]) {
                //B
            }
        }

        //5）股价跌破下轨
        if (this.BollState == 1) {
            if (this.gpData[index - 1].close >= this.BollList[index - 1][2]) {
                if (this.gpData[index].close < this.BollList[index][2]) {
                    //s
                }
            }
        }

        // /6）布林带下轨支撑
        if (this.gpData[index - 1].close > this.BollList[index - 1][2]) {
            if (this.gpData[index].low <= this.BollList[index][2]) {
                if (this.gpData[index].low > this.gpData[index - 1].low) {
                    let min = Math.min(this.gpData[index].open, this.gpData[index].close);
                    let premin = Math.min(this.gpData[index - 1].open, this.gpData[index].close)
                    if (min >= premin) {
                        if (this.BollList[index][0] > this.BollList[index - 1][0] || this.BollList[index][1] > this.BollList[index - 1][1] || this.BollList[index][2] > this.BollList[index - 1][2]) {
                            //b
                        }
                    }

                }
            }
        }

        // 7）布林带上轨阻力
        //TODO

        //8）判断震荡行情


    }

    testEXPMAEvent() {
        //EXP均线金叉
        let index = GameCfg.huizhidatas - 1;
        if (this.EXPMA2[index] >= this.EXPMA2[index - 1] && this.EXPMA1[index] >= this.EXPMA1[index - 1]) {
            if (this.EXPMA1[index] > this.EXPMA2[index]) {
                //B
            }
        }

        //EXP均线死叉
        if (this.EXPMA2[index] < this.EXPMA2[index - 1]) {
            if (this.EXPMA1[index] < this.EXPMA2[index]) {
                //s
            }
        }

        //短线转向买点
        if (this.EXPMA2[index] > this.EXPMA2[index]) {
            if (this.EXPMA1[index] > this.EXPMA1[index - 1]) {
                if (this.gpData[index].close > this.EXPMA1[index]) {
                    let max = Math.max(this.gpData[index - 1].open, this.gpData[index - 1].close);
                    if (this.gpData[index].close > max) {
                        //B
                    }
                }
            }
        }

        //短线转向卖点
        //TODO
        if (this.gpData[index].close > this.EXPMA1[index]) {
            if (this.gpData[index].close < this.gpData[index - 1].low) {

            }
        }

        // 乖离过大买点
        //TODO
        if (this.EXPMA1[index] < this.EXPMA2[index]) {
            if ((this.EXPMA1[index] - this.gpData[index].close) / this.EXPMA1[index] >= 0.1) {

            }
        }

        //乖离过大卖点
        if (this.EXPMA1[index] > this.EXPMA2[index]) {
            if ((this.gpData[index].close - this.EXPMA2[index]) / this.EXPMA1[index] >= 0.1) {
                let max = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].ope);
                if (this.gpData[index].close < max) {
                    //s
                }
            }
        }

    }

    testRSIEvent() {
        let index = GameCfg.huizhidatas - 1;
        {//RSI金叉
            if (this.RSI3[index] < 50) {
                if (this.RSI2[index] > this.RSI3[index]) {
                    //B
                }
            }

            if (this.RSI3 >= 50) {
                if (this.RSI1[index] > this.RSI2[index] || this.RSI2[index] > this.RSI3[index]) {
                    //B
                }
            }

            if (this.RSI1[index - 1] < this.RSI3[index - 1]) {
                if (this.RSI1[index] > this.RSI3[index]) {
                    //B
                }
            }
        }

        {//RSI死叉
            if (this.RSI1[index - 1] > this.RSI2[index - 1]) {
                if (this.RSI1[index] < this.RSI2[index]) {
                    //s
                }
            }
            else if (this.RSI2[index - 1] > this.RSI3[index - 1]) {
                if (this.RSI2[index] < this.RSI3[index]) {
                    //s
                }
            }
            else if (this.RSI1[index - 1] > this.RSI3[index - 1]) {
                if (this.RSI1[index] < this.RSI3[index]) {
                    //s
                }
            }
        }

        {//RSI超卖


        }

        {//RSI超买
            if (this.RSI1[index] > 80) {
                if (this.gpData[index].close < this.gpData[index - 1].close) {
                    if (this.RSI1[index] < this.RSI1[index - 1] && this.RSI2[index] <= this.RSI2[index - 1]) {
                        //s
                    }
                }
            }

        }

        {
            //高位钝化买点
            if (this.RSI2[index] >= 75) {
                if (this.RSI1[index] > this.RSI2[index] && this.RSI2[index] > this.RSI3[index]) {
                    if (this.RSI1[index] > this.RSI1[index - 1]) {
                        let max = Math.max(this.gpData[index - 1].open, this.gpData[index - 1].close);
                        if (this.gpData[index].close > max) {
                            //B
                            this.RSIState = 1;
                        }
                    }
                }
            } else {
                if (this.RSIState == 1 && this.RSI2[index] < 75) {
                    //s
                    this.RSIState = 0;
                }
            }

        }


        {
            //低位钝化卖点
            if (this.RSI2[index] <= 25) {
                if (this.RSI1[index] < this.RSI2[index] && this.RSI2[index] < this.RSI3[index]) {
                    if (this.RSI1[index] < this.RSI1[index - 1]) {
                        let min = Math.min(this.gpData[index - 1].close, this.gpData[index - 1].open);
                        if (this.gpData[index].close < min) {
                            //S
                        }
                    }
                }

            }

        }


    }

    testVOLEvetnt() {
        let index = GameCfg.huizhidatas - 1;
        //均量线金叉
        if (this.VOlList[index][0] > this.VOlList[index][1]) {
            if (this.gpData[index].value > this.VOlList[index][0]) {
                if (this.gpData[index].value > this.VOlList[index][1]) {
                    if (this.VOlList[index][1] > this.VOlList[index - 1][0]) {
                        //b
                    }
                }
            }

        }
        //均量线死叉
        {
            if (this.VOlList[index][0] < this.VOlList[index][1]) {
                //S
            }

        }

        //倍量阳柱(阳线）
        {
            if (this.gpData[index].value >= 1.9 * this.gpData[index - 1].value) {
                if (this.gpData[index].close > this.gpData[index - 1].close) {
                    let max = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].open);
                    if (this.gpData[index].close >= max && this.gpData[index].close > this.gpData[index].open) {
                        if (this.gpData[index].value > this.VOlList[index][0] && this.gpData[index].value > this.VOlList[index][1]) {
                            //TODO还有一个条件没写
                        }
                    }
                }

            }

        }

        //量价齐升
        {
            if (this.gpData[index].value > this.gpData[index - 1].value) {
                if (this.gpData[index].value > this.VOlList[index][0]) {
                    if (this.gpData[index].value > this.VOlList[index][1]) {
                        let max = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].open);
                        if (this.gpData[index].close >= max) {
                            //TODO 长期什么鬼
                        }
                    }
                }
            }
        }

        //价升量减
        {
            if (this.gpData[index].close > this.gpData[index - 1].close) {
                if (this.gpData[index].value < this.VOlList[index][0] && this.gpData[index].value < this.gpData[index - 1].value) {
                    if (this.gpData[index].value > this.VOlList[index][1]) {
                        if (this.VOlList[index - 1][0] <= this.VOlList[index][0]) {
                            if (!(this.gpData[index - 1].open > this.gpData[index - 1].close && this.gpData[index].open < this.gpData[index].close)) {
                                //TODO
                            }
                        }
                    }
                }
            }
        }

        // 量增价跌
        if (this.gpData[index].value > this.gpData[index - 1].value) {
            if (this.gpData[index].close < this.gpData[index - 1].low) {
                //TODO
            }
        }

        //量缩价跌
        if (this.gpData[index].value < this.gpData[index - 1].value) {
            if (this.gpData[index].valuew < this.VOlList[index][0]) {
                if (this.gpData[index].close < this.gpData[index - 1].low) {
                    //TODO
                }
            }
        }


    }

    onCreateTipsItem(id, str) {

        let node = cc.instantiate(this.itemNotice);
        this.content.addChild(node);

        let itemHandle = node.getComponent('ItemNotice')
        itemHandle.text = str;
        itemHandle.onShow();

        // if (!GameCfg.GAMEFUPAN && GameCfg.GameType != pb.GameType.ShuangMang) {
        //     GameCfg.notice.push([id, GameCfg.huizhidatas - 1]);
        // }
    }

    start() {
        this.initData();
    }


}
