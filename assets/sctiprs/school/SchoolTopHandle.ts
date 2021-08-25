

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'btn_black') {

            cc.director.loadScene('hall');

        }
    }
}
