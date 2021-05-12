
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

    public static initData(data) {

        this.MaList = [];
        this.BollList = [];
        this.VolList = [];

        let data5 = 5, data10 = 10;

        let k = 2, N = 20;

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
                    if (index == N - 1) {
                        this.BollList[index].push(MBY)
                    } else {
                        let MD = Math.sqrt(Math.pow(el.close - num / (index + 1), 2) / (N));

                        let UP = this.BollList[index - 1][0] + k * MD;

                        let DN = this.BollList[index - 1][0] - k * MD;

                        this.BollList[index].push(MBY)
                        this.BollList[index].push(UP)
                        this.BollList[index].push(DN)
                    }
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
                        if (index >= GameCfg.VOLGraph[i]) {
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

                let RSV = 0;
                if (index == 0) {
                    EMA12 = parseFloat(el.close);
                    EMA26 = parseFloat(el.close);
                    //   let dif = EMA12 - EMA26;
                    this.DIFList.push(0);
                    this.DEAList.push(0);
                    this.MACDList.push(0);

                    RSV = (el.close - el.low) / (el.high - el.low) * 100;
                    let k = (2 / 3) * 50 + 1 / 3 * RSV;
                    let d = 2 / 3 * 50 + 1 / 3 * k;
                    let j = 3 * k - 2 * d;
                    this.Klist.push(k);
                    this.Dlist.push(d);
                    this.jList.push(j);

                    this.n_high = el.high;
                    this.n_low = el.low;

                    this.UPRS.push(0);
                    this.DOWNRS.push(0);

                } else {
                    EMA12 = (EMA12 * (EMA1Data - 1) + parseFloat(el.close)) / (EMA1Data + 1);
                    EMA26 = (EMA26 * (EMA2Data - 1) + parseFloat(el.close)) / (EMA2Data + 1);
                    let dif = EMA12 - EMA26
                    let dea = (this.DIFList[this.DIFList.length - 1] * (DEAData - 1) + dif * 2) / (DEAData + 1);
                    let macd = (dif - dea) * 2;
                    this.DIFList.push(dif);
                    this.DEAList.push(dea);
                    this.MACDList.push(macd);

                    this.n_low = Math.min(this.n_low, el.low);
                    this.n_high = Math.max(this.n_high, el.high);

                    RSV = (el.close - this.n_low) / (this.n_high - this.n_low) * 100;
                    let k = (2 / 3) * this.Klist[this.Klist.length - 1] + 1 / 3 * RSV;
                    let d = (2 / 3) * this.Dlist[this.Dlist.length - 1] + 1 / 3 * k;
                    let j = 3 * k - 2 * d;
                    this.Klist.push(k);
                    this.Dlist.push(d);
                    this.jList.push(j);

                    if (el.close < data[index - 1].close) {
                        this.UPRS.push(0);
                        this.DOWNRS.push(this.DOWNRS[this.DOWNRS.length - 1] * 5 / 6 + (data[index - 1].close - el.close) / 6);
                    } else {
                        this.DOWNRS.push(0);
                        this.UPRS.push(this.UPRS[this.UPRS.length - 1] * 5 / 6 + (el.close - data[index - 1].close) / 6);
                    }

                    if (index >= 5) {
                        let rs = index + 1 - 6;
                        let UP6 = 0, DOWN6 = 0;
                        for (; rs <= index; rs++) {
                            UP6 += this.UPRS[rs];
                            DOWN6 += this.DOWNRS[rs];
                        }
                        let RS;
                        if (DOWN6 == 0) {
                            RS = 0;
                        } else {
                            RS = (UP6 / 6) / (DOWN6 / 6);
                        }

                        this.Rs6.push(100 * RS / (1 + RS));
                    } else {
                        this.Rs6.push(null);
                    }
                    if (index >= 11) {
                        let rs = index + 1 - 12;
                        let UP12 = 0, DOWN12 = 0;
                        for (; rs <= index; rs++) {
                            UP12 += this.UPRS[rs];
                            DOWN12 += this.DOWNRS[rs];
                        }
                        let RS;
                        if (DOWN12 == 0) {
                            RS = 0;
                        } else {
                            RS = (UP12 / 12) / (DOWN12 / 12);
                        }

                        this.Rs12.push(100 * RS / (1 + RS));
                    } else {
                        this.Rs12.push(null);
                    }

                    if (index >= 23) {
                        let rs = index + 1 - 24;
                        let UP24 = 0, DOWN24 = 0;
                        for (; rs <= index; rs++) {
                            UP24 += this.UPRS[rs];
                            DOWN24 += this.DOWNRS[rs];
                        }
                        let RS;
                        if (DOWN24 == 0) {
                            RS = 0;
                        } else {
                            RS = (UP24 / 24) / (DOWN24 / 24);
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
