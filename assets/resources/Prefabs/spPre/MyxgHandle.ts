
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    // onLoad () {}

    start() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == '') {

        }
    }


    onToggleClick(event, data) {
        let name = event.node.name;
    }
}
