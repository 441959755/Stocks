

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    winNum = 0;
    loseNum = 0;
    nameStr = '';
    GameType = 0;

    onShow() {
        this.label2.string = this.winNum + '  胜          ' + this.loseNum + '  负';
        this.label1.string = this.nameStr;
    }

    onBtnClick(event, data) {

    }
}
