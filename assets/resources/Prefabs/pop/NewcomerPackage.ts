

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    onBtnClick(event, curdata) {
        let name = event.target.name;
        switch (name) {
            case 'sys_1ylbbt':

                break;

            case "btnClose":
                this.node.active = false;
                break;
            default:
                break;
        }
    }


}
