import ComUtils from "../../../sctiprs/Utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    scrollNode: cc.Node = null;

    MRTData = null;

    onLoad() {
        this.content.removeAllChildren();
    }

    initShow() {
        let UIScrollControl = this.scrollNode.getComponent('UIScrollControl');
        UIScrollControl.initControl(this.item, this.MRTData.length, this.item.getContentSize(), 0, (node, index) => {
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
            let el = this.MRTData[index];
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

            if (el.cgsClearance == 0) {
                node.active = false;
            }

            if (!el.icon || el.icon == 'default_icon' || el.icon == 'default.jpg') {

            }
            else {
                ComUtils.onLoadHead(el.icon, (res) => {
                    let texture = new cc.SpriteFrame(res);
                    head.spriteFrame = texture;
                })
            }

        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

}
