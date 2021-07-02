import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";

export default class PopupManager {

    public static tipsBox = null;

    //选择加载的Prefa
    public static LoadPopupBox(name, text, call?) {
        if (!this.tipsBox) {
            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node, 99);
                // 进场动画
                ActionUtils.openBox(node);

                this.tipsBox = node;
                this.tipsBox.emit('contentText', { text: text, call: call });
            })
        } else {
            this.tipsBox.active = true;
            this.tipsBox.emit('contentText', { text: text, call: call });
        }
    }


    public static delPopupNode() {
        this.tipsBox.active = false;
    }

}