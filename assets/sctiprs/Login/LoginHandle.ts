import LLWSDK from "../common/sdk/LLWSDK";
import AudioUtils from "../Utils/AudioUtils";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginHandle extends cc.Component {

    protected onLoad(): void {
        GlobalEvent.on('OPENNOTICELAYER', this.openNoticeLayer.bind(this), this);
    }

    init() {

        let PBHelper = require('pbhelper');
        let pbhelper = new PBHelper;
        gg.pb = pbhelper;

        gg.wechat = LLWSDK.getSDK();
    }


    start() {
        this.init();
        this.resetInEditor();

        AudioUtils.getAudioVolume();

        AudioUtils.loadAudios('audios');
        PopupManager.init();

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
    }

    initData() {

    }


}
