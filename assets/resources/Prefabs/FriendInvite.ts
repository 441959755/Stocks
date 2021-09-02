

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property([cc.Node])
    contents: cc.Node[] = [];


    start() {
        this.toggles.forEach(el => {
            el.isChecked = false;
        })
        this.toggles[0].isChecked = true;

        this.contents.forEach(el => {
            el.active = false;
        })
        this.contents[0].active = true;
    }


    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'leftBtn') {
            this.node.active = false;
        }
    }

    onToggleClick(event, curdata) {

        let name = event.node.name;
        this.contents.forEach(el => {
            el.active = false;
        })

        if (name == 'toggle1') {
            this.contents[0].active = true;
        }
        else if (name == 'toggle2') {
            this.contents[1].active = true;
        }
        else if (name == 'toggle3') {
            this.contents[2].active = true;
        }
    }
}
