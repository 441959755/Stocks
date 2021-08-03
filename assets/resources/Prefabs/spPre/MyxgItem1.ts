
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labs: cc.Label[] = [];

    onLoad() {

    }

    onShow(data) {


    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //看信号买卖
        if (name == 'item') {



        }
    }
}
