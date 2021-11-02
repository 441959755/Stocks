
import { pb } from "../../protos/proto";
import ComUtils from "../Utils/ComUtils";
import GameCfg from "./GameCfg";
//计算划线的数据

export default class DrawData {

    public static MinMaList = null;

    public static MaList = null;

    public static BollList = null;

    public static VolList = null;

    public static DIFList = null;

    public static DEAList = null;

    public static MACDList = null;

    public static Klist = null;

    public static Dlist = null;

    public static jList = null;

    public static UPRS = null;

    public static DOWNRS = null;

    public static Rs6 = null;

    public static Rs12 = null;

    public static Rs24 = null;

    private static n_high = null;

    private static n_low = null;

    private static UPRS12 = [];
    private static DOWNRS12 = [];
    private static UPRS24 = [];
    private static DOWNRS24 = [];

    public static arrMin5 = [];  //每5分钟的数据
    public static arrMin15 = []; //每15分钟的数据
    public static arrMin30 = []; //每30分钟的数据
    public static arrMin60 = [];  //1小时的数据

    public static arrDay = [];
    public static arrDay7 = [];

    public static EXPMA1 = [];

    public static EXPMA2 = [];

    public static btx = [];


    public static dataChange(time, type, arr) {

        time = ComUtils.getTimestamp(time);
        // this.arrMin5 = da;
        let t;
        let arr1 = [];
        if (arr <= 0) {
            console.log('arr is null');
            return arr1;
        }
        //  if (type == 1) {
        t = type;
        //  }

        for (let index = arr.length - 1; index >= 0;) {
            if (index - t + 1 >= 0) {
                let el = arr[index];
                if (parseInt(ComUtils.fromatTime1(el.day)) <= parseInt(ComUtils.fromatTime1(time))) {
                    let day = el.day;
                    let open = arr[index].open;
                    let close = el.close;

                    let high = 0, low = el.low, volume = 0, ccl_hold = 0;
                    for (let i = 0; i < t; i++) {
                        high = Math.max(arr[index - i].high, high);
                        low = Math.min(arr[index - i].low, low);
                        volume += arr[index - i].value;
                        ccl_hold += arr[index - i].ccl_hold;
                    }

                    let data = {
                        day: day,
                        open: open,
                        close: close,
                        high: high,
                        low: low,
                        value: volume,
                        ccl_hold: ccl_hold,
                    }
                    arr1.unshift(data);
                    index -= t;
                } else {
                    index--;
                }
            } else {
                index--;
            }
        }
        return arr1;
    }


    //
    public static getTimeSlotData(to, total, arr) {
        let newArr = [];
        if (arr.length <= 0) {
            console.log('arr is null   ingetTimeSlotData');
            return newArr;
        }
        arr.sort((a, b) => {
            return a.day - b.day;
        })

        console.log('要的时间往下:' + parseInt(ComUtils.fromatTime1(to)));
        console.log('给的时间:' + parseInt(ComUtils.fromatTime1(arr[0].day)));

        //    console.log(arr);

        to = parseInt(ComUtils.getTimestamp(to));

        for (let i = arr.length - 1; i >= 0; i--) {
            //  let time = parseInt(ComUtils.getTimestamp(arr[i].day));
            //   console.log(parseInt(ComUtils.fromatTime1(arr[i].day)));
            //   console.log(parseInt(ComUtils.fromatTime1(to)));
            if (parseInt(ComUtils.fromatTime1(arr[i].day)) <= parseInt(ComUtils.fromatTime1(to))
                && newArr.length <= total) {
                newArr.unshift(arr[i]);
            }
        }

        return newArr;
    }

    public static reseleData() {
        if (GameCfg.GameSet.ZLine == '5分钟K' || GameCfg.GameSet.ZLine == '15分钟K' || GameCfg.GameSet.ZLine == '30分钟K' || GameCfg.GameSet.ZLine == '60分钟K') {
            this.arrDay = [];
        } else {
            this.arrMin5 = [];
        }
    }

