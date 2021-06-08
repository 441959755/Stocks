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
        let datas = GameCfg.fill;
        datas.forEach(el => {
            for (let i = 0; i < this.hostory.length; i++) {
                if (el.start >= this.hostory[i].start)
            }
        })

    }




    public static onClearData() {
        this.Ycount = 0;
        this.Scount = 0;
        this.preBuyprice = 0;
        this.profitrate = 0;
        this.succRate = 0;
        this.succRate = 0;
        this.AICount = 0;
    }

}
