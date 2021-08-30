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
            this.toggels[index].isChecked = !!el;
        });
    }

    onToggleClick(event, data) {
        let name = event.node.name;
        if (name == 'toggle1') {
            if (this.toggels[0].isChecked) {
                this.toggels.forEach(el => {
                    el.isChecked = true;
                })
            }
            else {
                this.toggels[0].isChecked = true;
            }
        }
        else {

            let flag = true;
            this.toggels.forEach((el, index) => {
                if (index > 0) {
                    if (!el.isChecked) {
                        flag = false;
                    }
                }

            })
            this.toggels[0].isChecked = flag;


            let f = false;
            this.toggels.forEach(el => {
                if (el.isChecked) {
                    f = true;
                }
            })

            if (f) { return };

            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '至少保留一个模块');
            // console.log(event);
            // event.node.getComponent(cc.Toggle).isChecked = true;
            event.isChecked = true;
        }

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
