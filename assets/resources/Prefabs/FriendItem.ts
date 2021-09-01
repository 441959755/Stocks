
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    orderNumber: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    userLevel: cc.Label = null;

    // @property(cc.Label)

    start() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'item1' || name == 'item2') {
            //打开信息面板

        }

    }
}
