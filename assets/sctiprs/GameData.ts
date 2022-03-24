import GlobalEvent from "./Utils/GlobalEvent";
import EventCfg from "./Utils/EventCfg";
import GameCfg from "./game/GameCfg";
import { pb } from "../protos/proto";

export default class GameData {

    public static ActivityConf = null;

    public static firstGame = false;

    public static gameData = null;

    public static imgs: any = {};  //本地缓存的图片

    public static playersInfo: any = {};   //本地缓存玩家信息

    public static zhibiaoHisSet: any = {};

    public static AISignal: any = {};

    //缓存账号
    private static _account = null;
    public static get account() {
        return this._account;
    }

    public static set account(val) {
        this._account = val;
        cc.sys.localStorage.setItem('account', JSON.stringify(val));
    }

    //缓存密码
    private static _password = null;

    public static get password() {
        return this._password;
    }

    public static set password(val) {
        this._password = val;
        cc.sys.localStorage.setItem('password', JSON.stringify(val));
    }

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

    //性别
    public static _gender = null;

    public static set gender(val) {
        this._gender = val;
        GlobalEvent.emit(EventCfg.GENDERCHANGE);
    }

    public static get gender() {
        return this._gender;
    }

    //头像地址
    public static headimgurl = null;

    //头像
    public static _headImg = null;

    public static get headImg() {
        return this._headImg;
    }

    public static set headImg(val) {
        this._headImg = val;
        GlobalEvent.emit(EventCfg.HEADIMGCHANGE);
    }

    //地区
    private static _location = null;

    public static get location() {
        return this._location;
    }

    public static set location(val) {
        this._location = val;
        GlobalEvent.emit(EventCfg.LOCALTIONCHANGE);
    }

    //房间ID
    public static roomId = null;

    public static openid = null;
    public static sessionKey = null;
    private static _token;
    public static get token() {
        return this._token;
    }
    public static set token(val) {
        this._token = val;
        cc.sys.localStorage.setItem('token', JSON.stringify(val));
    }

    public static huizhidatas = null;

    public static Players = [];

    //游戏输赢次数
    public static GameCounters = null;

    //今日游戏次数
    public static todayGameCount = null;

    // 双盲训练状态
    private static _SmxlState = null;

    public static get SmxlState() {
        return this._SmxlState;
    }

    public static set SmxlState(val) {
        this._SmxlState = val;
        GlobalEvent.emit(EventCfg.SMINITFUND);
    }

    public static cgState = null;  //闯关大赛状态

    //SMset
    public static SMSet;

    //SMset
    public static JJPKSet;

    //QHSet
    public static QHSet;

    public static ZBSet;

    public static DXSet;

    public static TJDSet;

    public static FSSet;

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
        GlobalEvent.emit(EventCfg.VIPCHANGE);
        // GlobalEvent.emit(EventCfg.KCOINCHANGE);
    }

    //保存选择的股票
    public static DXHistoryInfo = [];

    public static QHHistoryInfo = [];

    public static ZBHistoryInfo = [];


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

    public static SelectBk = null;

    public static CGSConfData = null;

    public static CGSSAVELEVEL = null;

    public static JJCapital = 0;  //报名费

    public static RoomType = 0;  //2邀请

    public static selfEnterRoomData = null;

    public static AIStockList = [];  // 智能选股收藏股票列表

    public static selfStockList = [];  // 自能选股收藏股票列表

    public static cgdsStockList = [];   // 炒股大赛收藏股票列表

    public static mncgDataList = null;  //模拟闯关数据

    public static cgdsStateList = [];  //炒股大赛状态;

    public static locationLayer = null; //等位页面

    public static SpStockData;  //实盘炒股ID 数据

    public static isToAGame = false; //是否再来一局

    public static schoolProgress = null;  //学习进度

    public static studyBar = null;  //学习小节

    public static studyHisBar = 1;  //歷史学习小节

    public static TaskStudy = null;  //学习任务

    public static TaskDaily = null;   // 日常任务

    public static SysBroadcastList = [];//系统广播消息

    //記錄觀看視頻的次數
    public static _adSucceed;

    public static set adSucceed(val) {

        if (val < 0) {
            val = 0;
        }

        let time = new Date().toLocaleDateString();
        cc.sys.localStorage.setItem(time + 'ADSUCCEED' + GameCfg.GameType, val);
        this._adSucceed = val;

        GlobalEvent.emit('PKCount');
    }

    public static get adSucceed() {
        let time = new Date().toLocaleDateString();
        this._adSucceed = cc.sys.localStorage.getItem(time + 'ADSUCCEED' + GameCfg.GameType);
        if (this._adSucceed) {
            return parseInt(this._adSucceed);
        }
        return 0;
    }

    //获取VIp状态
    public static get vipStatus() {
        if (new Date().getTime() / 1000 > GameData.properties[pb.GamePropertyId.VipExpiration]) {
            return false;
        }
        return true;
    }


    public static ZNCurIndex = null;


    public static query = null;

    public static goldAwardPrompt = null;  //每日首次登陆时判断，用户身上金币低于2000时，赠送1000金币

    // public static nodeMaps: Map<any, any> = new Map();

    public static haoYouFangData = null;

    public static leaveUid = null;
}