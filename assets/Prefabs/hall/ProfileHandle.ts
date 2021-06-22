

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start() {

    }

    onEnable() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
    }
}
