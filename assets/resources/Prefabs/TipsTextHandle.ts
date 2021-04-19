
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    textData = '';


    onShow() {
        this.label.string = this.textData;
        setTimeout(() => {

            cc.tween(this.node)
                .to(0.5, { opacity: 0 })
                .call(() => {
                    this.node.active = false;
                })
                .start();
        }, 2000);
    }

    onDisable() {

        this.textData = '';
        this.node.opacity = 255;
    }
}
