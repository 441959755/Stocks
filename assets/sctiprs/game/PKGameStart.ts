

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.SpriteFrame])
    timeSp: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    callback = null;

    onEnable() {
        let num = 3
        this.sprite.spriteFrame = this.timeSp[num];
        this.sprite.node.scale = 1;

        this.callback = setInterval(() => {

            num--;

            if (num < 0) {
                this.node.active = false;
            }

            this.sprite.spriteFrame = this.timeSp[num];

            cc.tween(this.sprite.node)
                .to(0.1, { scaleY: 0 })
                .to(0.1, { scaleY: 1 })
                .start()
        }, 1000);

    }

    onDisable() {
        this.callback && (clearInterval(this.callback))
        this.callback = null;
    }

}
