import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import DrawUtils from "../Utils/DrawUtils";
import GameCfg from "./GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    onLoad() {

        GlobalEvent.on(EventCfg.FILLNODEISSHOW, (flag) => {
            this.graphics.clear();
            this.node.active = flag;
        }, this);

        GlobalEvent.on(EventCfg.ADDFILLCOLOR, (data) => {
            if (!data) {
                return;
            }
            this.graphics.clear();
            this.graphics.lineWidth = 2;
            data.forEach(el => {
                if (!el || !el.start) { return }
                if (el.start >= GameCfg.beg_end[1]) {
                    return;
                }

                let some = (el.start) - GameCfg.beg_end[0];
                let startX = some == 0 ? 10 : 10 + (some * GameCfg.hz_width);
                if (el.start < GameCfg.beg_end[0]) {
                    startX = 10;
                }

                let endX;
                if (el.end) {
                    if (el.end > GameCfg.beg_end[1] - 1) {
                        endX = 10 + ((GameCfg.beg_end[1] - GameCfg.beg_end[0] - 1) * GameCfg.hz_width) + GameCfg.hz_width;
                    } else {
                        endX = 10 + ((el.end - GameCfg.beg_end[0]) * GameCfg.hz_width) + GameCfg.hz_width;
                    }
                } else {
                    endX = 10 + ((GameCfg.beg_end[1] - GameCfg.beg_end[0]) * GameCfg.hz_width);
                }
                let width = endX - startX - 1;
                let color;
                if (el.rate < 0) {

                    // color = gameCfg.HZ_green;
                    color = GameCfg.tipsDealColor[0]
                } else {
                    //color = gameCfg.HZ_red;
                    color = GameCfg.tipsDealColor[1];

                }
                if (width < 4) {
                    width = 4;
                }
                this.graphics.strokeColor = color;
                DrawUtils.drawRectFill(this.graphics, startX + 1, 0, width - 4, this.node.height, color);
            })
        }, this);

    }

    onEnable() {
        this.graphics.clear();
        this.graphics.lineWidth = 2;
    }

    protected onDestroy() {
        GlobalEvent.off(EventCfg.ADDFILLCOLOR);
        GlobalEvent.off(EventCfg.FILLNODEISSHOW);
    }
}
