import GameCfg from '../game/GameCfg';
import EventCfg from '../Utils/EventCfg';
import GlobalEvent from '../Utils/GlobalEvent';

export default class StrategyAIData {

    public static Ycount = 0;  //赢得次数

    public static Scount = 0;  //输的次数

    public static profitrate = 0;  //盈利率

    public static succRate = 0;  //成功率

    private static preBuyprice = 0; //上次买入价格


    public static onBuyFunc() {

        let gpdata = GameCfg.data[0].data;

        this.preBuyprice = gpdata[GameCfg.huizhidatas - 1].close;

        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 12, index: GameCfg.huizhidatas });
    }


    public static onSellFunc() {
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

    }


    public static onClearData() {
        this.Ycount = 0;
        this.Scount = 0;
        this.preBuyprice = 0;
        this.profitrate = 0;
        this.succRate = 0;
        this.succRate = 0;
    }

}
