
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

     onLoad () {}

    start () {

    }

    onClick(event,data){
         let name=event.target.name;
         if(name=='closeSetBtn'){
             this.node.active=false;

         }else if(name=='saveSetBtn'){
             //保存选择的数据
             //cc.ext.gameData.gameSetData
             this.node.active=false;

         }
    }

    // update (dt) {}
}
