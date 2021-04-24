
import LoadUtils from "../sctiprs/Utils/LoadUtils";

export default class GameCfgText {

    public static smxlCfg = null;           //训练次数配置

    public static levelInfoCfg = null;     //等级经验配置

    public static stockList = null;          //股票配置

    public static getStocktList() {
        LoadUtils.loadRes('protos/stocklist', (text) => {

            this.stockList = text.text.split('\n');
            // 股票代码|股票名称|第一个行情日期|最后一个行情日期（0为无最后行情，即股票还在上市中）|流通股数（注：请忽略该行）
            let arr = [];
            for (let i = 0; i < this.stockList.length; i++) {
                let items = this.stockList[i].split('|');

                let code = items[0] + '';

                // if (code >= 1000000) {
                //     code = parseInt(code) - 1000000;
                // }
                if (code.length >= 7) {
                    code = code.slice(1, 7);
                }

                let head2 = code.slice(0, 2);

                let head3 = code.slice(0, 3);

                if (head2 == '60' || head2 == '00') {
                    arr.push(this.stockList[i]);
                } else if (head3 == '688' || head3 == '002' || head3 == '300') {
                    arr.push(this.stockList[i]);
                }
            }
            if (arr && arr.length > 0) {
                this.stockList = arr;
            }
        })
    }

    public static getOtherCfg() {
        LoadUtils.loadRes('protos/game', (text) => {
            this.levelInfoCfg = JSON.parse(text.text).levelConf;
            this.smxlCfg = JSON.parse(text.text).smxl;
        })
    }


    public static releaseRes() {
        LoadUtils.releaseRes('protos/stocklist');
        LoadUtils.releaseRes('protos/game');
    }



}
