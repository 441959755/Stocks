
import LoadUtils from "../sctiprs/Utils/LoadUtils";
import ComUtils from '../sctiprs/Utils/ComUtils';

export default class GameCfgText {

    public static smxlCfg = null;           //训练次数配置

    public static levelInfoCfg = null;     //等级经验配置

    public static stockList = null;          //股票配置

    public static qihuoList = null;          //期货配置

    public static getStocktList() {
        LoadUtils.loadRes('protos/stocklist', (text) => {
            this.stockList = text._nativeAsset.split('\n');
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
            this.levelInfoCfg = JSON.parse(text._nativeAsset).levelConf;
            this.smxlCfg = JSON.parse(text._nativeAsset).smxl;
        })
    }

    public static getQIHuoList() {
        // 合约代码|合约中文名称|合约英文名称|合约种类|所在交易所|第一个日K日期（YYYYMMDD）|最后一个日K//日期（YYYYMMDD）|第一个分时时间戳（精确到秒）|最后一个分时时间戳（精确到秒）
        LoadUtils.loadRes('protos/contractlist', (text) => {
            this.qihuoList = text._nativeAsset.split('\n');
        })
    }

    /**
     * 
     * @param item 
     * return 一行  数组
     */
    public static getQHItemInfo(item) {
        let index = -1;
        for (let i = 0; i < this.qihuoList.length; i++) {
            if (this.qihuoList[i].indexOf(item) != -1) {
                index = i;
                break;
            }
            let arr = this.qihuoList[i].split('|');

            if ((arr[2] + arr[3]) == item) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            return this.qihuoList[index].split('|');
        } else {
            console.log('没有找打期货' + item);
            return;
        }
    }

    /**
    * 
    * @param item 
    * return 一行  数组
    */
    public static getGPItemInfo(item) {
        let index, items;
        for (let i = 0; i < this.stockList.length; i++) {
            if (this.stockList[i].indexOf(item) != -1) {
                items = this.stockList[i].split('|');
                break;
            }
        }
        return items;
    }

    /**
 * 根据股票的名字获取股票的范围
 */
    public static getTimeByCodeName(str) {
        str = str.split(' ')[0];
        let items;
        for (let i = 0; i < this.stockList.length; i++) {
            if (this.stockList[i].indexOf(str) != -1) {
                items = this.stockList[i].split('|');
                break;
            }
        }

        let data = {
            start: null,
            end: null,
        };
        data.start = items[2];
        if (items[3] == 0) {
            data.end = ComUtils.getCurYearMonthDay();
        } else {
            data.end = items[3];
        }
        return data;
    }

    /**
* 根据期货的名字获取股票的范围
*/
    public static QHGetTimeByCodeName(str) {
        let index = -1;
        for (let i = 0; i < this.qihuoList.length; i++) {
            if (this.qihuoList[i].indexOf(str) != -1) {
                index = i;
                break;
            }
        }

        if (index != -1) {

            let data = {
                start: null,
                end: null,
            };

            let items = this.qihuoList[index].split('|');

            if (ComUtils.getTimestamp(items[5]) > parseInt(items[7])) {
                data.start = items[5];
            } else {
                let now = new Date(parseInt(items[7]) * 1000);
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                data.start = y + "" + (m < 10 ? "0" + m : m) + "" + (d < 10 ? "0" + d : d);
            }
            if (ComUtils.getTimestamp(items[6]) < parseInt(items[8])) {
                data.end = items[6];
            } else {
                let now = new Date(parseInt(items[8]) * 1000);
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                data.end = y + "" + (m < 10 ? "0" + m : m) + "" + (d < 10 ? "0" + d : d);
            }
            return data;
        }
    }

    //根据时间随机先股票xx
    public static getItemsByTime(time) {

        let le = parseInt(Math.random() * GameCfgText.stockList.length + '');
        while (le--) {
            let items = GameCfgText.stockList[le].split('|');
            let str;
            if (items[3] == 0) {
                str = ComUtils.getCurYearMonthDay();
            }
            if (parseInt(time) - parseInt(items[2]) > 100) {

                //  if (items[3] == 0) {
                return items;
                // } else 
            }

            if (le <= 0) {
                le = GameCfgText.stockList.length - 1;
            }
        }


    }

    public static releaseRes() {
        LoadUtils.releaseRes('protos/stocklist');
        LoadUtils.releaseRes('protos/game');
        LoadUtils.releaseRes('protos/contractlist');
    }

}
