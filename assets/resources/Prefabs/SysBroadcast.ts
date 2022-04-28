import GameData from "../../sctiprs/GameData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SysBroadcast extends cc.Component {

    @property(cc.Node)
    viewNode: cc.Node = null;

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

        this.contentLabel.node.height = 42;

        let width = this.viewNode.width;

        this.contentLabel.node.x = 0;

        this.contentLabel.node.y = 0;

        this.callback = setInterval(() => {

            this.contentLabel.node.y = 0;

            if (this.contentLabel.node.x <= -(width / 2 + 30) - this.contentLabel.node.width) {

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

            this.contentLabel.node.x -= 1.6;

        }, 10);
    }
}
