import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";
import GlobalEvent from "./GlobalEvent";
import EventCfg from "./EventCfg";

export default class PopupManager {

    private static loading: cc.Node = null;

    private static tipsBox: cc.Node = null;

    private static tipsText: cc.Node = null;

    private static urls = [];

    private static nodes = [];

    public static init() {
        GlobalEvent.on(EventCfg.LOADINGSHOW, this.loadloading.bind(this), this);
        GlobalEvent.on(EventCfg.LOADINGHIDE, () => { this.loading && (this.loading.active = false) }, this);

        GlobalEvent.on(EventCfg.TIPSTEXTSHOW, this.LoadTipsText.bind(this), this);
        GlobalEvent.on(EventCfg.TIPSTEXTHIDE, () => { this.tipsText && (this.tipsText.active = false) }, this);

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
                this.urls.push('Prefabs/loading');
                this.nodes.push(this.loading);
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
                cc.find('Canvas').addChild(this.tipsText, 98);
                this.tipsText.active = true;
                this.tipsText.getComponent('TipsTextHandle').textData = content;
                this.tipsText.getComponent('TipsTextHandle').onShow();
                this.urls.push('Prefabs/tipsText');
                this.nodes.push(this.tipsText);
            })
        }
        else {
            this.tipsText.active = true;
            this.tipsText.getComponent('TipsTextHandle').textData = content;
            this.tipsText.getComponent('TipsTextHandle').onShow();
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
                this.urls.push('Prefabs/' + name);
                this.nodes.push(this.tipsBox);
            })
        } else if (this.tipsBox) {
            this.tipsBox.active = true;
            this.tipsBox.emit('contentText', { text: text, call: call });
        }
    }

    public static delPopupNode() {
        GlobalEvent.off(EventCfg.LOADINGHIDE);
        GlobalEvent.off(EventCfg.LOADINGSHOW);
        GlobalEvent.off(EventCfg.TIPSTEXTSHOW);
        GlobalEvent.off(EventCfg.TIPSTEXTHIDE);
        this.urls.forEach(el => {
            LoadUtils.releaseRes(el);
        })

        this.nodes.forEach(el => {
            el = null;
        })

        this.nodes.length = 0;
        this.nodes = [];

    }

}