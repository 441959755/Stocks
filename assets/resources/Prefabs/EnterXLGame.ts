import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    xlname: cc.Label = null;

    @property(cc.Label)
    codename: cc.Label = null;

    onShow() {
        if (GameCfg.GameType == pb.GameType.JJ_PK) {
            this.xlname.string = '前往定向训练场训练改股票';
        }

        let code = GameCfg.data[0].code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        let gpData = GameCfg.data[0].data;
        let time = ComUtils.formatTime(gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(gpData[GameCfg.huizhidatas - 1].day);

        this.codename.string = code + '     ' + time;

    }


    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'qxBtn') {
            this.node.active = false;
        }
        else if (name == 'qdBtn') {



        }
    }


}
