import GlobalEvent from "./Utils/GlobalEvent";
import EventCfg from "./Utils/EventCfg";
import GameCfg from "./game/GameCfg";
import Game = cc.Game;

export default class GameData {

    //Id
    private _userID = null;

    public get userID() {
        return this._userID;
    }

    public set userID(val) {
        this._userID = val;
    }

    //名字
    private _userName = null;

    public get userName() {
        return this._userName;
    }

    public set userName(val) {
        this._userName = val;
    }

    //砖石
    private _brick = null;

    public set brick(val) {
        this._brick = val;
        GlobalEvent.emit(EventCfg.BIRCKCHANGE);
    }

    public get brick() {
        return this._brick;
    }

    //金币
    private _gold = null;

    public set gold(val) {
        this._gold = val;
        GlobalEvent.emit(EventCfg.GOLDCHANGE);
    }

    public get gold() {
        return this._gold;
    }

    //等级
    private _level = null;

    public set level(val) {
        this._level = val;
        GlobalEvent.emit(EventCfg.LEVELCHANGE);
    }

    public get level() {
        return this._level;
    }

    private _exp = null;

    public set exp(val) {
        this._exp = val;
        GlobalEvent.emit(EventCfg.EXPCHANGE);
    }

    public get exp() {
        return this._exp;
    }

    public maxExp = null;

    public sex = null;     //性别

    public headimgurl = null; //头像地址
    public headImg = null;

    public openid = null;
    public sessionKey = null;

    public ShuangMang_Gold = null;

    //SMset
    private _token;

    public get token() {
        return this._token;
    }
    public set token(val) {
        this._token = val;
        cc.sys.localStorage.setItem('token', JSON.stringify(val));
    }

    //SMset
    private _SMSet;

    public get SMSet() {
        return this._SMSet;
    }
    public set SMSet(val) {
        this._SMSet = val;
        cc.sys.localStorage.setItem('SMSET', JSON.stringify(val));
    }

    private _ZBSet;

    public get ZBSet() {
        return this._ZBSet;
    }

    public set ZBSet(val) {
        this._ZBSet = val;
        cc.sys.localStorage.setItem('ZBSet', JSON.stringify(val));
    }

    private _properties;
    //// 金币
    // 1;				// 经验
    //  2;				// 等级
    // 3;	// 双盲本月当前金币
    public get properties() {
        return this._properties;
    }

    public set properties(val) {
        this._properties = val;
        cc.sys.localStorage.setItem('properties', JSON.stringify(val));
    }

}