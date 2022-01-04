
import ComUtils from '../sctiprs/Utils/ComUtils';
import GameCfg from "./game/GameCfg";
import GameData from "./GameData";
import { pb } from "../protos/proto";
import HttpUtils from "./common/net/HttpUtils";
import GlobalEvent from './Utils/GlobalEvent';
import LLWConfig from './common/config/LLWConfig';
import PlatDefine from './common/config/PlatDefine';
import EventCfg from './Utils/EventCfg';

export default class GameCfgText {

    public static url = 'http://test.cgdr168.com/conf/';

    // public static url = 'http://login.cgdr168.com/conf/';

    public static curDayIsLoad = false;  //今天是否下载

    public static smxlCfg = null;           //训练次数配置

    public static levelInfoCfg = null;     //等级经验配置

    public static stockList = null;          //股票配置

    public static pkStockList = null;

    public static qihuoList = null;          //期货配置

    public static appConf = null;            //公告 开关

    public static adConf = null;

    public static gameConf = null;

    public static LoadGameConf() {

        if (this.appConf && this.gameConf && this.adConf && this.stockList && this.qihuoList) {
            GlobalEvent.emit('OPENADHIDE');
            return
        }

        let callback1 = (text) => {
            cc.sys.localStorage.setItem('APPCONF', text);

            this.appConf = JSON.parse(text);

            if (LLWConfig.PLATTYPE == PlatDefine.PLAT_IOS) {
                if (this.appConf.maintain.stopIos) {
                    GlobalEvent.emit('OPENNOTICELAYER');
                }
            }
            else {
                if (this.appConf.maintain.stop) {
                    GlobalEvent.emit('OPENNOTICELAYER');
                }
            }

            console.log('app.conf 加载完成');
        }

        let err1 = () => {
            let text = cc.sys.localStorage.getItem('APPCONF');
            if (!text) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            }
            else {
                callback1(text);
            }
        }

        HttpUtils.loadRequest(this.url + 'app.conf', null, callback1.bind(this), err1.bind(this));


        let callback2 = (text) => {
            cc.sys.localStorage.setItem('GAMECONF', text);
            let nati = JSON.parse(text)

            this.levelInfoCfg = nati.level_exp;
            this.smxlCfg = nati.smxl;
            this.gameConf = nati;
            console.log('game.conf 加载完成');
        }

