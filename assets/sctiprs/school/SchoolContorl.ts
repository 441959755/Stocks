import PopupManager from "../Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        PopupManager.init();
    }

    onDestroy() {
        PopupManager.delPopupNode();
    }
}
