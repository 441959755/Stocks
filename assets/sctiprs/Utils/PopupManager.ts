import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";
import GlobalEvent from "./GlobalEvent";
import EventCfg from "./EventCfg";

export default class PopupManager {

    private static loading: cc.Node = null;

    private static tipsBox: cc.Node = null;

    private static tipsText: cc.Node = null;

    private static otherPlayerInfo: cc.Node = null;

    private static protocol: cc.Node = null;

    private static isLoading = false;

    public static init() {
        GlobalEvent.on(EventCfg.LOADINGSHOW, this.loadloading.bind(this), this);
        GlobalEvent.on(EventCfg.LOADINGHIDE, () => { this.loading && (this.loading.active = false) }, this);

        GlobalEvent.on(EventCfg.TIPSTEXTSHOW, this.LoadTipsText.bind(this), this);
        GlobalEvent.on(EventCfg.TIPSTEXTHIDE, () => { this.tipsText && (this.tipsText.active = false) }, this);

        GlobalEvent.on(EventCfg.OPENOTHERPLAYERINFO, this.openOtherPlayerInfoLayer.bind(this), this);

        GlobalEvent.on('openProtocol', this.openProtocol.bind(this), this);
    }

    public static openProtocol(str, url) {
        if (this.protocol) {
            this.protocol.active = true;

            this.protocol.getComponent('Protocol').onShow(str, url);
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/playeInfo/protocol', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.protocol = cc.instantiate(pre);
                cc.find('Canvas').addChild(this.protocol, 30);
                this.protocol.active = true;

                this.protocol.getComponent('Protocol').onShow(str, url);
            })
        }

    }

    public static openOtherPlayerInfoLayer(info) {
        if (!this.otherPlayerInfo) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/otherPlayerInfo', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.otherPlayerInfo = cc.instantiate(pre);
                cc.find('Canvas').addChild(this.otherPlayerInfo, 11);
                this.otherPlayerInfo.active = true;
                ActionUtils.openBox(this.otherPlayerInfo);
                this.otherPlayerInfo.getComponent('OtherPlayerInfoBox').onShow(info);
            })
        }
        else {
            ActionUtils.openBox(this.otherPlayerInfo);
            this.otherPlayerInfo.getComponent('OtherPlayerInfoBox').onShow(info);
        }
    }

    /**
     * 加载中...
     */
    public static loadloading() {
        if (!this.loading) {
            LoadUtils.loadRes('Prefabs/loading', pre => {
                this.loading = cc.instantiate(pre);
                cc.find('Canvas').addChild(this.loading, 99);
                this.loading.active = true;
            })
        }
        else {
            this.loading.active = true;
        }
    }

    /**
     * 提示文本框
     */
    public static LoadTipsText(content) {
        if (!this.tipsText) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/tipsText', pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.tipsText = cc.instantiate(pre);
                cc.find('Canvas').addChild(this.tipsText, 99);

                this.tipsText && (this.tipsText.active = true)

                this.tipsText && (this.tipsText.getComponent('TipsTextHandle').onShow(content))

            })
        }
        else {
            this.tipsText.active = true;

            this.tipsText.getComponent('TipsTextHandle').onShow(content);
        }
    }


    /**
     * 
     * @param name 
     * @param text 
     * @param call   提示框
     */
    public static LoadTipsBox(name, text, call?) {
        if (!this.tipsBox) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node, 99);
                // 进场动画
                ActionUtils.openBox(node);

                this.tipsBox = node;
                this.tipsBox.emit('contentText', { text: text, call: call });

            })
        } else if (this.tipsBox) {
            this.tipsBox.active = true;
            this.tipsBox.emit('contentText', { text: text, call: call });
        }
    }

    public static delPopupNode() {
        this.tipsBox = null;
        this.tipsText = null;
        this.loading = null;
        this.otherPlayerInfo = null;

        GlobalEvent.off(EventCfg.LOADINGHIDE);
        GlobalEvent.off(EventCfg.LOADINGSHOW);
        GlobalEvent.off(EventCfg.TIPSTEXTSHOW);
        GlobalEvent.off(EventCfg.TIPSTEXTHIDE);
        GlobalEvent.off(EventCfg.OPENOTHERPLAYERINFO);
        LoadUtils.releaseRes('Prefabs/tipsBox');
        LoadUtils.releaseRes('Prefabs/tipsText');
        //   LoadUtils.releaseRes('Prefabs/loading');
        LoadUtils.releaseRes('Prefabs/otherPlayerInfo');
        GlobalEvent.off('openProtocol');
        LoadUtils.releaseRes('Prefabs/playeInfo/protocol');
    }


    public static openNode(prent, childen, url, zIndex, call?) {
        if (!this.isLoading) {
            this.isLoading = true;
        }
        else {
            return;
        }
        if (!childen) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes(url, pre => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                childen = cc.instantiate(pre);
                prent.addChild(childen, zIndex);
                childen.active = true;
                this.isLoading = false;
                call(childen);
            })
        }
        else {
            childen.active = true;
            this.isLoading = false;
            call(childen);
        }
    }

}