

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.EditBox)
    edit: cc.EditBox = null;




    onShwo(type) {

        //买入策略
        if (type == 1) {

        }

        //卖出策略
        else if (type == 2) {

        }

        //止损
        else if (type == 2) {

        }
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == '') { }
    }
}
