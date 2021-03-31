import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../sctiprs/Utils/EventCfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


   onItemBtnClick(event,name){
       let str=this.node.getComponent(cc.Label).string;
       GlobalEvent.emit('ItemValue',str);
   }
}
