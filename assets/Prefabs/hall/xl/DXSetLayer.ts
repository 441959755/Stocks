import GameData from "../../../sctiprs/GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    K_toggle: cc.Toggle[] = [];

    @property([cc.Toggle])
    JX_toggle: cc.Toggle[] = [];

    onEnable() {
        let dxSet = gameData.DXSet;


    }

    start() {

    }

    // update (dt) {}
}
