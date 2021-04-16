import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    sItem: cc.Prefab = null;

    @property(cc.Prefab)
    bItem: cc.Prefab = null;

    @property(cc.Prefab)
    startItem: cc.Prefab = null;

    marks = [];



    onLoad() {

        GlobalEvent.on('onAddMard', this.onAddMard.bind(this), this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onMarkShow.bind(this), this);

    }

    start() {

    }


    //添加标签
    //1是开始
    //2买入
    //3卖出
    onAddMard(type) {
        //双盲
        if (GameCfg.GameType == 1) {



        }

    }


    //显示所有标签
    onMarkShow() {
        this.marks.forEach(el => {
            el.active = true;
        })

    }


    onDestroy() {
        GlobalEvent.off('onDraw');
    }

    // update (dt) {}
}
