
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Node)
    tckNode: cc.Node = null;

    @property([cc.Node])
    layers: cc.Node[] = [];

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Node)
    otherNode: cc.Node = null;

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    onLoad() {
        GlobalEvent.on(EventCfg.HEADIMGCHANGE, () => {
            this.headImg.spriteFrame = GameData.headImg;
        }, this);
    }


    onDestroy() {
        GlobalEvent.off(EventCfg.HEADIMGCHANGE);
    }


    onEnable() {
        if (GameData.headImg) {
            this.headImg.spriteFrame = GameData.headImg;
        }
        this.layers.forEach((el, index) => {
            if (index == 0) {
                el.active = true;
            } else {
                el.active = false;
            }
        })

        this.toggle1.isChecked = true;

    }

    onToggleClick(event, data) {
        let ind = parseInt(data);
        this.layers.forEach((el, index) => {
            if (index == ind) {

                el.active = true;
            } else {
                el.active = false;
            }
        })
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }

    }

}
