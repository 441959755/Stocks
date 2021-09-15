
import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player1: cc.Node = null;

    @property(cc.Node)
    player2: cc.Node = null;

    @property([cc.SpriteFrame])
    tx: cc.SpriteFrame[] = [];

    @property(cc.Animation)
    enterGameAnim: cc.Animation = null;

    callBack = null;

    spIndex = 0;

    ecb = null;

    enterRoom = false;

    onLoad() {
        GlobalEvent.on('SHOWOTHERPLAYER', this.onShowOtherPlayer.bind(this), this);

        GlobalEvent.on(EventCfg.RoomGameStatus, () => { this.enterRoom = true }, this);
    }

    onShowOtherPlayer() {

        this.callBack && (clearInterval(this.callBack));
        this.callBack = null;

        this.onLoadHead();

        let name = this.player2.getChildByName('name');
        let lv = this.player2.getChildByName('lv');
        let exp = this.player2.getChildByName('exp');

        name.active = true;
        lv.active = true;
        exp.active = true;

        name.getComponent(cc.Label).string = GameData.Players[1].nickname;

        lv.getComponent(cc.Label).string = 'LV：' + (GameData.Players[1].properties[pb.GamePropertyId.Level] || 1);

        exp.getComponent(cc.Label).string = '经验值：' + GameData.Players[1].properties[pb.GamePropertyId.Exp] + ' /' + GameCfgText.gameTextCfg.level_exp[(GameData.Players[1].properties[pb.GamePropertyId.Level] || 1)];

    }

    onEnterGameAnim() {

        this.enterGameAnim.on('finished', () => {
            console.log('enterGameAnim');
            cc.director.loadScene('game');
        }, this);

        this.enterGameAnim && (this.enterGameAnim.play());
    }

    onLoadHead() {
        let head = this.player2.getChildByName('head');

        head.getComponent(cc.Sprite).spriteFrame = null;

        if (GameData.Players[1].icon) {

            ComUtils.onLoadHead(GameData.Players[1].icon, (res) => {
                this.callBack && (clearInterval(this.callBack));
                this.callBack = null;
                if (res) {
                    let texture = new cc.SpriteFrame(res);
                    GameData.Players[1].icon = texture;
                    head.getComponent(cc.Sprite).spriteFrame = texture;
                }

                // 进入游戏动画
                this.onEnterGameAnim();
            })
        }

        GameData.Players[1].icon = null;
    }

    onEnterChuanGuanGame() {

        let timeout = Math.random() * 2 + 3;

        this.ecb = setTimeout(() => {
            GlobalEvent.emit('SHOWOTHERPLAYER');
        }, timeout * 1000);
    }


    onEnable() {

        if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
            this.onEnterChuanGuanGame();
        }

        GlobalEvent.emit(EventCfg.LOADINGHIDE);

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

        if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
            this.onSlideShow();
        }
        else {
            let arr = ComUtils.getJJXunXian();

            let data = {
                game: GameCfg.GameType,
                uid: GameData.userID,
                junXian: arr,
            }

            //进入房间请求
            socket.send(pb.MessageId.Req_Room_Enter, PB.onReqRoomEnterBuff(data), (res) => {
                console.log(JSON.stringify(res));
                if (res.err) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err.err);
                    this.node.active = false;
                } else {
                    GameData.roomId = res.id;
                    this.onSlideShow();
                }
            })
        }

    }

    //寻找对手动画
    onSlideShow() {
        let sp = this.player2.getChildByName('head').getComponent(cc.Sprite);

        this.spIndex = 0;

        if (!this.callBack) {

            this.callBack = setInterval(() => {
                if (this.spIndex >= this.tx.length) {
                    this.spIndex = 0;
                }
                sp.spriteFrame = this.tx[this.spIndex++];
            }, 100);
        }
    }

    onDisable() {
        this.callBack && (clearInterval(this.callBack));
        this.callBack = null;
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            if (this.enterRoom) { return }
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GlobalHandle.onReqRoomLeave(() => {
                this.node.active = false;
                GameCfg.GameType = null;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            });

            this.ecb && (clearTimeout(this.ecb));
            this.ecb = null;
        }
    }

    onDestroy() {
        GlobalEvent.off('SHOWOTHERPLAYER');
        GlobalEvent.off(EventCfg.RoomGameStatus);
        this.ecb && (clearTimeout(this.ecb));
        this.ecb = null;
    }


}
