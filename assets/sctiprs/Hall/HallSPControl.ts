import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    znxgNode: cc.Node = null;

    myxgNode: cc.Node = null;

    cgdsNode: cc.Node = null;

    zgNode: cc.Node = null;

    @property(cc.Node)
    znDraw: cc.Node = null;

    zxgpBox: cc.Node = null;

    dhzcNode: cc.Node = null;

    myhisNode: cc.Node = null;

    bkBox: cc.Node = null;

    buyBox: cc.Node = null;

    sellBox: cc.Node = null;

    mncd: cc.Node = null;

    cgds: cc.Node = null;;

    cgdsph: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.OPENZNXG, this.onLoadZNXGLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZGLAYER, this.openZGLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZNDRAW, this.openZNDraw.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMNXG, this.openMnxgLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENCGDSLAYER, this.openCGDSLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENADDZXGPBOX, this.openAddZxgpBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDHZCLLAYER, this.openDhzcLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMNHISLAYER, this.openMnHisLayer.bind(this), this);

        GlobalEvent.on(EventCfg.OPENCGDSHISLAYER, this.openCGDSHisLayer.bind(this), this);

        GlobalEvent.on(EventCfg.OPENBKBOX, this.openBKBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENBUYBOX, this.openBuyBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENSELLBOX, this.openSellBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMNCDLAYER, this.openMnCDLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENCGDS, this.openCgdsLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENCGDSPH, this.openCgdsph.bind(this), this);
        GlobalEvent.on('LOADGAME', this.onLoadGame.bind(this), this);
    }

    protected start(): void {
        // this.znDraw.active = true;
        this.znDraw.active = false;
        this.znDraw.zIndex = 20;
    }

    onLoadGame() {
        console.log('进入训练');
        this.node.children.forEach(el => {
            el.active = false;
        })
    }

    openCgdsph(id) {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/chaoGuRanking', 30, (node) => {
            let handle = node.getComponent('ChaoGuRanking');
            handle.onShow(id);
        })
    }

    openCgdsLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/chaoGuDaSai', 10, null);
    }

    openMnCDLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/mncd', 22, (node) => {
            let handle = node.getComponent('Mncd');
            handle.onShow();
        });
    }

    openSellBox(data) {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/sellBox', 21, (node) => {
            let handle = node.getComponent('SellBox');
            handle.onShow(data);
        })
    }

    openBuyBox(data) {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/buyBox', 21, (node) => {
            let handle = node.getComponent('BuyBox');
            handle.onShow(data);
        })
    }

    openBKBox() {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/selectBkBox', 20, null);
    }

    openMnHisLayer(id) {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/mnHis', 31, (node) => {
            let handle = node.getComponent('MnHisHandle');
            handle.onShow(id);
        })
    }

    openCGDSHisLayer(arr) {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/cgdsHis', 31, (node) => {
            let handle = node.getComponent('CGDSHis');
            handle.onShow(arr);
        })
    }

    openDhzcLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/dhzcLayer', 20, null);
    }

    openAddZxgpBox() {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/addZXGPBox', 20, null);
    }

    openZNDraw(code, str) {
        this.znDraw.active = true;
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        setTimeout(() => {
            this.znDraw.active = false;
            let handle = this.znDraw.getComponent('ZnDraw');
            this.znDraw.active = true;
            handle.onShow(code, str);
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }, 50)
    }

    onLoadZNXGLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/spPre/znxgLayer', 10, null);
    }

    openMnxgLayer(info) {
        this.node.children.forEach(el => {
            el.active = false;
        })
        if (!this.myxgNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/mnxgLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.myxgNode = cc.instantiate(pre);
                this.node.addChild(this.myxgNode, 10);
                this.myxgNode.active = true;
                let handle = this.myxgNode.getComponent('MnxgHandle');
                handle.onShow(info);
            })
        }
        else {
            this.myxgNode.active = true;
            let handle = this.myxgNode.getComponent('MnxgHandle');
            handle.onShow(info);
        }

    }

    openCGDSLayer(info) {
        this.node.children.forEach(el => {
            el.active = false;
        })
        if (!this.cgdsNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/cgdsLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.cgdsNode = cc.instantiate(pre);
                this.node.addChild(this.cgdsNode, 10);
                this.cgdsNode.active = true;
                let handle = this.cgdsNode.getComponent('CGDSLayer');
                handle.onShow(info);
            })
        }
        else {
            this.cgdsNode.active = true;
            let handle = this.cgdsNode.getComponent('CGDSLayer');
            handle.onShow(info);
        }
    }

    openZGLayer() {
        if (!this.zgNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/zgLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.zgNode = cc.instantiate(pre);
                this.node.addChild(this.zgNode, 21);
                this.zgNode.active = true;
            })
        }
        else {
            this.zgNode.active = true;
        }
    }


    onDestroy() {
        GlobalEvent.off(EventCfg.OPENZNXG);
        GlobalEvent.off(EventCfg.OPENZGLAYER);
        GlobalEvent.off(EventCfg.OPENZNDRAW);
        GlobalEvent.off(EventCfg.OPENMNXG);
        GlobalEvent.off(EventCfg.OPENCGDSLAYER);
        GlobalEvent.off(EventCfg.OPENADDZXGPBOX);
        GlobalEvent.off(EventCfg.OPENDHZCLLAYER);
        GlobalEvent.off(EventCfg.OPENMNHISLAYER);
        GlobalEvent.off(EventCfg.OPENBKBOX);
        GlobalEvent.off(EventCfg.OPENBUYBOX);
        GlobalEvent.off(EventCfg.OPENSELLBOX);
        GlobalEvent.off(EventCfg.OPENMNCDLAYER);
        GlobalEvent.off(EventCfg.OPENCGDS);
        GlobalEvent.off(EventCfg.OPENCGDSPH);
        LoadUtils.releaseRes('Prefabs/spPre/znDrawLayer');
        LoadUtils.releaseRes('Prefabs/spPre/znxgLayer');
        LoadUtils.releaseRes('Prefabs/spPre/zgLayer');
        LoadUtils.releaseRes('Prefabs/spPre/mnxgLayer');
        LoadUtils.releaseRes('Prefabs/spPre/addZXGPBox');
        LoadUtils.releaseRes('Prefabs/spPre/dhzcLayer');
        LoadUtils.releaseRes('Prefabs/spPre/mnHis');
        LoadUtils.releaseRes('Prefabs/spPre/selectBkBox');
        LoadUtils.releaseRes('Prefabs/spPre/buyBox');
        LoadUtils.releaseRes('Prefabs/spPre/sellBox');
        LoadUtils.releaseRes('Prefabs/spPre/mncd');
        LoadUtils.releaseRes('Prefabs/spPre/chaoGuDaSai');
        LoadUtils.releaseRes('Prefabs/spPre/chaoGuRanking');
        LoadUtils.releaseRes('Prefabs/spPre/cgdsLayer');
    }

}
