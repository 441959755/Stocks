import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import gameCfg from "../game/GameCfg";
import GameCfg from "../game/GameCfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    toggle1:cc.Toggle=null;

    protected onEnable() {
        GlobalEvent.emit(EventCfg.SHOWOTHERNODE,this);
        this.toggle1.isChecked=cc.ext.gameData.SMSet.isFC;
    }


    onClick(event,curstData){
        let name=event.target.name;
        //点击双盲训练
        if(name=='startSMBtn'){
            cc.ext.gameData.gameDatas=gameCfg.data;
            gameCfg.GameType=1;
            GameCfg.GameSet = cc.ext.gameData.SMSet;
            cc.director.loadScene('game');
            // GlobalEvent.emit(EventCfg.LOADINGSHOW);
            // cc.ext.NetWorkMgr.getSMGuPiaoData((data)=>{
            //     GlobalEvent.emit(EventCfg.LOADINGHIDE);
            //     cc.ext.gameData.gameDatas=data;
            //     console.log(data);
            //     cc.director.loadScene('game');
            // })
        }
        //点击训练设置
        else if(name=='setSMBtn'){

            GlobalEvent.emit('OPENSETLAYER','SM');
        }
        //点击历史记录
        else if(name=='historySMBtn'){
           GlobalEvent.emit('OPENHISTORYLAYER','SM');
        }
        //点击月报
        else if(name=='ypSMBtn'){
            GlobalEvent.emit('OPENMONTHLAYER','SM');
        }
        //点击收益曲线
        else if(name=='xlSMBtn'){
            GlobalEvent.emit('OPENYIELDLAYER','SM');
        }

    }

    onToggleClick(event,data){
       // console.log(event);
        let name=event.node._name;
        if(name=='toggle1'){
            let data=cc.ext.gameData.SMSet;
           data.isFC =this.toggle1.isChecked;
            cc.ext.gameData.SMSet=data;
        }

    }

}
