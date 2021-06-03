export default {

    GameType: 0,     //双盲 1  指标 2

    GameSet: null,   //游戏设置

    MAs: [],         //设置均线日  

    BOLL: [20],

    MACD: [12, 26, 9],

    KDJ: [9, 3, 3],

    RSI: [6, 12, 24],

    VOLGraph: [5, 10],          //成交量均线

    EXPMA: [12, 50],

    HZ_white: cc.Color.WHITE,

    // MAGraph: [5, 10, 20, 30, 60, 120],   //价格均线

    MAColor: [cc.Color.WHITE, cc.Color.YELLOW, cc.Color.RED, cc.Color.BLUE, cc.Color.GREEN, cc.Color.ORANGE],

    BOLLColor: [cc.Color.WHITE, cc.Color.YELLOW, cc.Color.RED],

    tipsDealColor: [],

    K_D_J_Line: [],

    RSI_COLOR: [],

    DIF_LINE_COL: null,

    DEA_LINE_COL: null,

    MACD_COL: [],

    EXPMA_COL: [],

    CCL_COL: null,  //持仓量颜色



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
        }
    ],

    info: null,

    history: { //游戏记录
        huizhidatas: 0,
        allRate: 0,       //总利率
        //  deal: [],    //交易天数、利率
    },

    TIMETEMP: [],   //玩的记录时间戳

    mark: [], //标签信息

    notice: [],      //通知栏

    fill: [],         //bg填充颜色

    GAMEFUPAN: false,  //游戏复盘

    eachHand: 0,    //每手

    enterGameCache: null,  //进入游戏的选择

    selectZline: 0,


    historyType: null,   //哪进入复盘的

    blockHistoy: [],



}