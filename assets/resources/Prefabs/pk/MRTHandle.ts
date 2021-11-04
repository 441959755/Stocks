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

        })


    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

}
