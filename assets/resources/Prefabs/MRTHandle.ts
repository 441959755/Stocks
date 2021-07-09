

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    MRTData = null;

    onLoad() {
        this.content.removeAllChildren();
    }

    initShow() {

        this.MRTData.forEach((el, index) => {
            let node = cc.instantiate(this.item);
            this.content.addChild(node);

            let RankNode = node.getChildByName('node');
            let nodes = RankNode.children;

            nodes.forEach(el => {
                el.active = false;
            })

            if (index <= 2) {
                nodes[index].active = true;
            }
            else {
                nodes[3].active = true;
                nodes[3].getComponent(cc.Label).string = (index + 1);
            }

            let userNode = node.getChildByName('userinfobg');

            let head = userNode.getChildByName('main_txk').getComponent(cc.Sprite);

            let username = userNode.getChildByName('username').getComponent(cc.Label);

            let userlv = userNode.getChildByName('userLv').getComponent(cc.Label);

            let man = userNode.getChildByName('main_sex__man');


        });

    }

    // update (dt) {}
}
