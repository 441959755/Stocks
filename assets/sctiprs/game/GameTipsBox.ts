import GameCfg from "./GameCfg";
import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import { pb } from "../../protos/proto";
import Game = cc.Game;

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    leftinoty: cc.Node = null;

    @property(cc.Toggle)
    lZoom: cc.Toggle = null;

    @property(cc.Node)
    selectBox: cc.Node = null;

    @property(cc.Node)
    scroll_zb:cc.Node=null;

    @property(cc.Node)
    scroll_dx:cc.Node=null;


    onLoad() {
        GlobalEvent.on(EventCfg.OPENSELECTBOX, (point) => {
            this.selectBox.x = this.node.convertToNodeSpaceAR(point).x;
            this.selectBox.active = true;
        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENSELECTBOX);
    }


    onEnable() {

        if(GameCfg.GameType==pb.GameType.DingXiang){
            this.scroll_dx.active=true;
            this.scroll_zb.active=false;
        }
        else if(GameCfg.GameType==pb.GameType.ZhiBiao){
            this.scroll_dx.active=false;
            this.scroll_zb.active=true;
        }

        this.selectBox.active = false;

        this.leftinoty.x = -cc.winSize.width / 2 - this.leftinoty.width / 2;

        if (GameCfg.GameSet.isBW) {
            this.leftinoty.color = new cc.Color().fromHEX('#1E1E1E');

            this.leftinoty.getChildByName('label').color = cc.Color.WHITE;

        } else {
            this.leftinoty.color = cc.Color.WHITE;
            this.leftinoty.getChildByName('label').color = cc.Color.BLACK;
        }

        if (GameCfg.GameType == pb.GameType.ShuangMang || GameCfg.GameType == pb.GameType.QiHuo || GameCfg.GameType == pb.GameType.JJ_PK) {
            this.lZoom.node.active = false;
            this.lZoom.isChecked = false;
        }
        else {
            this.lZoom.node.active = true;
            this.lZoom.isChecked = false;
            this.lZoom.node.children[0].active = true;
            this.leftinoty.x = -cc.winSize.width / 2 - this.leftinoty.width / 2 - 10;
        }
        this.leftinoty.active=false;
    }


    onBtnClick(event, data) {
        let name = event.target.name;

        if (data == 'lZoomBtn') {
            if (this.lZoom.isChecked) {
                this.lZoom.node.children[0].active = false;
                this.leftinoty.x = -cc.winSize.width / 2 + this.leftinoty.width / 2 + 10;
                this.leftinoty.active=true;

            } else {
                this.lZoom.node.children[0].active = true;
                this.leftinoty.x = -cc.winSize.width / 2 - this.leftinoty.width / 2 - 10;
                this.leftinoty.active=false;
            }
            GlobalEvent.emit(EventCfg.SET_DRAW_SIZE, this.lZoom.isChecked);
        }
        else if (name == 'fcBtn' || name == 'fcBtn1' || name == 'fcBtn2' || name == 'fcBtn3' || name == 'fcBtn4' || name == 'fcBtn5') {
            let percent;
            let per = parseInt(data);
            if (per == 1) {
                percent = 1;
            } else if (per == 2) {
                percent = 3 / 4;
            }
            else if (per == 3) {
                percent = 2 / 3;
            }
            else if (per == 4) {
                percent = 1 / 2;
            }
            else if (per == 5) {
                percent = 1 / 3;
            }
            else if (per == 6) {
                percent = 1 / 4;
            }
            GlobalEvent.emit(EventCfg.CLICKFCBTN, percent);
            this.selectBox.active = false;
        }
    }

}
