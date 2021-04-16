import GameData from "../GameData";
import LLWSDK from "../common/sdk/LLWSDK";

import LoadUtils from "../Utils/LoadUtils";

import Socket from "../common/net/socket";

window.global = window;

cc.ext = {};
cc.ext.gameData = GameData;

cc.Class({
    extends: cc.Component,

    properties: {

    },

    init() {
        let PBHelper = require('pbhelper');
        let pbhelper = new PBHelper();
        global.PB = pbhelper;

        global.gameData = cc.ext.gameData;
    },

    onLoad() {
        this.init();
        //游戏配置
        LoadUtils.loadRes('protos/game', (text) => {
            global.levelInfoCfg = JSON.parse(text.text).levelConf;
            global.smxlCfg = JSON.parse(text.text).smxl;
        })

        //股票配置
        LoadUtils.loadRes('protos/stocklist', (text) => {
            global.stocklist = text.text.split('\n');
            // 股票代码|股票名称|第一个行情日期|最后一个行情日期（0为无最后行情，即股票还在上市中）|流通股数（注：请忽略该行）
            let arr = [];
            for (let i = 0; i < stocklist.length; i++) {
                let items = stocklist[i].split('|');

                let code = items[0] + '';

                if (code >= 1000000) {
                    code = parseInt(code) - 1000000;
                }

                code = code + '';
                let head2 = code.slice(0, 2);

                let head3 = code.slice(0, 3);

                if (head2 == '60' || head2 == '00') {
                    arr.push(stocklist[i]);
                } else if (head3 == '688' || head3 == '002' || head3 == '300') {
                    arr.push(stocklist[i]);
                }
            }
            if (arr && arr.length > 0) {
                stocklist = arr;
            }
        })

        cc.macro.ENABLE_MULTI_TOUCH = false;

        this.initData();
    },

    start() {
        let self = this;
        // //TODO  接DSK
        let llwSDK = LLWSDK.getSDK()
        global.llwSDK = llwSDK;
        llwSDK.login((decoded) => {
            console.log(decoded.token + decoded.uid + decoded.gameAddr);

            if (decoded) {
                decoded.token && (cc.ext.gameData.token = decoded.token);
                decoded.uid && (cc.ext.gameData.userID = decoded.uid);
                if (decoded.gameAddr) {
                    let socket = Socket(decoded.gameAddr);
                    global.socket = socket;
                }
            } else {
                console.log('login err');
            }
        })
    },

    initData() {
        let SMSet = cc.sys.localStorage.getItem('SMSET');
        if (!SMSet) {
            SMSet = {
                isShowVol: true,
                isBW: true,
                isMA1: true,
                MA1Date: 5,
                isMA2: true,
                MA2Date: 10,
                isMA3: true,
                MA3Date: 20,
                isMA4: true,
                MA4Date: 30,
                isMA5: true,
                MA5Date: 60,
                isMA6: true,
                MA6Date: 120,
                isFC: false,
            }
            cc.ext.gameData.SMSet = SMSet;
        } else {
            cc.ext.gameData.SMSet = JSON.parse(SMSet);
        }

        let DXSet = cc.sys.localStorage.getItem('DXSET');
        if (!DXSet) {
            DXSet = {
                k_notice: true,
                jx_notice: true,
                StopCheck_notice: true,
                isShowVol: true,
                isBW: true,
                isMA1: true,
                MA1Date: 5,
                isMA2: true,
                MA2Date: 10,
                isMA3: true,
                MA3Date: 20,
                isMA4: true,
                MA4Date: 30,
                isMA5: true,
                MA5Date: 60,
                isMA6: true,
                MA6Date: 120,
                market: '随机行情',
                search: '随机股票',
                year: '随机',
                month: '--',
                day: '--',
                line: 'K线',
                KLine: '50',
                ZLine: '日线',
                isFC: false,
            }
            cc.ext.gameData.DXSet = DXSet;
        } else {
            cc.ext.gameData.DXSet = JSON.parse(DXSet);
        }

        let ZBSet = cc.sys.localStorage.getItem('ZBSet');
        if (!ZBSet) {
            ZBSet = {
                select: 'MACD',
                strategy: 'MACD金叉',
                search: '1000919 金陵药业',
                year: '2010',
                month: '08',
                day: '04',
                KLine: '150',
                ZLine: '日线',
                showSign: true,
                MA: [20, 10, 20, -8],
                VOL: [5, 20],
                MACD: [12, 26, 9],
                BOLL: [20],
                KDJ: [9],
                RSI: [6, 12, 24],
                EXPMA: [12, 50],
                isShowVol: false,
                isBW: true,
            }
            cc.ext.gameData.ZBSet = ZBSet;
        } else {
            cc.ext.gameData.ZBSet = JSON.parse(ZBSet);
        }
    },

    onDestroy() {
        LoadUtils.releaseRes('protos/stocklist');
        LoadUtils.releaseRes('protos/game');
    }
});
