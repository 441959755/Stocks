
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Node)
    tckNode: cc.Node = null;

    start() {

    }

    onToggleClick(event, data) {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'btnSubmit') {
            if (this.testTextLength()) {
                //发送信息
            }
        } else if (name == 'tckCloseBtn') {
            this.tckNode.active = false;
        } else if (name == 'nameBG') {
            this.tckNode.active = true;
        }

    }

    testTextLength() {
        let flag = 1;
        let v = this.editBox.string;
        //[\u4e00-\u9fa5]为汉字的unicode编码，/i表示匹配的时候不区分大小写。
        var rx = /[a-z\d]/i, rxcn = /[\u4e00-\u9fa5]/, num = 0, chr;

        for (var i = 0, j = v.length; i < j; i++) {

            chr = v.charAt(i);

            if (rx.test(chr)) num += 1;

            else if (rxcn.test(chr)) num += 2;

            else {
                flag = 3;
                break;
            }
        }
        if (flag != 3) {
            if (num > 12) {
                console.log(" * 长度最多为6个汉字或12个字母数字！")
                return false;
            }
            else if (num < 1) {
                console.log(" * 不能为空！")
                return false;
            }
            return true;
        }
        else {
            console.log(" * 不能包含特殊符号！")
            return false;
        }
    }
}
