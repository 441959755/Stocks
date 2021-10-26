import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    zLabel: cc.Label = null;

    @property(cc.Label)
    cLabel: cc.Label = null;

    @property(cc.Label)
    nameLa: cc.Label = null;

    @property(cc.Label)
    tqzfLa: cc.Label = null;

    @property(cc.Label)
    sTimeLa: cc.Label = null;

    @property(cc.Label)
    eTimeLa: cc.Label = null;


    onShow(rate) {

        let gpData = GameCfg.data[0].data;
        this.zLabel.string = rate + '%';
        this.nameLa.string = GameCfg.data[0].name;

        let tqzf = ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
        this.tqzfLa.string = tqzf + '%';

        this.sTimeLa.string = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day);
        this.eTimeLa.string = ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

    }
}
