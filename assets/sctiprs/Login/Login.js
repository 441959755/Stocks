import GameData from "../GameData";
import LLWSDK from "../common/sdk/LLWSDK";

import Socket from "../common/net/socket";
import GameCfg from "../game/GameCfg";

import GameCfgText from '../GameText';

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
        GameCfgText.getOtherCfg();

        //股票配置
        GameCfgText.getStocktList();

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
                search: '随机选股',
                year: '随机',
                month: '--',
                day: '--',
                line: 'K线',
                KLine: '100',
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
                search: '600056 中国医药',
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

        {
            let str = cc.sys.localStorage.getItem('TIMETEMP');
            if (str) {
                GameCfg.TIMETEMP = JSON.parse(str);
                //上个月的数据清除
                if (GameCfg.TIMETEMP.length > 0) {
                    var data = new Date(); //本月
                    data.setDate(1);
                    data.setHours(0);
                    data.setSeconds(0);
                    data.setMinutes(0);

                    let time = data.getTime() / 1000;
                    let arr = [];
                    GameCfg.TIMETEMP.forEach(el => {
                        if (el <= time) {
                            cc.sys.localStorage.removeItem(el);
                            cc.sys.localStorage.removeItem(el + 'set');
                            cc.sys.localStorage.removeItem(el + 'fill');
                            cc.sys.localStorage.removeItem(el + 'notice');
                            cc.sys.localStorage.removeItem(el + 'mark');
                        } else {
                            arr.push(el);
                        }
                    })

                    GameCfg.TIMETEMP = arr;
                    cc.sys.localStorage.setItem('TIMETEMP', JSON.stringify(GameCfg.TIMETEMP))
                } else {
                    console.log('in login' + '还没缓存数据');
                }
            }
        }

        {
            let str = cc.sys.localStorage.getItem('SHUANGMANGCOUNT');
            if (str) {

            }
        }


    },

    onDestroy() {
        GameCfgText.releaseRes();
    }
});
