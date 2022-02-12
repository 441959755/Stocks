
import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

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

    @property(cc.Sprite)
    vipImg: cc.Sprite = null;

    onLoad() {
        GlobalEvent.on(EventCfg.HEADIMGCHANGE, this.setUserInfo.bind(this), this);

        GlobalEvent.on(EventCfg.VIPCHANGE, this.setUserInfo.bind(this), this);

        GlobalEvent.on('openDefHeadLayer', this.openDefHeadLayer.bind(this), this);
    }

    start() {
        this.setUserInfo();
    }

    setUserInfo() {
        if (GameData.headImg) {
            this.headImg.spriteFrame = GameData.headImg;
        }
        if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
            this.vipImg.enabled = true;
        }
        else {
            this.vipImg.enabled = false;
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.HEADIMGCHANGE);
        GlobalEvent.off(EventCfg.VIPCHANGE);
        GlobalEvent.off('openDefHeadLayer');
    }

    onEnable() {
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

    openDefHeadLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/playeInfo/defHead', 10, null);
    }
}
