


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    curData = null;

    onLoad() {
        this.content.removeAllChildren();
    }

    initShow() {
        this.content.children.forEach(el => {
            el.active = false;
        })

        if (this.curData.Items) {
            this.curData.Items.forEach((el, index) => {

                let node;
                if (this.content.children[index]) {
                    node = this.content.children[index];
                } else {
                    node = cc.instantiate(this.item);
                    this.content.addChild(node);
                }
                node.active = true;

                let handle = node.getComponent('CgsLvRankItem');
                handle.el = el;
                handle.initShow(index);
            });
        }
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

    }


}
