import GameData from "../../sctiprs/GameData";


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

        if (!this.callback) {
            this.onShowActive();
        }
    }

    onShowActive() {

        this.contentLabel.string = GameData.SysBroadcastList[0];

        let width = this.viewNode.width;

        this.barNode.x = 0;

        this.callback = setInterval(() => {

            if (this.barNode.x <= -(width / 2 + 30) - this.contentLabel.node.width) {
                clearInterval(this.callback);
                this.callback = null;
                GameData.SysBroadcastList.shift();

                if (GameData.SysBroadcastList.length <= 0) {
                    this.node.active = false;
                }
                else {
                    this.onShowActive();
                }
            }

            this.barNode.x -= 1;

        }, 10);
    }
}
