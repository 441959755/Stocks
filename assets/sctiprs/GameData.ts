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
        GlobalEvent.emit(EventCfg.BIRCKCHANGE);
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

    private static _SmxlState = null;// 双盲训练状态

    public static otherPlayers = null;

    public static GameCounters = null;  //游戏输赢次数

    public static todayGameCount = null;  //今日游戏次数

    public static get SmxlState() {
        return this._SmxlState;
    }

    public static set SmxlState(val) {
        this._SmxlState = val;
        GlobalEvent.emit(EventCfg.SMINITFUND);
    }

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
        GlobalEvent.emit(EventCfg.BIRCKCHANGE);
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


    // private static _DingXiangCount;

    // public static get DingXiangCount() {

    //     return this._DingXiangCount;
    // }

    // public static set DingXiangCount(val) {
    //     this._DingXiangCount = val;
    //     let str = new Date().toLocaleDateString();
    //     cc.sys.localStorage.setItem('DINGXIANGCOUNT' + str, val);
    // }


}