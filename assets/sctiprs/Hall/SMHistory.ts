import ActionUtils from "../Utils/ActionUtils";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   @property(cc.Prefab)
   historyItem:cc.Prefab=null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    protected onEnable() {
        ActionUtils.openLayer(this.node);
    }

    onBtnClick(event,data){
        let name=event.target.name;
        if(name=='Mask'){
            this.node.active=false;
        }
    }

    // update (dt) {}
}
