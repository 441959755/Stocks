
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    loading:cc.Node=null;

    // LIFE-CYCLE CALLBACKS:


    protected onEnable() {
        cc.tween(this.loading)
            .by(0.1,{angle:10})
            .repeatForever()
            .start();
    }

    protected onDisable() {
        this.loading.stopAllActions();
    }

    // update (dt) {}
}
