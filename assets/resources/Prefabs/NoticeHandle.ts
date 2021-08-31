import GameCfgText from "../../sctiprs/GameText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Label)
    inscribe: cc.Label = null;

    @property(cc.Label)
    time: cc.Label = null;


    start() {


    }

    onBtnClick(event, curData) {

        let name = event.targte.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

    }
}
