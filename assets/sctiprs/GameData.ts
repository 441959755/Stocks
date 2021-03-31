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

    public sex = null;     //性别

    public headimgurl = null; //头像地址
    public headImg = null;

    public openid = null;
    public sessionKey = null;

    //SMset
    private _SMSet;

    public get SMSet() {
        return this._SMSet;
    }
    public set SMSet(val) {
        this._SMSet = val;
        cc.sys.localStorage.setItem('SMSET', JSON.stringify(val));

        if (val.isBW) {

            GameCfg.MAColor[0] = new cc.Color().fromHEX('#ffffff');
            GameCfg.MAColor[1] = new cc.Color().fromHEX('#ebeb12');

            GameCfg.MAColor[2] = new cc.Color().fromHEX('#e814ed');
            GameCfg.MAColor[3] = new cc.Color().fromHEX('#14ed14');
            GameCfg.MAColor[4] = new cc.Color().fromHEX('#1c9ce6');
            GameCfg.MAColor[5] = new cc.Color().fromHEX('#d47026');

            GameCfg.BOLLColor[0] = cc.Color.WHITE;
            GameCfg.BOLLColor[1] = new cc.Color().fromHEX('#f0dc05');
            GameCfg.BOLLColor[2] = new cc.Color().fromHEX('#d85cfc');

            GameCfg.VOLColor[0] = new cc.Color().fromHEX('#ffffff');
            GameCfg.VOLColor[1] = new cc.Color().fromHEX('#ebeb12');

            GameCfg.tipsDealColor[0] = new cc.Color().fromHEX('#02230c');
            GameCfg.tipsDealColor[1] = new cc.Color().fromHEX('#2d0202');

            GameCfg.K_D_J_Line[0] = cc.Color.WHITE;
            GameCfg.K_D_J_Line[1] = new cc.Color().fromHEX('#f0dc05');
            GameCfg.K_D_J_Line[2] = new cc.Color().fromHEX('#d85cfc');

            GameCfg.DIF_LINE_COL = cc.Color.WHITE;
            GameCfg.DEA_LINE_COL = new cc.Color().fromHEX('#f0dc05');
            //  GameCfg.MACD_COL[0] = cc.Color.WHITE;
            GameCfg.MACD_COL[0] = new cc.Color().fromHEX('#f11111');
            GameCfg.MACD_COL[1] = new cc.Color().fromHEX('#0fee1e');

            GameCfg.RSI_COLOR[0] = cc.Color.WHITE;
            GameCfg.RSI_COLOR[1] = new cc.Color().fromHEX('#f0dc05');
            GameCfg.RSI_COLOR[2] = new cc.Color().fromHEX('#d85cfc');

        } else {
            GameCfg.MAColor[0] = new cc.Color().fromHEX('#03004c');
            GameCfg.MAColor[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.MAColor[2] = new cc.Color().fromHEX('#cc33cc');
            GameCfg.MAColor[3] = new cc.Color().fromHEX('#097c25');
            GameCfg.MAColor[4] = new cc.Color().fromHEX('#00a0e9');
            GameCfg.MAColor[5] = new cc.Color().fromHEX('#a0a0a0');

            GameCfg.BOLLColor[0] = cc.Color.BLACK;
            GameCfg.BOLLColor[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.BOLLColor[2] = new cc.Color().fromHEX('#cc33cc');

            GameCfg.VOLColor[0] = new cc.Color().fromHEX('#03004c');
            GameCfg.VOLColor[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.tipsDealColor[0] = new cc.Color().fromHEX('#D6F2D0');
            GameCfg.tipsDealColor[1] = new cc.Color().fromHEX('#FDD9DD');

            GameCfg.K_D_J_Line[0] = cc.Color.BLACK;
            GameCfg.K_D_J_Line[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.K_D_J_Line[2] = new cc.Color().fromHEX('#cc33cc');

            GameCfg.DIF_LINE_COL = cc.Color.BLACK;
            GameCfg.DEA_LINE_COL = new cc.Color().fromHEX('#f39800');

            //   GameCfg.MACD_COL[0] = cc.Color.BLACK;
            GameCfg.MACD_COL[0] = new cc.Color().fromHEX('#e2233e');
            GameCfg.MACD_COL[1] = new cc.Color().fromHEX('#00ba50');

            GameCfg.RSI_COLOR[0] = cc.Color.BLACK;
            GameCfg.RSI_COLOR[1] = new cc.Color().fromHEX('#f39800');
            GameCfg.RSI_COLOR[2] = new cc.Color().fromHEX('#cc33cc');
        }


    }

}