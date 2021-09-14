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

        let arr = [];
        this.MRTData.forEach(el => {
            if (el.cgsClearance) {
                arr.push(el);
            }
        });

        let UIScrollControl = this.scrollNode.getComponent('UIScrollControl');

        UIScrollControl.initControl(this.item, arr.length, this.item.getContentSize(), 0, (node, index) => {

            let handle = node.getComponent('MRTItem');
            handle.onShow(arr[index], index);
            // let nodes = RankNode.children;


            // if (el.cgsClearance == 0) {
            //     node.active = false;
            // }

            // if (!el.icon || el.icon == 'default_icon' || el.icon == 'default.jpg') {

            // }
            // else {

            // }
        })

        // ComUtils.onLoadHead(el.icon, (res) => {
        //     if (res) {
        //         let texture = new cc.SpriteFrame(res);
        //         head.spriteFrame = texture;
        //     }

        // })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

}
