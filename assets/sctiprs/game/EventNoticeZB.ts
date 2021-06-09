import { pb } from "../../protos/proto";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import DrawData from "./DrawData";
import GameCfg from "./GameCfg";
import StrategyAIData from "./StrategyAIData";


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

    textInfo = [];

    curState = 's';

    _str = null;

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
            let str = '';
            for (let i = 0; i < this.textInfo.length; i++) {
                if (data.str == this.textInfo[i].name) {
                    str = this.textInfo[i].info;
                    break;
                }
            }
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

        //TODO this.textInfo.push();
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
                            this._str = '1）金叉后，即MA1在MA2之上（MA1 > MA2）;\n  2) 且MA1趋势向上（MA1(n) > MA1(n - 1) ）；\n 3）此时若股价上涨有效站上MA1时（即close > MA1 ）, 且股价反转上日K线（即close > 上日K线实体高价）；\n则可算短线买入信号“B”！'
                            this.onCreateTipsItem('短线转向买点');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }

                        }
                    }
                }
            }

            //短线转向卖点
            if (this.maList[j][index] <= this.maList[j][index - 1]) {
                if (this.gpData[index].close < this.maList[j][index]) {
                    let max = Math.min(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close < max) {
                        //S
                        this._str = '1) 当MA1趋势转向下（MA1(n) <=  MA1(n-1)）；\n 2) 此时若股价有效跌破MA1线时（即close < MA1）, 且股价跌破上日K线（即close < 上日K线实体低价）；\n 则可算短线卖出信号S。'
                        this.onCreateTipsItem('短线转向卖点')

                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }

                    }
                }
            }

            //乖离过大买点
            if (this.maList[j][index] < this.maList[z][index]) {
                if ((this.maList[j][index] - this.gpData[index].close) / this.maList[j][index] >= -0.12) {
                    let min = Math.min(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close > min) {
                        if (this.gpData[index].low > this.gpData[index - 1].low) {
                            //B
                            this._str = '1）下跌过程中(MA1<MA2)，当股价下跌远离MA1过大时（超过-10%时，即(MA1-close)/MA1>= 0.10）；\n  2）此时接下来K线若股价收盘价超过上日K线实体低价（MIN（上日K线开盘价，上日K线收盘价），最低价高于上日Ｋ线最低价（ｌｏｗ>上日K线Low）则股价会做超跌反弹；\n  短线可做买入信号“B”。'
                            this.onCreateTipsItem('乖离过大买点')
                            if (this.curState != 'B') {
                                this.curState = "B";
                                StrategyAIData.onBuyFunc();
                            }

                        }
                    }
                }
            }

            //乖离过大卖点
            if (this.maList[j][index] > this.maList[z][index]) {
                if (((this.gpData[index].close - this.maList[j][index]) / this.maList[j][index]) >= 0.12) {
                    let max = Math.max(this.gpData[index - 1].close.this.gpData[index - 1].open);
                    if (this.gpData[index].close < max) {
                        //s
                        this._str = '1）上涨过程中(MA1>MA2)，当股价上涨远离MA1过大时（超过10%，即(close-MA1)/MA1>= 0.10）；\n  2）此时后若股价收盘价跌破上日K线实体高价（阳线收盘价，阴线开盘价），则股价会做超买回落；\n短线可做卖出信号“S”'
                        this.onCreateTipsItem('乖离过大卖点')
                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }

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
                    if (this.gpData[index].close > b) {
                        //
                        this._str = '1）股价上穿均线： 当均线转平向上，若股价从均线下方上穿均线时，则此时可作为短线买入信号“B”，买入个股！'
                        str = '上穿' + GameCfg.MAs[c] + '均线';
                        this.onCreateTipsItem(str)
                        if (this.curState != 'B') {
                            this.curState = 'B';
                            StrategyAIData.onBuyFunc();
                        }

                        //B
                    }
                }
            }

            //2)股价下穿均线
            if (this.gpData[index - 1].close > this.maList[c][index - 1]) {
                if (this.gpData[index].close < this.maList[c][index]) {

                    this._str = '1）股价下穿均线： 股价之前在均线之上运行，当收盘股价下穿均线时，则此时可作为短线卖出信号“S”，卖出个股！'
                    str = '下穿' + GameCfg.MAs[c] + '均线';
                    //S
                    this.onCreateTipsItem(str)
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }

        }
        else if (GameCfg.GameSet.strategy == '均线交叉' || GameCfg.GameSet.strategy == '组合训练') {

            //3）均线金叉
            if (this.maList[j][index] > this.maList[z][index] && this.gpData[index].close > this.maList[z][index]) {
                if (this.maList[j][index] >= this.maList[j][index - 1] && this.maList[z][index] >= this.maList[z][index - 1]) {
                    if (this.JXState == 0) {
                        this.JXState = 1;
                        this._str = '1）短期均线上穿中长期均线：当中长期均线趋势转平或向上时，此时若短期均线上穿中长期均线，则可作为短线买入信号“B”，买入个股！'
                        this.onCreateTipsItem('均线金叉')
                        if (this.curState != 'B') {
                            this.curState = 'B';
                            StrategyAIData.onBuyFunc();
                        }
                        //B
                    } else {
                        if (this.JXState == 2) {
                            let max = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].open);
                            if (this.gpData[index].close > max) {
                                this.JXState = 1;
                                //B
                                this._str = '1）短期均线上穿中长期均线：当中长期均线趋势转平或向上时，此时若短期均线上穿中长期均线，则可作为短线买入信号“B”，买入个股！'
                                this.onCreateTipsItem('均线金叉')
                                if (this.curState != 'B') {
                                    this.curState = 'B';
                                    StrategyAIData.onBuyFunc();
                                }
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
                    this._str = '1）短期均线下穿中长期均线： 当短期均线从上方下穿中长期均线时，可作为短线卖出信号“S”，卖出个股！'
                    this.onCreateTipsItem('均线死叉')
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }

        }
    }

    testMACDEvent() {
        let index = GameCfg.huizhidatas - 1;
        if (GameCfg.GameSet.strategy == 'MACD金叉' || GameCfg.GameSet.strategy == '经典用法') {
            //1) MACD 金叉
            if (this.difList[index - 1] <= this.deaList[index - 1]) {
                if (this.difList[index] > this.deaList[index]) {
                    this._str = '1）MACD 金叉：之前DIF线一直在DEA线之下运行，但当个股收盘时，DIF（白线）上穿DEA(黄线），即为MACD金叉，可作为短线买入信号“B”；'
                    this.onCreateTipsItem('MACD 金叉');
                    if (this.curState != 'B') {
                        this.curState = 'B';
                        StrategyAIData.onBuyFunc();
                    }
                }
            }

            //2) MACD 死叉
            if (this.difList[index - 1] >= this.deaList[index - 1]) {
                if (this.difList[index] < this.deaList[index]) {
                    this._str = '1）MACD死叉：之前DIF线一直在DEA线之上运行，但当个股收盘时，DIF（白线）下穿DEA(黄线），即为MACD死叉，可作为短线卖出信号“S”'
                    this.onCreateTipsItem('MACD 死叉');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }
        }

        if (GameCfg.GameSet.strategy == '0轴穿越' || GameCfg.GameSet.strategy == '经典用法') {
            //3）DIF向上穿越0轴
            if (this.difList[index - 1] < 0) {
                if (this.difList[index] > 0) {
                    this._str = '１） DIF白线从下向上穿越0轴：当DIF（白线）从下方向上穿越MACD的0轴时，代表由弱转强，可作为短线买入信号“B”，买入个股！'
                    this.onCreateTipsItem('DIF向上穿越0轴');
                    if (this.curState != 'B') {
                        this.curState = 'B';
                        StrategyAIData.onBuyFunc();
                    }
                }
            }

            //4）DIF向下穿越0轴
            if (this.difList[index - 1] > 0) {
                if (this.difList[index] < 0) {
                    this._str = '２） DIF白线从上向下穿越0轴：当DIF（白线）从0轴之上向下穿越0轴时，代表由强转弱，可作为短线卖出信号“S”，卖出个股！'
                    this.onCreateTipsItem('DIF向下穿越0轴');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }
        }

        if (GameCfg.GameSet.strategy == 'MACD背离' || GameCfg.GameSet.strategy == '经典用法') {

            //5）MACD底背离
            this._str = '１） MACD底背离： 下跌过程中，当股价一波低于一波，而对应的DIF（白线）的波谷却没有新低，反而逐渐高起来了，即为股价的ＭＡＣＤ底背离现象，预示着股价将要反弹上涨，短线可做为买入信号“B”；'
            //TODO

            this._str = '1） MACD 顶背离： 上涨过程中，当股价一波高于一波，而对应的DIF（白线）的波峰却没有新高，反而逐渐变低了，即为股价的ＭＡＣＤ顶背离现象，预示着股价将要回落下跌，短线可做为卖出信号“S”。'
            //6）MACD顶背离
            //TODO
        }


        if (GameCfg.GameSet.strategy == '柱最大值转向' || GameCfg.GameSet.strategy == '经典用法') {
            //7）绿柱最低值转向
            if (this.gpData[index - 1].close < this.gpData[index - 2].close) {
                if (this.macdList[index] < 0) {
                    if (this.macdList[index] > this.macdList[index - 1]) {
                        this.MACDMIN = this.macdList[index - 1];
                        if (this.macdList[index] >= this.difList[index] || this.difList[index] > 0) {
                            if (this.difList[index] > this.difList[index - 1]) {
                                //B
                                this.MACDState = 1;
                                this._str = '１） MACD绿柱最低值转向： 下跌过程中，当股价连续下跌，其对应的MACD绿柱达到最长（即最低值），此后绿柱转向缩小时，预示着股价阶段性底部将到，短线会有反弹上涨机会，当绿柱缩小到DIF白线内时，可做为短线买入信号“Ｂ”；但是若绿柱再次放大时，注意止损“S”！'
                                this.onCreateTipsItem('绿柱最低值转向');
                                if (this.curState != 'B') {
                                    this.curState = 'B';
                                    StrategyAIData.onBuyFunc();
                                }
                            }
                        }
                    }
                }
            }

            if (this.MACDState == 1 && this.macdList[index] < this.MACDMIN) {
                if (Math.abs(this.macdList[index]) >= 0.04) {
                    //s
                    this.MACDState = 2;

                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }

            if (this.MACDState == 0) {
                if (this.macdList[index - 1] < 0) {
                    if (this.macdList[index] > 0) {
                        this.MACDState = 1;
                        //B
                        this.onCreateTipsItem('绿柱最低值转向');
                        if (this.curState != 'B') {
                            this.curState = 'B';
                            StrategyAIData.onBuyFunc();
                        }
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
                                if (this.macdList[index] <= this.difList[index] || this.deaList[index] <= 0) {
                                    //s
                                    this.MACDState = 2;
                                    this._str = '1） MACD红柱最高值转向：股价上涨过程中，对应的MACD红柱逐渐变长，当达到最长（即最高值），此后柱子转向开始缩小时，预示着股价阶段性顶部已到，短线会有回落下跌，可做短线卖出信号“Ｓ”；但是股价很多时候只是短暂回调，因此当红柱再次放大时，可“B"信号再次买进个股！'

                                    this.onCreateTipsItem('红柱最高值转向');
                                    if (this.curState != 'S') {
                                        this.curState = 'S';
                                        StrategyAIData.onSellFunc();
                                    }
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
                            this._str = 'ＫＤＪ金叉：当K线（白线）从下向上穿越D线（黄线）并形成向上突破即为ＫＤＪ金叉；Ｋ值在30以下的为低位金叉，Ｋ值在7０之上的为高位金叉；可作为短线买入信号"B".'
                            this.onCreateTipsItem('KDJ低位金叉');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
                        }
                        //3）KDJ中位金叉
                        else if (this.KList <= 70 && this.KList >= 30) {
                            this._str = 'ＫＤＪ金叉：当K线（白线）从下向上穿越D线（黄线）并形成向上突破即为ＫＤＪ金叉；Ｋ值在30以下的为低位金叉，Ｋ值在7０之上的为高位金叉；可作为短线买入信号"B".'
                            this.onCreateTipsItem('KDJ中位金叉');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
                        }
                        //4）KDJ高位金叉
                        else if (this.KList[index] > 70) {
                            this._str = 'ＫＤＪ金叉：当K线（白线）从下向上穿越D线（黄线）并形成向上突破即为ＫＤＪ金叉；Ｋ值在30以下的为低位金叉，Ｋ值在7０之上的为高位金叉；可作为短线买入信号"B".'
                            this.onCreateTipsItem('KDJ高位金叉');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
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
                        this._str = 'ＫＤＪ死叉：当K线从上向下穿越D线并形成向下突破即为ＫＤＪ死叉；Ｋ值在70以上的为高位死叉，Ｋ值在30之下的为低位死叉；可作为短线卖出信号"Ｓ" .'
                        this.onCreateTipsItem('KDJ高位死叉');
                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }
                    }
                    //3）KDJ中位死叉
                    else if (this.KList[index] <= 70 && this.KList[index] > 30) {
                        this._str = 'ＫＤＪ死叉：当K线从上向下穿越D线并形成向下突破即为ＫＤＪ死叉；Ｋ值在70以上的为高位死叉，Ｋ值在30之下的为低位死叉；可作为短线卖出信号"Ｓ" .'
                        this.onCreateTipsItem('KDJ中位死叉');
                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }
                    }
                    //4) KDJ低位死叉
                    else if (this.KList[index] <= 30) {
                        this._str = 'ＫＤＪ死叉：当K线从上向下穿越D线并形成向下突破即为ＫＤＪ死叉；Ｋ值在70以上的为高位死叉，Ｋ值在30之下的为低位死叉；可作为短线卖出信号"Ｓ" .'
                        this.onCreateTipsItem('KDJ低位死叉');
                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }
                    }
                }
            }
        }

        // 3）KDJ超买
        if (this.JList[index - 2] >= 100 && this.JList[index - 1] >= 100 && this.JList[index] >= 100) {
            let max = Math.max(this.gpData[index - 1].close.this.gpData[index - 1].open);
            if (this.gpData[index].close < max && this.gpData[index].high <= this.gpData[index - 1].high) {
                //s
                this._str = '1） KDJ 超买： 当J值>=100时, 且连续3天以上，为KDJ超买区间，股价至少会形成短期头部，可作为短线卖出信号“Ｓ”。'
                this.onCreateTipsItem('KDJ超买');
                if (this.curState != 'S') {
                    this.curState = 'S';
                    StrategyAIData.onSellFunc();
                }

            }
        }

        // 4）KDJ超卖
        if (this.JList[index - 2] <= 0 && this.JList[index - 1] <= 0 && this.JList[index] <= 0) {
            let min = Math.min(this.gpData[index - 1].close.this.gpData[index - 1].open);
            if (this.gpData[index].close > min && this.gpData[index].low >= this.gpData[index - 1].low) {
                //B
                this._str = '１） KDJ 超卖当J值<=0时, 且连续3天以上，为KDJ超卖区间，股价至少会形成短期底部，可作为短线买入信号“Ｂ”；'
                this.onCreateTipsItem('KDJ超卖');
                if (this.curState != 'B') {
                    this.curState = 'B';
                    StrategyAIData.onBuyFunc();
                }
            }
        }

        //5）KDJ顶背离
        this._str = '1） KDJ 顶背离： 上涨过程中，当股价一波高于一波，而对应的D值的波峰却没有新高，反而逐渐变低，即为股价的KDJ顶背离，预示着股价将要回调下跌，可做短线卖出信号“Ｓ”。'


        //6）KDJ底背离
        this._str = '１） KDJ底背离：下跌过程中，当股价一波低于一波，而对应的D值（黄线）的波谷却没有新低，反而逐渐变高，即为股价的KDJ底背离，预示着价将有反弹上涨机会，可做短线买入信号“Ｂ”；'

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
                                this._str = '股价突破中轨：当BOLL通道趋势有转平向上时，当股价从下向上突破中轨时，可做短线买入信号Ｂ；'
                                this.onCreateTipsItem('股价突破中轨');
                                if (this.curState != 'B') {
                                    this.curState = 'B';
                                    StrategyAIData.onBuyFunc();
                                }
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
                this._str = '股价跌破中轨：当BOLL通道趋势有转平向下时，此时股价从上向下跌破中轨，可做短线卖出信号Ｓ。'
                this.onCreateTipsItem('股价跌破中轨');
                if (this.curState != 'S') {
                    this.curState = 'S';
                    StrategyAIData.onSellFunc();
                }
            }
        }

        //3）股价触碰上轨
        if (this.gpData[index].high >= this.BollList[index][1]) {
            if (this.gpData[index].close < this.BollList[index][1]) {

                if (this.BollList[index][0] <= this.BollList[index - 1][0]) {
                    //s
                    this._str = '1）股价触碰上轨：股价由下向上突破上轨，但没有效站稳上轨时；或股价远离上轨后，转向回落时；可作为短线卖出信号“S”，止赢个股！'
                    this.onCreateTipsItem('股价触碰上轨');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
                else if (this.BollList[index][0] > this.BollList[index - 1][0]) {
                    if (this.BollList[index][1] <= this.BollList[index - 1][1] || this.BollList[index][2] <= this.BollList[index - 1][2]) {
                        //s
                        this._str = '1）股价触碰上轨：股价由下向上突破上轨，但没有效站稳上轨时；或股价远离上轨后，转向回落时；可作为短线卖出信号“S”，止赢个股！'
                        this.onCreateTipsItem('股价触碰上轨');
                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }
                    }
                }

            }
        }

        //4）股价突破上轨
        if (this.BollState == 1) {
            if (this.gpData[index].close > this.BollState[index][1]) {
                //B
                this._str = '１） 爆发性突破上轨： 布林带喇叭开口情形下，当价格沿BOLL上轨突破运行时，可做短线买入信号“B”；该情况下一般为爆发性单边上涨行情，坚定持股，直至价格脱离上轨区域，股价跌破中轨时，再做卖出信号“S”；'
                this.onCreateTipsItem('股价突破上轨');
                if (this.curState != 'B') {
                    this.curState = 'B';
                    StrategyAIData.onBuyFunc();
                }
            }
        }

        //5）股价跌破下轨
        if (this.BollState == 1) {
            if (this.gpData[index - 1].close >= this.BollList[index - 1][2]) {
                if (this.gpData[index].close < this.BollList[index][2]) {
                    //s
                    this._str = '1） 爆发性跌破下轨： 喇叭开口情形下，当价格沿BOLL下轨跌破时，可做短线卖出信号“Ｓ”； 该情况下一般为爆发性单边杀跌行情，持币观望！'
                    this.onCreateTipsItem('股价跌破下轨');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
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
                            this._str = '1）在震荡行情中，当天最低价触碰到布林带下轨； 2）当接下来K线不再创新低时，股价获得下轨支撑，短线反弹；可做短线买入信号“B”。'
                            this.onCreateTipsItem('布林带下轨支撑');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
                        }
                    }

                }
            }
        }

        // 7）布林带上轨阻力
        //TODO

        //8）判断震荡行情
        this._str = '布林带箱体震荡：震荡行情里，一般布林带喇叭缩口，股价在布林带内上下维持箱体整理，当股价触碰到布林带下轨获支撑时，可做短线买入信号Ｂ；当股价触碰到布林带上轨遇阻时，可做短线卖出信号Ｓ。另外，买入个股后，若上涨没碰上轨就回落跌破中轨时，可短线卖出信号S，止赢卖出！'


    }

    testEXPMAEvent() {
        //EXP均线金叉
        let index = GameCfg.huizhidatas - 1;
        if (this.EXPMA2[index] >= this.EXPMA2[index - 1] && this.EXPMA1[index] >= this.EXPMA1[index - 1]) {
            if (this.EXPMA1[index] > this.EXPMA2[index]) {
                //B
                this._str = '1）当黄色EXP2均线走平转向上趋势时；2）此时若白色EXP1均线金叉黄色EXP2均线时；可做买入信号"B"， 短线买入个股！'
                this.onCreateTipsItem('EXP均线金叉');
                if (this.curState != 'B') {
                    this.curState = 'B';
                    StrategyAIData.onBuyFunc();
                }
            }
        }

        //EXP均线死叉
        if (this.EXPMA2[index] < this.EXPMA2[index - 1]) {
            if (this.EXPMA1[index] < this.EXPMA2[index]) {
                //s
                this._str = '1）当黄色EXP2均线走平转向下趋势时,2）此时若白色EXP1均线死叉黄色EXP2均线时； 可做短线卖出信号"S"， 卖出个股！'
                this.onCreateTipsItem('EXP均线死叉');
                if (this.curState != 'S') {
                    this.curState = 'S';
                    StrategyAIData.onSellFunc();
                }
            }
        }

        //短线转向买点
        if (this.EXPMA2[index] > this.EXPMA2[index]) {
            if (this.EXPMA1[index] > this.EXPMA1[index - 1]) {
                if (this.gpData[index].close > this.EXPMA1[index]) {
                    let max = Math.max(this.gpData[index - 1].open, this.gpData[index - 1].close);
                    if (this.gpData[index].close > max) {
                        //B
                        this._str = '1）EXP 金叉后，且白线exp1趋势向上；3）此时若股价上涨又从下有效站上exp1时,即股价再次反转向上时；则可做短线买入信号“B”！'
                        this.onCreateTipsItem('短线转向买点');
                        if (this.curState != 'B') {
                            this.curState = 'B';
                            StrategyAIData.onBuyFunc();
                        }
                    }
                }
            }
        }

        //短线转向卖点
        //TODO
        if (this.gpData[index].close > this.EXPMA1[index]) {
            if (this.gpData[index].close < this.gpData[index - 1].low) {
                this._str = '1）当白线exp1趋势转向下时； 2） 此时若股价有效跌破exp1线时, 且股价反转跌破上日K线； 则可做短线卖出信号"S" !'
                this.onCreateTipsItem('短线转向卖点');
                if (this.curState != 'S') {
                    this.curState = 'S';
                    StrategyAIData.onSellFunc();
                }
            }
        }

        // 乖离过大买点
        //TODO
        if (this.EXPMA1[index] < this.EXPMA2[index]) {
            if ((this.EXPMA1[index] - this.gpData[index].close) / this.EXPMA1[index] >= 0.1) {
                this._str = '1）下跌过程中，当股价下跌远离exp1过大时（比如超过-10%时）；2）此后接下来若股价不再创新低时，则短线会有超跌反弹；短线可做买入信号“B”.'
                this.onCreateTipsItem('乖离过大买点');
                if (this.curState != 'B') {
                    this.curState = 'B';
                    StrategyAIData.onBuyFunc();
                }
            }
        }

        //乖离过大卖点
        if (this.EXPMA1[index] > this.EXPMA2[index]) {
            if ((this.gpData[index].close - this.EXPMA2[index]) / this.EXPMA1[index] >= 0.1) {
                let max = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].ope);
                if (this.gpData[index].close < max) {
                    //s
                    this._str = '1）上涨过程中，当股价上涨远离Exp1过大时（比如超过10%时）；2）此时后若股价收盘价未再创新高时，则股价会做超买回落；短线可做卖出信号“S”.'
                    this.onCreateTipsItem('乖离过大卖点');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
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
                    this._str = '当黄线RSI1从下向上穿越紫线RSI3时, 称为RSI1金叉! 可作为买入信号"B"，短线买入个股。'
                    this.onCreateTipsItem('RSI金叉');
                    if (this.curState != 'B') {
                        this.curState = 'B';
                        StrategyAIData.onBuyFunc();
                    }
                }
            }

            if (this.RSI3 >= 50) {
                if (this.RSI1[index] > this.RSI2[index] || this.RSI2[index] > this.RSI3[index]) {
                    this._str = '当黄线RSI1从下向上穿越紫线RSI3时, 称为RSI1金叉! 可作为买入信号"B"，短线买入个股。'
                    this.onCreateTipsItem('RSI金叉');
                    if (this.curState != 'B') {
                        this.curState = 'B';
                        StrategyAIData.onBuyFunc();
                    }
                }
            }

            if (this.RSI1[index - 1] < this.RSI3[index - 1]) {
                if (this.RSI1[index] > this.RSI3[index]) {
                    this._str = '当黄线RSI1从下向上穿越紫线RSI3时, 称为RSI1金叉! 可作为买入信号"B"，短线买入个股。'
                    this.onCreateTipsItem('RSI金叉');
                    if (this.curState != 'B') {
                        this.curState = 'B';
                        StrategyAIData.onBuyFunc();
                    }
                }
            }
        }

        {//RSI死叉
            if (this.RSI1[index - 1] > this.RSI2[index - 1]) {
                if (this.RSI1[index] < this.RSI2[index]) {
                    //s
                    this._str = '当黄线RSI1从上向下穿越紫线RSI3时, 称为RSI1死叉!可作为卖出信号"S"，短线卖出个股。'
                    this.onCreateTipsItem('RSI死叉');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }
            else if (this.RSI2[index - 1] > this.RSI3[index - 1]) {
                if (this.RSI2[index] < this.RSI3[index]) {
                    //s
                    this._str = '当黄线RSI1从上向下穿越紫线RSI3时, 称为RSI1死叉!可作为卖出信号"S"，短线卖出个股。'
                    this.onCreateTipsItem('RSI死叉');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }
            else if (this.RSI1[index - 1] > this.RSI3[index - 1]) {
                if (this.RSI1[index] < this.RSI3[index]) {
                    //s
                    this._str = '当黄线RSI1从上向下穿越紫线RSI3时, 称为RSI1死叉!可作为卖出信号"S"，短线卖出个股。'
                    this.onCreateTipsItem('RSI死叉');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }
        }

        {//RSI超卖
            this._str = '1）当白线RSI1数值连续低于20； 2）同时当收盘股价并未再创新低时； 则说明目前处于短期的超卖区域，短线可博反弹，买入信号"B".'
            this.onCreateTipsItem('RSI超卖');
            if (this.curState != 'B') {
                this.curState = 'B';
                StrategyAIData.onBuyFunc();
            }

        }

        {//RSI超买
            if (this.RSI1[index] > 80) {
                if (this.gpData[index].close < this.gpData[index - 1].close) {
                    if (this.RSI1[index] < this.RSI1[index - 1] && this.RSI2[index] <= this.RSI2[index - 1]) {
                        //s
                        this._str = '1）当白线RSI1数值短期快速超越了80，进入了超买区域； 2）当收盘股价并未再创新高时;则股价随时会回落，短线可作卖出信号"S"，卖出个股！'
                        this.onCreateTipsItem('RSI超买');
                        if (this.curState != 'S') {
                            this.curState = 'S';
                            StrategyAIData.onSellFunc();
                        }
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
                            this._str = '当强势个股单边上涨时（RSI>=80），容易超买信号导致卖出个股；此时微调后，当个股再次向上突破时，短线可买入信号“B”，继续追买进个股！'
                            this.onCreateTipsItem('高位钝化买点');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
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
                            this._str = '当弱势个股一路下跌时（RSI<=20），容易超买信号导致过早买入个股；此时微反弹后，当个股再次向下跌破时，短线可卖出信号“S”，先止损卖出个股！'
                            this.onCreateTipsItem('低位钝化卖点');
                            if (this.curState != 'S') {
                                this.curState = 'S';
                                StrategyAIData.onSellFunc();
                            }
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
                        this._str = '当短周期均量线向上金叉长周期均量线;且成交量大于长期均量线时，可做短期买入信号B'
                        this.onCreateTipsItem('均量线金叉');
                        if (this.curState != 'B') {
                            this.curState = 'B';
                            StrategyAIData.onBuyFunc();
                        }
                    }
                }
            }

        }
        //均量线死叉
        {
            if (this.VOlList[index][0] < this.VOlList[index][1]) {
                //S
                this._str = '当短周期均量线向下死叉长周期均量线时，可做短期卖出信号S'
                this.onCreateTipsItem('均量线死叉');
                if (this.curState != 'S') {
                    this.curState = 'S';
                    StrategyAIData.onSellFunc();
                }
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

                            this._str = '成交量倍量放大且突破均量线，股价上涨且收阳K线； 可做短线买入信号B'
                            this.onCreateTipsItem('倍量阳柱');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
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

                            this._str = '在均量线之上，伴随成交量的逐渐放大，股价稳步上涨;可做短线买入信号B'

                            this.onCreateTipsItem('量价齐升');
                            if (this.curState != 'B') {
                                this.curState = 'B';
                                StrategyAIData.onBuyFunc();
                            }
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

                                this._str = '当股价还在上升；而成交量却在缩小，且缩小到短周期均量线内时， 可做短线卖出信号S'

                                this.onCreateTipsItem('价升量减');
                                if (this.curState != 'S') {
                                    this.curState = 'S';
                                    StrategyAIData.onSellFunc();
                                }

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

                this._str = '当成交量还在放大：但股价不再上涨反而跌破上日K线实体低价时；可做短线卖出信号S'
                this.onCreateTipsItem('价升量减');
                if (this.curState != 'S') {
                    this.curState = 'S';
                    StrategyAIData.onSellFunc();
                }
            }
        }

        //量缩价跌
        if (this.gpData[index].value < this.gpData[index - 1].value) {
            if (this.gpData[index].valuew < this.VOlList[index][0]) {
                if (this.gpData[index].close < this.gpData[index - 1].low) {
                    //TODO

                    this._str = '当成交量缩小到短周期均量线之内，且股价也跌破昨日K线实体低价时； 可做短线卖出信号S'
                    this.onCreateTipsItem('价升量减');
                    if (this.curState != 'S') {
                        this.curState = 'S';
                        StrategyAIData.onSellFunc();
                    }
                }
            }
        }
    }

    onCreateTipsItem(str) {
        let index = GameCfg.huizhidatas - 1;
        let node = cc.instantiate(this.itemNotice);
        this.content.addChild(node);
        let itemHandle = node.getComponent('ItemNotice')
        itemHandle._zbStr = this._str;
        itemHandle.text = str;
        index && (itemHandle.Pindex = index)
        itemHandle.onShow();
    }

    start() {
        this.initData();
    }


}
