import GameCfg from "../../../sctiprs/game/GameCfg";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    callBack = null;

    onEnable() {
        GlobalEvent.on('tipsBoxhide', () => {
            this.callBack = setTimeout(() => {
                this.node.active = false;
            }, 1000);
        }, this)
    }

    onShow(index) {

        this.callBack && (clearTimeout(this.callBack));
        this.callBack = null;
        this.labels[0].string = ComUtils.getSFMTamp1(GameCfg.data[0].data[index].day);
        this.labels[1].string = (GameCfg.data[0].data[index].close).toFixed(2);
        this.labels[2].string = (GameCfg.data[0].data[index].value);
        this.labels[3].string = (GameCfg.data[0].data[index].price);

        this.labels[2].node.color = cc.Color.YELLOW;
        this.labels[3].node.color = cc.Color.YELLOW;

        this.labels[4].string = (GameCfg.data[0].data[index].close - GameCfg.data[0].data[index - 1].close).toFixed(2);
        this.labels[5].string = ((GameCfg.data[0].data[index].close - GameCfg.data[0].data[index - 1].close) / GameCfg.data[0].data[index - 1].close * 100).toFixed(2) + '%';

        if ((GameCfg.data[0].data[index].close - GameCfg.data[0].data[index - 1].close) > 0) {
            this.labels[4].node.color = new cc.Color().fromHEX('#e94343');
            this.labels[5].node.color = new cc.Color().fromHEX('#e94343');
        }
        else {
            this.labels[4].node.color = new cc.Color().fromHEX('#31a633');
            this.labels[5].node.color = new cc.Color().fromHEX('#31a633');
        }


    }
}
