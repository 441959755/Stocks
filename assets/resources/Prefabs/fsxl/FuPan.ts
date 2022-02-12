import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    onShow(rate) {
        let code = GameCfg.data[0].code;
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let gpData = GameCfg.data[0].data;
        this.labels[0].string = GameCfg.data[0].name + '    ' + code;
        let tqzf = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);

        this.labels[1].string = tqzf + '%';

        this.labels[2].string = (rate * 100).toFixed(2) + '%';

        if (rate < 0) {
            this.labels[2].node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.labels[2].node.color = new cc.Color().fromHEX('#e94343');
        }

    }
}
