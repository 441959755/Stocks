export default {

    GameType: 0,     //双盲 1  指标 2

    GameSet: null,   //游戏设置

    MAs: [],         //均线日

    MaList: [], //MA的每一个绘制点

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

    VOLGraph: [5, 10],          //成交量均线

    VOLColor: [cc.Color.WHITE, cc.Color.YELLOW],

    huizhidatas: 0,

    ziChan: 100000,

    allRate: 0,  //总盈利

    profitCount: 0,//次数盈  利

    lossCount: 0,//亏 损次数

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

        mark: [],        //标签信息
        notice: [],      //通知栏
        fill: [],         //bg填充颜色
        huizhidatas: 0,
        allRate: 0,
    },

    TIMETEMP: [],   //玩的记录时间戳

    GAMEFUPAN: false,  //游戏复盘

}