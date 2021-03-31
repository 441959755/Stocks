import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";

const {ccclass, property} = cc._decorator;

@ccclass

export default class NewClass extends cc.Component {

    @property(cc.Node)
    finalLayer: cc.Node = null;  //结算界面

    @property(cc.Node)
    helpLayer: cc.Node = null;   //帮助界面

    onLoad() {
        //游戏结算
        GlobalEvent.on(EventCfg.GAMEOVEER, (flag) => {
            setTimeout(()=>{
                this.finalLayer.active = flag;
            },100)

        }, this)

        //打开帮组
        GlobalEvent.on(EventCfg.HELPSHOW, () => {
            this.helpLayer.active = true;
        }, this);


        this.initData();

    }



    protected onDestroy() {
        GlobalEvent.off(EventCfg.GAMEOVEER);
        GlobalEvent.off(EventCfg.HELPSHOW);
    }

    start() {

    }

    initData(){
        let j = 0;
        if (GameCfg.GameType == 1) {
            GameCfg.GameSet = cc.ext.gameData.SMSet;
            for (let i = 1; i <= 6; i++) {
                if (GameCfg.GameSet['isMA' + i]) {
                    GameCfg.MAs[j++] = GameCfg.GameSet['MA' + i + 'Date'];
                }
            }
        }
    }

}
