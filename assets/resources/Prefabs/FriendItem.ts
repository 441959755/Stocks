import { pb } from "../../protos/proto";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    userLevel: cc.Label = null;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Node)
    sex: cc.Node = null;

    @property(cc.Label)
    title: cc.Label = null;

    playerInfo = null;
    headImg = null;

    onShow(info, head) {
        this.playerInfo = info;
        this.headImg = head;
        this.userLevel.string = info.properties[pb.GamePropertyId.Level];
        this.userName.string = info.nick;
        this.head.spriteFrame = head;
        this.title.string = ComUtils.getChenghaoByFame(info.properties[pb.GamePropertyId.Fame]);

        if (info.gender) {
            this.sex.children[0].active = false;
        } else {
            this.sex.children[0].active = true;
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'item1' || name == 'item2') {
            this.playerInfo.icon = this.headImg;
            //打开信息面板
            PopupManager.openOtherPlayerInfoLayer(this.playerInfo);

        }

        else if (name == 'phb_bt_tiaozhanta') {

            this.playerInfo.icon = this.headImg;
            //打开历史记录
            GlobalEvent.emit(EventCfg.OPENOTHERPLAYERHISLAYER, this.playerInfo);
        }

    }
}
