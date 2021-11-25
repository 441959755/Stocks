import GameCfg from '../game/GameCfg';
import EventCfg from '../Utils/EventCfg';
import GlobalEvent from '../Utils/GlobalEvent';

export default class StrategyAIData {

    public static Ycount = 0;  //赢得次数

    public static Scount = 0;  //输的次数

    public static profitrate = 0;  //盈利率

    public static succRate = 0;  //成功率

    private static preBuyprice = 0; //上次买入价格

    public static AICount = 0;   //策略次数

    public static buyCount = 0;   //買入次數

    public static sellCount = 0;  //賣出次數

    public static hostory = [];

    //策略买入
    public static onBuyFunc() {
        this.AICount++;

        this.buyCount++;
        let gpdata = GameCfg.data[0].data;

        this.preBuyprice = gpdata[GameCfg.huizhidatas - 1].close;

        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 12, index: GameCfg.huizhidatas });

        let item = {
            start: GameCfg.huizhidatas - 1,
            end: null,
            rate: null,
        }

        this.hostory.push(item);
    }

    //策略卖出
    public static onSellFunc() {
        if (this.sellCount >= this.buyCount) {
            return;
        }

        this.AICount++;
        this.sellCount++;
        let gpdata = GameCfg.data[0].data;

        let curClose = parseFloat(gpdata[GameCfg.huizhidatas - 1].close);

        let rate = (curClose - this.preBuyprice) / this.preBuyprice;

        if (rate > 0) {
            this.Ycount++;
        } else {
            this.Scount++;
        }

        this.profitrate = (this.profitrate + 1) * (rate + 1) - 1;

        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 13, index: GameCfg.huizhidatas });

        if (!this.hostory[this.hostory.length - 1].end) {
            this.hostory[this.hostory.length - 1].end = GameCfg.huizhidatas - 1;
            this.hostory[this.hostory.length - 1].rate = rate;
        }
    }

    //比较相似
    public static onCompareReult() {
        let info = {
            low: [],
            middle: [],
            high: [],
        }
        let datas = GameCfg.fill;
        datas.forEach(el => {

            if (this.hostory.length == 0) {
                info.low.push({
                    start: el.start - 1,
                    end: el.end,
                    rate: el.rate,
                });
            }
            else {
                let t = 0;
                for (let i = 0; i < this.hostory.length; i++) {
                    //完全无重合：判断为相似度低
                    if (((el.start - 1) < this.hostory[i].start && el.end < this.hostory[i].start) || (el.start - 1) > this.hostory[i].end && el.end > this.hostory[i].end) {
                        if (t == 0) {
                            t = 1;
                        }

                    }
                    else {

                        let diff1 = Math.abs((el.start - 1) - this.hostory[i].start);
                        let diff2 = Math.abs(el.end - this.hostory[i].end);
                        if (diff1 + diff2 <= 6) {

                            t = 2;
                        }
                        else {
                            if (t == 0 || t == 1) {
                                t = 3;
                            }


                        }
                    }
                }

                if (t == 1) {
                    info.low.push({
                        start: el.start - 1,
                        end: el.end,
                        rate: el.rate,
                    });
                } else if (t == 2) {
                    info.high.push({
                        start: el.start - 1,
                        end: el.end,
                        rate: el.rate,
                    });
                } else if (t == 3) {
                    info.middle.push({
                        start: el.start - 1,
                        end: el.end,
                        rate: el.rate,
                    });
                }
            }

        })

        return info;
    }

    public static onClearData() {
        this.Ycount = 0;
        this.Scount = 0;
        this.preBuyprice = 0;
        this.profitrate = 0;
        this.succRate = 0;
        this.succRate = 0;
        this.AICount = 0;
        this.hostory = [];
        this.sellCount = 0;
        this.buyCount = 0;
    }

}
