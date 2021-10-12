import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    setLayer: cc.Node = null;

    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'xl_topbtn_xlsz') {
            PopupManager.openNode(this.node, this.setLayer, 'Prefabs/hallSetLayer', 10, (node) => {
                this.setLayer = node;
            })
        }
    }

    onDestroy() {
        LoadUtils.releaseRes('Prefabs/hallSetLayer');
    }

}
