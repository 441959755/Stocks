import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import GlobalHandle from "../global/GlobalHandle";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player1: cc.Node = null;

    @property(cc.Node)
    player2: cc.Node = null;

    @property([cc.SpriteFrame])
    tx: cc.SpriteFrame[] = [];

    callBack = null;

    onLoad() {

    }



    start() {

    }

    onEnable() {
        GameCfg.GameType = pb.GameType.JJ_PK;
        {
            let head = this.player1.getChildByName('head');
            let name = this.player1.getChildByName('name');
            let lv = this.player1.getChildByName('lv');
            let exp = this.player1.getChildByName('exp');

            head.getComponent(cc.Sprite).spriteFrame = GameData.headImg;

            name.getComponent(cc.Label).string = GameData.userName;

            lv.getComponent(cc.Label).string = GameData.level;

            exp.getComponent(cc.Label).string = GameData.exp;
        }

        this.onSlideShow();

        let arr = [];

        let smArr = GameData.SMSet;

        if (smArr.isMA1 && arr.indexOf(smArr.MA1Date) == -1) {
            arr.push(smArr.MA1Date);
        }
        if (smArr.isMA2 && arr.indexOf(smArr.MA2Date) == -1) {
            arr.push(smArr.MA2Date);
        }
        if (smArr.isMA3 && arr.indexOf(smArr.MA3Date) == -1) {
            arr.push(smArr.MA3Date);
        }
        if (smArr.isMA4 && arr.indexOf(smArr.MA4Date) == -1) {
            arr.push(smArr.MA4Date);
        }
        if (smArr.isMA5 && arr.indexOf(smArr.MA5Date) == -1) {
            arr.push(smArr.MA5Date);
        }
        if (smArr.isMA6 && arr.indexOf(smArr.MA6Date) == -1) {
            arr.push(smArr.MA6Date);
        }
        arr = Array.from(new Set(arr));

        GlobalHandle.onReqRoomEnter(arr);
    }

    onSlideShow() {

        let sp = this.player2.getChildByName('head').getComponent(cc.Sprite);

        let index = 0;
        this.callBack = setInterval(() => {
            if (index >= this.tx.length) {
                index = 0;
            }
            sp.spriteFrame = this.tx[index++];
        }, 100);

    }

    onDisable() {
        this.callBack && (clearInterval(this.callBack));
        this.callBack = null;
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
            GameCfg.GameType = null;
        }
    }


}