        let err2 = () => {
            let text = cc.sys.localStorage.getItem('GAMECONF');
            if (!text) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            }
            else {
                callback2(text);
            }
        }

        HttpUtils.loadRequest(this.url + 'game.conf', null, callback2.bind(this), err2.bind(this));


        let callback3 = (text) => {
            cc.sys.localStorage.setItem('ADCONF', text);
            this.adConf = JSON.parse(text);
            console.log('ad.conf 加载完成');
            GlobalEvent.emit('OPENADSHOW');
        }

        let err3 = () => {
            let text = cc.sys.localStorage.getItem('ADCONF');
            if (!text) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            }
            else {
                callback3(text);
            }
        }

        HttpUtils.loadRequest(this.url + 'ad.conf', null, callback3.bind(this), err3.bind(this));

        // //属性文件
        // LoadUtils.load(this.url + 'game.conf', (text) => {
        //     let nati = JSON.parse(text)
        //     this.levelInfoCfg = nati.level_exp;
        //     this.smxlCfg = nati.smxl;
        //     this.gameTextCfg = nati;
        //     console.log('game.conf 加载完成');
        // })

        //广告
        // LoadUtils.load(this.url + 'ad.conf', (text) => {
        //     this.adConf = JSON.parse(text);
        //     console.log('ad.conf 加载完成');
        // })

        let callback4 = (text) => {
            cc.sys.localStorage.setItem('STOCKLISTDAT', text);
            this.stockList = text.split('\n');
            // 股票代码|股票名称|第一个行情日期|最后一个行情日期（0为无最后行情，即股票还在上市中）|流通股数（注：请忽略该行）
            this.pkStockList = text.split('\n');
            let arr = [];
            for (let i = 0; i < this.stockList.length; i++) {
                let items = this.stockList[i].split('|');

                let code = items[0] + '';

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
            console.log('股票列表 加载完成');
        }

        let err4 = () => {
            let text = cc.sys.localStorage.getItem('STOCKLISTDAT');
            if (!text) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            }
            else {
                callback4(text);
            }
        }

        // //股票列表
        HttpUtils.loadRequest(this.url + 'stocklist.dat', null, callback4.bind(this), err4.bind(this));

        let callback5 = (text) => {
            cc.sys.localStorage.setItem('CONTRACTLISTDAT', text);
            this.qihuoList = text.split('\n');
            console.log('期货列表 加载完成');
        }

        let err5 = () => {
            let text = cc.sys.localStorage.getItem('CONTRACTLISTDAT');
            if (!text) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '连接超时，请检查网络，重新登入')
            }
            else {
                callback5(text);
            }
        }

        // //期货列表
        HttpUtils.loadRequest(this.url + 'contractlist.dat', null, callback5.bind(this), err5.bind(this));

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
            items = this.stockList[i].split('|');
            if (items[0].indexOf(item) != -1 || items[1].indexOf(item) != -1) {

                break;
            }
        }
        return items;
    }

    /**
 * 
 * @param item 
 * return 一行  数组
 */
    public static getGPPKItemInfo(item) {
        let index, items;
        for (let i = 0; i < this.pkStockList.length; i++) {
            if (this.pkStockList[i] == '') { continue }
            let arr = this.pkStockList[i].split('|');
            if (arr[0].indexOf(item) != -1 || arr[1].indexOf(item) != -1) {
                items = arr;
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
            let arr = this.stockList[i].split('|');
            if (arr[0].indexOf(str) != -1 || arr[1].indexOf(str) != -1) {
                items = this.stockList[i].split('|');
                break;
            }
        }
        if (!items) {
            return;
        }

        let data = {
            start: null,
            end: null,
        };
        data.start = items[2];
        if (items[3] == 0) {
            // data.end = ComUtils.getCurYearMonthDay();
            let f = new Date();
            let y = f.getFullYear() + '';
            let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
            let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
            let sc = ComUtils.GetPreMonthDay(y + '-' + m + '-' + d, 2);

            y = sc.y;
            m = sc.m >= 10 ? sc.m : '0' + sc.m;
            d = sc.d >= 10 ? sc.d : '0' + sc.d;
            data.end = y + '' + m + '' + d;
        } else {
            data.end = items[3];
        }
        return data;
    }

    public static getTimeByCodeName1(str) {
        str = str.split(' ')[0];
        let items;
        for (let i = 0; i < this.stockList.length; i++) {
            let arr = this.stockList[i].split('|');
            if (arr[0].indexOf(str) != -1 || arr[1].indexOf(str) != -1) {
                items = this.stockList[i].split('|');
                break;
            }
        }
        if (!items) {
            return;
        }

        let data = {
            start: null,
            end: null,
        };
        data.start = items[2];
        if (items[3] == 0) {
            // data.end = ComUtils.getCurYearMonthDay();
            let f = new Date();
            let y = f.getFullYear() + '';
            let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
            let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

            data.end = y + '' + m + '' + d;
        } else {
            data.end = items[3];
        }
        return data;
    }

    public static getTimeByItems(time) {
        let arr = [];
        for (let i = 0; i < this.stockList.length; i++) {

            let items = this.stockList[i].split('|');

            let start = items[2];
            let end;
            if (items[3] == 0) {
                // data.end = ComUtils.getCurYearMonthDay();
                let f = new Date();
                let y = f.getFullYear() + '';
                let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
                let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
                let sc = ComUtils.GetPreMonthDay(y + '-' + m + '-' + d, 2);

                y = sc.y;
                m = sc.m >= 10 ? sc.m : '0' + sc.m;
                d = sc.d >= 10 ? sc.d : '0' + sc.d;
                end = y + '' + m + '' + d;
            } else {
                end = items[3];
            }
            if ((parseInt(time) - 100) > parseInt(start) && (parseInt(time) + 100) < parseInt(end)) {
                arr.push(items);
            }

        }

        let index = parseInt(Math.random() * arr.length + '');
        return arr[index];

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
        if (!parseInt(time)) {
            console.log('时间有误');
            return
        }

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

    //根据时间随机先股票分时
    public static getItemsByTime1() {

        let le = parseInt(Math.random() * GameCfgText.stockList.length + '');
        while (le--) {
            let items = GameCfgText.stockList[le].split('|');
            let str;
            if (items[3] == 0) {
                return items;
            }

            if (le <= 0) {
                le = GameCfgText.stockList.length - 1;
            }
        }
    }

    //随机SM一只股票
    public static getGPSMByRandom(cb?) {

        let data = {
            ktype: pb.KType.Day,
            kstyle: pb.KStyle.Random,
            code: null,
            from: null,
            total: 250,
            to: 0,
            reserve: 100,
        }

        let le = parseInt(Math.random() * this.stockList.length + '');

        let items = this.stockList[le].split('|');

        data.code = items[0];

        let start = items[2], end = items[3], sc;

        if (end == 0) {

            sc = new Date().getTime() - 24 * 60 * 60 * 1000 * data.total;

        } else {

            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);

            sc = d.getTime() - 24 * 60 * 60 * 1000 * data.total;
        }

        if (parseInt(start) < 20100101) {
            start = '20100601';
        }

        let year = start.slice(0, 4);
        let month = start.slice(4, 6);
        let day = start.slice(6);

        //开始的时间戳
        let d = new Date(year + '-' + month + '-' + day);
        ///console.log(d); 
        let t = d.getTime() + 24 * 60 * 60 * 1000 * 100;

        if (sc <= 0) {
            this.getGPSMByRandom();
            return;
        }
        else if (sc < t) {
            this.getGPSMByRandom();
            return;
        }
        else {
            //随机的时间戳
            let s = Math.random() * (sc - t) + t;

            let f = new Date(s);
            {
                let ye = f.getFullYear();
                let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

                let da = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

                data.from = ye + '' + mon + '' + da;
            }

            GameCfg.data[0].data = [];
            GameCfg.data[0].name = items[1];
            GameCfg.data[0].code = items[0];
            GameCfg.data[0].circulate = items[4];
            GameCfg.data[0].ktype = data.ktype;

            GameCfg.enterGameCache = data;
        }
    }


    //随机DX一只股票
    public static getGPDXByRandom(cb?) {

        let data = {
            ktype: GameCfg.enterGameCache.ktype,
            kstyle: GameCfg.enterGameCache.kstyle,
            code: null,
            from: null,
            total: parseInt(GameData.DXSet.KLine) + 100,
            to: 0,
            reserve: 100,
        };

        let items;

        let le = parseInt(Math.random() * GameCfgText.stockList.length + '');

        items = GameCfgText.stockList[le].split('|');

        data.code = items[0];
        // data.kstyle = pb.KStyle.Random;

        let start = items[2],
            end = items[3],
            sc;
        if (end == 0) {

            sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000;

        } else {
            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);


            sc = d.getTime() - data.total * 24 * 60 * 60 * 1000;

        }

        if (parseInt(start) < 20100101) {
            start = '20100101';
        }

        let year = start.slice(0, 4);
        let month = start.slice(4, 6);
        let day = start.slice(6);

        let d = new Date(year + '-' + month + '-' + day);

        let t;

        t = d.getTime() + 24 * 60 * 60 * 1000 * 100 * 2;

        if (sc < t && GameData.DXSet.year == '随机' && GameData.DXSet.search == '随机选股') {
            this.getGPDXByRandom();
            return;
        }

        let s = Math.random() * (sc - t) + t;

        let f = new Date(s);

        {
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

            data.from = ye + '' + mon + '' + da;
        }

        GameCfg.data[0].code = items[0];

        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];

        GameCfg.data[0].circulate = items[4];
        GameCfg.enterGameCache = data;

        console.log('给的数据:' + JSON.stringify(data));
    }

    //随机QH一只期货
    public static getQHQHByRandom(cb?) {

        let data = {
            ktype: GameCfg.enterGameCache.ktype,
            kstyle: pb.KStyle.Random,
            code: null,
            from: null,
            total: parseInt(GameData.QHSet.KLine) + 100,
            to: 0,
            reserve: 100,
        };

        let rom = parseInt(Math.random() * this.qihuoList.length + '');

        let items = this.qihuoList[rom].split('|');

        data.code = items[0];

        let tim = GameCfgText.QHGetTimeByCodeName(data.code)

        data.ktype = pb.KType.Day;

        let start = tim.start, end = tim.end, sc;

        if (end == 0) {
            sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000;
        } else {
            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);
            sc = d.getTime() - data.total * 24 * 60 * 60 * 1000;
        }
        let f;
        if (start == 0) {
            f = new Date(sc);
        } else {
            let year = start.slice(0, 4);
            let month = start.slice(4, 6);
            let day = start.slice(6);

            let d = new Date(year + '-' + month + '-' + day);
            ///console.log(d);
            let t = d.getTime() + 100 * 24 * 60 * 60 * 1000;

            let s = Math.random() * (sc - t) + t;

            f = new Date(s);
        }

        if (sc <= f.getTime()) {
            this.getQHQHByRandom(cb);
            return;
        }

        {
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

            data.from = ye + '' + mon + '' + da;
        }
        GameCfg.enterGameCache = data;

        GameCfg.data[0].code = items[0];
        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1] + '  ' + items[2] + items[3];
        console.log(JSON.stringify(data));

    }

    public static getGPZBByRandom(cb?) {
        let data = {
            ktype: GameCfg.enterGameCache.ktype,     //4 30分钟  5  60分钟  10  日   11周
            kstyle: 0,      // 0随机行情   1震荡行情  2单边向上行情 3单边向下行情
            code: null,       //股票代码（0表示忽略和随机）
            from: null,       //// 开始时间戳（不能为0，查询日K行情的格式为：YYYYMMDD；查询分时行情的格式为：HHMMSS）
            total: parseInt(GameData.ZBSet.KLine) + 100,  // K线条数
            to: 0,           //	// 结束时间戳（0表示忽略该参数；格式同from）
            reserve: 100,
        }

        let items;

        let le = parseInt(Math.random() * GameCfgText.stockList.length + '');
        items = GameCfgText.stockList[le].split('|');
        data.code = items[0];
        let start = items[2], end = items[3], sc;
        if (end == 0) {
            if (GameData.ZBSet.ZLine == '周线') {
                sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000 * 7;
            } else {
                sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000;
            }
        } else {
            let year = end.slice(0, 4);
            let month = end.slice(4, 6);
            let day = end.slice(6);

            let d = new Date(year + '-' + month + '-' + day);
            if (GameData.ZBSet.ZLine == '周线') {
                sc = d.getTime() - data.total * 24 * 60 * 60 * 1000 * 7;
            }
            else {
                sc = d.getTime() - data.total * 24 * 60 * 60 * 1000;
            }
        }

        if (parseInt(start) < 20100101) {
            start = '20100101';
        }

        let year = start.slice(0, 4);
        let month = start.slice(4, 6);
        let day = start.slice(6);


        let d = new Date(year + '-' + month + '-' + day);

        let t;

        if (GameData.ZBSet.ZLine == '周线') {
            t = d.getTime() + 24 * 60 * 60 * 1000 * 100 * 7 * 2;
        }
        else {
            t = d.getTime() + 24 * 60 * 60 * 1000 * 100 * 2;
        }

        if (sc < t && GameData.ZBSet.year == '随机' && GameData.ZBSet.search == '随机选股') {
            this.getGPDXByRandom();
            return;
        }

        let s = Math.random() * (sc - t) + t;

        let f = new Date(s);

        {
            let ye = f.getFullYear();
            let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

            let da = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

            data.from = ye + '' + mon + '' + da;
        }

        GameCfg.data[0].data = [];
        GameCfg.data[0].name = items[1];
        GameCfg.data[0].code = items[0];
        GameCfg.data[0].circulate = items[4];
        console.log('给的数据:' + JSON.stringify(data));
        GameCfg.enterGameCache = data;

    }


    public static releaseRes() {

    }

    public static getSwitchModule(id, cb?) {
        let flag = false;
        this.appConf.module.forEach(el => {
            if (el.id == id) {
                if (el.switch) {
                    flag = true;
                }
            }
        });
        if (cb && !flag) {
            cb();
        }
        else {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
        }
    }

    public static getSwitchPop(id) {
        let flag = false;
        this.appConf.pop.forEach(el => {
            if (el.id == id) {
                if (el.switch) {
                    flag = true;
                }
            }
        });
        return flag;
    }

}
