import ActionUtils from "../Utils/ActionUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onEnable() {
        ActionUtils.openLayer(this.node);
    }

    onBtnClick(event,data){
        let name=event.target.name;
        if(name=='closeBtn'){
            this.node.active=false;
        }
    }

    // update (dt) {}
}
