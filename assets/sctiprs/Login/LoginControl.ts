import LLWSDK from "../common/sdk/LLWSDK";
import AudioUtils from "../Utils/AudioUtils";
import GlobalEvent from "../Utils/GlobalEvent";
import Socket from "../common/net/Socket";
import PopupManager from "../Utils/PopupManager";
import { SetConf, HisCode, AdCount, SelectBk } from "../SetConf";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import EventCfg from "../Utils/EventCfg";
import ComUtils from "../Utils/ComUtils";
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginHandle extends cc.Component {


    protected onLoad(): void {

        GlobalEvent.on('OPENNOTICELAYER', this.openNoticeLayer.bind(this), this);

        PopupManager.init();

        AudioUtils.getAudioVolume();

        AudioUtils.loadAudios('audios');

        GameCfgText.LoadGameConf();

        ComUtils.resetSize(this.node);

        //  LLWSDK.getSDK().onShow();
    }

    init() {

        let PBHelper = require('pbhelper');

        let pbhelper = new PBHelper;

        (<any>window).PB = pbhelper;

        (<any>window).gg = { wechat: LLWSDK.getSDK() }

        LLWSDK.getSDK().login(this.loginResultCallback.bind(this));
    }

    //登入游戏
    loginResultCallback(decoded) {

        if (decoded.err.err) {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, decoded.err.err);
            return;
        }

        console.log(decoded.token + decoded.uid + decoded.gameAddr);

        // if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
        //     decoded.gameAddr = 'wss://www.cgdr168.com/ws';
        //     console.log(decoded.token + decoded.uid + decoded.gameAddr);
        // }

        if (decoded) {
            decoded.token && (GameData.token = decoded.token);
            decoded.uid && (GameData.userID = decoded.uid);

            if (decoded.gameAddr) {
                (<any>window).socket = new Socket(decoded.gameAddr);
            }

        } else {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '网络连接错误，请检查网络是否连接.');
        }
    }

    start() {

        cc.macro.ENABLE_MULTI_TOUCH = false;

        cc.Button.prototype._onTouchEnded = function (t) {
            if (this.interactable && this.enabledInHierarchy) {
                AudioUtils.playEffect("click", false);
                if (this._pressed) {
                    cc.Component.EventHandler.emitEvents(this.clickEvents, t);
                    this.node.emit("click", this);
                }
                this._pressed = !1;
                this._updateState();
                t.stopPropagation();
            }
        }

        cc.director.preloadScene('hall');

        this.initData();

        this.init();

        LLWSDK.getSDK().onShareAppMessage();
    }

    openNoticeLayer() {
        //  PopupManager.openNode(this.node, null, 'Prefabs/stopNoticeLayer', 99, null);
    }

    protected onDestroy(): void {
        GameCfgText.releaseRes();
        PopupManager.delPopupNode();
    }

    initData() {
        GameData.SMSet = new SetConf('SMSET');

        GameData.JJPKSet = new SetConf('JJPKSET');

        GameData.DXSet = new SetConf('DXSET');

        GameData.ZBSet = new SetConf('ZBSet');

        GameData.QHSet = new SetConf('QHSET');

        GameData.TJDSet = new SetConf('TJDSET');

        GameData.FSSet = new SetConf('FSSET');

        GameData.DXHistoryInfo = new HisCode('DXHISTORYINFO');

        GameData.QHHistoryInfo = new HisCode('QHHISTORYINFO');

        GameData.ZBHistoryInfo = new HisCode('ZBHISTORYINFO');

        let str = new Date().toLocaleDateString();

        GameData.DingXiangADCount = new AdCount('DINGXIANGADCOUNT' + str);

        GameData.QHADCount = new AdCount('QHADCOUNT' + str);

        GameData.TJADCount = new AdCount('TJADCOUNT' + str);

        AudioUtils.setEffectsVolume(GameData.SMSet.isSound);

        GameData.SelectBk = new SelectBk().arr;

        GameData.headimgurl = null;

        GameData.headImg = null;
    }
}
