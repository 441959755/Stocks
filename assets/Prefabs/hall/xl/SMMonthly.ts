import ActionUtils from "../Utils/ActionUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    start () {

    }

    protected onEnable() {
        ActionUtils.openLayer(this.node);
    }

    onBthClick(event,data){
        let name=event.target.name;
        if(name=='closeBtn'){
            this.node.active=false;
        }
    }

    // update (dt) {}
}
