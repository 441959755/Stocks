

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    vertical1: cc.Node = null;

    @property(cc.Node)
    Horizontal1: cc.Node = null;

    timer = null;

    onLoad() {
        this.node.on('touchstart', (event) => {
            this.vertical1.active = true;
            this.Horizontal1.active = true;

            let pos = new cc.Vec2(event.getLocationX(), event.getLocationY());

            let localPos = this.node.convertToNodeSpaceAR(pos);

            this.vertical1.x = Math.floor((localPos.x - 10) / GameCfg.hz_width) * GameCfg.hz_width + 10 + GameCfg.hz_width / 2;
            this.Horizontal1.y = localPos.y;
            let index = GameCfg.beg_end[0] + (Math.floor((localPos.x - 10) / GameCfg.hz_width));
            if (index >= GameCfg.beg_end[1]) {
                this.vertical1.x = GameCfg.hz_width * (GameCfg.beg_end[1] - GameCfg.beg_end[0]) + 10 - GameCfg.hz_width / 2;
                index = GameCfg.beg_end[1] - 1;
            }
            else if (index <= GameCfg.beg_end[0]) {
                this.vertical1.x = 10 + GameCfg.hz_width / 2;
            }

        }, this);

        this.node.on('touchend', (event) => {
            this.vertical1.active = false;
            this.Horizontal1.active = false;
        }, this);

        this.node.on('touchcancel', (event) => {
            this.vertical1.active = false;
            this.Horizontal1.active = false;
        }, this)

        let calDisY = 0;
        let calDisX = 0;
        this.node.on('touchmove', (event) => {
            calDisY += event.getDelta().y;
            calDisX += event.getDelta().x;

            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
            let localPos = this.node.convertToNodeSpaceAR(pos);

            if (Math.abs(calDisX) > Math.abs(calDisY)) {
                calDisY = 0;


            }


        }, this);


    }

    start() {
        this.vertical1.active = false;
        this.Horizontal1.active = false;
    }


    onDestroy() {
        this.node.off('touchstart');
        this.node.off('touchend');
        this.node.off('touchcancel');
        this.node.off('touchmove');

    }
}
