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

    mncd: cc.Node = null;

    cgds: cc.Node = null;;

    cgdsph: cc.Node = null;

    onLoad() {
        GlobalEvent.on(EventCfg.OPENZNXG, this.onLoadZNXGLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZGLAYER, this.openZGLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENZNDRAW, this.openZNDraw.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMNXG, this.openMnxgLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENADDZXGPBOX, this.openAddZxgpBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENDHZCLLAYER, this.openDhzcLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMNHISLAYER, this.openMnHisLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENBKBOX, this.openBKBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENBUYBOX, this.openBuyBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENSELLBOX, this.openSellBox.bind(this), this);
        GlobalEvent.on(EventCfg.OPENMNCDLAYER, this.openMnCDLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENCGDS, this.openCgdsLayer.bind(this), this);
        GlobalEvent.on(EventCfg.OPENCGDSPH, this.openCgdsph.bind(this), this);
        GlobalEvent.on('LOADGAME', this.onLoadGame.bind(this), this);
    }

    onLoadGame() {
        console.log('进入训练');
        this.node.children.forEach(el => {
            el.active = false;
        })
    }

    openCgdsph(id) {
        if (this.cgdsph) {
            this.cgdsph.active = true;
            let handle = this.cgdsph.getComponent('ChaoGuRanking');
            handle.onShow(id);
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/chaoGuRanking', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.cgdsph = cc.instantiate(pre);
                this.node.addChild(this.cgdsph, 30);
                this.cgdsph.active = true;
                let handle = this.cgdsph.getComponent('ChaoGuRanking');
                handle.onShow(id);
            })
        }

    }

    openCgdsLayer() {
        if (this.cgds) {
            this.cgds.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/chaoGuDaSai', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.cgds = cc.instantiate(pre);
                this.node.addChild(this.cgds);
                this.cgds.active = true;
            })
        }
    }

    openMnCDLayer() {
        if (this.mncd) {
            this.mncd.active = true;
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/mncd', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.mncd = cc.instantiate(pre);
                this.node.addChild(this.mncd, 22);
                this.mncd.active = true;
            })
        }
    }

    openSellBox(data) {
        if (this.sellBox) {
            this.sellBox.active = true;
            let handle = this.sellBox.getComponent('SellBox');
            handle.onShow(data);
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/sellBox', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.sellBox = cc.instantiate(pre);
                this.node.addChild(this.sellBox, 21);
                this.sellBox.active = true;
                let handle = this.sellBox.getComponent('SellBox');
                handle.onShow(data);
            })
        }
    }

    openBuyBox(data) {

        if (this.buyBox) {
            this.buyBox.active = true;
            let handle = this.buyBox.getComponent('BuyBox');
            handle.onShow(data);
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/buyBox', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.buyBox = cc.instantiate(pre);
                this.node.addChild(this.buyBox, 21);
                this.buyBox.active = true;
                let handle = this.buyBox.getComponent('BuyBox');
                handle.onShow(data);
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

    openMnHisLayer(id) {
        if (this.myhisNode) {
            this.myhisNode.active = true;
            let handle = this.myhisNode.getComponent('MnHisHandle');
            handle.onShow(id);
        }
        else {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            LoadUtils.loadRes('Prefabs/spPre/mnHis', (pre) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                this.myhisNode = cc.instantiate(pre);
                this.node.addChild(this.myhisNode, 30);
                this.myhisNode.active = true;
                let handle = this.myhisNode.getComponent('MnHisHandle');
                handle.onShow(id);
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
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        if (!this.znDraw) {
            LoadUtils.loadRes('Prefabs/spPre/znDrawLayer', (pre) => {
                this.znDraw = cc.instantiate(pre);
                this.node.addChild(this.znDraw, 20);
                this.znDraw.setPosition(0, 0);
                let handle = this.znDraw.getComponent('ZnDraw');

                setTimeout(() => {
                    this.znDraw.active = false;
                    this.znDraw.active = true;
                    handle.onShow(code, str);
                    GlobalEvent.emit(EventCfg.LOADINGHIDE);
                }, 300)

            })
        }
        else {
            let handle = this.znDraw.getComponent('ZnDraw');
            this.znDraw.active = true;
            handle.onShow(code, str);
            GlobalEvent.emit(EventCfg.LOADINGHIDE);

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

    openMnxgLayer(info) {
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
        GlobalEvent.off(EventCfg.OPENMNXG);
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
    }

}
