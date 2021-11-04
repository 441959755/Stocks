// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    viewNode: cc.Node = null;

    @property(cc.Node)
    barNode: cc.Node = null;

    @property(cc.Label)
    contentLabel: cc.Label = null;

    callback = null;

    onShowSysBroadcast(text) {

        this.contentLabel.string = text;

        let width = this.viewNode.width;

        this.barNode.x = width / 2 + 30;

        this.callback = setInterval(() => {

            if (this.barNode.x <= -(width / 2 + 30) - this.contentLabel.node.width) {
                clearInterval(this.callback);
                this.callback = null;
                this.node.active = false;
            }

            this.barNode.x -= 1;
        }, 50);

    }
}
