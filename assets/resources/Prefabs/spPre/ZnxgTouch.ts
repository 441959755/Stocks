import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    vertical1: cc.Node = null;

    @property(cc.Node)
    Horizontal1: cc.Node = null;

    timer = null;

    ktype = null;

    onLoad() {

        this.node.on('touchstart', (event) => {

            this.vertical1.active = true;
            this.Horizontal1.active = true;

            let pos = new cc.Vec2(event.getLocationX(), event.getLocationY());

            let localPos = this.node.convertToNodeSpaceAR(pos);

            this.vertical1.x = Math.floor((localPos.x) / GameCfg.hz_width) * GameCfg.hz_width + GameCfg.hz_width / 2 - this.vertical1.width;
            this.Horizontal1.y = localPos.y;
            let index = GameCfg.beg_end[0] + (Math.floor((localPos.x) / GameCfg.hz_width));
            if (index >= GameCfg.beg_end[1]) {
                this.vertical1.x = GameCfg.hz_width * (GameCfg.beg_end[1] - GameCfg.beg_end[0]) - GameCfg.hz_width / 2 - this.vertical1.width / 2;
                index = GameCfg.beg_end[1] - 1;
            }
            else if (index <= GameCfg.beg_end[0]) {
                this.vertical1.x = GameCfg.hz_width / 2 - this.vertical1.width / 2;
            }

            GlobalEvent.emit('onClickPosUpdateLabel', index);

        }, this);

        this.node.on('touchend', (event) => {
            this.vertical1.active = false;
            this.Horizontal1.active = false;
            if (GameCfg.GameType == pb.GameType.FenShi) {
                GlobalEvent.emit('tipsBoxhide');
            }
        }, this);

        this.node.on('touchcancel', (event) => {
            this.vertical1.active = false;
            this.Horizontal1.active = false;

            if (GameCfg.GameType == pb.GameType.FenShi) {
                GlobalEvent.emit('tipsBoxhide');
            }

        }, this)

        let calDisY = 0;
        let calDisX = 0;

        let mixWidth = 6;
        let maxWidth = 80;
        let minCount = parseInt(this.node.width / maxWidth + '');
        let maxCount = parseInt(this.node.width / mixWidth + '');

        let num = 90;

        this.node.on('touchmove', (event) => {
            //   if (this.ktype == pb.KType.Min) { return }
            calDisY += event.getDelta().y;
            calDisX += event.getDelta().x;

            var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
            let localPos = this.node.convertToNodeSpaceAR(pos);
            if (GameCfg.GameType != pb.GameType.FenShi) {
                if (this.ktype != pb.KType.Min) {
                    if (Math.abs(calDisX) > Math.abs(calDisY)) {
                        calDisY = 0;

                        if (Math.abs(calDisX) >= (GameCfg.hz_width / 2)) {
                            if (this.timer) { return }
                            this.timer = setTimeout(() => {

                                let count = Math.ceil(Math.abs(calDisX) / GameCfg.hz_width);

                                if (calDisX > 0) {
                                    if (GameCfg.beg_end[0] == 0) {
                                        clearTimeout(this.timer);
                                        this.timer = null;
                                        calDisX = 0;
                                        calDisY = 0;
                                        return;
                                    }
                                    if (GameCfg.beg_end[0] - count >= 0) {
                                        GameCfg.beg_end[1] -= count;
                                        GameCfg.beg_end[0] -= count;
                                    } else {
                                        count = GameCfg.beg_end[0];
                                        GameCfg.beg_end[0] -= count;
                                        GameCfg.beg_end[1] -= count;
                                    }
                                } else {
                                    if (GameCfg.huizhidatas == GameCfg.beg_end[1]) {
                                        clearTimeout(this.timer);
                                        this.timer = null;
                                        calDisX = 0;
                                        calDisY = 0;
                                        return;
                                    }
                                    if (GameCfg.beg_end[1] + count < GameCfg.huizhidatas) {
                                        GameCfg.beg_end[0] += count;
                                        GameCfg.beg_end[1] += count;
                                    } else {
                                        count = GameCfg.huizhidatas - GameCfg.beg_end[1];
                                        GameCfg.beg_end[0] += count;
                                        GameCfg.beg_end[1] += count;
                                    }
                                }

                                calDisX = 0;
                                calDisY = 0;
                                clearTimeout(this.timer);
                                this.timer = null;
                                if (this.ktype != pb.KType.Min) {
                                    GlobalEvent.emit('onDrawGrap')
                                }

                            }, 20)
                        }
                    }
                    else if (Math.abs(calDisY) >= Math.abs(calDisX)) {
                        calDisX = 0;
                        if (Math.abs(calDisY) >= 2) {
                            if (this.timer) { return }
                            this.timer = setTimeout(() => {
                                let preNum = Math.ceil(this.node.width / GameCfg.hz_width);
                                let hz_width = 0;
                                let w = Math.ceil(Math.abs(calDisY) / 2);

                                num = calDisY > 0 ? preNum - w : preNum + w;
                                if (num <= minCount) {
                                    num = minCount
                                }
                                if (num >= maxCount) {
                                    num = maxCount
                                }
                                hz_width = this.node.width / num;
                                if (hz_width < mixWidth) {
                                    hz_width = mixWidth;
                                } else if (hz_width > maxWidth) {
                                    hz_width = maxWidth;
                                }
                                num = parseInt(this.node.width / hz_width + '');

                                if (calDisY > 0) {
                                    if (num > GameCfg.huizhidatas) {
                                        GameCfg.beg_end[0] = 0;
                                        GameCfg.beg_end[1] = GameCfg.huizhidatas;
                                    }
                                    else {
                                        let count = GameCfg.beg_end[1] - GameCfg.beg_end[0] - num;
                                        GameCfg.beg_end[0] += parseInt(count / 2 + '');
                                        GameCfg.beg_end[1] -= (count - parseInt(count / 2 + ''));
                                    }
                                }
                                else {
                                    if (num < GameCfg.huizhidatas) {

                                        let count = num - (GameCfg.beg_end[1] - GameCfg.beg_end[0]);

                                        if (GameCfg.beg_end[0] - parseInt(count / 2 + '') >= 0 && GameCfg.beg_end[1] + (count - parseInt(count / 2 + '')) <= GameCfg.huizhidatas) {
                                            GameCfg.beg_end[0] -= parseInt(count / 2 + '');
                                            GameCfg.beg_end[1] += (count - parseInt(count / 2 + ''));
                                        }
                                        else if (GameCfg.beg_end[0] - count >= 0) {
                                            GameCfg.beg_end[0] -= count;
                                        }
                                        else if (GameCfg.beg_end[1] + count <= GameCfg.huizhidatas) {
                                            GameCfg.beg_end[1] += count;
                                        }
                                    }
                                }
                                GameCfg.hz_width = this.node.width / (num);

                                calDisY = 0;
                                calDisX = 0;
                                clearTimeout(this.timer);
                                this.timer = null;
                                if (this.ktype != pb.KType.Min) {
                                    GlobalEvent.emit('onDrawGrap')
                                }
                            }, 20)
                        }
                    }
                }
            }


            this.Horizontal1.y = localPos.y;

            let index = GameCfg.beg_end[0] + (Math.floor(localPos.x / GameCfg.hz_width));

            this.vertical1.x = Math.floor(localPos.x / GameCfg.hz_width) * GameCfg.hz_width + GameCfg.hz_width / 2 - this.vertical1.width / 2;

            if (index >= GameCfg.beg_end[1]) {
                this.vertical1.x = GameCfg.hz_width * (GameCfg.beg_end[1] - GameCfg.beg_end[0]) - GameCfg.hz_width / 2 - this.vertical1.width / 2;
                index = GameCfg.beg_end[1] - 1;
            }
            else if (index < GameCfg.beg_end[0]) {

                this.vertical1.x = GameCfg.hz_width / 2 - this.vertical1.width / 2;

            }

            GlobalEvent.emit('onClickPosUpdateLabel', index);

        }, this);

    }

    start() {
        this.vertical1.active = false;
        this.Horizontal1.active = false;
    }

    onDisable() {
        this.timer && (clearTimeout(this.timer))
        this.timer = null;
    }

    onDestroy() {
        this.node.off('touchstart');
        this.node.off('touchend');
        this.node.off('touchcancel');
        this.node.off('touchmove');
        // GlobalEvent.off('onDrawGrap');
    }
}
