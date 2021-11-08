

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    callBanck = null;
    _index = null;
    _type = null;

    onShow(index, type, cb) {
        this.callBanck = cb;
        this._index = index;
        this._type = type;
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'bank_zf_wx') {
            this.callBanck && (this.callBanck(this._index, this._type));
            this.node.active = false;
        }
    }

}
