import GlobalEvent from "./Utils/GlobalEvent";
import EventCfg from "./Utils/EventCfg";

export default class GameData {

    //Id
    private static _userID = null;

    public static get userID() {
        return this._userID;
    }

    public static set userID(val) {
        this._userID = val;
    }

    //名字
    private static _userName = null;

    public static get userName() {
        return this._userName;
    }

    public static set userName(val) {
        this._userName = val;
        GlobalEvent.emit(EventCfg.NAMECHANGE);
    }

    //砖石
    private static _brick = null;

    public static set brick(val) {
        this._brick = val;
        GlobalEvent.emit(EventCfg.DIAMONDCHANGE);
    }

    public static get brick() {
        return this._brick;
    }



    public static maxExp = null;

    public static _gender = null;     //性别

    public static set gender(val) {
        this._gender = val;
        GlobalEvent.emit(EventCfg.GENDERCHANGE);
    }

    public static get gender() {
        return this._gender;
    }

    public static headimgurl = null; //头像地址

    public static _headImg = null;

    public static get headImg() {
        return this._headImg;
    }
    public static set headImg(val) {
        this._headImg = val;
        GlobalEvent.emit(EventCfg.HEADIMGCHANGE);
    }

    private static _location = null;

    public static get location() {
        return this._location;
    }
    public static set location(val) {
        this._location = val;
        GlobalEvent.emit(EventCfg.LOCALTIONCHANGE);
    }

    public static roomId = null;

    public static openid = null;
    public static sessionKey = null;

    public static ShuangMang_Gold = null;

    public static huizhidatas = null;

    public static Players = [];

    public static GameCounters = null;  //游戏输赢次数

    public static todayGameCount = null;  //今日游戏次数

    private static _SmxlState = null;// 双盲训练状态

    public static get SmxlState() {
        return this._SmxlState;
    }

    public static set SmxlState(val) {
        this._SmxlState = val;
        GlobalEvent.emit(EventCfg.SMINITFUND);
    }

    public static cgState = null;  //闯关大赛状态

    //SMset
    private static _token;

    public static get token() {
        return this._token;
    }
    public static set token(val) {
        this._token = val;
        cc.sys.localStorage.setItem('token', JSON.stringify(val));
    }

    //SMset
    private static _SMSet;

    public static get SMSet() {
        return this._SMSet;
    }
    public static set SMSet(val) {
        this._SMSet = val;
        cc.sys.localStorage.setItem('SMSET', JSON.stringify(val));
    }


    //SMset
    private static _JJPKSet;

    public static get JJPKSet() {
        return this._JJPKSet;
    }
    public static set JJPKSet(val) {
        this._JJPKSet = val;
        cc.sys.localStorage.setItem('JJPKSET', JSON.stringify(val));
    }

    //QHSet
    private static _QHSet;

    public static get QHSet() {
        return this._QHSet;
    }
    public static set QHSet(val) {
        this._QHSet = val;
        cc.sys.localStorage.setItem('QHSET', JSON.stringify(val));
    }

    private static _ZBSet;

    public static get ZBSet() {
        return this._ZBSet;
    }

    public static set ZBSet(val) {
        this._ZBSet = val;
        cc.sys.localStorage.setItem('ZBSet', JSON.stringify(val));
    }

    private static _DXSet;

    public static get DXSet() {
        return this._DXSet;
    }
    public static set DXSet(val) {
        this._DXSet = val;
        cc.sys.localStorage.setItem('DXSET', JSON.stringify(val));
    }

    private static _properties = [];
    //// 金币
    // 1;				// 经验
    //  2;				// 等级
    // 3;	// 双盲本月当前金币
    public static get properties() {
        return this._properties;
    }

    public static set properties(val) {
        this._properties = val;
        cc.sys.localStorage.setItem('properties', JSON.stringify(val));
        //砖石
        GlobalEvent.emit(EventCfg.DIAMONDCHANGE);
        GlobalEvent.emit(EventCfg.GOLDCHANGE);
        GlobalEvent.emit(EventCfg.LEVELCHANGE);
        GlobalEvent.emit(EventCfg.EXPCHANGE);

    }

    //保存选择的股票
    private static _DXHistoryInfo = [];

    public static set DXHistoryInfo(val) {
        this._DXHistoryInfo = val;
        cc.sys.localStorage.setItem('DXHISTORYINFO', JSON.stringify(val));
    }

    public static get DXHistoryInfo() {
        return this._DXHistoryInfo;
    }

    private static _QHHistoryInfo = [];
    public static set QHHistoryInfo(val) {
        this._QHHistoryInfo = val;
        cc.sys.localStorage.setItem('QHHISTORYINFO', JSON.stringify(val));
    }

    public static get QHHistoryInfo() {
        return this._QHHistoryInfo;
    }

    private static _ZBHistoryInfo = [];
    public static set ZBHistoryInfo(val) {
        this._ZBHistoryInfo = val;
        cc.sys.localStorage.setItem('ZBHISTORYINFO', JSON.stringify(val));
    }

    public static get ZBHistoryInfo() {
        return this._ZBHistoryInfo;
    }



    //双盲的次数
    /**
     * name
     */
    // private static _ShuangMangCount;

    // public static get ShuangMangCount() {

    //     return this._ShuangMangCount;
    // }

    // public static set ShuangMangCount(val) {
    //     this._ShuangMangCount = val;
    //     let str = new Date().toLocaleDateString();
    //     cc.sys.localStorage.setItem('SHUANGMANGCOUNT' + str, val);

    // }


    private static _DingXiangADCount;

    public static get DingXiangADCount() {

        return this._DingXiangADCount;
    }

    public static set DingXiangADCount(val) {
        this._DingXiangADCount = val;
        let str = new Date().toLocaleDateString();
        cc.sys.localStorage.setItem('DINGXIANGADCOUNT' + str, val);
    }


    private static _QHADCount;

    public static get QHADCount() {

        return this._QHADCount;
    }

    public static set QHADCount(val) {
        this._QHADCount = val;
        let str = new Date().toLocaleDateString();
        cc.sys.localStorage.setItem('QHADCOUNT' + str, val);
    }

    private static _TJADCount;

    public static get TJADCount() {
        return this._TJADCount;
    }

    public static set TJADCount(val) {
        this._TJADCount = val;
        let str = new Date().toLocaleDateString();
        cc.sys.localStorage.setItem('TJADCOUNT' + str, val);
    }

    private static _selectBk = [];

    public static get SelectBk() {
        return this._selectBk;
    }

    public static set SelectBk(val) {
        this._selectBk = val;
        cc.sys.localStorage.setItem('SELECTBK', JSON.stringify(val));
    }

    public static CGSConfData = null;

    public static CGSSAVELEVEL = 0;

    public static JJCapital = 0;  //报名费

    public static RoomType = 0;  //2邀请

    public static selfEnterRoomData = null;

    public static AIStockList = [];  // 智能选股收藏股票列表

    public static selfStockList = [];  // 自能选股收藏股票列表

    public static mncgDataList = null;  //模拟闯关数据

    // public static roomHostID = null;    //房主ID

    public static locationLayer = null; //等位页面

}