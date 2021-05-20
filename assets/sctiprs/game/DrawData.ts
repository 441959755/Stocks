
import { pb } from "../../protos/proto";
import GameData from "../GameData";
import ComUtils from "../Utils/ComUtils";
import GameCfg from "./GameCfg";
//计算划线的数据

export default class DrawData {

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
            return;
        }
        // if (GameCfg.GameType == pb.GameType.QiHuo) {
        //     this.dataChange(data);
        // }

        this.MaList = [];
        this.BollList = [];
        this.VolList = [];

        let data5 = 5, data10 = 10;

        let k = 2, N = 20;
        let KDJDay = 9;
        let EMA1Data = 12, EMA2Data = 26, DEAData = 9;
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
        try {
            data.forEach((el, index) => {

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

                if (index < KDJDay - 1) {
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

                    // RSV = (el.close - el.low) / (el.high - el.low) * 100;
                    // let k = (2 / 3) * 50 + 1 / 3 * RSV;
                    // let d = 2 / 3 * 50 + 1 / 3 * k;
                    // let j = 3 * k - 2 * d;
                    // this.Klist.push(k);
                    // this.Dlist.push(d);
                    // this.jList.push(j);

                    // this.n_high = el.high;
                    // this.n_low = el.low;
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


                    if (index >= KDJDay - 1) {
                        this.n_low = el.low;
                        this.n_high = el.high;
                        for (let t = (index + 1) - KDJDay; t <= index; t++) {
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

                        this.DOWNRS.push(this.DOWNRS[index - 1] * 5 / 6 + (data[index - 1].close - el.close) / 6)
                        this.UPRS.push(this.UPRS[index - 1] * 5 / 6 + (0) / 6);

                        this.UPRS12.push(this.UPRS12[index - 1] * 11 / 12 + (0) / 12)
                        this.DOWNRS12.push(this.DOWNRS12[index - 1] * 11 / 12 + (data[index - 1].close - el.close) / 12);

                        this.UPRS24.push(this.UPRS24[index - 1] * 23 / 24 + (0) / 24)
                        this.DOWNRS24.push(this.DOWNRS24[index - 1] * 23 / 24 + (data[index - 1].close - el.close) / 24);

                    } else {

                        this.DOWNRS.push(this.DOWNRS[index - 1] * 5 / 6 + (0) / 6)
                        this.UPRS.push(this.UPRS[index - 1] * 5 / 6 + (el.close - data[index - 1].close) / 6);

                        this.UPRS12.push(this.UPRS12[index - 1] * 11 / 12 + (el.close - data[index - 1].close) / 12)
                        this.DOWNRS12.push(this.DOWNRS12[index - 1] * 11 / 12 + (0) / 12);

                        this.UPRS24.push(this.UPRS24[index - 1] * 23 / 24 + (el.close - data[index - 1].close) / 24)
                        this.DOWNRS24.push(this.DOWNRS24[index - 1] * 23 / 24 + (0) / 24);
                    }
                    if (index >= 5) {
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
                    if (index >= 11) {
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

                    if (index >= 23) {
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

}
