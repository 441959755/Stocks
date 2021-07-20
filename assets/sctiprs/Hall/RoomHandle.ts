import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import GlobalHandle from "../global/GlobalHandle";
import ComUtils from "../Utils/ComUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    roomid: cc.Label = null;

    @property([cc.Node])
    player: cc.Node[] = []

    @property(cc.Node)
    jj_zxyq: cc.Node = null;

    cb = null;

    onLoad() {
        //自己进入房间
        GlobalEvent.on(EventCfg.RoomGameDataSelf, this.onShow.bind(this), this);

        //其他玩家进入房间：
        GlobalEvent.on(EventCfg.RoomGameDataOther, this.onShow.bind(this), this);


        //同步房间游戏状态
        GlobalEvent.on(EventCfg.RoomGameStatus, this.onRoomGameStatus.bind(this), this);
    }

    onRoomGameStatus(data) {

    }

    onShow() {


        {
            let name = this.player[0].getChildByName('name').getComponent(cc.Label);
            let lv = this.player[0].getChildByName('lv').getComponent(cc.Label);
            let exp = this.player[0].getChildByName('exp').getComponent(cc.Label);
            let read = this.player[0].getChildByName('read').getComponent(cc.Label);
            let head = this.player[0].getChildByName('head').getComponent(cc.Sprite);

            if (GameData.Players.length > 0) {
                name.string = GameData.Players[0].nickname;
                lv.string = 'LV: ' + GameData.Players[0].properties[pb.GamePropertyId.Level];
                exp.string = '经验值：' + GameData.Players[0].properties[pb.GamePropertyId.Exp] + '/' +
                    GameCfgText.gameTextCfg.level_exp[(GameData.Players[0].properties[pb.GamePropertyId.Level] || 1)];
                read.string = '等待开始';
                this.onLoadHead(GameData.Players[0], head);

            }

        }

    }

    onLoadHead(ob, head) {

        if (ob.uid == GameData.userID) {
            head.spriteFrame = GameData.headImg;
        }
        else {
            ComUtils.onLoadHead(ob.icon, (res) => {
                let texture = new cc.SpriteFrame(res);
                ob.icon = texture;
                head.spriteFrame = GameData.Players[1].icon;
            })
            ob.icon = null;
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            GlobalHandle.onReqRoomLeave(() => {
                this.node.active = false;
                GameCfg.GameType = null;
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            });
        }

        //点击在线邀请
        else if (name == 'jj_zxyq') {

            let str;
            if (GameCfg.GameType == pb.GameType.JJ_PK) {
                str = 'PK大战';
            } else if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
                str = '多空大战';
            }
            let info = {
                sender: GameData.userID,
                receiver: GameData.roomId,
                type: pb.MessageType.RoomInvite,
                text: GameData.userName + '邀请您来一局' + str,
                ts: parseInt(new Date().getTime() / 1000 + ''),
            }
            let Notice = pb.Notice;
            let message = Notice.create(info);
            let buff = Notice.encode(message).finish();

            socket.send(pb.MessageId.Sync_C2S_Message, buff, (res) => {
                console.log('在线邀请：' + JSON.stringify(res));
                GlobalEvent.emit(EventCfg.LOADINGHIDE);

            })

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
    }


    onDisable() {
        let node = this.jj_zxyq.children[0];
        let timeLabel = this.jj_zxyq.children[1].getComponent(cc.Label);

        this.cb && (clearInterval(this.cb))
        this.cb = null;
        node.active = false;
        timeLabel.string = '';
    }
}
