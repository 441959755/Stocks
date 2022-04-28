

const { ccclass, property } = cc._decorator;

@ccclass
export default class InviteBox extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    layout: cc.Node = null;

    onInviteShow(data) {

        let node = cc.instantiate(this.item);

        if (node) {

            this.layout.addChild(node);

            let headle = node.getComponent('InviteItem');
            headle.number = 2;
            headle.onInit(data);
        }

    }

}
