
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    lz_node: cc.Node = null;

    playLZ() {
        this.lz_node.active = true;
    }

}
