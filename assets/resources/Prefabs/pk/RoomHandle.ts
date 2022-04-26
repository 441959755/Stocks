
import { pb } from "../../../protos/proto";
import LLWSDK from "../../../sctiprs/common/sdk/LLWSDK";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import GlobalHandle from "../../../sctiprs/global/GlobalHandle";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import LoadImg from "../../../sctiprs/Utils/LoadImg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    roomid: cc.Label = null;

    @property([cc.Node])
    player: cc.Node[] = []

    @property(cc.Node)
    jj_zxyq: cc.Node = null;

    @property(cc.Node)
    jj_fxyq: cc.Node = null;

    @property(cc.Node)
    jj_zb: cc.Node = null;

    @property(cc.Node)
    kaishiBtn: cc.Node = null;

    @property(cc.Node)
    qxzbBtn: cc.Node = null;

    cb = null;

    @property(cc.Animation)
    enterGameAnim: cc.Animation = null;

    enterRoom = false;

    zbFlag = false;

    huizhidatas = 106;

    @property(cc.SpriteFrame)
    defaultHead: cc.SpriteFrame = null;

    onLoad() {

        //自己进入房间
        GlobalEvent.on(EventCfg.RoomGameDataSelf, this.onShow.bind(this), this);

        //其他玩家进入房间：
        GlobalEvent.on(EventCfg.RoomGameDataOther, this.onShow.bind(this), this);

        //同步房间游戏状态
        GlobalEvent.on(EventCfg.RoomGameStatus, this.onRoomGameStatus.bind(this), this);

        //准备状态
        GlobalEvent.on(EventCfg.ROOMOLAYERSTATUS, (data) => {
            let read = this.player[1].getChildByName('read').getComponent(cc.Label);
            let read1 = this.player[0].getChildByName('read').getComponent(cc.Label);
            if (data.ready) {
                this.zbFlag = true;
                read.string = '等待开始...';
                read1.string = '等待开始...';
            }
            else {
                this.zbFlag = false;
                read.string = '等待准备...';
                read1.string = '等待准备...';
            }
        }, this);

        //玩家离开房间
        GlobalEvent.on(EventCfg.ROOMLEAVE, this.RoomLeave.bind(this), this);

        //离开游戏
        GlobalEvent.on(EventCfg.LEAVEGAME, (flag) => {
            this.enterRoom = false;
            //已逃跑
            if (flag) {
                this.node.active = false;
            }
        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.RoomGameDataSelf);
        GlobalEvent.off(EventCfg.RoomGameDataOther);
        GlobalEvent.off(EventCfg.RoomGameStatus);
        GlobalEvent.off(EventCfg.ROOMLEAVE);
        GlobalEvent.off(EventCfg.ROOMOLAYERSTATUS);
        GlobalEvent.off(EventCfg.LEAVEGAME);
    }

    RoomLeave(data) {
        console.log('玩家离开房间' + JSON.stringify(data));

        //其他玩家离开
        if (data.uid && data.uid != GameData.userID) {
            this.jj_fxyq.active = true;
            this.jj_zxyq.active = true;

            this.kaishiBtn.active = true;
            this.kaishiBtn.getComponent(cc.Button).interactable = false;
            this.kaishiBtn.getComponent(cc.Button).enableAutoGrayEffect = true;

            let name = this.player[1].getChildByName('name').getComponent(cc.Label);
            let lv = this.player[1].getChildByName('lv').getComponent(cc.Label);
            let exp = this.player[1].getChildByName('exp').getComponent(cc.Label);
            let read = this.player[1].getChildByName('read').getComponent(cc.Label);
            let head = this.player[1].getChildByName('head').getComponent(cc.Sprite);
            this.zbFlag = false;
            name.string = '';
            lv.string = '';
            exp.string = '';
            read.string = '等待加入...';
            head.spriteFrame = null;
        }
        //房間解散
        else {
            GameData.Players = [];
            GameData.Players.length = 0;
            GameData.RoomType = 0;
            GameData.roomId = 0;
            this.node.active = false;
            //  GameCfg.GameType = null;
        }
    }

    onRoomGameStatus(data) {
        if (data.status == 2 && this.node.active) {
            this.enterRoom = true
            this.enterGameAnim.on('finished', () => {
                console.log('enterGameAnim');
                GlobalEvent.emit('LOADGAME');
                this.zbFlag = false;
            }, this);

            this.enterGameAnim && (this.enterGameAnim.play());
        }
    }

    onEnable() {
        this.enterRoom = false;

        this.qxzbBtn.active = false;
        this.jj_zb.active = false;
        this.roomid.string = '房间ID：' + GameData.roomId;
        this.jj_fxyq.active = true;
        this.jj_zxyq.active = true;

        if (GameData.RoomType == 2) {
            this.kaishiBtn.active = false;
            this.jj_zb.active = true;
        }
        else {
            this.kaishiBtn.active = true;
            this.jj_zb.active = false;
        }

        this.kaishiBtn.getComponent(cc.Button).interactable = false;
        this.kaishiBtn.getComponent(cc.Button).enableAutoGrayEffect = true;

        GlobalEvent.on('UPDATEGAMEDATE', () => {
            setTimeout(() => {
                this.onShow();
            }, 1000);
            if (GameData.RoomType == 2) {
                this.qxzbBtn.active = false;
                this.jj_zb.active = true;
            }
        }, this);

        this.onShow();
    }


    onShow(info?) {

        if (info && info.tsQuoteStart) {
            this.huizhidatas = parseInt(info.tsQuoteStart) + 1;
        }

        {
            let name = this.player[0].getChildByName('name').getComponent(cc.Label);
            let lv = this.player[0].getChildByName('lv').getComponent(cc.Label);
            let exp = this.player[0].getChildByName('exp').getComponent(cc.Label);
            let read = this.player[0].getChildByName('read').getComponent(cc.Label);
            let head = this.player[0].getChildByName('head').getComponent(cc.Sprite);

            name.string = GameData.userName;
            lv.string = 'LV: ' + GameData.properties[pb.GamePropertyId.Level];
            exp.string = '经验值：' + GameData.properties[pb.GamePropertyId.Exp] + '/' +
                GameCfgText.gameConf.level_exp[(GameData.properties[pb.GamePropertyId.Level] || 1)];

            read.string = '等待加入...';
            head.spriteFrame = GameData.headImg;
            if (GameData.Players && GameData.Players[1]) {
                read.string = '等待准备...';
            }
        }

        {
            let name = this.player[1].getChildByName('name').getComponent(cc.Label);
            let lv = this.player[1].getChildByName('lv').getComponent(cc.Label);
            let exp = this.player[1].getChildByName('exp').getComponent(cc.Label);
            let read = this.player[1].getChildByName('read').getComponent(cc.Label);
            let head = this.player[1].getChildByName('head').getComponent(cc.Sprite);
            read.string = '等待加入...';
            if (GameData.Players && GameData.Players[1] && GameData.Players[1].nickname) {
                name.string = GameData.Players[1].nickname;
                lv.string = 'LV: ' + GameData.Players[1].properties[pb.GamePropertyId.Level];
                exp.string = '经验值：' + GameData.Players[1].properties[pb.GamePropertyId.Exp] + '/' +
                    GameCfgText.gameConf.level_exp[(GameData.Players[1].properties[pb.GamePropertyId.Level] || 1)];
                read.string = '等待准备...';
                this.onLoadHead(GameData.Players[1], head);
                this.jj_fxyq.active = false;
                this.jj_zxyq.active = false;

                this.kaishiBtn.getComponent(cc.Button).interactable = true;
                this.kaishiBtn.getComponent(cc.Button).enableAutoGrayEffect = false;
            } else {
                name.string = '';
                lv.string = '';
                exp.string = '';
                read.string = '等待加入...';
                head.spriteFrame = null;
            }
        }
    }

    onLoadHead(ob, head) {

        LoadImg.onLoadHeadByUrl(GameData.otherHead, (res) => {
            if (res) {
                let texture = new cc.SpriteFrame(res);
                head.getComponent(cc.Sprite).spriteFrame = texture;
                GameData.imgs[GameData.Players[1].icon + ''] = texture;
            }
            else {
                head.getComponent(cc.Sprite).spriteFrame = this.defaultHead;
                GameData.imgs[GameData.Players[1].icon + ''] = this.defaultHead;
            }
        })

    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            if (this.enterRoom) { return }
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GlobalHandle.onReqRoomLeave(() => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            });
            this.node.active = false;
            GameCfg.GameType = null;
            this.zbFlag = false;
        }

        //点击在线邀请
        else if (name == 'jj_zxyq') {

            GlobalHandle.onLineInvite();

            let count = 15;
            let node = event.target.children[0];
            let timeLabel = event.target.children[1].getComponent(cc.Label);
            node.active = true;
            this.cb = setInterval(() => {
                if (count <= 0) {
                    clearInterval(this.cb);
                    node.active = false;
                    timeLabel.string = '';
                } else {
                    count--;
                    timeLabel.string = ComUtils.onNumChangeTime(count);
                }
            }, 1000);
        }
        else if (name == 'jj_ksdz') {

            if (!this.zbFlag) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '玩家还没准备');
                return;
            }

            if (this.huizhidatas) {
                GameData.huizhidatas = this.huizhidatas;
                GameCfg.huizhidatas = this.huizhidatas;
            }

            GlobalHandle.onCmdGameStartReq();
        }

        else if (name == 'player2') {
            if (GameData.Players.length > 1) {
                GlobalEvent.emit(EventCfg.OPENOTHERPLAYERINFO, GameData.Players[1]);
            }
        }

        else if (name == 'jj_zb') {
            let info = {
                id: GameData.roomId,
                uid: GameData.userID,
                ready: true,
            }
            let RoomPlayerStatus = pb.RoomPlayerStatus;
            let message = RoomPlayerStatus.create(info);
            let buff = RoomPlayerStatus.encode(message).finish();

            socket.send(pb.MessageId.Req_Room_Ready, buff, (res) => {
                console.log('玩家状态' + JSON.stringify(res));
            })
            this.jj_zb.active = false;
            let read = this.player[1].getChildByName('read').getComponent(cc.Label);
            read.string = '等待开始...';
            let read1 = this.player[0].getChildByName('read').getComponent(cc.Label);
            read1.string = '等待开始...';
            this.qxzbBtn.active = true;
        }

        else if (name == 'jj_qxzb') {

            let info = {
                id: GameData.roomId,
                uid: GameData.userID,
                ready: false,
            }

            let RoomPlayerStatus = pb.RoomPlayerStatus;
            let message = RoomPlayerStatus.create(info);
            let buff = RoomPlayerStatus.encode(message).finish();

            socket.send(pb.MessageId.Req_Room_Ready, buff, (res) => {
                console.log('玩家状态' + JSON.stringify(res));
            })
            let read = this.player[1].getChildByName('read').getComponent(cc.Label);
            read.string = '等待准备...';
            let read1 = this.player[0].getChildByName('read').getComponent(cc.Label);
            read1.string = '等待准备...';
            this.qxzbBtn.active = false;
            this.jj_zb.active = true;
        }

        else if (name == 'jj_fxyq') {
            LLWSDK.getSDK().shareAppMessage(2);
        }
    }

    onDisable() {
        let node = this.jj_zxyq.children[0];
        let timeLabel = this.jj_zxyq.children[1].getComponent(cc.Label);
        this.cb && (clearInterval(this.cb))
        this.cb = null;
        node.active = false;
        timeLabel.string = '';
        GlobalEvent.off('UPDATEGAMEDATE');
    }
}
