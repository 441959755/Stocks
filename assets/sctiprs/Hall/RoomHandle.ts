import GameCfg from "../game/GameCfg";
import GlobalHandle from "../global/GlobalHandle";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    roomid: cc.Label = null;

    @property([cc.Node])
    player: cc.Node[] = []

    onEnable() {

        {
            let name = this.player[0].getChildByName('name').getComponent(cc.Label);
            let lv = this.player[0].getChildByName('lv').getComponent(cc.Label);
            let exp = this.player[0].getChildByName('exp').getComponent(cc.Label);
            let read = this.player[0].getChildByName('read').getComponent(cc.Label);


        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GlobalHandle.onReqRoomLeave(() => {
                this.node.active = false;
                GameCfg.GameType = null;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            });
        }

    }
}
