
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onClick(event,data){
        let name=event.target.name;
        if(name=='pk_help'){
            this.node.active=false;
        }
    }
}
