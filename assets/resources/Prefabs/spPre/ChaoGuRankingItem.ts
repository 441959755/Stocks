
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nc: cc.Node = null;

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Label)
    namela: cc.Label = null;

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == '') { }

    }


}
