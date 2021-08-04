import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    toggels: cc.Toggle[] = [];



    onEnable() {
        GameData.SelectBk.forEach((el, index) => {
            this.toggels[index].isChecked = el;
        });
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'sp_znxg_xz') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            this.toggels.forEach((el, index) => {
                if (el.isChecked) {
                    GameData.SelectBk[index] = 1;
                }
                else {
                    GameData.SelectBk[index] = 0;
                }
            })

            GlobalEvent.emit(EventCfg.SELECTBK);
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        }
    }


}
