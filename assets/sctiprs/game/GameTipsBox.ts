import GameCfg from "./GameCfg";
import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import { pb } from "../../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    leftinoty: cc.Node = null;

    @property(cc.Toggle)
    lZoom: cc.Toggle = null;


    onLoad() {

    }



    start() {
        this.leftinoty.x = -cc.winSize.width / 2 - this.leftinoty.width / 2;

        if (GameCfg.GameSet.isBW) {
            this.leftinoty.color = new cc.Color().fromHEX('#1E1E1E');

            this.leftinoty.getChildByName('label').color = cc.Color.WHITE;

        } else {
            this.leftinoty.color = cc.Color.WHITE;
            this.leftinoty.getChildByName('label').color = cc.Color.BLACK;
        }

        if (GameCfg.GameType == pb.GameType.ShuangMang || GameCfg.GameType == pb.GameType.QiHuo) {
            this.lZoom.node.active = false;
            this.lZoom.isChecked = false;
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (data == 'lZoomBtn') {
            if (this.lZoom.isChecked) {
                this.lZoom.node.children[0].active = false;
                this.leftinoty.x = -cc.winSize.width / 2 + this.leftinoty.width / 2;

            } else {
                this.lZoom.node.children[0].active = true;
                this.leftinoty.x = -cc.winSize.width / 2 - this.leftinoty.width / 2;

            }
            GlobalEvent.emit(EventCfg.SET_DRAW_SIZE, this.lZoom.isChecked);
        }
    }
}
