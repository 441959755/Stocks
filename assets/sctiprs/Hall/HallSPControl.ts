import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    znxgNode: cc.Node = null;

    myxgNode: cc.Node = null;

    zgNode: cc.Node = null;

    znDraw: cc.Node = null;

    zxgpBox: cc.Node = null;

    dhzcNode: cc.Node = null;

    myhisNode: cc.Node = null;

    bkBox: cc.Node = null;

    buyBox: cc.Node = null;

    sellBox: cc.Node = null;


    onLoad() {
        GlobalEvent.on(EventCfg.OPENZNXG, this.onLoadZNXGLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZGLAYER, this.openZGLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZNDRAW, this.openZNDraw.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMYXG, this.openMyxgLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENADDZXGPBOX, this.openAddZxgpBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDHZCLLAYER, this.openDhzcLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMYHISLAYER, this.openMyHisLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENBKBOX, this.openBKBox.bind(this), this);

        GlobalEvent.on(EventCfg.OPENBUYBOX, this.openBuyBox.bind(this), this);

        GlobalEvent.on(EventCfg.OPENSELLBOX, this.openSellBox.bind(this), this);
    }

    openSellBox() {
        if (this.sellBox) {
            this.sellBox.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/sellBox', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.sellBox = cc.instantiate(pre);
                this.node.addChild(this.sellBox);
                this.sellBox.active = true;
            })
        }

    }

    openBuyBox() {
        if (this.buyBox) {
            this.buyBox.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/buyBox', (pre) => {
                GlobalEvent.enit(EventCfg.LOADINGHIDE);
                this.buyBox = cc.instantiate(pre);
                this.node.addChild(this.buyBox);
                this.buyBox.active = true;
            })
        }
    }

    openBKBox() {
        if (this.bkBox) {
            this.bkBox.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/selectBkBox', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.bkBox = cc.instantiate(pre);
                this.node.addChild(this.bkBox);
                this.bkBox.active = true;
            })
        }
    }

    openMyHisLayer() {
        if (this.myhisNode) {
            this.myhisNode.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/mnHis', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.myhisNode = cc.instantiate(pre);
                this.node.addChild(this.myhisNode);
                this.myhisNode.active = true;
            })
        }
    }

    openDhzcLayer() {
        if (this.dhzcNode) {
            this.dhzcNode.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/dhzcLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.dhzcNode = cc.instantiate(pre);
                this.node.addChild(this.dhzcNode);
                this.dhzcNode.active = true;
            })
        }
    }

    openAddZxgpBox() {
        if (this.zxgpBox) {
            this.zxgpBox.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/addZXGPBox', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.zxgpBox = cc.instantiate(pre);
                this.node.addChild(this.zxgpBox);
                this.zxgpBox.active = true;
            })
        }
    }

    openZNDraw(code, str) {
        if (!this.znDraw) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/znDrawLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.znDraw = cc.instantiate(pre);
                this.node.addChild(this.znDraw, 20);
                this.znDraw.setPosition(0, 0);
                let handle = this.znDraw.getComponent('ZnDraw');
                handle.onShow(code, str);
                this.znDraw.active = true;
            })
        }
        else {
            let handle = this.znDraw.getComponent('ZnDraw');
            handle.onShow(code, str);
            this.znDraw.active = true;
        }

    }

    onLoadZNXGLayer() {
        if (!this.znxgNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/znxgLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.znxgNode = cc.instantiate(pre);
                this.node.addChild(this.znxgNode);
                this.znxgNode.active = true;
            })
        }
        else {
            this.znxgNode.active = true;
        }
    }

    openMyxgLayer() {
        this.node.children.forEach(el => {
            el.active = false;
        })
        if (!this.myxgNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/mnxgLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.myxgNode = cc.instantiate(pre);
                this.node.addChild(this.myxgNode);
                this.myxgNode.active = true;
            })
        }
        else {
            this.myxgNode.active = true;
        }
    }

    openZGLayer() {
        if (!this.zgNode) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/zgLayer', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.zgNode = cc.instantiate(pre);
                this.node.addChild(this.zgNode);
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
        GlobalEvent.off(EventCfg.OPENMYXG);
        GlobalEvent.off(EventCfg.OPENADDZXGPBOX);
        GlobalEvent.off(EventCfg.OPENDHZCLLAYER);
        GlobalEvent.off(EventCfg.OPENMYHISLAYER);
        GlobalEvent.off(EventCfg.OPENBKBOX);
        GlobalEvent.off(EventCfg.OPENBUYBOX);
        GlobalEvent.off(EventCfg.OPENSELLBOX);
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
    }

}
