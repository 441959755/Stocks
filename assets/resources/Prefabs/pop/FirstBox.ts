

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'sys_tck_qd') {
            this.node.active = false;
        }
    }


}
