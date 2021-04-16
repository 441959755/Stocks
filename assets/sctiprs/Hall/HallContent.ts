import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property([cc.Node])
    Layers: cc.Node[] = [];

    flags = [];

    @property([cc.Node])
    xlNodes: cc.Node[] = [];

    protected onLoad() {
        this.xlNodes.forEach(el => {
            el.on('touchstart', (event) => {
                let nodes = el.children;
                nodes[0].active = true;
                nodes[1].active = true;
            }, this);
            el.on('touchend', () => {
                let nodes = el.children;
                nodes[0].active = true;
                nodes[1].active = false;
                this.onBtnClick({ target: { name: el.name } }, null);
            }, this);
            el.on('touchcancel', () => {
                let nodes = el.children;
                nodes[0].active = true;
                nodes[1].active = false;
            }, this);
        })
    }


    start() {
        this.initToggle()
    }

    initToggle() {
        this.toggles.forEach((el, index) => {
            this.flags[index] = (el.isChecked);
            this.Layers[index].active = el.isChecked;
        })
    }

    onToggleClick(event, data) {
        this.initToggle();
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'smBtn') {
            GlobalEvent.emit('OPENSMLAYER');
        } else if (name == 'zbBtn') {
            GlobalEvent.emit('OPENZBLAYER');
        } else if (name == 'dxBtn') {
            GlobalEvent.emit('OPENDXLAYER');
        }

    }

    // update (dt) {}
}
