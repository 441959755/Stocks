export default {

    GameType: null,     //双盲  指标 

    GameSet: null,   //游戏设置

    hz_width: 10,    //绘制宽度

    beg_end: [0, 100],       //开始到结束

    MAs: [],         //设置均线日  

    BOLL: [20],

    MACD: [12, 26, 9],

    KDJ: [9, 3, 3],

    RSI: [6, 12, 24],

    VOLGraph: [5, 10],          //成交量均线

    EXPMA: [12, 50],

    K_D_J_Line: [],

    HZ_white: cc.Color.WHITE,

    // MAGraph: [5, 10, 20, 30, 60, 120],   //价格均线

    MAColor: [cc.Color.WHITE, cc.Color.YELLOW, new cc.Color().fromHEX('#e94343'), cc.Color.BLUE, new cc.Color().fromHEX('#31a633'), cc.Color.ORANGE],

    BOLLColor: [cc.Color.WHITE, cc.Color.YELLOW, new cc.Color().fromHEX('#e94343')],

    tipsDealColor: [],

    RSI_COLOR: [],

    DIF_LINE_COL: null,

    DEA_LINE_COL: null,

    MACD_COL: [],

    EXPMA_COL: [],

    CCL_COL: null,  //持仓量颜色

    labelRed: new cc.Color().fromHEX('#e94343'),
    labelGreen: new cc.Color().fromHEX('#31a633'),

    VOLColor: [cc.Color.WHITE, cc.Color.YELLOW],

    huizhidatas: 0,

    ziChan: 100000,

    allRate: 0,  //总盈利

    finalfund: 0,

    data: [
        {
            name: "启明星辰",
            code: "002439",
            data: [],
            circulate: 0,
            ktype: 0,
            tsGameFrom: null,
            tsGameCur: null,
        }
    ],


    history: { //游戏记录
        huizhidatas: 0,
        allRate: 0,       //总利率
    },

    // TIMETEMP: [],   //玩的记录时间戳

    mark: [], //标签信息

    notice: [],      //通知栏

    fill: [],         //bg填充颜色

    GAMEWAIT: false,  //游戏走完，等待游戏结果

    GAMEFUPAN: false,  //游戏复盘

    GAMEFUPANDATA: null,  //复盘数据

    eachHand: 0,    //每手

    enterGameConf: null,  //进入游戏的选择

    selectZline: 0,

    historyType: null,   //哪进入复盘的

    blockHistoy: [],

    RoomGameData: null,//游戲結果

    GAMEFRTD: false,  //是否断线重连

    JJ_XUNLIAN: false,  //

}