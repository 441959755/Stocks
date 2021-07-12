import ComUtils from "../../sctiprs/Utils/ComUtils";


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
                    node.active = true;
                } else {
                    node = cc.instantiate(this.item);
                    this.content.addChild(node);
                }

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

                let countLabel = node.getChildByName('label').getComponent(cc.Label);

                if (!el.icon || el.icon == 'default_icon' || el.icon == 'default.jpg') {

                }
                else {
                    ComUtils.onLoadHead(el.icon, (res) => {
                        let texture = new cc.SpriteFrame(res);
                        head.spriteFrame = texture;
                    })
                }

                if (el.nickname) {
                    username.string = el.nickname;
                } else {
                    username.string = el.uid;
                }

                if (el.level) {
                    userlv.string = 'LV: ' + el.level;
                } else {
                    userlv.string = '';
                }

                man.children[0].active = !el.gender;

                countLabel.string = el.cgsClearance;
            });
        }
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        else if (name == 'ckzjBtn') {

        }
    }


}
