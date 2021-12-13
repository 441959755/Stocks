import ComUtils from "../../../sctiprs/Utils/ComUtils";
import List from "../../../sctiprs/Utils/List";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    scrollNode: cc.Node = null;

    MRTData = null;

    @property(List)
    listV: List = null;

    arr = null;

    onLoad() {
        this.content.removeAllChildren();
    }

    initShow() {
        this.arr = [];
        this.MRTData.forEach(el => {
            if (el.cgsClearance) {
                this.arr.push(el);
            }
        });

        this.listV.numItems = this.arr.length;

    }

    onListRender(item: cc.Node, idx: number) {
        let handle = item.getComponent('MRTItem');
        handle.onShow(this.arr[idx], idx);
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

}
