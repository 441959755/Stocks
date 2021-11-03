

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    layout: cc.Node = null;

    onInviteShow(data) {

        let node = cc.instantiate(this.item);

        this.layout.addChild(node);

        let headle = node.getComponent('InviteItem');

        headle.onInit(data);
    }

}
