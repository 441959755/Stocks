import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import GameCfgText from "../GameText";
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
        GlobalEvent.on('SHOWOTHERPLAYER', this.onShowOtherPlayer.bind(this), this);
    }

    onShowOtherPlayer() {
        this.callBack && (clearInterval(this.callBack));
        this.callBack = null;

        let head = this.player2.getChildByName('head');
        let name = this.player2.getChildByName('name');
        let lv = this.player2.getChildByName('lv');
        let exp = this.player2.getChildByName('exp');

        name.active = true;
        lv.active = true;
        exp.active = true;

        //   head.getComponent(cc.Sprite).spriteFrame = GameData.Players[1].gd.icon;
        let index = parseInt(Math.random() * this.tx.length + '');
        head.getComponent(cc.Sprite).spriteFrame = this.tx[index];
        name.getComponent(cc.Label).string = GameData.Players[1].uid;

        lv.getComponent(cc.Label).string = 'LV：' + (GameData.Players[1].properties[pb.GamePropertyId.Level] || 1) + '';

        exp.getComponent(cc.Label).string = '经验值：' + GameData.Players[1].properties[pb.GamePropertyId.Exp] + ' /' + GameCfgText.gameTextCfg.level_exp[(GameData.Players[1].properties[pb.GamePropertyId.Level] || 1)];
    }

    onEnable() {

        this.player2.getChildByName('name').active = false;
        this.player2.getChildByName('lv').active = false;;
        this.player2.getChildByName('exp').active = false;


        {
            let head = this.player1.getChildByName('head');
            let name = this.player1.getChildByName('name');
            let lv = this.player1.getChildByName('lv');
            let exp = this.player1.getChildByName('exp');

            head.getComponent(cc.Sprite).spriteFrame = GameData.headImg;

            name.getComponent(cc.Label).string = GameData.userName;

            lv.getComponent(cc.Label).string = 'LV：' + (GameData.properties[pb.GamePropertyId.Level] || 1) + '';

            exp.getComponent(cc.Label).string = '经验值：' + GameData.properties[pb.GamePropertyId.Exp] + '/' + GameCfgText.gameTextCfg.level_exp[(GameData.properties[pb.GamePropertyId.Level] || 1)];
        }



        let arr = [];

        let smArr = GameData.JJPKSet;

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

        GlobalHandle.onReqRoomEnter(arr, (flag) => {
            if (flag) {
                this.onSlideShow();
            }
            else {
                this.node.active = false;
            }
        });
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

    onDestroy() {
        GlobalEvent.off('SHOWOTHERPLAYER');
    }


}
