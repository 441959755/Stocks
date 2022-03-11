import GameData from "../../../sctiprs/GameData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    anNode: cc.Node = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    protected onEnable(): void {

        this.tipsLabel.string = GameData.goldAwardPrompt.text + ',恭喜获得' + GameData.goldAwardPrompt.gold;
        //this.tipsLabel.string = '2222222222222222222222222222222222222';

        this.anNode.y = -100;
        this.anNode.opacity = 255;

        let t = cc.tween;

        t(this.anNode)
            // 同时执行两个 cc.tween
            .parallel(
                t().to(2.2, { position: cc.v2(0, 200) }),
                t().to(2.5, { opacity: 0 })
            )
            .call(() => {
                this.node.active = false;
                console.log('All tweens finished.')
            })
            .start()
    }
}