    public static initData(data) {

        if (data.length <= 0) {
            console.log('DrawData  initData  data is null' + data);
            return;
        }
        this.MinMaList = [];
        this.MaList = [];
        this.BollList = [];
        this.VolList = [];

        let data5 = 5, data10 = 10;

        let k = 2, N = GameCfg.BOLL[0];
        let EMA1Data = GameCfg.MACD[0], EMA2Data = GameCfg.MACD[1], DEAData = GameCfg.MACD[2];
        let EMA12 = 0, EMA26 = 0;
        this.DIFList = [];
        this.DEAList = [];
        this.MACDList = [];
        this.Klist = [];
        this.Dlist = [];
        this.jList = [];
        this.UPRS = [];
        this.DOWNRS = [];
        this.UPRS12 = [];
        this.DOWNRS12 = [];
        this.UPRS24 = [];
        this.DOWNRS24 = [];
        this.Rs6 = [];
        this.Rs12 = [];
        this.Rs24 = [];

        this.EXPMA1 = [];
        this.EXPMA2 = [];
        this.btx = [];

        try {
            data.forEach((el, index) => {

                if (GameCfg.GameSet.line == '宝塔线') {
                    let arr = [];
                    if (index == 0) {
                        arr[0] = el.open;
                        arr[1] = el.close;
                        arr[2] = false;
                    } else {
                        arr[0] = this.btx[index - 1][1];
                        arr[1] = el.close;
                        arr[2] = false;
                    }
                    this.btx.push(arr);
                }

                if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                    if (index == 0) {
                        this.EXPMA1.push(el.close);
                        this.EXPMA2.push(el.close);
                    } else {
                        let EXPMA1, EXPMA2;
                        EXPMA1 = (el.close - this.EXPMA1[index - 1]) * 2 / (GameCfg.EXPMA[0] + 1) + this.EXPMA1[index - 1];

                        EXPMA2 = (el.close - this.EXPMA2[index - 1]) * 2 / (GameCfg.EXPMA[1] + 1) + this.EXPMA2[index - 1];
                        this.EXPMA1.push(EXPMA1);
                        this.EXPMA2.push(EXPMA2);
                    }
                }

                //ma
                if (index + 1 >= GameCfg.MAs[0]) {
                    this.MaList[index] = [];

                    for (let i = 0; i < GameCfg.MAs.length; i++) {
                        //   if (index + 1 >= GameCfg.MAs[i]) {
                        let MaStart = index + 1 - parseInt(GameCfg.MAs[i]);
                        if (MaStart < 0) {
                            break;
                        }
                        let sumUp = 0;
                        //天数的总和
                        for (let t = MaStart; t <= index; t++) {
                            sumUp += parseFloat(data[t].close);
                        }
                        //平均的位置
                        let MAY = (sumUp / GameCfg.MAs[i]);
                        this.MaList[index].push(MAY);
                        //  }
                    }
                } else {
                    this.MaList.push(null);
                }

                //minMA
                {
                    let sun = 0
                    for (let q = 0; q <= index; q++) {
                        sun += data[q].close;
                    }
                    this.MinMaList[index] = sun / (index + 1);
                }

                //boll
                if (index >= N - 1) {
                    this.BollList[index] = [];
                    let num = 0;
                    let i = index + 1 - N;
                    for (; i <= index; i++) {
                        num += parseFloat(data[i].close);
                    }
                    let MBY = 0
                    MBY = (num / N)//- this.bottomValue) / this.disValue * drawBox;
                    //  if (index == N - 1) {
                    //  this.BollList[index].push(MBY)
                    //  } else {
                    //  let MD = Math.sqrt(Math.pow(el.close - MBY, 2) / (N));
                    let it = 0;

                    for (let t = (index - (N - 1)); t <= index; t++) {
                        it += (Math.pow(data[t].close - MBY, 2));
                    }

                    let MD = Math.sqrt(it / (N));

                    let UP = MBY + k * MD;

                    let DN = MBY - k * MD;

                    this.BollList[index].push(MBY)
                    this.BollList[index].push(UP)
                    this.BollList[index].push(DN)
                    // }
                } else {
                    this.BollList.push(null);
                }


                //均量线 白
                if (index >= data5 - 1) {
                    this.VolList[index] = [];
                    // if (GameCfg.VOLGraph.includes(index + 1)) {
                    //     let VolPoint = 0;
                    //     for (let i = 0; i <= index; i++) {
                    //         VolPoint += parseFloat(data[i].value);
                    //     }
                    //     //起点位置
                    //     let VolPointY = (VolPoint / (index + 1));
                    //     this.VolList[index].push(VolPointY);
                    // }
                    //每段数据绘制
                    for (let i = 0; i < GameCfg.VOLGraph.length; i++) {
                        if (index >= (GameCfg.VOLGraph[i] - 1)) {
                            let MaStart = index + 1 - GameCfg.VOLGraph[i];
                            let sumUp = 0;
                            //天数的总和
                            for (let t = MaStart; t <= index; t++) {
                                sumUp += parseFloat(data[t].value);
                            }
                            //平均的位置
                            let VOlPointY = (sumUp / GameCfg.VOLGraph[i]);
                            this.VolList[index].push(VOlPointY);
                        }
                    }
                } else {
                    this.VolList.push(null);
                }

                if (index < GameCfg.KDJ[0] - 1) {
                    this.Klist.push(50);
                    this.Dlist.push(50);
                    this.jList.push(50);
                }

                let RSV = 0;
                if (index == 0) {
                    EMA12 = parseFloat(el.close);
                    EMA26 = parseFloat(el.close);
                    //   let dif = EMA12 - EMA26;
                    this.DIFList.push(0);
                    this.DEAList.push(0);
                    this.MACDList.push(0);

                    this.Rs6.push(null);
                    this.Rs12.push(null);
                    this.Rs24.push(null);
                    this.UPRS.push(0);
                    this.DOWNRS.push(0);
                    this.UPRS12.push(0);
                    this.DOWNRS12.push(0);
                    this.UPRS24.push(0);
                    this.DOWNRS24.push(0);

                } else {
                    EMA12 = (EMA12 * (EMA1Data - 1) + parseFloat(el.close) * 2) / (EMA1Data + 1);
                    EMA26 = (EMA26 * (EMA2Data - 1) + parseFloat(el.close) * 2) / (EMA2Data + 1);
                    let dif = EMA12 - EMA26
                    let dea = (this.DEAList[index - 1] * (DEAData - 1) + dif * 2) / (DEAData + 1);
                    let macd = (dif - dea) * 2;
                    this.DIFList.push(dif);
                    this.DEAList.push(dea);
                    this.MACDList.push(macd);


                    if (index >= GameCfg.KDJ[0] - 1) {
                        this.n_low = el.low;
                        this.n_high = el.high;
                        for (let t = (index + 1) - GameCfg.KDJ[0]; t <= index; t++) {
                            this.n_low = Math.min(this.n_low, data[t].low);
                            this.n_high = Math.max(this.n_high, data[t].high);
                        }
                        RSV = (el.close - this.n_low) / (this.n_high - this.n_low) * 100;
                        let k = (2 / 3) * this.Klist[this.Klist.length - 1] + 1 / 3 * RSV;
                        let d = (2 / 3) * this.Dlist[this.Dlist.length - 1] + 1 / 3 * k;
                        let j = 3 * k - 2 * d;
                        this.Klist.push(k);
                        this.Dlist.push(d);
                        this.jList.push(j);

                    }


                    if (el.close < data[index - 1].close) {

                        this.DOWNRS.push(this.DOWNRS[index - 1] * (GameCfg.RSI[0] - 1) / GameCfg.RSI[0] + (data[index - 1].close - el.close) / GameCfg.RSI[0])
                        this.UPRS.push(this.UPRS[index - 1] * (GameCfg.RSI[0] - 1) / GameCfg.RSI[0] + (0) / GameCfg.RSI[0]);

                        this.UPRS12.push(this.UPRS12[index - 1] * (GameCfg.RSI[1] - 1) / GameCfg.RSI[1] + (0) / GameCfg.RSI[1])
                        this.DOWNRS12.push(this.DOWNRS12[index - 1] * (GameCfg.RSI[1] - 1) / GameCfg.RSI[1] + (data[index - 1].close - el.close) / GameCfg.RSI[1]);

                        this.UPRS24.push(this.UPRS24[index - 1] * (GameCfg.RSI[2] - 1) / GameCfg.RSI[2] + (0) / GameCfg.RSI[2])
                        this.DOWNRS24.push(this.DOWNRS24[index - 1] * (GameCfg.RSI[2] - 1) / GameCfg.RSI[2] + (data[index - 1].close - el.close) / GameCfg.RSI[2]);

                    } else {

                        this.DOWNRS.push(this.DOWNRS[index - 1] * (GameCfg.RSI[0] - 1) / GameCfg.RSI[0] + (0) / GameCfg.RSI[0])
                        this.UPRS.push(this.UPRS[index - 1] * (GameCfg.RSI[0] - 1) / GameCfg.RSI[0] + (el.close - data[index - 1].close) / GameCfg.RSI[0]);

                        this.UPRS12.push(this.UPRS12[index - 1] * (GameCfg.RSI[1] - 1) / GameCfg.RSI[1] + (el.close - data[index - 1].close) / GameCfg.RSI[1])
                        this.DOWNRS12.push(this.DOWNRS12[index - 1] * (GameCfg.RSI[1] - 1) / GameCfg.RSI[1] + (0) / GameCfg.RSI[1]);

                        this.UPRS24.push(this.UPRS24[index - 1] * (GameCfg.RSI[2] - 1) / GameCfg.RSI[2] + (el.close - data[index - 1].close) / GameCfg.RSI[2])
                        this.DOWNRS24.push(this.DOWNRS24[index - 1] * (GameCfg.RSI[2] - 1) / GameCfg.RSI[2] + (0) / GameCfg.RSI[2]);
                    }
                    if (index >= GameCfg.RSI[0] - 1) {
                        //    let rs = index + 1 - 6;
                        let UP6 = 0, DOWN6 = 0;
                        // for (; rs <= index; rs++) {
                        //     UP6 += this.UPRS[rs];
                        //     DOWN6 += this.DOWNRS[rs];
                        // }
                        //    UP6 = this.UPRS[index] / this.DOWNRS[index];
                        UP6 = this.UPRS[index];
                        DOWN6 = this.DOWNRS[index];
                        let RS;
                        if (DOWN6 == 0) {
                            RS = 0;
                        } else {
                            // UP6 = UP6 / 6;
                            // DOWN6 = DOWN6 / 6;
                            // let curUP = 0;
                            // let curDO = 0;
                            // if (this.UPRS[index]) {
                            //     curUP = this.UPRS[index]
                            // } else {
                            //     curDO = this.DOWNRS[index];
                            // }
                            // RS = (UP6 * 5 / 6 + curUP / 6) / (DOWN6 * 5 / 6 + curDO / 6);
                            RS = (UP6) / (DOWN6);
                        }

                        this.Rs6.push(100 * RS / (1 + RS));
                    } else {
                        this.Rs6.push(null);
                    }
                    if (index >= GameCfg.RSI[1] - 1) {
                        //  let rs = index + 1 - 12;
                        let UP12 = 0, DOWN12 = 0;
                        // for (; rs <= index; rs++) {
                        //     UP12 += this.UPRS[rs];
                        //     DOWN12 += this.DOWNRS[rs];
                        // }
                        UP12 = this.UPRS12[index];
                        DOWN12 = this.DOWNRS12[index];
                        let RS;
                        if (DOWN12 == 0) {
                            RS = 0;
                        } else {
                            // UP12 = UP12 / 12;
                            // DOWN12 = DOWN12 / 12;
                            // let curUP = 0;
                            // let curDO = 0;
                            // if (this.UPRS[index]) {
                            //     curUP = this.UPRS[index]
                            // } else {
                            //     curDO = this.DOWNRS[index];
                            // }
                            // RS = (UP12 * 11 / 12 + curUP / 12) / (DOWN12 * 11 / 12 + curDO / 12);
                            RS = UP12 / DOWN12;
                        }

                        this.Rs12.push(100 * RS / (1 + RS));
                    } else {
                        this.Rs12.push(null);
                    }

                    if (index >= GameCfg.RSI[2] - 1) {
                        //  let rs = index + 1 - 24;
                        let UP24 = 0, DOWN24 = 0;
                        // for (; rs <= index; rs++) {
                        //     UP24 += this.UPRS[rs];
                        //     DOWN24 += this.DOWNRS[rs];
                        // }
                        UP24 = this.UPRS24[index];
                        DOWN24 = this.DOWNRS24[index];
                        let RS;
                        if (DOWN24 == 0) {
                            RS = 0;
                        } else {
                            // UP24 = UP24 / 23;
                            // DOWN24 = DOWN24 / 23;
                            // let curUP = 0;
                            // let curDO = 0;
                            // if (this.UPRS[index]) {
                            //     curUP = this.UPRS[index]
                            // } else {
                            //     curDO = this.DOWNRS[index];
                            // }
                            // RS = (UP24 * 23 / 24 + curUP / 24) / (DOWN24 * 23 / 24 + curDO / 24);
                            RS = UP24 / DOWN24;
                        }

                        this.Rs24.push(100 * RS / (1 + RS));
                    } else {
                        this.Rs24.push(null);
                    }

                }
            });
        } catch (e) {
            console.log('数据有问题' + e);
        }

    }

    //获取输赢次数
    public static getBukoCount() {

        let datas = GameCfg.fill;

        let data = {
            yCount: 0,
            sCount: 0,
            minRate: 0,
            maxRate: 0,
            minDay: 0,
            maxDay: 0,
        }

        let minIndex = -1;
        let maxIndex = -1;

        for (let i = 0; i < datas.length; i++) {

            if (!datas[i].rate) { continue }
            if (datas[i].rate >= 0) {
                data.yCount++;
                let t = Math.max(data.maxRate, datas[i].rate);
                if (t == datas[i].rate) {
                    maxIndex = i;
                    data.maxRate = datas[i].rate;
                }

            } else {
                data.sCount++;
                let t = Math.min(data.minRate, datas[i].rate);
                if (t == datas[i].rate) {
                    minIndex = i;
                    data.minRate = datas[i].rate;
                }
            }
        }

        if (maxIndex != -1) {
            data.maxDay = datas[maxIndex].end - datas[maxIndex].start + 1;
        }

        if (minIndex != -1) {
            data.minDay = datas[minIndex].end - datas[minIndex].start + 1;
        }

        return data;
    }

    //获取本轮收益
    public static getCurrentEarning(index) {

        let datas = GameCfg.fill;

        for (let i = 0; i < datas.length; i++) {

            if (datas[i].end == index) {
                return datas[i].rate;
            }

        }

        return null;
    }

    //本轮收益是开多还是开空
    public static getCurrentState(index) {
        let datas = GameCfg.fill;
        if (GameCfg.GameType != pb.GameType.QiHuo) {
            return;
        }
        for (let i = 0; i < datas.length; i++) {

            if (datas[i].end == index) {
                return datas[i].state;
            }

        }
        return;
    }

    //获取当前标签
    public static getCurrentBlockMark(index) {
        let datas = GameCfg.blockHistoy;

        let id = null;
        for (let i = 0; i < datas.length; i++) {
            if (datas[i][0] == index) {
                id = datas[i][1];
                break;
            }
        }

        let arr = ['曙光初现', '旭日东升', '红三兵', '看涨吞没', '三只乌鸦', '看跌吞没', '乌云盖顶', '倾盆大雨']
        if (id) {
            return arr[id - 1];
        }
        return id;

    }

    //获取涨停盘
    public static getRaisingLimit(index, flag?) {

        if (GameCfg.GameType == pb.GameType.QiHuo) {
            return;
        }

        let limitUP = 0;
        let code = GameCfg.data[0].code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }

        let str = code.slice(0, 2);
        let str1 = code.slice(0, 3);
        let gpData = GameCfg.data[0].data;

        if (gpData[index - 1] && gpData[index]) {
            let rate = (gpData[index].close - gpData[index - 1].close) / gpData[index - 1].close * 100;

            if (str == '60' || str == '00') {
                if (rate >= 9.95) {
                    limitUP = 1;
                }
                else if (rate <= -9.95) {
                    limitUP = 2;
                }
            }
            else if (str1 == '688') {
                if (rate >= 19.94) {
                    limitUP = 1;
                }
                else if (rate <= -19.94) {
                    limitUP = 2;
                }
            }
            else if (str1 == '300') {
                let time = ComUtils.fromatTime1(gpData[index].day);
                if (time >= 20200824) {
                    if (rate >= 19.94) {
                        limitUP = 1;
                    }
                    else if (rate <= -19.94) {
                        limitUP = 2;
                    }
                }
                else if (time < 20200824) {
                    if (rate >= 9.95) {
                        limitUP = 1;
                    }
                    else if (rate <= -9.95) {
                        limitUP = 2;
                    }
                }
            }
            if (flag) {
                if (gpData[index].close == gpData[index].high) {
                    if (gpData[index].close == gpData[index].low) {
                        if (gpData[index].close == gpData[index].open) {
                            if (rate >= 4.88) {
                                limitUP = 1;
                            }
                            else if (rate <= -4.88) {
                                limitUP = 2;
                            }
                        }
                    }
                }
            }

        }
        return limitUP;

    }

    public static getWinLosCountByOps(opts) {
        let data = {
            yCount: 0,
            sCount: 0,
        }

        let gpData = GameCfg.data[0].data;

        for (let i = 0; i < opts.length; i++) {

            if (opts[i + 1] && gpData[opts[i + 1].kOffset] && gpData[opts[i].kOffset]) {

                if (gpData[opts[i].kOffset].close < gpData[opts[i + 1].kOffset].close) {
                    data.yCount++;
                }
                else if (gpData[opts[i].kOffset].close > gpData[opts[i + 1].kOffset].close) {
                    data.sCount++;
                }
                ++i;
            }

        }

        return data;

    }
}
