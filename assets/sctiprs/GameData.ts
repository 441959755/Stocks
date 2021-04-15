import GlobalEvent from "./Utils/GlobalEvent";
import EventCfg from "./Utils/EventCfg";
import GameCfg from "./game/GameCfg";
import Game = cc.Game;

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

    //金币
    private static _gold = null;

    public static set gold(val) {
        this._gold = val;
        GlobalEvent.emit(EventCfg.GOLDCHANGE);
    }

    public static get gold() {
        return this._gold;
    }

    //等级
    private static _level = null;

    public static set level(val) {
        this._level = val;
        GlobalEvent.emit(EventCfg.LEVELCHANGE);
    }

    public static get level() {
        return this._level;
    }

    private static _exp = null;

    public static set exp(val) {
        this._exp = val;
        GlobalEvent.emit(EventCfg.EXPCHANGE);
    }

    public static get exp() {
        return this._exp;
    }

    public static maxExp = null;

    public static sex = null;     //性别

    public static headimgurl = null; //头像地址
    public static headImg = null;

    public static openid = null;
    public static sessionKey = null;

    public static ShuangMang_Gold = null;

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

}