
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    start() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
    }

    onToggleClick(event, data) {
        let name = event.node.name;
    }

    // update (dt) {}
}
