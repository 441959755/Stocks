import GameData from "../GameData";
import LLWSDK from "../common/sdk/LLWSDK";

import LoadUtils from "../Utils/LoadUtils";

import Socket from "../common/net/socket";

window.global = window;

cc.ext = {};
cc.ext.gameData = new GameData();

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

        LoadUtils.loadRes('protos/stocklist', (text) => {
            global.stocklist = text.text.split('\n');
            // 股票代码|股票名称|第一个行情日期|最后一个行情日期（0为无最后行情，即股票还在上市中）|流通股数（注：请忽略该行）
        })

        //
        LoadUtils.loadRes('protos/game', (text) => {
            global.levelInfoCfg = JSON.parse(text.text).levelConf;
        })

        cc.macro.ENABLE_MULTI_TOUCH = false;

        this.initData();
    },

    start() {
        let self = this;
        // //TODO  接DSK
        cc.ext.llwSDK = LLWSDK.getSDK()
        cc.ext.llwSDK.login((decoded) => {
            console.log(decoded.token + decoded.uid + decoded.gameAddr);

            if (decoded) {
                decoded.token && (cc.ext.gameData.token = decoded.token);
                decoded.uid && (cc.ext.gameData.userID = decoded.uid);
                if (decoded.gameAddr) {
                    let socket = Socket(decoded.gameAddr);
                    global.socket = socket;
                    setTimeout(() => {
                        self.enterHall();
                    }, 500)
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
                isFC: false,
            }
            //   cc.ext.gameData.SMSet = SMSet;
        } else {
            //  cc.ext.gameData.SMSet = JSON.parse(SMSet);
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

    //进入大厅
    enterHall() {

        socket.send(4001, PB.onCmdGameLoginConvertToBuff(), (info) => {

            console.log(JSON.stringify(info));
            if (info && info.data) {
                gameData.userID = info.data.uid;
                gameData.userName = info.data.nickname;
                // if (!cc.ext.gameData.headimgurl) {
                //     cc.ext.gameData.headimgurl = info.data.icon;
                // }
                // cc.ext.gameData.gold = info.data.properties[0];
                // cc.ext.gameData.exp = info.data.properties[1];
                // (cc.ext.gameData.level = info.da)ta.properties[2];
                // cc.ext.gameData.ShuangMang_Gold = info.data.properties[3];

                gameData.properties = info.data.properties;

                cc.ext.gameData.maxExp = levelInfoCfg[gameData.properties[2]].max_exp;
                cc.director.loadScene('hall');
            }
        });

    },

    onDestroy() {
        LoadUtils.releaseRes('protos/stocklist');
        LoadUtils.releaseRes('protos/conf');
    }
});
