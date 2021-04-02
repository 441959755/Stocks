//import ActionUtils from "../Utils/ActionUtils";
import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

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
}
