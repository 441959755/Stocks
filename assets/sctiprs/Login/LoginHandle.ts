import LLWSDK from "../common/sdk/LLWSDK";
import AudioUtils from "../Utils/AudioUtils";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";
import { SetConf, HisCode, AdCount, SelectBk } from "../SetConf";
import GameData from "../GameData";
import GameCfgText from "../GameText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginHandle extends cc.Component {

    @property(cc.Node)
    login: cc.Node = null;

    register: cc.Node = null;

    reset: cc.Node = null;


    protected onLoad(): void {

        GlobalEvent.on('OPENNOTICELAYER', this.openNoticeLayer.bind(this), this);

        PopupManager.init();

        AudioUtils.getAudioVolume();

        AudioUtils.loadAudios('audios');

        GameCfgText.LoadGameConf();
    }

    init() {

        let PBHelper = require('pbhelper');

        let pbhelper = new PBHelper;

        (<any>window).PB = pbhelper;

        (<any>window).gg = { wechat: LLWSDK.getSDK() }
    }


    start() {
        this.init();

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
    }

    openNoticeLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/stopNoticeLayer', 99, null);
    }


    protected onDestroy(): void {
        GlobalEvent.off('OPENNOTICELAYER');
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

        GameData.SelectBk = new SelectBk();

        GameData.headimgurl = null;

        GameData.headImg = null;

    }
}
