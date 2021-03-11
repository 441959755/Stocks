import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // UserID: cc.Label = null;

    @property(cc.Node)
    shuangmangLayer:cc.Node=null;


    @property(cc.Node)
    loading:cc.Node=null;



    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        GlobalEvent.on(EventCfg.LOADINGSHOW,()=>{
            this.loading.active=true;
        },this);

        GlobalEvent.on(EventCfg.LOADINGHIDE,()=>{
            this.loading.active=false;
        },this);




    }



    start() {


    }

    onclick(event, custData) {
        let name = event.target.name;

        if (name == 'shuangmangBtn') {
          //    cc.director.loadScene('game');
            this.shuangmangLayer.active=true;
        }

    }


    // update (dt) {}
}
