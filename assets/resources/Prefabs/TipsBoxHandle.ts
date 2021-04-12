
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    _call = null;

    onLoad() {
        this.node.on('contentText', (data) => {
            this.label.string = data.text;
            this._call = data.call;
        }, this);

    }

    onClick(event, data) {
        let name = event.target.name;
        if (name == 'qdBtn') {
            this.node.active = false;
            this._call && (this._call(true));
        } else if (name == 'qxBtn') {
            this.node.active = false;
            this._call && (this._call(false));
        }
    }

    onDestroy() {
        this.node.off('contentText');
    }
}
