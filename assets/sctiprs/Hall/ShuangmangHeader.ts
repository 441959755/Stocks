import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    selectFC=false;

    @property(cc.Toggle)
    toggle1:cc.Toggle=null;

    @property(cc.Node)
    setLayer:cc.Node=null;

    protected onLoad() {
        this.selectFC=this.toggle1.isChecked;

    }

    protected onEnable() {
        GlobalEvent.emit('otherShow',this);
    }

    protected onDisable() {
       // GlobalEvent.emit('otherHide',this);
    }

    start () {

    }

    onClick(event,curstData){
        let name=event.target.name;
        //点击双盲训练
        if(name=='startSMBtn'){
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            cc.ext.NetWorkMgr.getSMGuPiaoData((data)=>{
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                cc.ext.gameData.gameDatas=data;
                console.log(data);
                cc.director.loadScene('game');
            })
        }
        //点击训练设置
        else if(name=='setSMBtn'){
            this.setLayer.active=true;
        }
        //点击历史记录
        else if(name=='historySMBtn'){

        }
        //点击月报
        else if(name=='ypSMBtn'){

        }
        //点击收益曲线
        else if(name=='xlSMBtn'){

        }

    }

    onToggleClick(event,data){
       // console.log(event);
        let name=event.node._name;
        if(name=='toggle1'){
            this.selectFC=this.toggle1.isChecked;
            console.log(this.selectFC);
        }

    }

    // update (dt) {}
}
